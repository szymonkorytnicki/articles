import { NextApiRequest, NextApiResponse } from "next/types";

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
    console.log(e, comment);
    return response.status(500).json({ status: "error" });
  }

  // Shhhh kid, want to integrate with 3rd party service here? Use IFTTT, Zapier or Make.com!

  response.status(200).json({ status: "ok" });
}

async function addBeeminderPost(comment: string): Promise<string> {
  const resource = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${process.env.BEEMINDER_API_TOKEN}&value=1&comment=${comment}`,
    {
      method: "POST",
    }
  );

  const json = await resource.json();
  return json.id as string;
}
