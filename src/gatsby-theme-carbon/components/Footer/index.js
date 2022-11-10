import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = ({ buildTime }) => (
  <>
    <p>
      Got questions? Email us at <a href="mailto:lava@garrett.io">lava@garrett.io</a> or open an issue on <a href="https://github.com/garrettjohnson/vscode-lava-syntax/issues/new">GitHub</a>.
    </p>
    <p>
      Last updated {buildTime}<br/>
      Copyright © 2022 Garrett Johnson
    </p>
  </>
);

const links = {
  firstCol: [
    { href: 'https://www.rockrms.com', linkText: 'Rock RMS' },
    { href: 'https://www.rockrms.com/lava', linkText: 'Lava Documentation' },
  ],
  secondCol: [
    { href: 'https://code.visualstudio.com/', linkText: 'Visual Studio Code' },
  ],
};

const logo = () => (
  <svg></svg>
);

const CustomFooter = () => <Footer links={links} Content={Content} Logo={logo} />;

export default CustomFooter;
