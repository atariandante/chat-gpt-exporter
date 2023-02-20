import React from 'react';

// @ts-ignore
import secrets from 'secrets';

import { Button, ChakraProvider } from '@chakra-ui/react';

import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <ChakraProvider>
      <Button onClick={() => window.open(secrets.notionAuthUrl)}>
        Link Notion
      </Button>
    </ChakraProvider>
  );
};

export default Options;
