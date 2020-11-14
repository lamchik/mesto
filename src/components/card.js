import { Api } from './Api';

export class Card {
  constructor(
    api,
    image,
    title,
    alt,
    id,
    userId,
    templateSelector,
    handleCardClick,
    cart,
    deletePopup,
    likes
  ) {
    this._api = api;
    this._id = id;
    this._userId = userId;
    this._image = image;
    this._title = title;
    this._alt = alt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cart = cart;
    this._likes = likes;

    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return template;
  }

  _insertData(template) {
    const counter = template.querySelector('.place__like-counter');
    const imageObject = template.querySelector('.place__img');
    imageObject.src = this._image;
    imageObject.alt = this._alt;
    counter.textContent = this._likes.length;
    const like = template.querySelector('.place__like');

    if (this._isLiked()) {
      like.classList.add('place__like_active');
    }

    template.querySelector('.place__name').textContent = this._title;
    if (this._cart === true) {
      const button = template.querySelector('.place__cart');
      button.classList.add('place__cart_active');
    }
  }

  _isLiked() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        return true;
      }
    }
    return false;
  }

  _setLikes(likeElement, counterElement) {
    if (this._isLiked()) {
      this._api
        .deleteLike(this._id)
        .then(data => {
          this._likes = data.likes;
          likeElement.classList.remove('place__like_active');
          counterElement.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this._api
        .likeCard(this._id)
        .then(data => {
          this._likes = data.likes;
          likeElement.classList.add('place__like_active');
          counterElement.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _addListeners(template) {
    const like = template.querySelector('.place__like');
    const counter = template.querySelector('.place__like-counter');
    like.addEventListener('click', () => {
      this._setLikes(like, counter);
    });

    const placeCart = template.querySelector('.place__cart');
    placeCart.addEventListener('click', e => {
      this._deletePopup.openPopup();
      this._removeCard(e);
    });

    const imageObject = template.querySelector('.place__img');
    imageObject.addEventListener('click', () => {
      this._handleCardClick(this._image, this._title, this._alt);
    });
  }

  _removeCard(e) {
    this._deletePopup.setOnSubmitHandler(() => {
      this._api
        .deleteCard(this._id)
        .then(() => {
          this._deletePopup.closePopup();
          e.target.closest('.place').remove();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  getCard() {
    const template = this._getTemplate();
    this._insertData(template);
    this._addListeners(template);
    return template;
  }
}
