import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import User from '../models/userinfo.js';

dotenv.config();

// Initialize Gemini client
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

export const getRecommendation = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const prompt = `
      You are a professional health and fitness coach.
      User data: ${JSON.stringify(user)}.
      call user's name in between..for personal touch(or greet )
      Alo focus on location ....only suggest food that present that particular location you can use name of that location in response
      Provide advice divided into two sections:
      1. Diet: 4 sections - Nutrition Focus, Meal Timing, Hydration, Healthy Habits
      2. Exercise: 4 sections - Training Structure, Rest & Recovery, Cardio Routine, Form & Function
      
      Format strictly as JSON:
      {
        "diet": "...",
        "exercise": "..."
      }

      give only 3-5 point of each diet and exercise
    `;

    // Call Gemini API
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: prompt,
    });

    const resultText = response.text;

    let resultJSON;
    try {
      resultJSON = JSON.parse(resultText);
    } catch {
      resultJSON = { diet: resultText, exercise: resultText };
    }

    res.json(resultJSON);
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch recommendation' });
  }
};
