class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _setMethod(method) {
    this._method = method;
  }

  _getRequestOptions() {
    return {
      method: this._method,
      headers: this._headers,
    };
  }

  _doRequest() {
    debugger;
    return fetch(this._baseUrl, this._getRequestOptions()).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  get() {
    this._setMethod("GET");
    return this._doRequest();
  }

  patch() {
    this._setMethod("PATCH");
    return this._doRequest();
  }
}

export default Api;
