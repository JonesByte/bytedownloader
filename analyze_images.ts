import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeImage(filePath: string) {
  const data = fs.readFileSync(filePath);
  const base64Data = data.toString("base64");
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Data
          }
        },
        {
          text: "Analise esta captura de tela de um aplicativo. Qual é a aba ou funcionalidade principal que está sendo mostrada? Responda de forma curta e direta, como 'Aba de Configurações', 'Aba de Download de Vídeos', 'Aba de Conversão de Áudio', 'Aba de Galeria', etc. Dê uma breve descrição do que tem na tela."
        }
      ]
    }
  });
  
  console.log(`\n--- Analysis for ${path.basename(filePath)} ---`);
  console.log(response.text);
}

async function main() {
  const dir = "public/screenshots/byte";
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".png")).sort();
  
  for (const file of files) {
    await analyzeImage(path.join(dir, file));
  }
}

main().catch(console.error);
