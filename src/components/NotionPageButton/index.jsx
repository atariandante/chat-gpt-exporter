import React from 'react';
import { Button } from '@chakra-ui/react';
import secrets from 'secrets';

const NotionPageButton = () => {
  const handle = () => {
    window.open(secrets.notionAuthUrl);
  };

  return <Button onClick={handle}>Link notion account</Button>;
};

export default NotionPageButton;
