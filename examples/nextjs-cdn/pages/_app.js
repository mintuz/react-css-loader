import React from 'react';
import App, { Container } from 'next/app';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return import('../../../server').then(async ({Resolver, CDNAdapter}) => {
      const cssResolver = new Resolver(Component, new CDNAdapter());
      const css = await cssResolver.render();

      return { pageProps, css };
    }).catch(() => {
      return { pageProps };
    });

    // console.log(CSS);



    // const cssResolver = new Resolver(Component, new CDNAdapter());
    // const css = await cssResolver.render();

    // console.log(css);

    return { pageProps };
  }

  render () {
    const { Component, pageProps, css } = this.props;
    console.log(css);

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
