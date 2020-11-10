import { getComments } from "./service.js";
import { sorter, dateFormatter } from "./helpers.js";

let comments = [];

const commentCounter = document.querySelector(".comment-counter");
const commentsContainer = document.querySelector("#comments-container");

export class Comment {
  constructor(comment) {
    this.comment = comment.comment;
    this.id = comment.id;
    this.name = comment.name;
    this.like = comment.like;
    this.avatar = comment.avatar;
    this.liked = false;
    this.createdAt = dateFormatter(comment.createdAt);

    this.render();
  }

  render() {
    const commentsWrapper = document.createElement("div");
    commentsWrapper.innerHTML = this.template();
    commentsWrapper.classList.add("ui", "comment");
    commentsContainer.append(commentsWrapper);

    const btn = commentsWrapper.querySelector(".like-button");
    btn.addEventListener("click", (e) => {
      this.updateLike(e);
    });
  }

  updateLike(e) {
    let likeCounter = e.currentTarget.parentNode.querySelector(".comment-like");
    e.currentTarget.classList.toggle("red");
    this.liked === false ? (this.like += 1) : (this.like -= 1);
    likeCounter.innerHTML = this.like;
    this.liked = !this.liked;
  }

  template() {
    return `
    <a class="avatar" href=""> <img src="${this.avatar}"></a>
      <div class="content">
          <span class="author"> ${this.name} </span>
          <div class="metadata">
             <span class="date">${this.createdAt}</span>
           </div>
          <div class="text"> ${this.comment} </div>
     </div>
     <div class="actions ui right aligned container">
       <div class="ui labeled button" tabindex="0">
       <div class="ui animated button like-button" tabindex="0">
         <div class="visible content"><i class="heart icon"></i>Like</div>
         <div class="hidden content">
           <i class="heart icon"></i>
         </div>
       </div>
       <a class="ui basic red left pointing label comment-like">
          ${this.like}
       </a>
       </div>
       </div>
       <div class="ui divider"></div>
    `;
  }
}

export const setComments = (array) => {
  array.map((item) => comments.push(new Comment(item)));
};

export const setComment = (comment) => {
  new Comment(comment);
};
