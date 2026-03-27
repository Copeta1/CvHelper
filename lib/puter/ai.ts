declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string, options?: { model?: string }) => Promise<{ message: { content: string } }>
      }
    }
  }
}

export async function analyzeCV(cvData: string): Promise<string> {
  const prompt = `Ti si stručnjak za pisanje CV-ova i HR konzultant s 10+ godina iskustva.

Analiziraj sljedeći CV i daj konkretne sugestije za poboljšanje.

CV PODACI:
${cvData}

Odgovori ISKLJUČIVO u JSON formatu bez ikakvog dodatnog teksta:
{
  "overallScore": <broj 0-100>,
  "summary": "<kratki pregled CV-a>",
  "improvements": [
    {
      "section": "<naziv sekcije>",
      "issue": "<opis problema>",
      "suggestion": "<konkretna sugestija>",
      "priority": "<high|medium|low>"
    }
  ],
  "keywords": ["<keyword1>", "<keyword2>"],
  "optimizedSummary": "<AI generirani profesionalni summary>"
}`

  const response = await window.puter.ai.chat(prompt, {
    model: 'gpt-4o-mini'
  })

  const rawText = Array.isArray(response) 
  ? Array.isArray(response[0].text)
    ? response[0].text[0].text
    : response[0].text
  : response.message.content


const text = String(rawText)

const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) ||
                  text.match(/```\n?([\s\S]*?)\n?```/)

return jsonMatch ? jsonMatch[1].trim() : text.trim()
  

}