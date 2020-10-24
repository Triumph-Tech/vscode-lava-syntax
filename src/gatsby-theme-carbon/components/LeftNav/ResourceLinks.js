import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'Github',
    href: 'https://github.com/garrettjohnson/vscode-lava-syntax',
  },
  {
    title: 'Install Plugin',
    href: 'https://marketplace.visualstudio.com/items?itemName=GarrettJohnson.language-lava',
  },
  {
    title: 'Configuration guide',
    href: '/getting-started/configuration',
  },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
