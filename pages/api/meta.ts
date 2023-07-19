import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const data = {
    slugFrom: request.query.slugFrom || "",
    slugTo: request.query.slugTo || "",
  };

  if (data.slugFrom === "" || data.slugTo === "") {
    return response.status(200).json({ status: "error" });
  }

  // get beeminder target goal, if has daapoint today, return error
  const beeminderData = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}.json?auth_token=${process.env.BEEMINDER_API_TOKEN}&datapoints_count=10&associations=true`
  ).then((d) => d.json());

  if (!hasDatapointToday(beeminderData.goals.find((g) => g.slug === data.slugFrom))) {
    return response.status(200).json({ status: "error" });
  }

  if (hasDatapointToday(beeminderData.goals.find((g) => g.slug === data.slugTo))) {
    return response.status(200).json({ status: "error" });
  }

  addBeeminderDatapoint(data.slugTo, "added from " + data.slugFrom);

  response.status(200).json({ status: "ok" });
}

async function addBeeminderDatapoint(goal, comment): Promise<string> {
  const resource = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${goal}/datapoints.json?auth_token=${process.env.BEEMINDER_API_TOKEN}&value=1&comment=${comment}`,
    {
      method: "POST",
    }
  );

  const json = await resource.json();
  return json.id as string;
}

function hasDatapointToday(goalData) {
  const data = goalData.datapoints;
  const today = new Date();

  const beginningOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return data.some((d) => new Date(d.timestamp * 1000) >= beginningOfToday && d.value > 0);
}
