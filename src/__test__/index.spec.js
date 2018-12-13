import React from 'react';
import { mount } from 'enzyme';
import {
    StaticCSS as CSS,
    DynamicCSS,
    Resolver,
    FileSystemAdapter,
    CDNAdapter
} from '../';

function buildComponent(displayName) {
    function MyComponent(props) {
        return <div data-test-id="my-mock-component">{props.children}</div>;
    }

    MyComponent.displayName = displayName;

    return MyComponent;
}

describe('Resolver', () => {
    test('Should dedupe styles', async () => {
        const MockComponentOne = CSS(buildComponent('MyComponent'));
        const MockComponentTwo = CSS(buildComponent('MyComponent2'));

        const CustomApp = () => {
            return (
                <MockComponentOne>
                    <MockComponentOne>
                        <MockComponentTwo />
                    </MockComponentOne>
                </MockComponentOne>
            );
        };

        const resolver = new Resolver(
            CustomApp,
            new FileSystemAdapter({
                folderPath: __dirname,
                inline: false
            })
        );

        const css = await resolver.resolve();

        expect(css.length).toEqual(2);
        expect(css[0].path).toContain('__test__/MyComponent.css');
        expect(css[1].path).toContain('__test__/MyComponent2.css');
    });

    describe('FileSystem Adapter', () => {
        test('Should return CSS for a single module', async () => {
            const resolver = new Resolver(
                CSS(buildComponent('MyComponent')),
                new FileSystemAdapter({
                    folderPath: __dirname,
                    inline: false
                })
            );

            const css = await resolver.resolve();

            expect(css.length).toEqual(1);
            expect(css[0].content).toContain('.mock-class');
            expect(css[0].success).toEqual(true);
            expect(css[0].path).toContain('__test__/MyComponent.css');
        });

        test('Should return CSS for multiple modules', async () => {
            const MockComponentOne = CSS(buildComponent('MyComponent'));
            const MockComponentTwo = CSS(buildComponent('MyComponent2'));

            const CustomApp = () => {
                return (
                    <MockComponentOne>
                        <MockComponentTwo />
                    </MockComponentOne>
                );
            };

            const resolver = new Resolver(
                CustomApp,
                new FileSystemAdapter({
                    folderPath: __dirname,
                    inline: false
                })
            );

            const css = await resolver.resolve();

            expect(css.length).toEqual(2);

            expect(css[0].content).toContain('.mock-class');
            expect(css[1].content).toContain('.mock-class-two');

            expect(css[0].success).toEqual(true);
            expect(css[1].success).toEqual(true);

            expect(css[0].path).toContain('__test__/MyComponent.css');
            expect(css[1].path).toContain('__test__/MyComponent2.css');
        });

        test('Should return object with error when component css does not exist', async () => {
            const MockComponentOne = CSS(buildComponent('MyComponent'));
            const MockComponentTwo = CSS(buildComponent('MyComponent-invalid'));

            const CustomApp = () => {
                return (
                    <MockComponentOne>
                        <MockComponentTwo />
                    </MockComponentOne>
                );
            };

            const resolver = new Resolver(
                CustomApp,
                new FileSystemAdapter({
                    folderPath: __dirname,
                    inline: false
                })
            );

            const css = await resolver.resolve();

            expect(css.length).toEqual(2);

            expect(css[0].content).toContain('.mock-class');
            expect(css[1].content).toContain('');

            expect(css[0].success).toEqual(true);
            expect(css[1].success).toEqual(false);

            expect(css[0].path).toContain('__test__/MyComponent.css');
            expect(css[1].path).toContain('__test__/MyComponent-invalid.css');

            expect(css[1].error.message).toEqual(
                'Component stylesheet does not exist'
            );
        });

        test('Should fetch user defined CSS files', async () => {
            const MockComponentOne = CSS(buildComponent('MyComponent'), {
                styles() {
                    return ['UserDefinedStyles.css'];
                }
            });

            const resolver = new Resolver(
                MockComponentOne,
                new FileSystemAdapter({
                    folderPath: __dirname,
                    inline: false
                })
            );

            const css = await resolver.resolve();

            expect(css.length).toEqual(2);

            expect(css[0].content).toContain('.mock-class');
            expect(css[1].content).toContain('.defined');

            expect(css[0].success).toEqual(true);
            expect(css[1].success).toEqual(true);

            expect(css[0].path).toContain('__test__/MyComponent.css');
            expect(css[1].path).toContain('__test__/UserDefinedStyles.css');
        });

        describe('render', () => {
            test('should render a single css file', async () => {
                const MockComponentOne = CSS(buildComponent('MyComponent'));
                const MockComponentTwo = CSS(buildComponent('MyComponent2'));

                const CustomApp = () => {
                    return (
                        <MockComponentOne>
                            <MockComponentTwo />
                        </MockComponentOne>
                    );
                };

                const resolver = new Resolver(
                    CustomApp,
                    new FileSystemAdapter({
                        folderPath: __dirname,
                        inline: false
                    })
                );

                const css = await resolver.render();

                expect(css).toEqual(
                    '.mock-class { background: red; }.mock-class-two { background: red; }'
                );
            });

            test('should render css as inline styles', async () => {
                const MockComponentOne = CSS(buildComponent('MyComponent'));
                const MockComponentTwo = CSS(buildComponent('MyComponent2'));

                const CustomApp = () => {
                    return (
                        <MockComponentOne>
                            <MockComponentTwo />
                        </MockComponentOne>
                    );
                };

                const resolver = new Resolver(
                    CustomApp,
                    new FileSystemAdapter({
                        folderPath: __dirname,
                        inline: true
                    })
                );

                const css = await resolver.render();

                expect(css).toEqual(
                    '<style data-css-component="MyComponent">.mock-class { background: red; }</style><style data-css-component="MyComponent2">.mock-class-two { background: red; }</style>'
                );
            });
        });
    });

    describe('CDN Adapter', () => {
        test('output link tags for stylesheets', async () => {
            const MockComponentOne = CSS(buildComponent('MyComponent'));
            const MockComponentTwo = CSS(buildComponent('MyComponent2'));

            const CustomApp = () => {
                return (
                    <MockComponentOne>
                        <MockComponentTwo />
                    </MockComponentOne>
                );
            };

            const resolver = new Resolver(
                CustomApp,
                new CDNAdapter({
                    cdnRoot: 'https://my-cdn.com'
                })
            );

            const css = await resolver.render();

            expect(css).toEqual(
                '<link data-css-component="MyComponent" rel="stylesheet" href="https://my-cdn.com/MyComponent.css"><link data-css-component="MyComponent2" rel="stylesheet" href="https://my-cdn.com/MyComponent2.css">'
            );
        });
    });
});

describe('Dynamic CSS React Container', () => {
    test('Should wrap and render my component', () => {
        const fakeProps = {
            children: 'My fake content'
        };

        const Component = DynamicCSS(buildComponent('MyComponent'));
        const instance = mount(<Component {...fakeProps} />);

        expect(Component.displayName).toEqual('DynamicCSS');

        expect(
            instance.find('[data-test-id="my-mock-component"]').exists()
        ).toEqual(true);

        expect(
            instance.find('[data-test-id="my-mock-component"]').text()
        ).toEqual('My fake content');
    });

    test('should not try render component css when display name not defined', async () => {
        const resolver = new Resolver(
            DynamicCSS(buildComponent()),
            new FileSystemAdapter({
                folderPath: __dirname,
                inline: false
            })
        );

        const css = await resolver.resolve();

        expect(css.length).toEqual(0);
    });
});

describe('Static CSS React Container', () => {
    test('Should wrap and render my component', () => {
        const fakeProps = {
            children: 'My fake content'
        };

        const Component = CSS(buildComponent('MyComponent'));
        const instance = mount(<Component {...fakeProps} />);

        expect(Component.displayName).toEqual('StaticCSS');

        expect(
            instance.find('[data-test-id="my-mock-component"]').exists()
        ).toEqual(true);

        expect(
            instance.find('[data-test-id="my-mock-component"]').text()
        ).toEqual('My fake content');
    });

    test('should not try render component css when display name not defined', async () => {
        const resolver = new Resolver(
            CSS(buildComponent()),
            new FileSystemAdapter({
                folderPath: __dirname,
                inline: false
            })
        );

        const css = await resolver.resolve();

        expect(css.length).toEqual(0);
    });
});
