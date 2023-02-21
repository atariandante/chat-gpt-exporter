import React, { useState } from 'react';
import { Text, Divider, Heading, Stack } from '@chakra-ui/react';
import { useAtom } from 'jotai';

import PlatformButton from '../../../PlatformButton';
import PlatformTypePages from '../../../PlatfomTypePages';
import platformAtom from '../../../../atoms/platformAtom';

const WithContentDialogBody = () => {
  const [platform, setPlatform] = useAtom(platformAtom);

  const handleClickPlatform = (platform) => {
    setPlatform(platform.toLowerCase());
  };

  return (
    <Stack direction="column" spacing={4}>
      <Heading as="h3" size="md">
        Plaform to export 📦
      </Heading>

      <Stack direction="row" spacing={2} as="ul">
        {['Notion', 'Google Docs', 'Google Sheets'].map((platform) => (
          <PlatformButton
            key={platform}
            unlock={platform !== 'Notion'}
            onClick={() => handleClickPlatform(platform)}
          >
            {platform}
          </PlatformButton>
        ))}
      </Stack>

      <Divider mx={-4} />

      <Heading as="h3" size="md">
        Allowed pages 📑
      </Heading>

      {platform && (
        <Stack direction="row" spacing={2} as="ul">
          <PlatformTypePages platform={platform} />
        </Stack>
      )}

      {!platform && (
        <Text>
          You need to select a <b>platform</b> to see the pages you can export
          to. 🤭
        </Text>
      )}
    </Stack>
  );
};

export default WithContentDialogBody;
