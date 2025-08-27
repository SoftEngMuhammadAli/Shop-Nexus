import Subscriber from "../models/NewsLetter.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe user to newsletter
 * @access  Protected (or make it public if you don’t want auth)
 */
export const subscribeToNewsLetter = catchAsyncHandler(async (req, res) => {
  const { email } = req.body;

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
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json({ success: true, subscribers });
});
