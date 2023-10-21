import { NextApiRequest, NextApiResponse } from "next/types";
import { addBeeminderDatapoint, hasDatapointToday, hasIncreaseToday } from "../../utils/beeminder";

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

  if (!hasIncreaseToday(beeminderData.goals.find((g) => g.slug === data.slugFrom))) {
    return response.status(200).json({ status: "error" });
  }

  if (hasDatapointToday(beeminderData.goals.find((g) => g.slug === data.slugTo))) {
    return response.status(200).json({ status: "error" });
  }

  addBeeminderDatapoint(data.slugTo, "added from " + data.slugFrom);

  response.status(200).json({ status: "ok" });
}
