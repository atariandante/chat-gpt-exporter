import { useEffect, useState } from 'react';

import { BACKGROUND_MESSAGE_TYPES } from 'constants';

const useNotion = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!chrome.runtime) return;

    setIsLoading(true);

    chrome.storage.sync.get('notionAccessToken', ({ notionAccessToken }) => {
      if (notionAccessToken) {
        chrome.runtime.sendMessage(
          {
            type: BACKGROUND_MESSAGE_TYPES.CHECK_NOTION_AUTH,
            params: {
              notionAccessToken,
            },
          },
          (response) => {
            setIsAuth(response.data.isAuth);
            setIsLoading(false);
          }
        );
      } else {
        setIsAuth(false);
        setIsLoading(false);
      }
    });
  }, []);

  return {
    isAuth,
    isLoading,
  };
};

export default useNotion;
