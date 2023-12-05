import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing Unique Value Proposition API Endpoint");
  const { product_desc_raw, tone_of_voice } =await req.json();

  const prompt = `
    Product Description: ${product_desc_raw}
    Tone of Voice: ${tone_of_voice}
    
    Craft a unique value proposition for the product based on the product description provided. The UVP should be succinct, highlight the key benefits and features of the product, and be expressed in the specified tone of voice.
    `;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });
    console.log(response);
    const productDescription = response.choices[0].message.content;
    return NextResponse.json({ description: productDescription });
  } catch (error) {
    console.error("Error in generating product description:", error);
    return NextResponse.json({ message: "Failed to generate product description",error },{status:500});
  }
}
 