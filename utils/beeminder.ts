export async function addBeeminderPost(comment: string): Promise<string> {
  const resource = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${process.env.BEEMINDER_API_TOKEN}&value=1&comment=${comment}`,
    {
      method: "POST",
    }
  );

  const json = await resource.json();
  return json.id as string;
}

export async function addBeeminderDatapoint(goal, comment): Promise<string> {
  const resource = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${goal}/datapoints.json?auth_token=${process.env.BEEMINDER_API_TOKEN}&value=1&comment=${comment}`,
    {
      method: "POST",
    }
  );

  const json = await resource.json();
  return json.id as string;
}

export function hasDatapointToday(goalData) {
  const data = goalData.datapoints;
  const today = new Date();

  const beginningOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return data.some((d) => new Date(d.timestamp * 1000) >= beginningOfToday && d.value > 0);
}

export function hasIncreaseToday(goalData) {
  const data = goalData.datapoints;

  const today = new Date();
  const beginningOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const todayData = data.find((d) => new Date(d.timestamp * 1000) >= beginningOfToday);
  const yesterdayData = data.find((d) => new Date(d.timestamp * 1000) < beginningOfToday);

  if (!todayData || !yesterdayData) {
    return false;
  }

  return todayData.value > yesterdayData.value;
}
