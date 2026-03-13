import Tesseract from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';

async function analyzeImage(filePath: string) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      filePath,
      'por', // Portuguese
      { logger: m => {} }
    );
    console.log(`\n--- OCR for ${path.basename(filePath)} ---`);
    console.log(text.substring(0, 500)); // Print first 500 chars to see the tab names
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  const dir = "public/screenshots/byte";
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".png")).sort();
  
  for (const file of files) {
    await analyzeImage(path.join(dir, file));
  }
}

main().catch(console.error);
