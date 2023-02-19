import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import ExportResponseDialogBody from './ExportResponseDialogBody';

const ExportResponseDialog = ({ onClose, isOpen, ...props }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} id="injected-dialog" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export ChatGPT response</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ExportResponseDialogBody />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExportResponseDialog;
