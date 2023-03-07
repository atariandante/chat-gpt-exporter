export const extractChatGPTAnswer = () => {
  const alreadyInjectedContainer =
    document.getElementById('injected-container');

  // Reach the container of the chat ~text-base~
  const chatContainer = alreadyInjectedContainer.parentElement.parentElement;
  const chatContent = chatContainer.querySelector('.markdown');

  const objectsArray = recursivelyParseNodesToArray(chatContent.childNodes);

  console.log({
    objectsArray,
  });

  return { timestamp: Date.now(), content: objectsArray };
};

function recursivelyParseNodesToArray(nodes) {
  const result = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const type = getType(node.nodeName);

    if (type === 'other') {
      continue;
    }

    const content = parseNodeContent(node);

    result.push({
      type,
      [type]: { content },
    });
  }

  return result;
}

function getType(nodeName) {
  switch (nodeName) {
    case 'P':
      return 'paragraph';
    case 'A':
      return 'link';
    default:
      return 'other';
  }
}

function parseNodeContent(node) {
  const content = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    const childNode = node.childNodes[i];

    if (childNode.nodeType === Node.TEXT_NODE) {
      const text = childNode.textContent;

      const textShape = {
        type: 'text',
        content: text,
      };

      if (text.trim().length > 0) {
        content.push(textShape);
      }
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      if (childNode.nodeName === 'A') {
        const linkShape = {
          type: 'link',
          content: childNode.href,
        };

        content.push(linkShape);
      } else if (
        childNode.nodeName === 'STRONG' ||
        childNode.nodeName === 'B'
      ) {
        const boldShape = {
          type: 'bold',
          content: childNode.textContent,
        };

        content.push(boldShape);
      } else {
        const childContent = parseNodeContent(childNode);

        content.push(...childContent);
      }
    }
  }

  return content;
}
