import { GoogleGenAI } from "@google/genai";

export const getMotivationalPhrase = async (practiceName: string): Promise<string> => {
  // На GitHub Pages process.env.API_KEY обычно не прокидывается без спец. настроек, 
  // поэтому используем список отличных фраз как запасной вариант.
  const fallbacks = [
    "Ты делаешь огромный вклад в свое будущее!",
    "Твое тело наполняется силой и здоровьем!",
    "Каждый шаг приближает тебя к идеальному состоянию.",
    "Прекрасный выбор! Продолжай в том же духе.",
    "Чистая энергия и гармония теперь внутри тебя.",
    "Дисциплина — это путь к свободе и здоровью!",
    "Твой организм благодарит тебя за эту заботу."
  ];

  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "YOUR_API_KEY") {
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Напиши одну очень короткую (до 7 слов) и вдохновляющую фразу на русском языке для человека, который выполнил задачу: "${practiceName}". Будь позитивным и энергичным. Без кавычек.`,
    });
    
    return response.text?.trim() || fallbacks[0];
  } catch (error) {
    console.error("Gemini Error:", error);
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};