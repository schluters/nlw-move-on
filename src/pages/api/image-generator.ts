import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../../utils/screenshot'

const getHTML = ({ level, challenges, totalxp }): string => `
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Rajdhani:wght@600&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font: 400 1rem "Montserrat", sans-serif;
        background-color: ${props => props.theme.colors.background};
      }
      .container {
        padding: 0 4rem 0 2rem;
        flex: 1;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 2rem;
        align-content: center;
        justify-content: center;
      }
      .level {
        background: url('https://nlw-move-on.vercel.app/icons/levelup.svg') no-repeat center top;
        background-size: 95%;
        text-align: center;
      }
      h1 {
        font-size: 300px;
        font-weight: 700;
        line-height: 262px;
        color: #4CD62B;
      }
      h2 {
        font-size: 56px;
        font-weight: 600;
        line-height: 1.4;
        color: #2E384D;
      }
      h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1.4;
        color: #666;
        text-transform: uppercase;
      }
      p {
        font-size: 46px;
        font-weight: 600;
        line-height: 1.4;
        color: #2E384D;
      }
      p strong {
        color: #4CD62B;
      }
      .box {
        display: flex;
        flex-direction: column;
        align-itens: flex-start;
        justify-content: space-between;
      }
      .info {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #DCDDE0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box level">
        <header>
          <h1>${level}</h1>
          <h2>Avancei para o próximo level</h2>
        </header>
      </div>
      <div class="box">
        <div class="info">
          <h3>Desafios</h3>
          <p>
            <strong>${challenges}</strong> completado${challenges > 1 && 's'}
          </p>
        </div>
        <div class="info">
          <h3>Experiência</h3>
          <p>
            <strong>${totalxp}</strong> xp
          </p>
        </div>
        <img src="https://nlw-move-on.vercel.app/move-on-logo-invert.png" alt=""/>
      </div>
    </div>
  </body>
</html>
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isHTMLDebugMode = false
  const html = getHTML({
    level: req.query.level,
    challenges: req.query.challenges,
    totalxp: req.query.totalxp
  })
  if (isHTMLDebugMode) {
    res.setHeader('Content-Type', 'text/html')
    return res.end(html)
  }

  const file = await getScreenshot(html, { width: 1200, height: 630 })

  res.setHeader('Content-Type', 'image/png')
  res.end(file)
}
