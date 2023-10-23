import Link from "next/link";
import { getArticle } from "../../utils/articles";

export async function Post({ id }: { id: string }) {
  const article = await getArticle(id);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <Link target="_blank" href={article.link}>
        Visit
      </Link>
    </div>
  );
}
