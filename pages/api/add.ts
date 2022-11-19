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
    datapointId = await addBeeminderPost(comment, request.body.auth_token);
  } catch (e) {
    console.log(e, comment);
    return response.status(500).json({ status: "error" });
  }

  addMastodonPost(datapointId, articleData);

  response.status(200).json({ status: "ok" });
}

async function addBeeminderPost(comment: string, authToken: string): Promise<string> {
  const resource = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${authToken}&value=1&comment=${comment}`,
    {
      method: "POST",
    }
  );

  const json = await resource.json();
  return json.id as string;
}

function addMastodonPost(datapointId: string, data: any) {
  if (!datapointId || !process.env.MASTODON_INSTANCE || !process.env.MASTODON_SECRET) {
    console.debug("Missing datapoint id or env (mastodon instance or secret)");
    return;
  }
  fetch(`https://${process.env.MASTODON_INSTANCE}/api/v1/statuses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MASTODON_SECRET}`,
    },
    body: JSON.stringify({
      status: `New article with rating ${data.rating}: ${process.env.BASE_URL}/articles/${datapointId}`,
    }),
  });
}
