import { style } from "@vanilla-extract/css";

export const article = style({
  padding: "20px",
  margin: "10px",
  maxWidth: "600px",
  width: "100%",
  border: "1px solid #ccc",
  position: "relative",
});

export const articleTitle = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "10px",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const description = style({
  marginBottom: "40px",
});

export const button = style({
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
});

export const tag = style({
  display: "inline-block",
  padding: "5px",
  marginRight: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: 0.8 + "em",
});

export const rating = style({
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#ccc",
  color: "white",
  fontSize: "1.5rem",
  padding: "5px",
});

export const bgRed = style({
  backgroundColor: "red",
});

export const bgOrange = style({
  backgroundColor: "orange",
});

export const bgGreen = style({
  backgroundColor: "green",
});
