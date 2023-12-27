class Avatar {
  #avatarSelector;

  constructor(avatarSelector) {
    this.#avatarSelector = avatarSelector;
  }

  #getAvatarContainer() {
    return document.querySelector(this.#avatarSelector);
  }

  getAvatarImageUrl() {
    return this.#getAvatarContainer().getAttribute("src");
  }

  setAvatarImageUrl(imageUrl) {
    this.#getAvatarContainer().setAttribute("src", imageUrl);
  }
}

export default Avatar;
