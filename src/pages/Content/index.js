import React from 'react';
import { createRoot } from 'react-dom/client';

import Content from './Content';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

document.addEventListener('mouseover', (event) => {
  const listItem = event.target.closest('.text-base');

  // This means that probably is the chat
  if (!listItem) return;

  const container = document.createElement('div');
  const [gptIcon] = listItem.getElementsByTagName('svg');
  const [avatar] = listItem.getElementsByTagName('img');
  const avatarContainer = gptIcon.parentElement.parentElement;

  container.id = 'injected-container';

  // If avatar does not exist, it means that is a gpt response
  if (!avatar) {
    const alreadyInjectedContainer =
      document.getElementById('injected-container');

    if (alreadyInjectedContainer) return;

    avatarContainer.appendChild(container);

    const root = createRoot(container);
    root.render(<Content />);

    listItem.parentElement.addEventListener('mouseout', () => {
      setTimeout(() => {
        const isDialogOpen = Boolean(
          document.getElementById('chakra-modal-injected-dialog')
        );

        if (!container || container?.matches(':hover') || isDialogOpen) return;

        root.unmount();
        container.remove();
      }, 0);
    });
  }
});
