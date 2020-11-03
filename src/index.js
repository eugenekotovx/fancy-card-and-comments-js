// Test import of a JavaScript function
import { example } from "./js/example";
import { loadComments } from "./js/comments"
// Test import of an asset
import webpackLogo from "./images/webpack-logo.svg";

// Test import of styles
import "./styles/index.scss";
import "./semantic/semantic.min.css";

// Listeners
const app = document.querySelector("#root");

// Appending to the DOM
document.addEventListener('load', loadComments())
app.append();
