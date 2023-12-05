import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing PAS Framework API Endpoint");
  const { product_desc_raw, productName, tone_of_voice } =await req.json();

  const prompt = `
      Product Name: ${productName}
      Product Description: ${product_desc_raw}
      Tone of Voice: ${tone_of_voice}
      
      Using the PAS (Problem-Agitate-Solution) framework, write content for the marketing of the product. First, identify a problem that the target audience faces, then agitate that problem by highlighting its pain points or consequences, and finally present the product as the solution, using the raw description and specified tone of voice.      `;
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
 