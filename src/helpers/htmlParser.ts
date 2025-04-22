export async function fetchHtml(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const html = await response.text()
    return html
  } catch (error) {
    console.error('Error fetching HTML:', error)
  }
}

export function parseCtxFromHtml(html: string): unknown | undefined {
  try {
    // Create a DOM parser to parse the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Find all <script> tags in the document
    const scriptTags = doc.querySelectorAll('script')

    for (const script of scriptTags) {
      if (script.textContent && script.textContent.includes('var ctx')) {
        // Extract the ctx variable from the script's text content
        const scriptContent = script.textContent
        const ctxStartIndex = scriptContent.indexOf('var ctx =') + 'var ctx ='.length
        const ctxString = scriptContent.slice(ctxStartIndex).trim()

        // Parse the ctx string as JSON
        const ctx = JSON.parse(ctxString)
        return ctx
      }
    }

    console.error('ctx variable not found in the HTML')
    return undefined
  } catch (error) {
    console.error('Error parsing ctx from HTML:', error)
    return undefined
  }
}
