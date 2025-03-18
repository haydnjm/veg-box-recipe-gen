import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";
import { Recipe } from "../../schemas.js";

interface RecipeEmailProps {
  recipes: Recipe[];
}

export const RecipeEmail = ({ recipes }: RecipeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your recipes for this week</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>This week's recipes</Heading>

        {recipes.map((recipe, index) => (
          <div key={index} style={recipeCard}>
            {recipe.image && (
              <Img
                src={recipe.image}
                width="100%"
                height="auto"
                alt={recipe.name}
                style={recipeImage}
              />
            )}
            <div style={recipeContent}>
              <Heading as="h2" style={h2}>
                {recipe.name}
              </Heading>
              <Link href={`https://haydnjm.com`} target="_blank" style={link}>
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </Body>
  </Html>
);

RecipeEmail.PreviewProps = {
  recipes: [
    {
      name: "Roasted Vegetable and Halloumi Traybake with Lemon-Herb Dressing",
      image:
        "http://localhost:54321/storage/v1/object/public/recipe-images/2025-02-25-roasted-vegetable-and-halloumi-traybake-with-lemon-herb-dressing.webp",
    },
    {
      name: "Pumpkin and Spinach Risotto",
      image:
        "http://localhost:54321/storage/v1/object/public/recipe-images/2025-02-25-pumpkin-and-spinach-risotto.webp",
    },
    {
      name: "Endive and Apple Salad with Walnuts and Mustard Vinaigrette",
      image:
        "http://localhost:54321/storage/v1/object/public/recipe-images/2025-02-25-endive-and-apple-salad-with-walnuts-and-mustard-vinaigrette.webp",
    },
  ],
} as RecipeEmailProps;

export default RecipeEmail;

const main = {
  backgroundColor: "#f7f7f7",
  fontFamily: "Georgia, serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const h1 = {
  color: "#2c3e50",
  fontSize: "32px",
  fontWeight: "normal",
  textAlign: "center" as const,
  margin: "40px 0",
};

const h2 = {
  color: "#2c3e50",
  fontSize: "24px",
  fontWeight: "normal",
  margin: "0 0 15px",
};

const recipeCard = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "30px",
  overflow: "hidden",
};

const recipeImage = {
  display: "block",
  width: "100%",
  height: "auto",
};

const recipeContent = {
  padding: "20px",
};

const link = {
  color: "#e67e22",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
};
