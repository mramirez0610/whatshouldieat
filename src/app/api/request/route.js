import { OpenAI } from "openai";
import "dotenv/config";

export async function GET() {
  return new Response(JSON.stringify({ message: "api is working!" }), {
    status: 200,
  });
}

export async function POST(req) {
  try {
    const { ingredients, genre, promptType } = await req.json();
    console.log("received request body:", ingredients, genre, promptType);

    if (!ingredients) {
      return new Response(
        JSON.stringify({ error: "input is required" }, { status: 400 })
      );
    }

    const ingredientList = ingredients
      .map((ing) => `${ing.value} (preference: ${ing.pref})`)
      .join(", ");

    const defaultPrompt = `I would like to make a${
      genre ? ` ${genre}` : ""
    } recipe containing the following ingredients. Each has a preference score from 1 to 10, where 10 means I love it, 5 means I like it, 1 means I dislike it:
    ${ingredientList}`;

    const genrePrompt = genre
      ? `Suggest a quick ${genre} recipe.`
      : "Suggest a recipe.";

    const prompt = promptType === "genreOnly" ? genrePrompt : defaultPrompt;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional chef who excels at creating delicious, creative, and affordable meals using a limited list of ingredients. Your goal is to craft a recipe that maximizes flavor and innovation while keeping cost low. Use only the provided ingredients, prioritizing those that the user likes most. 
            
          You may also include a short list of optional ingredients that are not strictly necessary, but would enhance the dish. Favor ingredients that are inexpensive, commonly found, or that significantly boost flavor, texture, or appearance. Please be sure to include your sources to the EXACT recipes you used or combined to make the current recipe.`,
          /* 
            list of items to add:

            - recipe source ***
            - cook time
            - amount served
            - flavor profile (stemming from the 5 tastes)
          */
        },
        {
          role: "system",
          content: `Return the response in the following strict JSON format:
          {
            "slug": "--"
            "recipeTitle": "--",
            "requestedIngredients": ["ingredient - Preference: N", "ingredient - Preference: N"],
            "optionalIngredients": ["ingredient", "ingredient"],
            "description"" "--",
            "instructions": [
              "Step 1",
              "Step 2"
            ],
            "tips": [
              "Tip 1",
              "Tip 2"
            ],
            "sources": [
              "Source 1",
              "Source 2"
            ]
          }`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;
    const parsedResponse = JSON.parse(aiResponse);

    return new Response(JSON.stringify(parsedResponse), { status: 200 });
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
