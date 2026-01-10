
import { GoogleGenAI } from "@google/genai";
import { DialecticalState, DialecticStyle, CapabilityStatus } from "../types";

// Inicialización única con la llave de entorno
// Usamos import.meta.env para Vite, o fallback a process.env si se define globalmente
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key_for_dev';
const ai = new GoogleGenAI({ apiKey });

const PERSONAS = {
  chola: {
    role: "BARRIO-ROOT",
    desc: "Directa, cruda, basada en la realidad urbana, auténtica.",
    model: "gemini-3-flash-preview"
  },
  malandra: {
    role: "ESTRATEGIA-SURVIVAL",
    desc: "Astuta, crítica, adaptativa, desafiante y táctica.",
    model: "gemini-3-flash-preview"
  },
  fresa: {
    role: "TECH-REFINED",
    desc: "Sofisticada, académica, tecnológica, estética y aspiracional.",
    model: "gemini-3-flash-preview"
  },
  salamandra: {
    role: "SALAMANDRA MAGISTRAL",
    desc: "Visionaria, integradora, decodificadora cuántica universal 369.",
    model: "gemini-3-pro-preview"
  }
};

export class ChalamandraEngine {
  async checkCapabilities(): Promise<CapabilityStatus> {
    // En este contexto de extensión, operamos con Gemini Cloud
    return {
      languageModel: 'cloud',
      summarizer: 'cloud'
    };
  }

  async runDialectic(
    input: string, 
    thesisStyle: DialecticStyle,
    antithesisStyle: DialecticStyle,
    onProgress?: (msg: string) => void
  ): Promise<DialecticalState> {
    
    // 1. TESIS CON GOOGLE SEARCH GROUNDING
    onProgress?.(`Sincronizando Tesis ${thesisStyle.toUpperCase()}...`);
    const thesisResponse = await ai.models.generateContent({
      model: PERSONAS[thesisStyle].model,
      contents: `Actúa como ${PERSONAS[thesisStyle].role}. ${PERSONAS[thesisStyle].desc} Proporciona una TESIS fundamentada sobre: "${input}".`,
      config: { 
        tools: [{ googleSearch: {} }] 
      }
    });

    const thesisText = thesisResponse.text || "Error en Tesis.";
    const sources = thesisResponse.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((c: any) => c.web?.uri)
      .map((c: any) => ({ uri: c.web.uri, title: c.web.title })) || [];

    // 2. ANTÍTESIS CRÍTICA
    onProgress?.(`Desafiando con Antítesis ${antithesisStyle.toUpperCase()}...`);
    const antithesisResponse = await ai.models.generateContent({
      model: PERSONAS[antithesisStyle].model,
      contents: `Actúa como ${PERSONAS[antithesisStyle].role}. ${PERSONAS[antithesisStyle].desc} Desafía críticamente esta tesis: "${thesisText}" respecto al concepto original: "${input}".`
    });
    const antithesisText = antithesisResponse.text || "Error en Antítesis.";

    // 3. SÍNTESIS MAGISTRAL (PRO MODEL)
    onProgress?.("Decodificando Síntesis Salamandra...");
    const synthesisResponse = await ai.models.generateContent({
      model: PERSONAS.salamandra.model,
      contents: `Como ${PERSONAS.salamandra.role}, fusiona la Tesis ("${thesisText}") y la Antítesis ("${antithesisText}") en una resolución magistral y visionaria para: "${input}".`
    });

    return {
      thesis: thesisText,
      thesisSources: sources,
      antithesis: antithesisText,
      synthesis: synthesisResponse.text || "Error en Síntesis.",
      energySignature: `${thesisStyle.slice(0,2)}-${antithesisStyle.slice(0,2)}-369`
    };
  }

  async generateDisruption(input: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Aplica MECÁNICA INVERSA y DISRUPCIÓN NIVEL 9 a: "${input}". Rompe los paradigmas establecidos y ofrece una visión radical.`
    });
    return response.text || "Disrupción fallida.";
  }
}

export const chalamandra = new ChalamandraEngine();
