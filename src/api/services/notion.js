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

    return query.data;
  }

  async export(params) {
    const { content, pageId } = params;

    const query = this.query({
      pathname: '/notion/export',
      method: 'POST',
      body: {
        content,
        pageId,
      },
    });

    return query;
  }

  async checkAuth(params) {
    const { notionAccessToken } = params;

    return await this.query({
      pathname: '/notion/check-auth',
      method: 'POST',
      body: {
        token: notionAccessToken,
      },
    });
  }
}

const notionService = new NotionService();

export default notionService;
