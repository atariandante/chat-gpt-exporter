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

import { extractChatGPTAnswer } from '../../utils/dom';
import { useSnackbar } from 'notistack';

const LinkedNotionSpaceButton = (props) => {
  const [isLoading, setIsLoading] = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const { emoji, title, id } = props;

  const handleExportToNotion = (payload) => {
    setIsLoading.on();

    const content = extractChatGPTAnswer();

    chrome.runtime.sendMessage(
      {
        type: BACKGROUND_MESSAGE_TYPES.EXPORT_NOTION_PAGE,
        params: {
          content,
          pageId: payload.id,
        },
      },
      ({ success }) => {
        if (!success) {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
          return;
        }

        enqueueSnackbar('All good!', { variant: 'success' });
        setIsLoading.off();
      }
    );
  };

  return (
    <Menu>
      <MenuButton as={Button} isLoading={isLoading} {...props}>
        {emoji} {title}
      </MenuButton>

      <MenuList>
        <MenuItem
          disabled={isLoading}
          onClick={() => handleExportToNotion({ id })}
        >
          🚀 Export
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LinkedNotionSpaceButton;
