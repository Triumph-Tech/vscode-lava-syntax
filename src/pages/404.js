import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/getting-started', text: 'Getting Started' },
  { href: '/snippets', text: 'Snippets' },
  { href: '/updates', text: 'Updates' },
];

const Custom404 = () => <FourOhFour links={links} />;

export default Custom404;
