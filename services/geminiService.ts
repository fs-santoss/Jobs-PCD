
import { GoogleGenAI, Type } from "@google/genai";
import { Job } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getChatbotResponse = async (query: string, jobs: Job[]): Promise<{ text: string, jobIds: number[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Você é um assistente de busca de empregos para o site JobsPCD, um portal de vagas para pessoas com deficiência.
        Sua tarefa é analisar a pergunta do usuário e a lista de vagas disponíveis e responder de forma amigável, indicando quais vagas correspondem à busca.
        Retorne APENAS um objeto JSON válido, sem nenhum texto ou formatação adicional como \`\`\`json.

        Pergunta do usuário: "${query}"

        Lista de vagas disponíveis em formato JSON:
        ${JSON.stringify(jobs, null, 2)}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseText: {
              type: Type.STRING,
              description: "Uma resposta em texto amigável para o usuário, resumindo os resultados. Se nenhuma vaga for encontrada, explique o motivo."
            },
            matchingJobIds: {
              type: Type.ARRAY,
              items: {
                type: Type.NUMBER,
              },
              description: "Um array com os IDs das vagas que correspondem à pergunta do usuário."
            }
          },
          required: ["responseText", "matchingJobIds"]
        }
      }
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    return {
      text: parsedResponse.responseText,
      jobIds: parsedResponse.matchingJobIds,
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "Desculpe, não consegui processar sua busca no momento. Tente usar os filtros manuais.",
      jobIds: [],
    };
  }
};
