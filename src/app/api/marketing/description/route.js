import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey:" 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",
});
export async function POST(req,res) {
  // console.log("sdfgfdg")
    console.log("Entered the Marketing Description API Endpoint");
    const { productName, product_desc_raw, tone_of_voice, target_audience } = await req.json();
  
    const prompt = `
      Product Name: ${productName}
      Raw Description: ${product_desc_raw}
      Tone of Voice: ${tone_of_voice}
      Target Audience: ${target_audience}
    
      Based on the information provided, craft a compelling product description for marketing purposes that aligns with the specified tone of voice and appeals to the target audience.
      `;
    console.log(prompt)
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
      return NextResponse.json({ message: "Error",error },{status:500});
    }
}
 