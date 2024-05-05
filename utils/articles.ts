import { supabase } from "./supabase";

export async function getArticle(id: string) {
  let { data: articles } = await supabase.from("articles").select("*").eq("id", id);
  if (articles) {
    return articles[0];
  }
  return null;
}

export async function getArticles({ page }: { page: number }) {
  let { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * 10, (page - 1) * 10 + 10);

  let { count: total } = await supabase.from("articles").select("id", { count: "exact" });

  return { articles, total };
}
