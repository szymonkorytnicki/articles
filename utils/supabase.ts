import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Env vars missing");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
