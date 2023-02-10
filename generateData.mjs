import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import fs from "fs";

async function fetchBeeminderDatapoints() {
  const res = await fetch(
    `https://www.beeminder.com/api/v1/users/${process.env.BEEMINDER_USERNAME}/goals/${process.env.BEEMINDER_GOAL}/datapoints.json?auth_token=${process.env.BEEMINDER_API_TOKEN}`
  );
  const data = await res.json();

  return data
    .map((datapoint) => {
      if (datapoint.comment.startsWith("#")) {
        return null;
      }
      const info = JSON.parse(datapoint.comment);

      return {
        id: datapoint.id,
        timestamp: datapoint.timestamp,
        title: info.title,
        tags: info.tags || "",
        rating: info.rating || "",
        content: info.content || "",
      };
    })
    .filter((x) => x);
}

function saveJSONToFileFs(data) {
  const json = JSON.stringify(data);
  fs.writeFileSync("data.json", json);
}

const data = await fetchBeeminderDatapoints();
saveJSONToFileFs(data);
