import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import articles from "../data.json";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Article } from "../components/components";

export default function Home({ articles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{publicRuntimeConfig.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={publicRuntimeConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>{publicRuntimeConfig.title}</h3>
        <div style={{ marginBottom: "40px" }}>{publicRuntimeConfig.description}</div>
        {articles.map((article) => {
          return (
            <Article key={article.id}>
              {article.rating && <Rating rating={article.rating} />}
              <header>
                <small>
                  <a href={`/articles/${article.id}`}>
                    <Time timestamp={article.timestamp} />
                  </a>
                </small>
                <h2>
                  <a href={`/articles/${article.id}`}>{article.title}</a>
                </h2>
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

export async function getStaticProps() {
  return {
    props: {
      articles,
    },
  };
}

function Time({ timestamp }) {
  const [state, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setState(true);
    }
  }, [router.isReady]);

  if (!state) {
    return <span>&nbsp;</span>;
  }
  return <time dateTime={new Date(timestamp * 1000).toISOString()}>{new Date(timestamp * 1000).toLocaleString()}</time>;
}

function Button({ children, onClick }) {
  return (
    <button
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TagsList({ tags }) {
  return (
    <div style={{ padding: "20px", paddingLeft: "0px" }}>
      {tags.split(" ").map((tag) => {
        return (
          <span
            key={tag}
            style={{
              padding: "5px",
              marginRight: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: 0.8 + "em",
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function Rating({ rating }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: getBackground(rating),
        color: "white",
        fontSize: "1.5rem",
        padding: "5px",
      }}
    >
      {rating}
    </div>
  );
}

function getBackground(rating) {
  if (rating < 3) {
    return "red";
  }
  if (rating < 5) {
    return "orange";
  }
  return "green";
}
