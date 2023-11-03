import { getStats } from "../../utils/stats";

export default async function Page() {
  const { rating, hour } = await getStats();
  return (
    <>
      <div>
        {rating.map((count, index) => {
          return (
            <div key={index}>
              Rating {index}: {count}
            </div>
          );
        })}
      </div>
      <div>
        {hour.map((count, index) => {
          return (
            <div key={index}>
              Hour {index}: {count}
            </div>
          );
        })}
      </div>
    </>
  );
}
