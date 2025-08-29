import cron from "node-cron";
import nodemailer from "nodemailer";
import DailyQuote from "../models/DailyQuote.js";
import Subscriber from "../models/NewsLetter.js";
import openai from "../utils/openaiClient.js";

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function generateAIQuote() {
  const prompt = `Generate one original motivational quote.
  Respond ONLY with JSON like this:
  {"text": "your quote here", "author": "author name"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(completion.choices[0].message.content.trim());
  } catch (err) {
    return { text: "Your potential is limitless.", author: "AI Wisdom" };
  }
}

// Cron → every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏰ Generating and sending today's AI quote...");

    const today = new Date().toISOString().split("T")[0];
    let quote = await DailyQuote.findOne({ date: today });

    if (!quote) {
      const newQuote = await generateAIQuote();
      quote = new DailyQuote({ ...newQuote, date: today });
      await quote.save();
    }

    const subscribers = await Subscriber.find({ active: true });
    if (!subscribers.length) return console.log("⚠️ No subscribers.");

    const emails = subscribers.map((s) => s.email);

    await transporter.sendMail({
      from: `"Daily Quotes" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      bcc: emails,
      subject: "🌟 Your Daily AI Quote",
      html: `
        <h2>"${quote.text}"</h2>
        <p>- ${quote.author}</p>
        <hr/>
        <small>You're receiving this because you subscribed to Daily Quotes.</small>
      `,
    });

    console.log(`✅ Daily AI quote sent to ${emails.length} subscribers.`);
  } catch (err) {
    console.error("❌ Error in daily AI quote cron job:", err);
  }
});
