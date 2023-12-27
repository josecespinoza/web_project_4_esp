class UserInfo {
  #userNameSelector;
  #userJobSelector;

  constructor(userNameSelector, userJobSelector) {
    this.#userNameSelector = userNameSelector;
    this.#userJobSelector = userJobSelector;
  }

  #getUserNameContainer() {
    return document.querySelector(this.#userNameSelector);
  }

  #getUserName() {
    return this.#getUserNameContainer().textContent;
  }

  #getUserJobContainer() {
    return document.querySelector(this.#userJobSelector);
  }

  #getUserJob() {
    return this.#getUserJobContainer().textContent;
  }

  getUserInfo() {
    const userInfo = {
      userName: this.#getUserName(),
      userJob: this.#getUserJob(),
    };
    return userInfo;
  }

  setUserInfo(userName, userJob) {
    this.#getUserNameContainer().textContent = userName;
    this.#getUserJobContainer().textContent = userJob;
  }
}

export default UserInfo;
