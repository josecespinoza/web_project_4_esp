import { modalConfig } from "../config.js";
import Modal from "./Modal.js";

class CardModal extends Modal {
  constructor(content, config = modalConfig) {
    super(content, config);
  }

  buildModal() {
    const customModal = super.buildModal();
    customModal.querySelector(this._config.modalContentSelector).remove();
    customModal.prepend(this._content);
    return customModal;
  }
}

export default CardModal;
