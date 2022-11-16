import * as style from "./components.css";
import classNames from "classnames";

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
export const Description = styled("div")(style.description);
export const Button = styled("button")(style.button);
export const Tag = styled("span")(style.tag);
export const RatingStyle = styled("span")(style.rating);
export const Rating = ({ rating }) => {
  return <RatingStyle className={classNames(getBackground(rating))}>{rating}</RatingStyle>;
};
