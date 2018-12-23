import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Resolver } from '../../../';
import CDNAdapter from '../../../cdn';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const cssResolver = new Resolver(
      React.createElement(Component, pageProps),
      new CDNAdapter({
        cdnRoot: '/static', /* Map to nextjs static folder */
      }),
    );

    /* Rather than use .render(), lets return the raw response so we can trasnform it. */
    const rawStyles = await cssResolver.resolve();

    /* We don't want everything sent down to the client, let's only send this. */
    const styles = rawStyles.map(style => {
      return style.path;
    });

    return { pageProps, styles };
  }

  render () {
    const { Component, pageProps, styles } = this.props;

    return (
      <Container>
        <Head>
          {
            styles.map(style => {
              /* Render a link style using react for each stylesheet found */
              return (
                <link rel="stylesheet" href={style} />
              );
            })
          }
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
