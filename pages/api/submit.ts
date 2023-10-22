import { NextApiRequest, NextApiResponse } from "next/types";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { addBeeminderPost } from "../../utils/beeminder";

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Env vars missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const articleData = {
    title: request.body.title || "",
    tags: request.body.tags || "",
    content: request.body.content || "",
    rating: request.body.rating || "",
    category: request.body.category || "",
  };
  const comment = JSON.stringify(articleData);

  let datapointId = "";

  try {
    datapointId = await addBeeminderPost(comment);
  } catch (e) {
    console.log("[Add datapoint]", e, comment);
    return response.status(500).json({ status: "error" });
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        We write a web development blog sharing interesting articles. 
        ---
        Based on following tags: ${articleData.tags}
        and link url: ${articleData.title} 
        and my quick note: ${articleData.content}
        prepare a nice, concise, interesting JSON of following fields: title, description (under 100 words), tags
        `,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const openaiSuggestion = JSON.parse(chatCompletion?.choices[0]?.message?.content || "{}");
  const r = {
    link: articleData.title,
    content: articleData.content,
    description: openaiSuggestion.description,
    created_at: new Date(),
    tags: openaiSuggestion.tags.join(","),
    title: openaiSuggestion.title,
    rating: articleData.rating || undefined,
  };
  console.log({ r });

  const { error } = await supabase.from("articles").insert([r]).select();
  if (error) {
    console.log(error);
  }
  return response.status(200).json({ status: "ok" });
}
