# Estrategia de Arquitectura y Escalabilidad: Chalamandra Magistral DecoX

## 1. Visión del Sistema
Chalamandra DecoX no es solo una extensión; es un **motor dialéctico distribuido**. La arquitectura ha sido diseñada para ser modular, permitiendo la integración de nuevos "Módulos de Personalidad" (Dialectic Styles) sin afectar el núcleo del procesamiento.

### Principios Fundamentales (SRAP)
- **S**calability (Escalabilidad): Arquitectura de componentes desacoplados.
- **R**eliability (Fiabilidad): Manejo de errores robusto y fallback a modelos estables.
- **A**daptability (Adaptabilidad): UI que responde al contexto del usuario.
- **P**erformance (Rendimiento): Carga diferida y optimización de assets.

## 2. Análisis Técnico

### Arquitectura de Frontend
Hemos migrado de un monolito en `App.tsx` a una estructura basada en **Atomic Design**:
- **Átomos**: Botones, Inputs, Iconos (Lucide).
- **Moléculas**: `DialecticControls`, `InputSection`.
- **Organismos**: `ResultsDisplay`, `Header`.
- **Hooks**: `useChalamandra` encapsula toda la lógica de negocio y estado.

**Beneficio**: Facilita el testing unitario y la reutilización de componentes en futuras versiones (ej. Panel Web, Mobile App).

### Motor de IA (Services)
El servicio `chalamandraService.ts` actúa como un **Proxy de Inteligencia**.
- Abstrae la complejidad de la API de Google Gemini.
- Implementa el patrón **Strategy** para manejar diferentes personalidades (Chola, Malandra, Fresa, Ballerina, etc.).
- Permite cambiar el modelo subyacente (ej. de `gemini-pro` a `gemini-ultra`) tocando una sola línea de configuración.

### Seguridad
- **Variables de Entorno**: Las API Keys se inyectan en tiempo de build (`Vite define`), no se commitean.
- **Sanitización**: Aunque no estamos renderizando HTML arbitrario inseguro, el uso de React protege contra XSS básico.
- **Permisos Mínimos**: El manifiesto V3 solicita solo lo necesario (`activeTab`, `storage`, `contextMenus`).

## 3. SEO y Visibilidad (Web Store)
Para maximizar la visibilidad en la Chrome Web Store:
- **Keywords**: "AI", "Dialectic", "Thinking Tool", "Gemini", "Philosophy".
- **Visuals**: Screenshots de alto contraste mostrando los modos Oscuro/Cuántico.
- **Descripción**: Enfocada en beneficios (Claridad mental, Decodificación) más que en features.

## 4. Próximos Pasos (Roadmap)

### Fase 1: Consolidación Visual (Inmediato)
- Definir paleta de colores específica para los nuevos módulos:
  - **Ballerina**: Rosas pálidos, transparencias.
  - **Ballet**: Blanco riguroso, negro, líneas finas.
  - **Folklórico**: Colores vibrantes (mexican pink, cempasúchil), patrones.

### Fase 2: Persistencia Cloud
- Implementar sincronización de historial con Firebase/Supabase para que el usuario acceda a sus decodificaciones desde cualquier dispositivo.

### Fase 3: Social & Share
- Generación de imágenes compartibles (Cards) con la síntesis para redes sociales.

## 5. Cuellos de Botella Potenciales
- **Latencia de API**: Las llamadas secuenciales (Tesis -> Antítesis -> Síntesis) suman tiempo.
  - *Solución*: Paralelizar Tesis y Antítesis (`Promise.all`), luego alimentar la Síntesis.
- **Límite de Tokens**: Textos muy largos pueden exceder la ventana de contexto.
  - *Solución*: Implementar un paso previo de "Resumen/Compresión" en el hook.
