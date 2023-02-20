import secrets from 'secrets';
import qs from 'qs';
import { Client as NotionClient } from '@notionhq/client';

import { BACKGROUND_MESSAGE_TYPES } from 'constants';

async function getNotionInstance() {
  const { notionAccessToken } = await chrome.storage.sync.get(
    'notionAccessToken'
  );

  if (!notionAccessToken) {
    throw new Error(`Not logged in, can't import to notion!`);
  }

  const notion = new NotionClient({
    auth: notionAccessToken,
  });

  return { notion, notionAccessToken };
}
//a7257e18da5e43df97b262648ba4700b
async function getNotionPageIds() {
  try {
    const { notion } = await getNotionInstance();

    const response = await notion.search();

    console.log({ response }, '----- response');

    return response;
  } catch (error) {
    console.log({ error }, '----- error');
  }
}

async function importToNotion({ content }) {
  const { notion } = await getNotionInstance();

  const response = await getNotionPageIds();

  console.log({
    response,
  });

  const [pageId] = response.results.map((result) => result.id);

  notion.blocks.children
    .append({
      block_id: pageId,
      children: [content],
    })
    .then((response) => {
      console.log('Content imported successfully!');
    })
    .catch((error) => console.error(error));
}

async function authenticateWithNotion(code) {
  const { notionAccessToken } = await chrome.storage.sync.get(
    'notionAccessToken'
  );

  if (notionAccessToken) {
    console.log('Already logged in with notion! ', notionAccessToken);
    return;
  }

  console.log('Authenticating with notion...');

  return fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(
        `${secrets.notionClientId}:${secrets.notionSecretId}`
      )}`,
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: String(code),
      redirect_uri: 'https://chat.openai.com/chat/',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token) {
        console.log(`Saved notionAccessToken! ${data.access_token}`);
        chrome.storage.sync.set({ notionAccessToken: data.access_token });
      }
    });
}

function onMessage(message, sender, sendResponse) {
  try {
    const { type, params = {} } = message || {};
    console.log('[===== Received message =====]', message, sender);
    console.log('Message type: ' + type);
    console.log('Message params: ' + JSON.stringify(params, null, 2));

    switch (type) {
      case BACKGROUND_MESSAGE_TYPES.OPEN_EXTENSION_CONFIG:
        chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
        break;

      case BACKGROUND_MESSAGE_TYPES.IMPORT_TO_NOTION:
        importToNotion(params).then((response) => {
          sendResponse(response);
        });
        break;
      case BACKGROUND_MESSAGE_TYPES.GET_NOTION_PAGES:
        console.log('----- get notion pages -----');
        getNotionPageIds().then((response) => {
          sendResponse(response);
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log('[===== Error in MessageListener =====]', error);
    return error;
  } finally {
    return true;
  }
}

function onInstalled() {
  // console.log('Instalao');
}
function onUpdatedTab(tabId) {
  attemptNotionAuth(tabId);
  // console.log('onUpdatedTab');
}
function onWindowFocusChanged() {
  // console.log('onWindowFocusChanged');
}
function onCloseTab() {
  // console.log('onCloseTab');
}
function onCreatedTab() {
  // console.log('onCreatedTab');
}

function attemptNotionAuth(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (!tab.url) return;
    const isOnOpenAIChat = tab.url.startsWith('https://chat.openai.com/chat');
    const url = new URL(tab.url);
    const { code } = qs.parse(url.search, {
      ignoreQueryPrefix: true,
    });

    if (isOnOpenAIChat && code) {
      authenticateWithNotion(code);
    }
  });
}
function onActivateTabChange({ tabId }) {
  attemptNotionAuth(tabId);
}
function onClickExtensionIcon() {
  // console.log('onClickExtensionIcon');
}

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onMessage.addListener(onMessage);
chrome.tabs.onUpdated.addListener(onUpdatedTab);
chrome.windows.onFocusChanged.addListener(onWindowFocusChanged);
chrome.tabs.onRemoved.addListener(onCloseTab);
chrome.tabs.onCreated.addListener(onCreatedTab);
chrome.tabs.onActivated.addListener(onActivateTabChange);
chrome.action.onClicked.addListener(onClickExtensionIcon);
