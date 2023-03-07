import React from 'react';
import { Icon, Button, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PlatformButton = ({ children, disabled, locked, active, ...props }) => {
  if (locked) {
    return (
      <Tooltip label="Locked platform 🔒">
        <Button size="lg" isDisabled {...props}>
          {children}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button size="lg" isDisabled={disabled} position="relative" {...props}>
      {active && (
        <Icon
          as={(props) => <FontAwesomeIcon icon={faCircleCheck} {...props} />}
          color="green.500"
          position="absolute"
          left={-1}
          top={-1}
        />
      )}
      {children}
    </Button>
  );
};

export default PlatformButton;
