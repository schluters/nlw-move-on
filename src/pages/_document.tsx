import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'

const APP_NAME = 'Move.On'
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
          <meta
            name="description"
            content="O MoveOn é uma aplicação com base na técnica Pomodoro, destinada a desenvolvedores para auxiliar no cuidado da sua saúde e postura."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="static/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#e1e1e6" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#121214" />

          <link rel="apple-touch-icon" sizes="180x180" href="static/firefox/firefox-general-256-256.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="static/firefox/firefox-general-32-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="static/firefox/firefox-general-16-16.png" />

          <link rel="manifest" href="static/manifest.json" />
          <link rel="mask-icon" href="/icons/moveon.svg" color="#121214" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://nlw-move-on.vercel.app/" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta
            name="twitter:description"
            content="O MoveOn é uma aplicação com base na técnica Pomodoro, destinada a desenvolvedores para auxiliar no cuidado da sua saúde e postura."
          />
          <meta
            name="twitter:image"
            content="https://nlw-move-on.vercel.appstatic/android/android-launchericon-192-192.png"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta
            property="og:description"
            content="O MoveOn é uma aplicação com base na técnica Pomodoro, destinada a desenvolvedores para auxiliar no cuidado da sua saúde e postura."
          />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content="https://nlw-move-on.vercel.app/" />
          <meta property="og:image" content="https://nlw-move-on.vercel.appstatic/icons/apple-touch-icon.png" />
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
