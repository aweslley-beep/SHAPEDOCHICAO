
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function safe(v){ return String(v || "").slice(0, 800); }

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({ error:"Método não permitido." });
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({ error:"OPENAI_API_KEY não configurada." });

  try{
    const { perfil, objetivo, observacoes } = req.body || {};
    const prompt = `
Você é a CHICA AI do SHAPE DO CHICÃO.
Crie uma dica fitness diária personalizada, curta, prática e segura.
Perfil: ${safe(perfil)}
Objetivo: ${safe(objetivo)}
Observações: ${safe(observacoes)}

Não faça diagnóstico. Seja motivadora e profissional.
Responda SOMENTE JSON:
{
  "titulo":"string",
  "dica":"string"
}`;

    const response = await client.chat.completions.create({
      model:"gpt-4o-mini",
      temperature:0.7,
      messages:[
        { role:"system", content:"Você é a CHICA AI. Responda apenas JSON válido." },
        { role:"user", content: prompt }
      ],
      response_format:{ type:"json_object" }
    });

    const text = response.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(text));
  }catch(err){
    return res.status(500).json({ error: err.message || "Erro ao gerar dica." });
  }
}
