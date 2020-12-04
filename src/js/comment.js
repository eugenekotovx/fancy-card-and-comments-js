import { setComment } from "./comments.js";
import { dateFormatter } from "./helpers";
import { Comment } from "./comments.js";
import { validationListener, showError } from "./validation.js";

const createComment = (name, text) => {
  let newComment = {};
  newComment.comment = text.value;
  newComment.name = name.value;
  newComment.like = 0;
  newComment.liked = false;
  newComment.createdAt = dateFormatter(new Date());
  new Comment(newComment);
};

export const newCommentListener = () => {
  validationListener();

  const commentCounter = document.querySelector(".comment-counter");
  const text = document.querySelector("#text");
  const name = document.querySelector("#name");
  const form = document.querySelector(".form");

  let counter = Number(commentCounter.textContent);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (text.classList.contains("valid") && name.classList.contains("valid")) {
      createComment(name, text);
      commentCounter.innerHTML = counter += 1;

      text.value = "";
      name.value = "";
      text.classList.remove("valid")
      name.classList.remove("valid")
    } else if (
      !text.classList.contains("valid") &&
      !name.classList.contains("valid")
    ) {
      showError(name, showError(text));
    } else if (!name.classList.contains("valid")) {
      showError(name);
    } else {
      showError(text);
    }
  });
};
