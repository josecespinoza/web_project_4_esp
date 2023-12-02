import { sectionConfig } from "../config.js";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, type = sectionConfig.additionTypeAppend) {
    type === sectionConfig.additionTypeAppend
      ? document.querySelector(this._containerSelector).append(element)
      : document.querySelector(this._containerSelector).prepend(element);
  }
}

export default Section;
