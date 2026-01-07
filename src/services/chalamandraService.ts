
import { GoogleGenAI } from "@google/genai";
import { DialecticalState, DialecticStyle, CapabilityStatus } from "../types";

// Inicialización única con la llave de entorno
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PERSONAS: Record<string, { role: string; desc: string; model: string }> = {
  chola: {
    role: "BARRIO-ROOT",
    desc: "Directa, cruda, basada en la realidad urbana, auténtica.",
    model: "gemini-2.0-flash"
  },
  malandra: {
    role: "ESTRATEGIA-SURVIVAL",
    desc: "Astuta, crítica, adaptativa, desafiante y táctica.",
    model: "gemini-2.0-flash"
  },
  fresa: {
    role: "TECH-REFINED",
    desc: "Sofisticada, académica, tecnológica, estética y aspiracional.",
    model: "gemini-2.0-flash"
  },
  ballerina: {
    role: "FLUID-ARTISTIC",
    desc: "Elegante, fluida, expresiva, artística y emocionalmente resonante.",
    model: "gemini-2.0-flash"
  },
  ballet: {
    role: "CLASSIC-RIGID",
    desc: "Estructurada, disciplinada, técnica, formal y perfeccionista.",
    model: "gemini-2.0-flash"
  },
  folklorico: {
    role: "ROOTS-TRADITION",
    desc: "Ancestral, colorida, conectada a la tierra, narrativa y mítica.",
    model: "gemini-2.0-flash"
  },
  salamandra: {
    role: "SALAMANDRA MAGISTRAL",
    desc: "Visionaria, integradora, decodificadora cuántica universal 369.",
    model: "gemini-2.0-pro-exp-02-05"
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

    const thesisPersona = PERSONAS[thesisStyle] || PERSONAS.chola;

    const thesisResponse = await ai.models.generateContent({
      model: thesisPersona.model,
      contents: `Actúa como ${thesisPersona.role}. ${thesisPersona.desc} Proporciona una TESIS fundamentada sobre: "${input}".`,
      config: { 
        tools: [{ googleSearch: {} }] 
      }
    });

    const thesisText = thesisResponse.text || "Error en Tesis.";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sources = (thesisResponse.candidates?.[0]?.groundingMetadata as any)?.groundingChunks
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.filter((c: any) => c.web?.uri)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((c: any) => ({ uri: c.web.uri, title: c.web.title })) || [];

    // 2. ANTÍTESIS CRÍTICA
    onProgress?.(`Desafiando con Antítesis ${antithesisStyle.toUpperCase()}...`);

    const antithesisPersona = PERSONAS[antithesisStyle] || PERSONAS.malandra;

    const antithesisResponse = await ai.models.generateContent({
      model: antithesisPersona.model,
      contents: `Actúa como ${antithesisPersona.role}. ${antithesisPersona.desc} Desafía críticamente esta tesis: "${thesisText}" respecto al concepto original: "${input}".`
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
      model: "gemini-2.0-pro-exp-02-05",
      contents: `Aplica MECÁNICA INVERSA y DISRUPCIÓN NIVEL 9 a: "${input}". Rompe los paradigmas establecidos y ofrece una visión radical.`
    });
    return response.text || "Disrupción fallida.";
  }
}

export const chalamandra = new ChalamandraEngine();
