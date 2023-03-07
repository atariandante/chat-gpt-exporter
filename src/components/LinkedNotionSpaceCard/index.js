import React from 'react';
import {
  Menu,
  Button,
  MenuItem,
  MenuButton,
  MenuList,
  useBoolean,
} from '@chakra-ui/react';
import { BACKGROUND_MESSAGE_TYPES } from 'constants';

import { extractCurrentChatGPTChatContent } from '../../utils/dom';

const LinkedNotionSpaceCard = (props) => {
  const [isLoading, setIsLoading] = useBoolean();

  const { emoji, title, id } = props;

  const handleExportToNotion = (payload) => {
    setIsLoading.on();

    const content = extractCurrentChatGPTChatContent();

    chrome.runtime.sendMessage(
      {
        type: BACKGROUND_MESSAGE_TYPES.EXPORT_NOTION_PAGE,
        params: {
          content,
          pageId: payload.id,
        },
      },
      () => {
        setIsLoading.off();
      }
    );
  };

  return (
    <Menu>
      <MenuButton as={Button} isLoading={isLoading}>
        {emoji} {title}
      </MenuButton>

      <MenuList>
        <MenuItem
          disabled={isLoading}
          onClick={() => handleExportToNotion({ id })}
          {...props}
        >
          🚀 Export
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LinkedNotionSpaceCard;
