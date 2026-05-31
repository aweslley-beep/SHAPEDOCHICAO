
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function safe(v){ return String(v || "").slice(0, 1200); }

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY não configurada na Vercel." });
  }

  try {
    const { nome, idade, peso, altura, perfil, objetivo, observacoes, checklist, indices } = req.body || {};

    const prompt = `
Você é a CHICA AI, especialista virtual do app SHAPE DO CHICÃO.
Crie um plano fitness personalizado de 90 dias em português do Brasil.

Dados:
Nome: ${safe(nome)}
Idade: ${safe(idade)}
Peso: ${safe(peso)}
Altura: ${safe(altura)}
Perfil: ${safe(perfil)}
Objetivo: ${safe(objetivo)}
Observações/limitações: ${safe(observacoes)}\nChecklist inicial: ${Array.isArray(checklist) ? checklist.join('; ') : safe(checklist)}\nÍndices calculados pelo app: ${typeof indices === 'object' ? JSON.stringify(indices) : safe(indices)}

Regras:
- Seja seguro, profissional e prático.
- Não faça diagnóstico médico.
- Para criança, idoso, Parkinson, dor ou mobilidade reduzida: priorize segurança, liberação médica e acompanhamento profissional.
- Gere treino dentro da plataforma, sem arquivo externo.\n- Use o checklist inicial e os índices do usuário para aumentar a precisão.\n- Inclua avaliação corporal textual e critérios de reavaliação em 90 dias.
- Inclua links sugeridos indiretamente pelo frontend via busca de execução.
- Inclua dieta e suplementação orientativa, com aviso de consultar nutricionista/médico.
- Plano em 3 fases: semanas 1-4, 5-8, 9-12.
- Responda SOMENTE em JSON válido, sem markdown.

Formato JSON:
{
  "titulo": "string",
  "resumo": "string",
  "treino": [
    {
      "dia": "Dia A",
      "foco": "string",
      "exercicios": [
        {"nome":"string","series":"string","descanso":"string"}
      ]
    }
  ],
  "dieta": "string",
  "suplementacao": "string",
  "reavaliacao": "string"
}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      messages: [
        { role: "system", content: "Você é uma IA fitness segura, clara e objetiva. Responda apenas JSON válido." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices?.[0]?.message?.content || "{}";
    return res.status(200).json(JSON.parse(content));
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erro ao gerar plano." });
  }
}
