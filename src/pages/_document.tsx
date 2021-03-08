import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'

const APP_NAME = 'Move.On'
const APP_DESCRIPTION =
  'O MoveOn é uma aplicação com base na técnica Pomodoro, destinada a desenvolvedores para auxiliar no cuidado da sua saúde e postura.'
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="favicon.ico" type="image/ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />

          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#e1e1e6" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#121214" />

          <link rel="apple-touch-icon" sizes="57x57" href="/images/touch/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/images/touch/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/images/touch/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/images/touch/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/images/touch/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/images/touch/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/images/touch/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/touch/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/touch/apple-icon-180x180.png" />
          
          <link rel="icon" type="image/png" sizes="32x32" href="/images/touch/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/touch/favicon-16x16.png" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/moveon.svg" color="#121214" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://nlw-move-on.vercel.app/" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
          <meta name="twitter:image" content="/images/moveon.gif" />
          <meta name="twitter:creator" content="@schluters" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content="https://nlw-move-on.vercel.app/" />
          <meta property="og:image" content="/images/moveon.gif" />
        </Head>
        <body>
          <div id="fb-root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
