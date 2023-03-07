import React, { useEffect, useState } from 'react';
import { Text, Spinner, Stack } from '@chakra-ui/react';

import { BACKGROUND_MESSAGE_TYPES } from 'constants';

import LinkedNotionSpaceCard from '../../LinkedNotionSpaceCard';

const DEFAULT_TITLE = {
  id: new Date(),
  plain_text: 'No title page.',
};

const NotionPagesList = () => {
  const [pages, setPages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: BACKGROUND_MESSAGE_TYPES.GET_NOTION_PAGES,
      },
      (x) => {
        setPages(x);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <Stack align="center">
        <Spinner />
      </Stack>
    );
  }

  // TODO: ADD ERROR
  if (!pages || !pages.length) {
    return (
      <Text>
        You don't have any Notion pages yet. Please add one to your account.
      </Text>
    );
  }

  return (
    <Stack direction="column" spacing={4}>
      {pages.map(({ id, url, icon, properties, title }) => {
        const [firstTitle] = title ??
          properties.title?.title ?? [DEFAULT_TITLE];

        return (
          <LinkedNotionSpaceCard
            id={id}
            emoji={icon?.emoji}
            title={firstTitle.plain_text}
            url={url}
          />
        );
      })}
    </Stack>
  );
};

export default NotionPagesList;
