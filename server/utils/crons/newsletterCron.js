import cron from "node-cron";
import nodemailer from "nodemailer";
import Subscriber from "../../models/NewsLetter.js";
import dotenv from "dotenv";

dotenv.config();

// Setup transporter (example using Gmail, you can switch to SMTP/provider)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Cron Job → Runs every day at 08:15 AM
cron.schedule("15 8 * * *", async () => {
  try {
    console.log("⏰ Running newsletter cron job at 08:15 AM...");

    const subscribers = await Subscriber.find({});
    if (!subscribers.length) {
      console.log("No subscribers found, skipping email job.");
      return;
    }

    const emails = subscribers.map((s) => s.email);

    // Example: send one email to all subscribers (BCC to hide emails)
    const newsletterContent = `
      <h1>Hello Subscribers!</h1>
      <p>This is your daily newsletter at 08:15 AM 🎉</p>
      <h2>Today's Essay: The Importance of E-Commerce in Modern Society</h2>
      <p>
        E-commerce has revolutionized the way people shop and conduct business. In the digital age, online platforms provide convenience, accessibility, and a wide range of choices for consumers. Businesses benefit from reaching a global audience, reducing operational costs, and leveraging data analytics to improve customer experience.
      </p>
      <p>
        The growth of e-commerce has also led to innovations in payment systems, logistics, and customer service. As technology continues to evolve, e-commerce will remain a vital part of the economy, shaping the future of retail and entrepreneurship.
      </p>
      <p>
        Thank you for subscribing to our newsletter. Stay tuned for more insights and updates!
      </p>
    `;

    await transporter.sendMail({
      from: `"ShopNexus - Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      bcc: emails,
      subject: "Daily Newsletter 📰",
      html: newsletterContent,
    });

    console.log(`✅ Newsletter sent to ${emails.length} subscribers.`);
  } catch (err) {
    console.error("❌ Error in newsletter cron job:", err);
  }
});
