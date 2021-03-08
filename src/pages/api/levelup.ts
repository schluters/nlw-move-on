import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from './_lib/chromium'
import { getHtml } from './_lib/levelupTemplate'

const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<string> => {
  try {
    const query = req.query

    const level = Number(query.level)
    const challenges = Number(query.challenges)
    const totalxp = Number(query.totalxp)
    const theme = query.theme === 'dark' ? 'dark' : 'light'

    if (!level) {
      throw new Error('Level is required')
    }

    const html = getHtml({ level, challenges, totalxp, theme })

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
      return
    }

    const file = await getScreenshot(html, isDev)

    res.statusCode = 200
    res.setHeader('Content-Type', `image/png`)
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
    res.end(file)
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
  }
}
