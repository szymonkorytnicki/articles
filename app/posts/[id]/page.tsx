import Link from "next/link";
import { getArticle } from "../../../utils/articles";
export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <Link href={article.link}>Visit</Link>
    </div>
  );
}
