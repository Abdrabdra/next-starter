import { Theme } from "@mui/material/styles";

import Button from "./Button";
import CssBaseline from "./CssBaseline";
import Container from "./Container";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Container(theme),
    CssBaseline(theme)
  );
}
