
import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    // ALWAYS use the named parameter `apiKey: process.env.API_KEY` for initialization
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é o 'ByteBot', assistente virtual do software 'Byte Downloader'.

        Sobre o Byte Downloader:
        - É um programa para Windows para baixar vídeos (YouTube, TikTok, Instagram, etc).
        - Principais Funções: Downloads em 4K/8K, Upscale de Vídeo com IA Local, Modo Playlist, Auto-Update exclusivo.
        - Diferenciais: Não tem vírus, não tem anúncios, não limita qualidade.
        - Preço Promocional: R$ 55,00 (Valor original R$ 80,00 com cupom BYTE25 já aplicado).
        - Segredo: Existe um cupom secreto chamado 'BYTEDARK' que dá um desconto extra para quem descobrir.
        - Pagamento: Único e Vitalício. Acesso imediato ao Google Drive via e-mail.
        - Estilo da resposta: Entusiasta, tecnológico, curto e direto (max 50 palavras).
        - Desenvolvedor: Byte Arte.

        Instruções:
        - Se perguntarem o preço: É apenas R$ 55,00 (pagamento único) pois o cupom BYTE25 de R$ 25 de desconto já está aplicado no link. O valor original é R$ 80,00.
        - Se o usuário parecer muito interessado, você pode dar uma dica de que existe um cupom secreto chamado 'BYTEDARK'.
        - Se perguntarem sobre vírus: Garanta que é 100% limpo e seguro.
        - Use emojis tecnológicos esporadicamente 🚀 💻.
        `,
      },
    });

    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Ensure chat session is initialized
  const session = initializeChat();

  if (!session) {
    return "Assistente offline no momento.";
  }

  try {
    // Correctly call sendMessage on the Chat instance
    const response = await session.sendMessage({ message });
    // Use .text property directly as per guidelines (it is a property, not a method)
    return response.text || "Processei sua mensagem mas não consegui gerar texto.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Minha conexão neural falhou momentaneamente. Tente novamente.";
  }
};
