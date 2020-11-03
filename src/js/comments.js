import { getComments } from "./service.js";

let comments = [];
let commentsContainer = document.querySelector("#comments-container");

class Comment {
  constructor(comment) {
    this.comment = comment.comment,
    this.id = comment.id,
    this.name = comment.name,
    this.like = comment.like,
    this.avatar = comment.avatar,
    this.liked = false,

    this.render()
  }

  render() {
    const commentsWrapper = document.createElement('div')
    const likes = document.createElement('div')

    commentsWrapper.innerHTML = this.template();
    likes.innerHTML = this.likeTemplate()
    commentsWrapper.classList.add("ui", "comment")
    commentsWrapper.append(likes)
    commentsContainer.append(commentsWrapper)

    let btn = likes.querySelector('.like-button')
    btn.addEventListener('click', (e) => {
      this.updateLike(e)
    })
  }

  updateLike(e) {
    let likeCounter = e.currentTarget.parentNode.querySelector('.comment-like')

    e.currentTarget.classList.toggle('red');

    (this.liked === false) ? this.like+=1 : this.like-=1
    likeCounter.innerHTML = this.like
    this.liked = !this.liked
  }

  likeTemplate() {
    return  `
    <div class="actions">
      <div class="ui labeled button" tabindex="0">
      <div class="ui button like-button"><i class="heart icon"></i> Like </div>
      <a class="ui basic red left pointing label comment-like">
         ${this.like}
      </a>
      </div>
      </div>

      <div class="ui divider"></div>
`
  }
  template() {
    return `
    <a class="avatar" href=""> <img src="${this.avatar}"></a>
      <div class="content">
          <span class="author"> ${this.name} </span>
          <div class="text"> ${this.comment} </div>
     </div>
    `;
  }
}

const setComments = (array) => {
  array.map((item) => comments.push(new Comment(item)));
};

export const loadComments = () => {
  getComments().then((data) => {
    setComments(data.data);
  });
};

console.log(comments);
