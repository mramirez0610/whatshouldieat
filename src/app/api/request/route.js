import { OpenAI } from "openai";
import "dotenv/config";

export async function GET() {
  return new Response(JSON.stringify({ message: "api is working!" }), {
    status: 200,
  });
}

export async function POST(req) {
  try {
    const { ingredients } = await req.json();
    console.log("received request body:", ingredients);

    if (!ingredients) {
      return new Response(
        JSON.stringify({ error: "input is required" }, { status: 400 })
      );
    }

    const ingredientList = ingredients
      .map((ing) => `${ing.value} (preference: ${ing.pref})`)
      .join(", ");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `i would like to make a recipe containing the following. the list will have an item, as well as how much i like that item.", ${ingredientList}`,
        },
      ],
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error calling openai:", error);

    return new Response(
      JSON.stringify(
        { error: "failed to fetch response from openai" },
        { status: 500 }
      )
    );
  }
}
