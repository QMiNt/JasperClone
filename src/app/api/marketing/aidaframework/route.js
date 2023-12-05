import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing AIDA Framework API Endpoint");
  const { productName, product_desc_raw, tone_of_voice } = await req.json();

  const prompt = `
    Product Name: ${productName}
    Raw Product Description: ${product_desc_raw}
    Tone of Voice: ${tone_of_voice}

    Create a marketing message for the product using the AIDA (Attention, Interest, Desire, Action) framework. Start by grabbing the audience's attention, then generate interest in the product, followed by creating a desire by highlighting its unique features and benefits, and conclude with a call to action, all while maintaining the specified tone of voice.
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
 