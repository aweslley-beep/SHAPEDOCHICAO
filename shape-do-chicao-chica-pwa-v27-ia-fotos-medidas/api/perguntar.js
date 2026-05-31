
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY não configurada na Vercel." });
  }

  try {
    const pergunta = String(req.body?.pergunta || "").slice(0, 1200);

    const prompt = `
Você é a CHICA AI, assistente fitness do SHAPE DO CHICÃO.
Responda a pergunta do usuário de forma segura, direta e prática.
Não substitua médico, nutricionista ou profissional de educação física.
Inclua links úteis em formato JSON.

Pergunta: ${pergunta}

Responda SOMENTE em JSON:
{
  "resposta": "string",
  "links": [
    {"titulo":"Vídeos relacionados", "url":"https://www.youtube.com/results?search_query=..."},
    {"titulo":"Pesquisa complementar", "url":"https://www.google.com/search?q=..."}
  ]
}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        { role: "system", content: "Você é a CHICA AI. Responda apenas JSON válido." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(content));
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erro ao responder pergunta." });
  }
}
