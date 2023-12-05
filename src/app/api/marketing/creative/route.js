import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the Marketing Creative Story API Endpoint");
  const { plot, tone_of_voice } = await req.json();

  const prompt = `
    Plot Details: ${plot}
    Tone of Voice: ${tone_of_voice}

    Create an engaging and creative marketing story based on the provided plot details. The story should be crafted in a way that captivates the audience, effectively incorporates the plot elements, and aligns with the specified tone of voice. The narrative should be compelling and suitable for marketing a product.
    `;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });
    console.log(response);
    const productDescription = response.choices[0].message.content;
    return NextResponse.json({ description: productDescription });
  } catch (error) {
    console.error("Error in generating product description:", error);
    return NextResponse.json({ message: "Failed to generate creative story",error },{status:500});
  }
}
 