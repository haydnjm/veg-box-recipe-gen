import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { Recipe, RecipesSchema } from "./schemas.js";
import { supabase } from "./clients/supabase.js";
import { createImage } from "./images.js";
import dayjs from "dayjs";

const gemini2_0_flash = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const storageBucket =
  process.env.STORAGE_BUCKET ||
  (() => {
    throw new Error("STORAGE_BUCKET is required");
  })();

async function generateRecipeData(): Promise<Recipe[]> {
  // When testing just return the latest 3 recipes from the database
  const previousRecipes = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  try {
    const recipeSession = gemini2_0_flash
      .getGenerativeModel({
        model: "gemini-2.0-flash",
      })
      .startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
        history: [],
      });

    const previousRecipeNames = previousRecipes.data
      ?.map((r) => `${r.name}`)
      .join(", ");

    console.log("Previous recipes: ", previousRecipeNames);

    const recipePrompt = `
Suggest 3 recipes which I can make for dinner this week. They should all be vegetarian. It's fine to have a little bit of dairy but it should be used sparingly. Try to suggest a mixture of cuisines from around the world. The preparation time can be anything up to 1h and each dish should serve 4 people. The output be JSON and should include:
- name: The name of the dish
- mainIngredients: A string with two or three fresh ingredients from the dish
- description: A 15 word description of what the dish looks like, making it sound tasty
- ingredients: An ingredients list, where each entry should contain a name, quantity and unit
- instructions: Instructions for preparing the dish

Last weeks recipes were ${previousRecipeNames}, so please suggest something different.
    `;

    const result = await recipeSession.sendMessage(recipePrompt);

    console.log("Recipe gen complete. Usage: ", result.response.usageMetadata);

    const resultText = result.response.text();

    const { data: recipes, error } = RecipesSchema.safeParse(
      JSON.parse(resultText)
    );

    if (error) {
      console.error("Error parsing recipes: ", error);
      return [];
    }

    console.log(
      `Created recipes for this week: ${recipes.map((r) => r.name).join(", ")}`
    );

    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createRecipes(): Promise<Recipe[]> {
  const recipes = await generateRecipeData();

  for (const recipe of recipes) {
    try {
      const image = await createImage(
        recipe.name,
        `A top-down view of freshly prepared ${recipe.name} plated in a traditional way. The dish is ${recipe.description}. Surrounding the dish are fresh ingredients like ${recipe.mainIngredients}, and other decorative items. The atmosphere is warm an cozy. The lighting is soft and natural, emphasizing the textures and colors of the food.`
      );

      const imageUrl = await saveRecipeImage(recipe, image);
      recipe.image = imageUrl;

      const res = await supabase
        .from("recipes")
        .update({ image: imageUrl })
        .eq("id", recipe.id!);

      if (res.error) {
        throw new Error(`Failed to update recipe: ${res.error?.message}`);
      }
    } catch (error) {
      console.error(`Failed to create image for ${recipe.name}: ${error}`);
    }
  }

  console.log("Successfully saved recipes to database");

  return recipes;
}

/**
 * Save the image for a recipe to supabase storage
 * @param recipe The recipe to save the image for
 */
async function saveRecipeImage(
  recipe: Recipe,
  image: Uint8Array
): Promise<string> {
  const fileName = `${dayjs(recipe.createdAt).format("YYYY-MM-DD")}-${recipe.name.toLowerCase().replace(/\s+/g, "-")}.webp`;
  const { error } = await supabase.storage
    .from("recipe-images")
    .upload(fileName, Buffer.from(image));

  if (error) {
    throw new Error(`Failed to upload image to storage: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(storageBucket).getPublicUrl(fileName);

  console.log(`Successfully uploaded image to: ${publicUrl}`);

  return publicUrl;
}
