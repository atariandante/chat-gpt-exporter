import React from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const LinkedNotionSpaceCard = ({ title, emoji, url, ...props }) => {
  return (
    <Menu>
      <MenuButton as={Button}>
        {emoji} {title}
      </MenuButton>

      <MenuList>
        <MenuOptionGroup title="Notion">
          <MenuItem
            icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
            onClick={() => window.open(url)}
          >
            See in notion
          </MenuItem>
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup title="Google drive" k>
          <MenuItemOption> Email</MenuItemOption>
          <MenuItemOption> Phone</MenuItemOption>
          <MenuItemOption> Country</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LinkedNotionSpaceCard;
