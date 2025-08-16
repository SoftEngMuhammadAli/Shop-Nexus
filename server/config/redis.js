import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Ensure these are loaded from environment variables (e.g., using 'dotenv')
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

async function main() {
  // Set a key-value pair
  await redis.set("mykey", "hello from upstash");
  console.log("Key set successfully.");

  // Get a value
  let value = await redis.get("mykey");
  console.log("Retrieved value:", value);

  // Increment a counter
  await redis.incr("counter");
  let counterValue = await redis.get("counter");
  console.log("Counter value:", counterValue);
}

main().catch(console.error);
