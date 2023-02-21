export const extractCurrentChatGPTChatContent = () => {
  const parseNodes = (array) =>
    Array.from(array)
      .map((child) => {
        return { content: child.textContent, type: 'text' };
      })
      .filter(Boolean);

  const alreadyInjectedContainer =
    document.getElementById('injected-container');

  // Reach the container of the chat ~text-base~
  const chatContainer = alreadyInjectedContainer.parentElement.parentElement;
  const chatContent = chatContainer.querySelector('.markdown');

  const objectsArray = parseNodes(chatContent.childNodes);

  return { timestamp: Date.now(), content: objectsArray };
};
