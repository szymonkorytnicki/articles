import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import articles from "../../data.json";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Article, ArticleTitle, Description, Time, TagsList, Button, Rating } from "../../components/components";
import Link from "next/link";

export default function Home({ articles, tag }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{publicRuntimeConfig.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={publicRuntimeConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href={"/"}>
          <h3>{publicRuntimeConfig.title}</h3>
        </Link>
        <Description>
          {articles.length} {articles.length === 1 ? "article" : "articles"} tagged as #{tag}{" "}
        </Description>
        {articles.map((article) => {
          return (
            <Article key={article.id}>
              {article.rating && <Rating rating={article.rating} />}
              <header>
                <small>
                  <Link href={`/articles/${article.id}`}>
                    <Time timestamp={article.timestamp} />
                  </Link>
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
          );
        })}
      </main>

      <footer className={styles.footer}>
        <div>
          <a href="https://twitter.com/skorytnicki" target="_blank" rel="noopener noreferrer">
            Built with FOMO-BMDR by @skorytnicki
          </a>
        </div>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export function getStaticPaths() {
  const tags = articles.map((article) => article.tags.split(" ")).flat();
  return {
    paths: tags.map((tag) => {
      return {
        params: {
          id: tag,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      articles: articles.filter((article) => article.tags.includes(context.params.id)),
      tag: context.params.id,
    },
  };
}
