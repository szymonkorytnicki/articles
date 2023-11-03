import { cache } from "react";
import { supabase } from "./supabase";

export const revalidate = 1000;

export async function getStatsFn() {
  let { data: articles } = await supabase.from("articles").select("created_at, rating, tags");

  const stats = articles?.reduce(
    (acc, curr) => {
      acc.hour[new Date(curr.created_at).getHours()] += 1;
      acc.rating[curr.rating] += 1;

      return acc;
    },

    {
      hour: Array(24).fill(0),
      rating: Array(11).fill(0),
    }
  );

  return stats;
}

export const getStats = cache(getStatsFn);
