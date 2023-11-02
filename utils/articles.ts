// @ts-nocheck
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Env vars missing");
}

export const revalidate = 1000;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getArticleFn(id: string) {
  let { data: articles } = await supabase.from("articles").select("*").eq("id", id);
  return articles[0];
}

export const getArticle = cache(getArticleFn);

export async function getArticlesFn({ page }: { page: number }) {
  let { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * 10, (page - 1) * 10 + 10);

  let { count: total } = await supabase.from("articles").select("id", { count: "exact" });

  return { articles, total };
}

export const getArticles = cache(getArticlesFn);
