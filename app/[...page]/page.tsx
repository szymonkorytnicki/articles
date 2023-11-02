import Link from "next/link";
import { getArticles } from "../../utils/articles";
import { Pagination } from "../../components/pagination/pagination";

export default async function Page({ params }) {
  const page = getPage(params);
  const { articles, total } = await getArticles({
    page,
  });

  return (
    <div>
      <div>Articles that I was reading recently</div>
      <Pagination page={page} total={total} />
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
      <Pagination page={page} total={total} />
    </div>
  );
}

function getPage(params) {
  if (!params?.page) {
    return 1;
  }

  const [page] = params?.page;
  return parseInt(page);
}
