class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers || null;
    this._body = options.body || null;
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.patch = this.patch.bind(this);
    this._buildRequestOptions = this._buildRequestOptions.bind(this);
    this._getRequestOptions = this._getRequestOptions.bind(this);
    this._requestOptions = {};
  }

  _setMethod(method) {
    this._method = method;
  }

  _buildRequestOptions() {
    if (this._headers) {
      this._requestOptions.headers = this._headers;
    }
    if (this._body) {
      this._requestOptions.body = JSON.stringify(this._body);
    }
    if (this._method) {
      this._requestOptions.method = this._method;
    }
  }

  _getRequestOptions() {
    return this._requestOptions;
  }

  _doRequest() {
    this._buildRequestOptions();
    return fetch(this._baseUrl, this._getRequestOptions()).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  get() {
    this._setMethod("GET");
    return this._doRequest();
  }

  post() {
    this._setMethod("POST");
    return this._doRequest();
  }

  patch() {
    this._setMethod("PATCH");
    return this._doRequest();
  }
}

export default Api;
