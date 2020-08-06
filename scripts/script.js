function createPlace(image, title, alt) {
    const template = document.querySelector('#place').content;
    const place = template.cloneNode(true);
    const img = place.querySelector('.place__img');

    img.src = image;
    img.alt = alt;
    place.querySelector('.place__name').textContent = title;

    const like = place.querySelector('.place__like');
    like.addEventListener('click', function(){
        like.classList.toggle('place__like_active');
    });

    const placeCart = place.querySelector(".place__cart");
    placeCart.addEventListener("click", function(e){
        e.target.closest('.place').remove();
    })
    
    img.addEventListener('click', function() {
        addPopupCard(image, title, alt)
    });

    return place;
}

function addPlace(image, title, alt) {
    const place = createPlace(image, title, alt);

    const section = document.querySelector('.places');
    section.prepend(place);
};

