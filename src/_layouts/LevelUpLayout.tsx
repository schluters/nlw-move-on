import React from 'react'
import Head from 'next/head'
import levelup from '../pages/api/levelup'

interface LevelUpLayoutProps {
  title: string
  description: string
  levelUpUrl: string
  content: string
}

export default function LevelUpLayout(props: LevelUpLayoutProps): JSX.Element {
  return (
    <main>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta property="og:site_name" content="Move.On" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.levelUpUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.levelUpUrl} />
      </Head>
      <article>
        <h1>{props.title}</h1>
        <img width="600" src={props.levelUpUrl} alt={props.title} />
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </article>
    </main>
  )
}
