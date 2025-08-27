import Subscriber from "../models/NewsLetter.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import { redis } from "../utils/redisClient.js";

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe user to newsletter
 * @access  Public (change to protected if you want auth)
 */
export const subscribeToNewsLetter = catchAsyncHandler(async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  // Check if already subscribed
  const existing = await Subscriber.findOne({ email });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "Email already subscribed" });
  }

  // Save new subscriber
  const subscriber = new Subscriber({ email });
  await subscriber.save();

  // Invalidate cache so next GET fetches fresh data
  await redis.del("subscribers");

  return res
    .status(201)
    .json({ success: true, message: "Subscribed successfully!" });
});

/**
 * @route   GET /api/newsletter/all
 * @desc    Get all subscribers (admin only)
 * @access  Private/Admin
 */
export const getAllSubscribers = catchAsyncHandler(async (req, res) => {
  // Try cache first
  const cached = await redis.get("subscribers");

  if (cached) {
    return res.json({
      success: true,
      source: "cache",
      subscribers: JSON.parse(cached),
    });
  }

  // If not cached, fetch from DB
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });

  // Store in cache for next time (set TTL = 1 hour)
  await redis.set("subscribers", JSON.stringify(subscribers), { ex: 3600 });

  res.json({
    success: true,
    source: "db",
    subscribers,
  });
});
