import { createClient } from "@supabase/supabase-js";
import { Database } from "../models/types.js";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_API_KEY || ""
);
