import DailyQuote from "../models/DailyQuote.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import openai from "../utils/openaiClient.js";

// Function to generate a new quote with OpenAI
async function generateAIQuote() {
  const prompt = `Generate one original motivational quote.
  Respond ONLY with JSON like this:
  {"text": "your quote here", "author": "author name"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // small, fast model
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const raw = completion.choices[0].message.content.trim();
    return JSON.parse(raw); // { text, author }
  } catch (err) {
    return {
      text: "Keep moving forward, no matter the obstacle.",
      author: "AI Wisdom",
    };
  }
}

// @route GET /api/quotes/today
// @desc Get today's quote (AI generates if missing)
// @access Public
export const getTodayQuote = catchAsyncHandler(async (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  let quote = await DailyQuote.findOne({ date: today });
  if (!quote) {
    const newQuote = await generateAIQuote();
    quote = new DailyQuote({ ...newQuote, date: today });
    await quote.save();
  }

  res.json({ success: true, quote });
});
