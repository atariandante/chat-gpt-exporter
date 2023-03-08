import React from 'react';
import { Text, Divider, Heading, Stack } from '@chakra-ui/react';
import { useAtom } from 'jotai';

import PlatformButton from '../../../PlatformButton';
import PlatformTypePages from '../../../PlatfomTypePages';
import platformAtom from '../../../../atoms/platformAtom';

const WithContentDialogBody = () => {
  const [selectedPlatform, setSelectedPlatform] = useAtom(platformAtom);

  const handleClickPlatform = (platform) => {
    setSelectedPlatform(platform.toLowerCase());
  };

  return (
    <Stack direction="column" spacing={4}>
      <Heading as="h3" size="md">
        Plaform to export 📦
      </Heading>

      <Text>Select the platform you want to export your response to.</Text>

      <Stack direction="row" spacing={2} as="ul">
        {['Notion', 'Google Docs', 'Google Sheets'].map((platform) => (
          <PlatformButton
            key={platform}
            locked={platform !== 'Notion'}
            onClick={() => handleClickPlatform(platform)}
            active={platform.toLowerCase() === selectedPlatform}
            size="sm"
          >
            {platform}
          </PlatformButton>
        ))}
      </Stack>

      <Divider mx="-24px" />

      <Heading as="h3" size="md">
        Allowed pages 📑
      </Heading>

      {selectedPlatform && (
        <Stack direction="row" spacing={2} as="ul">
          <PlatformTypePages platform={selectedPlatform} />
        </Stack>
      )}

      {!selectedPlatform && (
        <Text>
          You need to select a <b>platform</b> to see the pages you can export
          to. 🤭
        </Text>
      )}
    </Stack>
  );
};

export default WithContentDialogBody;
