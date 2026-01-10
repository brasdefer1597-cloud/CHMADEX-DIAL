# Chalamandra QuantumMind v4.1.0

### Dialectical AI Engine: Chola | Malandra | Fresa | Salamandra

Chalamandra es una extensión de Chrome de alto rendimiento que utiliza la **API de Gemini 3** para procesar la realidad a través de una tríada dialéctica. No solo responde; decodifica la información mediante una Tesis (con búsqueda en Google), una Antítesis crítica y una Síntesis magistral.

---

## 🏗️ Arquitectura del Sistema
El siguiente diagrama detalla cómo los componentes que hemos verificado interactúan entre sí:

```mermaid
graph TD
    User((Usuario)) -->|Selección/Input| Popup[App.tsx]
    Popup -->|Llamada de Servicio| Engine[ChalamandraEngine]

    subgraph Google_Cloud
        Engine -->|Grounding Search| G3F[Gemini 3 Flash: Tesis]
        Engine -->|Análisis Crítico| G3F2[Gemini 3 Flash: Antítesis]
        Engine -->|Resolución| G3P[Gemini 2.5 Pro: Síntesis]
    end

    G3P -->|Resultado 369| Popup
    Popup -->|Render| User

    style Popup fill:#9D4EDD,color:#fff
    style Engine fill:#2EC4B6,color:#fff
    style G3P fill:#FF6B35,color:#fff
```
