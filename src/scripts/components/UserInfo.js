class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  _getUserNameContainer() {
    return document.querySelector(this._userNameSelector);
  }

  _getUserName() {
    return this._getUserNameContainer().textContent;
  }

  _getUserJobContainer() {
    return document.querySelector(this._userJobSelector);
  }

  _getUserJob() {
    return this._getUserJobContainer().textContent;
  }

  getUserInfo() {
    const userInfo = {
      userName: this._getUserName(),
      userJob: this._getUserJob(),
    };
    return userInfo;
  }

  setUserInfo(userName, userJob) {
    this._getUserNameContainer().textContent = userName;
    this._getUserJobContainer().textContent = userJob;
  }
}

export default UserInfo;
