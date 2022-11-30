import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import articles from "../data.json";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Description, Tag } from "../components/components";
import Link from "next/link";

export default function Stats({
  amount,
  amountLastMonth,
  amountLastWeek,
  mostPopularTags,
  amountLastYear,
  amountOfArticlesTwoMonthsAgo,
  amountOfArticlesTwoWeeksAgo,
  amountOfArticlesTwoYearsAgo,
}) {
  const weekDiff = amountLastWeek - amountOfArticlesTwoWeeksAgo;
  const monthDiff = amountLastMonth - amountOfArticlesTwoMonthsAgo;
  const yearDiff = amountLastYear - amountOfArticlesTwoYearsAgo;
  return (
    <div className={styles.container}>
      <Head>
        <title>{publicRuntimeConfig.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={publicRuntimeConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>
          <Link href="/">{publicRuntimeConfig.title}</Link>
        </h3>
        <Description>{publicRuntimeConfig.description}</Description>

        <div>
          <h3>Stats</h3>
          <p>Amount of articles: {amount}</p>
          <p>
            Amount of articles last week: {amountLastWeek} ({weekDiff > 0 ? "+" : ""}
            {weekDiff} compared to previous period)
          </p>
          <p>
            Amount of articles last month: {amountLastMonth} ({monthDiff > 0 ? "+" : ""}
            {monthDiff})
          </p>
          <p>
            Amount of articles last year: {amountLastYear} ({yearDiff > 0 ? "+" : ""}
            {yearDiff})
          </p>
          <p>
            Most popular tags:
            {mostPopularTags.map((tag) => {
              return (
                <Link href={`/tags/${tag[0]}`} key={tag[0]}>
                  <Tag>
                    #{tag[0]} ({tag[1]})
                  </Tag>
                </Link>
              );
            })}
          </p>
        </div>
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
      amount: articles.length,
      amountLastWeek: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 7);
      }).length,
      amountLastMonth: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 30);
      }).length,
      amountLastYear: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 365);
      }).length,
      mostPopularTags: Object.entries(
        articles
          .map((article) => article.tags.split(" "))
          .flat()
          .reduce((acc, tag) => {
            if (acc[tag]) {
              acc[tag]++;
            } else {
              acc[tag] = 1;
            }
            return acc;
          }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10),
      amountOfArticlesTwoWeeksAgo: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 14) && date < now.setDate(now.getDate() - 7);
      }).length,
      amountOfArticlesTwoMonthsAgo: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 60) && date < now.setDate(now.getDate() - 30);
      }).length,
      amountOfArticlesTwoYearsAgo: articles.filter((article) => {
        const date = new Date(article.timestamp * 1000);
        const now = new Date();
        return date > now.setDate(now.getDate() - 365 * 2) && date < now.setDate(now.getDate() - 365);
      }).length,
    },
  };
}
