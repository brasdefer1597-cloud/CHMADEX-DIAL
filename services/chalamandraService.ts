import { GoogleGenAI } from "@google/genai";
import { DialecticalState, DialecticStyle, CapabilityStatus } from "../types";

// Dynamic API Key from environment
// Using a lazy initializer to avoid immediate crash in environments without key
const getAI = () => {
  const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
  if (!API_KEY) {
     console.warn("No API Key found for Gemini AI");
     // In extension context, we might not have it yet or it might be in storage
     return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

let _ai: any = null;
const ai = () => {
  if (!_ai) _ai = getAI();
  return _ai;
};

const PERSONAS = {
  chola: {
    role: "BARRIO-ROOT",
    desc: "Directa, cruda, basada en la realidad urbana, auténtica.",
    model: "gemini-1.5-flash"
  },
  malandra: {
    role: "ESTRATEGIA-SURVIVAL",
    desc: "Astuta, crítica, adaptativa, desafiante y táctica.",
    model: "gemini-1.5-flash"
  },
  fresa: {
    role: "TECH-REFINED",
    desc: "Sofisticada, académica, tecnológica, estética y aspiracional.",
    model: "gemini-1.5-flash"
  },
  salamandra: {
    role: "SALAMANDRA MAGISTRAL",
    desc: "Visionaria, integradora, decodificadora cuántica universal 369.",
    model: "gemini-1.5-pro"
  }
};

export class ChalamandraEngine {
  private localSession: any = null;

  async checkCapabilities(): Promise<CapabilityStatus> {
    const status: CapabilityStatus = {
      languageModel: 'cloud',
      summarizer: 'cloud'
    };

    if (typeof window !== 'undefined' && (window as any).ai?.languageModel) {
      try {
        const capabilities = await (window as any).ai.languageModel.capabilities();
        if (capabilities.available !== 'no') {
          status.languageModel = 'local';
        }
      } catch (e) {
        console.warn("Local AI check failed", e);
      }
    }

    return status;
  }

  private async getLocalSession() {
    if (this.localSession) return this.localSession;
    if (typeof window !== 'undefined' && (window as any).ai?.languageModel) {
      try {
        this.localSession = await (window as any).ai.languageModel.create({
          systemPrompt: "Eres Chalamandra, una IA híbrida que opera en el borde de la realidad."
        });
        return this.localSession;
      } catch (e) {
        console.error("Failed to create local session", e);
      }
    }
    return null;
  }

  async runDialectic(
    input: string, 
    thesisStyle: DialecticStyle,
    antithesisStyle: DialecticStyle,
    onProgress?: (msg: string) => void
  ): Promise<DialecticalState> {
    
    const engine = ai();
    if (!engine) throw new Error("AI engine not available. Check API Key.");

    // 1. TESIS
    onProgress?.(`Sincronizando Tesis ${thesisStyle.toUpperCase()}...`);
    const thesisResponse = await engine.getGenerativeModel({
      model: PERSONAS[thesisStyle].model,
      tools: [{ googleSearchRetrieval: {} }] as any
    }).generateContent(`Actúa como ${PERSONAS[thesisStyle].role}. ${PERSONAS[thesisStyle].desc} Proporciona una TESIS fundamentada sobre: "${input}".`);

    const thesisText = thesisResponse.response.text() || "Error en Tesis.";
    const sources = thesisResponse.response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((c: any) => c.web?.uri)
      .map((c: any) => ({ uri: c.web.uri, title: c.web.title })) || [];

    // 2. ANTÍTESIS
    onProgress?.(`Desafiando con Antítesis ${antithesisStyle.toUpperCase()}...`);
    const antithesisResponse = await engine.getGenerativeModel({ model: PERSONAS[antithesisStyle].model })
      .generateContent(`Actúa como ${PERSONAS[antithesisStyle].role}. ${PERSONAS[antithesisStyle].desc} Desafía críticamente esta tesis: "${thesisText}" respecto al concepto original: "${input}".`);

    const antithesisText = antithesisResponse.response.text() || "Error en Antítesis.";

    // 3. SÍNTESIS
    onProgress?.("Decodificando Síntesis Salamandra...");

    let synthesisText = "";
    const localSession = await this.getLocalSession();

    if (localSession) {
      try {
        onProgress?.("Utilizando IA Nano Local para Síntesis...");
        synthesisText = await localSession.prompt(
          `Como ${PERSONAS.salamandra.role}, fusiona la Tesis ("${thesisText}") and la Antítesis ("${antithesisText}") in a resolution magistral and visionaria para: "${input}".`
        );
      } catch (e) {
        console.error("Local synthesis failed, falling back to cloud", e);
      }
    }

    if (!synthesisText) {
      const synthesisResponse = await engine.getGenerativeModel({ model: PERSONAS.salamandra.model })
        .generateContent(`Como ${PERSONAS.salamandra.role}, fusiona la Tesis ("${thesisText}") y la Antítesis ("${antithesisText}") en una resolución magistral y visionaria para: "${input}".` );
      synthesisText = synthesisResponse.response.text() || "Error en Síntesis.";
    }

    return {
      thesis: thesisText,
      thesisSources: sources,
      antithesis: antithesisText,
      synthesis: synthesisText,
      energySignature: `${thesisStyle.slice(0,2)}-${antithesisStyle.slice(0,2)}-369-${localSession ? 'NANO' : 'CLOUD'}`
    };
  }

  async generateDisruption(input: string): Promise<string> {
    const engine = ai();
    if (!engine) throw new Error("AI engine not available. Check API Key.");
    const response = await engine.getGenerativeModel({ model: "gemini-1.5-pro" })
      .generateContent(`Aplica MECÁNICA INVERSA y DISRUPCIÓN NIVEL 9 a: "${input}". Rompe los paradigmas establecidos y ofrece una visión radical.`);
    return response.response.text() || "Disrupción fallida.";
  }
}

export const chalamandra = new ChalamandraEngine();
