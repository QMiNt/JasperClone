import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing Questions API Endpoint");
  const { topic, target_audience, tone_of_voice } = await req.json();

  const prompt = `
      Topic: ${topic}
      Target Audience: ${target_audience}
      Tone of Voice: ${tone_of_voice}
      
      Create three engaging and creative questions for marketing purposes. These questions should be closely related to the topic and be single line questions, tailored to appeal to the target audience, and reflect the specified tone of voice.
      `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    console.log(response);
    const productDescription = response.choices[0].message.content;
    return NextResponse.json({ description: productDescription });
  } catch (error) {
    console.error("Error in generating product description:", error);
    return NextResponse.json({ message: "Failed to generate product description",error },{status:500});
  }
}
 