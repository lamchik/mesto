const allPlaces = [
    {
        title: 'Озеро Байкал',
        image: './images/baikal.jpg',
        alt: 'Байкал'
    },
    {
        title: 'Гора Эльбрус',
        image: './images/elbrus.jpg',
        alt: 'Эльбрус'
    },
    {
        title: 'Лёйгавегюр',
        image: './images/laugavegur.jpg',
        alt: 'Лёйгавегюр'
    },
    {
        title: 'Фарерские острова',
        image: './images/faroe.jpg',
        alt: 'Фарерские острова'
    },
    {
        title: 'Мальдивы',
        image: './images/maldives.jpg',
        alt: 'Мальдивы'
    },
    {
        title: 'Ниагарский водопад',
        image: './images/niagarafalls.jpg',
        alt: 'Ниагарский водопад'
    },
];

allPlaces.reverse().forEach(function(item) {
    addPlace(item.image, item.title, item.alt);
})
