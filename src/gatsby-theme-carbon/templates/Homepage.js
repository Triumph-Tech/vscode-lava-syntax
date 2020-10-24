import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { calloutLink } from './Homepage.module.scss';

import Lava from '../../images/lava.jpg';

const FirstLeftText = () => <p>Lava for VSCode</p>;

const FirstRightText = () => (
  <p>
    Lava is open-source templating language for <a href="https://www.rockrms.com/" target="_blank" rel="noreferrer">Rock RMS</a>. This extension includes tools for developing with Lava in the lightweight, extensible VSCode editor.
    <a
      className={calloutLink}
      href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">
      Download Visual Studio Code →
    </a>

    <a
      className={calloutLink}
      href="https://marketplace.visualstudio.com/items?itemName=GarrettJohnson.language-lava" target="_blank" rel="noreferrer">
      Install Lava for VSCode →
    </a>
  </p>
);


const BannerText = () => <h1>Lava for VSCode</h1>;

const customProps = {
  Banner: (<> <HomepageBanner renderText={BannerText} image={Lava} /> </>),
  FirstCallout: (
    <HomepageCallout
      backgroundColor="#030303"
      color="white"
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: <div />
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
