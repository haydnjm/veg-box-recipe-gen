import "dotenv/config";

import { createRecipes } from "./recipes.js";
import { sendRecipeEmail } from "./emails/index.js";

export const sendRecipeEmails = async (): Promise<void> => {
  try {
    const recipes = await createRecipes();

    if (!recipes || recipes.length === 0) {
      console.log("No recipes generated...");
      return;
    }

    await sendRecipeEmail(recipes);
  } catch (error) {
    console.error("Function failed:", error);
    throw error;
  }
};

sendRecipeEmails();
