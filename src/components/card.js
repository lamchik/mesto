import { Api } from '../api/Api';

export class Card {
    constructor(image, title, alt, id, templateSelector, handleCardClick, cart, deletePopup) {
        this._id = id;
        this._image = image;
        this._title = title;
        this._alt = alt;
        this._template = document.querySelector(templateSelector).content.cloneNode(true);
        this._imageObject = this._template.querySelector('.place__img');
        this._handleCardClick = handleCardClick;
        this._cart = cart;

        this._deletePopup = deletePopup;
        this._deleteCardApi = new Api({
            url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
            headers: {
                "Content-Type" : "application/json",
                authorization: "9b68a7b1-3b8f-4ce8-9813-2e4457640daa"
            }
        });
        
    }

    _insertData() {
        this._imageObject.src = this._image;
        this._imageObject.alt = this._alt;
        this._template.querySelector('.place__name').textContent = this._title;
        if (this._cart === true) {
            const button = this._template.querySelector('.place__cart');
            button.classList.add('place__cart_active');
        }
    }
    
    _addListeners() {
        const like = this._template.querySelector('.place__like');
        like.addEventListener('click', function(){
            like.classList.toggle('place__like_active');
        });

        const placeCart = this._template.querySelector(".place__cart");
        placeCart.addEventListener("click", (e) => {
            this._deletePopup.openPopup();
            
            this._deletePopup.setOnSubmitHandler(() => {
                this._deleteCardApi.deleteCard(this._id).then(() => {
                    this._deletePopup.closePopup();
                    e.target.closest('.place').remove();
                })
            })
        })

        this._imageObject.addEventListener('click', () => {
            this._handleCardClick(this._image, this._title, this._alt)
        });
    }

    getCard() {
        this._insertData()
        this._addListeners()
        return this._template;
    }
}



  
// this._buttonCart = this._template.querySelector('.place__cart');
// this._buttonCart.classList.add('.place__cart_active')



