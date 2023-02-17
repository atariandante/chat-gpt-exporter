import React from 'react';
import { createRoot } from 'react-dom/client';

import Content from './Content';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

const chatGptResponseClasses = '.w-full.border-b.border-black/10.text-gray-800';

document.addEventListener('mouseover', (event) => {
  const listItem = event.target.closest(chatGptResponseClasses);

  // This means that probably is the chat
  if (!listItem) return;

  const container = document.createElement('div');
  const [gptIcon] = listItem.getElementsByTagName('svg');
  const [avatar] = listItem.getElementsByTagName('img');
  const avatarContainer = gptIcon.parentElement.parentElement;

  // If avatar does not exist, it means that is a gpt response
  if (!avatar) {
    avatarContainer.appendChild(container);

    const root = createRoot(container);
    root.render(<Content />);

    listItem.addEventListener('mouseout', () => {
      root.unmount();
      container.remove();
    });
  }
});
