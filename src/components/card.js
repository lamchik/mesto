import { Api } from './Api';

export class Card {
  constructor(
    api,
    image,
    title,
    alt,
    id,
    templateSelector,
    handleCardClick,
    cart,
    deletePopup,
    likes
  ) {
    this._api = api;
    this._id = id;
    this._image = image;
    this._title = title;
    this._alt = alt;
    this._template = document
      .querySelector(templateSelector)
      .content.cloneNode(true);
    this._imageObject = this._template.querySelector('.place__img');
    this._handleCardClick = handleCardClick;
    this._cart = cart;
    this._likes = likes;

    this._deletePopup = deletePopup;
  }

  _insertData() {
    const counter = this._template.querySelector('.place__like-counter');
    this._imageObject.src = this._image;
    this._imageObject.alt = this._alt;
    counter.textContent = this._likes.length;
    const like = this._template.querySelector('.place__like');

    if (this._isLiked()) {
      like.classList.add('place__like_active');
    }

    this._template.querySelector('.place__name').textContent = this._title;
    if (this._cart === true) {
      const button = this._template.querySelector('.place__cart');
      button.classList.add('place__cart_active');
    }
  }

  _isLiked() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === '6ae7895942a907e86bc8d8a3') {
        return true;
      }
    }
    return false;
  }

  _addListeners() {
    const like = this._template.querySelector('.place__like');
    const counter = this._template.querySelector('.place__like-counter');
    like.addEventListener('click', () => {
      if (this._isLiked()) {
        this._api
          .deleteLike(this._id)
          .then(data => {
            this._likes = data.likes;
            like.classList.remove('place__like_active');
            counter.textContent = data.likes.length;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this._api
          .likeCard(this._id)
          .then(data => {
            this._likes = data.likes;
            like.classList.add('place__like_active');
            counter.textContent = data.likes.length;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    const placeCart = this._template.querySelector('.place__cart');
    placeCart.addEventListener('click', e => {
      this._deletePopup.openPopup();

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
    });

    this._imageObject.addEventListener('click', () => {
      this._handleCardClick(this._image, this._title, this._alt);
    });
  }

  getCard() {
    this._insertData();
    this._addListeners();
    return this._template;
  }
}
