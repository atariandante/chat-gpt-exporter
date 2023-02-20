import { useEffect, useState } from 'react';

import { BACKGROUND_MESSAGE_TYPES } from 'constants';

const useNotion = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [notionPages, setNotionPages] = useState([]);
  const notionClient = {};

  const exportTo = (content, platform = 'notion') => {
    if (!content) {
      throw new Error('No content to export');
    }

    switch (platform) {
      default:
        chrome.runtime.sendMessage(
          {
            type: BACKGROUND_MESSAGE_TYPES.IMPORT_TO_NOTION,
            params: {
              content,
            },
          },
          (x) => {
            console.log(x);
          }
        );
    }
  };

  useEffect(() => {
    if (!chrome.storage) return;
    chrome.storage.sync
      .get('notionAccessToken')
      .then(({ notionAccessToken }) => {
        setIsAuth(Boolean(notionAccessToken));
      });
  }, [chrome.storage]);

  return {
    isAuth,
    notionClient,
    exportTo,
    notionPages,
  };
};

export default useNotion;
