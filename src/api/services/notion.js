import Api from '..';

class NotionService extends Api {
  async exchangeCode(code) {
    return await this.query({
      pathname: '/notion/exchange-code',
      method: 'POST',
      body: {
        code,
      },
    });
  }

  async search() {
    const query = await this.query({
      pathname: '/notion/search',
      method: 'GET',
    });

    console.log(query.data);

    return query.data;
  }
}

const notionService = new NotionService();

export default notionService;
