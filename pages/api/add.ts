import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const comment = JSON.stringify({
    title: request.body.title || "",
    tags: request.body.tags || "",
    content: request.body.content || "",
    rating: request.body.rating || "",
    category: request.body.category || "",
  });

  try {
    const resource = await fetch(
      `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${request.body.auth_token}&value=1&comment=${comment}`,
      {
        method: "POST",
      }
    );

    await resource.json();
  } catch (e) {
    console.log(e, request.body);
    response.status(500).json({ status: "error" });
  }

  response.status(200).json({ status: "ok" });
}
