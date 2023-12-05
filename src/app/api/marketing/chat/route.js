import { NextResponse } from "next/server";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({ path: "./config.env" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req,res) {
  console.log("Entered the API Endpoint");
  const {
    productName,
    productDescription,
    targetAudience,
    toneOfVoice,
    brandIdentity,
    competitiveLandscape,
    pricePoint,
    distributionChannels,
    visualElements,
    desiredAction,
    legalComplianceInfo,
    culturalSensitivities,
  } = await req.json();

  const marketingPrompt = `Create a marketing angle for the following product:

        Product Name: ${productName}
        Product Description: ${productDescription}
        Target Audience: ${targetAudience}
        Tone of Voice: ${toneOfVoice}
        Brand Identity: ${brandIdentity}
        Competitive Landscape: ${competitiveLandscape}
        Price Point: ${pricePoint}
        Distribution Channels: ${distributionChannels}
        Visual Elements: ${visualElements}
        Desired Action: ${desiredAction}
        Legal and Compliance Information: ${legalComplianceInfo}
        Cultural Sensitivities: ${culturalSensitivities}

        Focus on highlighting the unique features and benefits of the product...`;
  console.log(marketingPrompt);
  try {
    console.log("Trying ");
    const chatResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: marketingPrompt }],
      model: "gpt-3.5-turbo-1106",
    });
    console.log(chatResponse);
    return NextResponse.json({ response: chatResponse.choices[0].message });
  } catch (error) {

   return NextResponse.json({ message: "Error",error },{status:500});
  }
}
 