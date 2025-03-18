import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  unit: z.string(),
});

export const RecipeSchema = z.object({
  id: z.number().optional(),
  createdAt: z.date().optional(),
  name: z.string(),
  description: z.string(),
  mainIngredients: z.string(),
  ingredients: z.array(IngredientSchema),
  instructions: z.array(z.string()),
  image: z.string().optional(),
});

export const RecipesSchema = z.array(RecipeSchema);

export type Recipe = z.infer<typeof RecipeSchema>;
