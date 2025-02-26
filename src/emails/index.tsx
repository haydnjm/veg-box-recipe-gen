import React from "react";
import { Resend } from "resend";
import { Recipe } from "../schemas.js";
import { RecipeEmail } from "./templates/recipes.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendRecipeEmail = async (recipes: Recipe[]) => {
  try {
    const res = await resend.emails.send({
      from: "Doosie <recipes@haydnjm.com>",
      to: "hello@haydnjm.com",
      subject: `This week's recipes 🍄 🥙 🥑 🍅`,
      react: <RecipeEmail recipes={recipes} />,
    });

    console.log(`Email sent successfully`, res.data);
  } catch (error) {
    console.error(`Failed to send email:`, error);
  }
};
