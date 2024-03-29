class Api {
  #baseUrl;
  #headers;
  #body;
  #requestOptions;
  #method;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers || null;
    this.#body = options.body || null;
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.#requestOptions = {};
  }

  #setMethod(method) {
    this.#method = method;
  }

  #buildRequestOptions() {
    if (this.#headers) {
      this.#requestOptions.headers = this.#headers;
    }
    if (this.#body) {
      this.#requestOptions.body = JSON.stringify(this.#body);
    }
    if (this.#method) {
      this.#requestOptions.method = this.#method;
    }

    return JSON.parse(JSON.stringify(this.#requestOptions));
  }

  _updateOptions(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers || null;
    this.#body = options.body || null;
    this.#buildRequestOptions();
  }

  #doRequest() {
    const requestOptions = this.#buildRequestOptions();
    return fetch(this.#baseUrl, requestOptions).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  get() {
    this.#setMethod("GET");
    return this.#doRequest();
  }

  post() {
    this.#setMethod("POST");
    return this.#doRequest();
  }

  put() {
    this.#setMethod("PUT");
    return this.#doRequest();
  }

  patch() {
    this.#setMethod("PATCH");
    return this.#doRequest();
  }

  delete() {
    this.#setMethod("DELETE");
    return this.#doRequest();
  }
}

let instance;

const getInstance = (options) => {
  if (!instance) {
    instance = new Api(options);
  }
  instance._updateOptions(options);
  return instance;
};

export { getInstance };
