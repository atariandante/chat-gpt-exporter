import React from 'react';
import { Button, Tooltip } from '@chakra-ui/react';

const PlatformButton = ({ children, disabled, unlock, ...props }) => {
  if (unlock) {
    return (
      <Tooltip label="Locked platform 🔒">
        <Button size="lg" isDisabled {...props}>
          {children}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button size="lg" isDisabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default PlatformButton;
