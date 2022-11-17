import articles from "../../data.json";
import { Article, ArticleTitle, TagsList, Time, Button, Rating } from "../../components/components";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import Link from "next/link";

export default function ArticlePage({ article }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{publicRuntimeConfig.title + " - " + article.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={publicRuntimeConfig.description + " - " + article.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link href={"/"}>
          <h3>{publicRuntimeConfig.title}</h3>
        </Link>
        <Article key={article.id}>
          {article.rating && <Rating rating={article.rating} />}
          <header>
            <small>
              <a href={`/articles/${article.id}`}>
                <Time timestamp={article.timestamp} />
              </a>
            </small>
            <Link href={`/articles/${article.id}`}>
              <ArticleTitle>{article.title}</ArticleTitle>
            </Link>
          </header>
          <div>{article.content}</div>
          <TagsList tags={article.tags} />
          <Button
            onClick={() => {
              const url = new URL(window.location.href);
              url.pathname = `/articles/${article.id}`;
              navigator.clipboard.writeText(url.toString());
            }}
          >
            Copy URL
          </Button>
          {article.title.startsWith("http") && (
            <a href={article.title} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "5px" }}>
              <Button>Visit source</Button>
            </a>
          )}
        </Article>
      </main>
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
