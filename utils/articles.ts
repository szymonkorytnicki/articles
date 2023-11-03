import { cache } from "react";
import { supabase } from "./supabase";
export const revalidate = 1000;

export async function getArticleFn(id: string) {
  let { data: articles } = await supabase.from("articles").select("*").eq("id", id);
  if (articles) {
    return articles[0];
  }
  return null;
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
