import axios from "axios";
import FormData from "form-data";

// const dishName = "Pumpkin and parsnip fritters";
// const dishDescription =
//   "spiced with warming cinnamon and ginger, served with a dollop of tangy crème fraîche and a sprinkle of fresh chives";
// const freshIngredients = "cilantro and avocado";
// const fileRootName = "./images/pumpkin-and-parsnip-fritters";

export async function createImage(
  name: string,
  prompt: string
): Promise<Uint8Array> {
  // First check that the name is valid
  const sanitizedName = name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (!sanitizedName) {
    throw new Error(
      "Invalid file name - must contain some alphanumeric characters"
    );
  }

  const payload = {
    prompt,
    output_format: "webp",
  };

  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
    axios.toFormData(payload, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "image/*",
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
  }
}
