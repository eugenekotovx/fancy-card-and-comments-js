import { getCardInfo } from "./service.js";
import { newCommentListener } from "./comment.js";
import { setComments } from "./comments.js";
import { sorter } from "./helpers.js";
import { dateFormatter } from "./helpers.js";

const app = document.querySelector("#card");

let commentCounter = document.querySelector(".comment-counter");

class Card {
  constructor(info) {
    this.name = info.name;
    this.id = info.id;
    this.avatar = info.avatar;
    this.image = info.image;
    this.text = info.text;
    this.like = info.like;
    this.liked = false;
    this.createdAt = dateFormatter(info.createdAt);
    this.commentCounter = info.comments.length;

    this.render();
  }
  render() {
    const cardWrapper = document.createElement("div");
    cardWrapper.innerHTML = this.template();
    app.prepend(cardWrapper);
    let btn = cardWrapper.querySelector(".like-button");
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
    <div class="ui card fluid">
      <div class="content">
        <div class="right floated meta">${this.createdAt}</div><img class="ui avatar image" src="${this.avatar}"> ${this.name} </div>
      <div class="image">
        <img src="${this.image}">
      </div>
      <div class="content">
      <div class="description"> ${this.text} </div>
      </div>
      <div class="content">
      <span class="right floated">
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
      </span>
     <div class="ui labeled button" tabindex="0">
      <div class="ui blue button"><i class="comment icon"></i> commentaries  </div>
        <a class="ui basic left pointing blue label comment-counter">
          ${this.commentCounter}
        </a>
        </div>
      </div>
      <div class="extra content">
      </div>
    </div>
    <form class="ui reply form">
   <div class="field">
   <input id="name" class="valid-input" placeholder="Your name" data-name="name"></input>
   <textarea id="text" class="valid-input" placeholder="Your commentary" data-name="comment"></textarea>
   </div>
   <button type="submit" class="ui blue labeled submit icon button" id="button"><i class="icon edit"></i> Добавить ответ </button>
   </form>
    `;
  }
}

export const loadCard = () => {
  return getCardInfo()
    .then((card) => {
      new Card(card.data);
      return card;
    })
    .then((card) => {
      setComments(card.data.comments.sort(sorter));
    })
    .then(() => newCommentListener());
};
