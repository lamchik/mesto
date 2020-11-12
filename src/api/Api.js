export class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
        this.id = config.id;
    }

    getUser() {
        return fetch(this.url, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getCard() {
        return fetch(this.url, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    editUser(name, about) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({name, about})
          }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    editAvatarUser(url) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
          }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    createCard(name, link) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name, link})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(id) {
        return fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}


