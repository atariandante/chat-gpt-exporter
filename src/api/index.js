export default class Api {
  constructor(config) {
    this.config = config;
    this.endpoint = `https://api.notion.com/v1/search`;
  }

  async search(query) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.auth}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: query ? JSON.stringify(query) : null,
      });

      const data = await response.json();

      console.log(
        {
          data,
        },
        '-----------data'
      );

      return data;
    } catch (error) {
      console.error(`API CLASS SERVICE ERROR: ${error.message}`);
      console.error(`API CLASS SERVICE ERROR: ${error}`);
    }
  }
}
