import articles from "../../data.json";

export default function Article({ article }) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
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
