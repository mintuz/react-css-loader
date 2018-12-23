import Document, { Head, Main, NextScript } from 'next/document'
import { Resolver } from '../../../';
import CDNAdapter from '../../../cdn';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    let cssResolver;
    const page = renderPage(App => props => {
      // assign the resolver to a global variable within getInitialProps
      // we need to do this because the only way to get a reference to the page component is by
      // calling renderPage which is a sync operation.
      // but the resolver is an async operation.
      cssResolver = new Resolver(
        <App {...props}/>,
        new CDNAdapter({
          cdnRoot: '/static',
        })
      );

      return (
        <App {...props} />
      );
    });

    // get the raw response back from the resolver
    const styles = await cssResolver.resolve();

    // Create link tags for each style found and merge back into next.js head array.
    page.head = [...page.head, ...styles.map(style => {
      return <link rel="stylesheet" href={style.path} />
    })];

    return { ...page };
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
