export class Card {
    constructor(image, title, alt, templateSelector, handleCardClick, cart) {
        this._image = image;
        this._title = title;
        this._alt = alt;
        this._template = document.querySelector(templateSelector).content.cloneNode(true);
        this._imageObject = this._template.querySelector('.place__img');
        this._handleCardClick = handleCardClick;
        this._cart = cart;
          
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
        placeCart.addEventListener("click", function(e){
            e.target.closest('.place').remove();
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



