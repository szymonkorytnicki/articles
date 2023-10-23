import { style } from "@vanilla-extract/css";

export const modal = style({
  marginTop: "2.5vh",
  marginLeft: "2.5vw",
  width: "90vw",
  height: "90vh",
  background: "white",
  padding: "20px",
});

export const overlay = style({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,.4)",
  top: 0,
  left: 0,
});
