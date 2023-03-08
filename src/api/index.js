import secrets from '../../secrets.development';

export default class Api {
  constructor() {
    this.baseUrl = secrets.baseApiUrl;
  }

  async query({ headers, method = 'GET', body, pathname, ...rest }) {
    try {
      const response = await fetch(`${this.baseUrl}${pathname}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
        ...rest,
      });

      return await response.json();
    } catch (error) {
      console.error(`API CLASS SERVICE ERROR: ${error.message}`);
      console.error(`API CLASS SERVICE ERROR: ${error}`);
    }
  }
}
