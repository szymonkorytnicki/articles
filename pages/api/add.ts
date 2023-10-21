import { NextApiRequest, NextApiResponse } from "next/types";
import { addBeeminderPost } from "../../utils/beeminder";

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

  response.status(200).json({ status: "ok" });
}
