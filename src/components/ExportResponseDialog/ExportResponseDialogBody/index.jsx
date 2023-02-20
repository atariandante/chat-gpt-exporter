import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';

import WithContentDialogBody from './WithContentDialogBody';
import useNotionAuth from '../../../hooks/useNotionAuth';

const ExportResponseDialogBody = () => {
  const { isAuth } = useNotionAuth();

  const handleClick = () => {
    chrome.runtime.sendMessage({
      type: 'OPEN_EXTENSION_CONFIG',
    });
  };

  return (
    <div>
      {!isAuth && (
        <Stack spacing={2}>
          <Text fontWeight="bold">
            You need to add a Notion page to your account before you can export
            responses.
          </Text>

          <Button onClick={handleClick}>Go to config</Button>
        </Stack>
      )}

      {isAuth && <WithContentDialogBody />}
    </div>
  );
};

export default ExportResponseDialogBody;
