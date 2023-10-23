import Link from "next/link";
import { getArticles } from "../utils/articles";

export default async function Page() {
  const articles = await getArticles();

  return (
    <div>
      Articles that I was reading recently
      <>
        {articles?.map((article) => {
          return (
            <div key={article.id}>
              <Link href={`/posts/${article.id}`}>
                <h2>{article.title}</h2>
              </Link>
              <p>{article.description}</p>
              <p>Rating: {article.rating}</p>
              <p>Added: {article.created_at}</p>
            </div>
          );
        })}
      </>
    </div>
  );
}
