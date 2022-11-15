import articles from "../../data.json";

export default function Article({ article }) {
  return (
    <div>
      <h1>
        <a href={article.url}>{article.url}</a>
      </h1>
      <p>{article.description}</p>
      <small>#{article.tags.split(" ").join(" #")}</small>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = articles.map((article) => {
    return {
      params: {
        id: article.id.toString(),
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = articles.find((article) => article.id === params.id);

  return {
    props: {
      article,
    },
  };
}
