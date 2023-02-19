import React, { useEffect, useState } from 'react';

const useNotionAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const notionClient = {};

  useEffect(() => {
    const notionToken = localStorage.getItem('notionToken');

    if (notionTok(true);
    }
  }, []);

  return {
    isAuth,
    notionClient,
  };
};

export default useNotionAuth;
