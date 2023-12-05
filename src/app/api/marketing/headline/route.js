import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing Headline API Endpoint");
  const { productName, product_desc_raw, tone_of_voice, custom_avatar } = await req.json()

  const prompt = `
    Product Name: ${productName}
    Product Description: ${product_desc_raw}
    Tone of Voice: ${tone_of_voice}
    Custom Avatar: ${custom_avatar}

    Create a catchy and concise single-sentence headline for the product that encapsulates its essence, aligns with the specified tone of voice, and appeals to the product's intended audience.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });
    console.log(response);
    const productDescription = response.choices[0].message.content;
    return NextResponse.json({ description: productDescription });
  } catch (error) {
    console.error("Error in generating product description:", error);
    return NextResponse.json({ message: "Failed to generate product description",error },{status:500});
  }
}
 