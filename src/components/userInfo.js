export class UserInfo {
  constructor({ nameSelector, descriptionSelector, imageSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar,
      id: this._id
    };
  }

  setUserInfo(name, description, avatar, id) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
    this._id = id;
  }
}
