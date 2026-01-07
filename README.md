# Chalamandra QuantumMind

A dialectical quantum engine for synthesis and decoding, powered by Google's Generative AI.

## Features

- **Thesis/Antithesis/Synthesis**: Generates dialectical analysis.
- **Quantum Modes**: Chola, Malandra, Salamandra, etc.
- **Gemini Integration**: Uses Google's Gemini API.

## Local Development

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Build

To build the project for production:

```bash
npm run build
```

The output will be in the `dist` directory.

## Deployment (Vercel)

This project is ready to be deployed on Vercel.

1.  Push the code to a Git repository.
2.  Import the project in Vercel.
3.  Set the `GEMINI_API_KEY` in the Vercel project settings.
4.  Deploy.

## Browser Extension

This project also includes a manifest for a browser extension. The build output in `dist` contains `manifest.json` and the necessary assets.

- **Load unpacked**: Go to `chrome://extensions`, enable Developer Mode, and load the `dist` folder.
