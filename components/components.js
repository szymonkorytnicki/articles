import * as style from "./components.css";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function styled(Component) {
  return function (className) {
    return function StyledComponent(props) {
      // TODO use classNames to merge the className prop with the className we want to apply
      return <Component {...props} className={classNames(className, props.className)} />;
    };
  };
}

function getBackground(rating) {
  if (rating < 3) {
    return style.bgRed;
  }
  if (rating < 5) {
    return style.bgOrange;
  }
  return style.bgGreen;
}

export const Article = styled("article")(style.article);
export const ArticleTitle = styled("h2")(style.articleTitle);
export const Description = styled("div")(style.description);
export const Button = styled("button")(style.button);
export const Tag = styled("span")(style.tag);
export const RatingStyle = styled("span")(style.rating);
export const Rating = ({ rating }) => {
  return <RatingStyle className={classNames(getBackground(rating))}>{rating}</RatingStyle>;
};

export function TagsList({ tags }) {
  return (
    <div style={{ padding: "20px", paddingLeft: "0px" }}>
      {tags.split(" ").map((tag) => {
        return (
          <Link key={tag} href={`/tags/${tag}`}>
            <Tag>#{tag}</Tag>
          </Link>
        );
      })}
    </div>
  );
}

export function Time({ timestamp }) {
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
