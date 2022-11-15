import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const comment = JSON.stringify({
    title: request.headers["title"] || "",
    tags: request.headers["tags"] || "",
    content: request.headers["content"] || "",
    rating: request.headers["rating"] || "",
    category: request.headers["category"] || "",
  });

  try {
    const resource = await fetch(
      `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${request.headers["auth_token"]}&value=1&comment=${comment}`,
      {
        method: "POST",
      }
    );

    await resource.json();
  } catch (e) {
    console.log(e);
    response.status(500).json({ status: "error" });
  }

  response.status(200).json({ status: "ok" });
}
