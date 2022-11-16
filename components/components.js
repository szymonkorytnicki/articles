import * as style from "./components.css";

function styled(Component) {
  return function (className) {
    return function StyledComponent(props) {
      // TODO use classNames to merge the className prop with the className we want to apply
      return <Component className={className} {...props} />;
    };
  };
}

export const Article = styled("article")(style.article);
