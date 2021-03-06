import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const createCommentTemplate = (comments) => {
  const { author, comment, date, emotion } = comments;
  const commentDate = dayjs(date).fromNow();

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class CommentsListView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createCommentTemplate(this.#comments);
  }

  setPopupClicHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupHandler);
  };

  #popupHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  };
}


