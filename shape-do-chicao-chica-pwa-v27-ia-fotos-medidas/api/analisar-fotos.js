
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function cleanImage(data){
  if(!data || typeof data !== "string") return null;
  if(!data.startsWith("data:image/")) return null;
  return data;
}
function safe(v){ return String(v || "").slice(0, 1000); }

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({ error:"Método não permitido." });
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({ error:"OPENAI_API_KEY não configurada." });

  try{
    const { nome, idade, peso, altura, perfil, objetivo, observacoes, tipo, fotos } = req.body || {};
    const imgs = [cleanImage(fotos?.frente), cleanImage(fotos?.lado), cleanImage(fotos?.costas)].filter(Boolean);

    if(!imgs.length) return res.status(400).json({ error:"Nenhuma foto enviada." });

    const prompt = `
Você é a CHICA AI do SHAPE DO CHICÃO.
Analise as fotos enviadas e gere uma estimativa visual APROXIMADA de medidas corporais para acompanhamento de evolução.
Não afirme precisão. Não faça diagnóstico médico. Não identifique a pessoa. Não avalie beleza ou atratividade.
Use os dados do usuário apenas para contextualizar.

Dados:
Nome: ${safe(nome)}
Idade: ${safe(idade)}
Peso: ${safe(peso)}
Altura: ${safe(altura)}
Perfil: ${safe(perfil)}
Objetivo: ${safe(objetivo)}
Observações: ${safe(observacoes)}
Momento da avaliação: ${safe(tipo)}

Retorne SOMENTE JSON válido:
{
  "resumo":"string curta",
  "confianca":"baixa|média|alta",
  "biotipo":"string curta",
  "foco":"string curta",
  "medidas":{
    "braco":"estimativa em cm, exemplo 34 cm",
    "coxa":"estimativa em cm",
    "peito":"estimativa em cm",
    "gluteo":"estimativa em cm",
    "panturrilha":"estimativa em cm",
    "quadril":"estimativa em cm"
  },
  "observacoes":"string com cautelas e recomendações"
}`;

    const content = [
      { type:"text", text: prompt },
      ...imgs.map(img => ({ type:"image_url", image_url:{ url: img } }))
    ];

    const response = await client.chat.completions.create({
      model:"gpt-4o-mini",
      temperature:0.3,
      messages:[
        { role:"system", content:"Você é uma IA fitness segura. Responda apenas JSON válido e trate medidas por foto como estimativas visuais aproximadas." },
        { role:"user", content }
      ],
      response_format:{ type:"json_object" }
    });

    const text = response.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(text));
  }catch(err){
    return res.status(500).json({ error: err.message || "Erro ao analisar fotos." });
  }
}
