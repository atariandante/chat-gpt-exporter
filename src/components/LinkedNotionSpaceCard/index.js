import React from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuOptionGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

const LinkedNotionSpaceCard = (props) => {
  return (
    <Menu>
      <MenuButton as={Button}>
        {props.emoji} {props.title}
      </MenuButton>

      <MenuList>
        <MenuOptionGroup title="Notion">
          <MenuItem onClick={() => props.onClick('export', props)}>
            🚀 Export
          </MenuItem>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LinkedNotionSpaceCard;
