import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import User from "../models/userinfo.js";

dotenv.config();

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getRecommendation = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const prompt = `
      You are a professional health and fitness coach.
      User data: ${JSON.stringify(user)}.
      Greet user by name at the start, and tell them what to do and what to avoid.
      Consider their location and mention local foods when giving diet advice.
      Provide your advice divided into two main sections:
      1. Diet: 4 sections - Nutrition Focus, Meal Timing, Hydration, Healthy Habits.
      2. Exercise: 4 sections - Training Structure, Rest & Recovery, Cardio Routine, Form & Function.
      
      Format your response as *valid JSON only*, like this:
      {
        "diet": "write 3-5 bullet points for each diet category here...",
        "exercise": "write 3-5 bullet points for each exercise category here..."
      }
      Make sure this is valid JSON — do NOT include extra text or explanations outside JSON.
    `;

    // Send request to Gemini
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Safely extract text
    const resultText =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // ✅ Try to parse JSON correctly
    let resultJSON;
    try {
      resultJSON = JSON.parse(resultText);
    } catch (err) {
      console.warn("⚠️ Response not in JSON format. Attempting cleanup...");
      const cleaned = resultText
        .replace(/```json|```/g, "")
        .replace(/^[^{]*({[\s\S]*})[^}]*$/, "$1"); // extract JSON from text
      try {
        resultJSON = JSON.parse(cleaned);
      } catch {
        resultJSON = { diet: cleaned || "No structured data", exercise: cleaned || "No structured data" };
      }
    }

    res.json(resultJSON);
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to fetch recommendation" });
  }
};
