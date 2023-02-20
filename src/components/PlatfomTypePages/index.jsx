import React from 'react';
import NotionPagesList from './NotionPagesList';

const PlatformTypePages = ({ platform, ...props }) => {
  if (platform === 'notion') {
    return <NotionPagesList />;
  }

  return null;
};

export default PlatformTypePages;
