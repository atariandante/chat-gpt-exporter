import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { ChakraProvider, IconButton, Tooltip } from '@chakra-ui/react';

import ExportResponseDialog from '../../components/ExportResponseDialog';

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChakraProvider>
      <Tooltip label="Export ChatGPT response" placement="bottom">
        <IconButton
          mt={2}
          onClick={() => setIsOpen(true)}
          size="sm"
          colorScheme="blue"
          icon={<FontAwesomeIcon icon={faFileExport} />}
          borderRadius="sm"
        />
      </Tooltip>
      <ExportResponseDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ChakraProvider>
  );
};

export default Content;
