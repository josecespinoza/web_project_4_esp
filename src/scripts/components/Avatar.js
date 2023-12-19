class Avatar {
  constructor(avatarSelector) {
    this._avatarSelector = avatarSelector;
  }

  _getAvatarContainer() {
    return document.querySelector(this._avatarSelector);
  }

  getAvatarImageUrl() {
    return this._getAvatarContainer().getAttribute("src");
  }

  setAvatarImageUrl(imageUrl) {
    this._getAvatarContainer().setAttribute("src", imageUrl);
  }
}

export default Avatar;
