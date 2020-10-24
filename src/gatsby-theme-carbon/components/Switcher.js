import React from 'react'
import Switcher from 'gatsby-theme-carbon/src/components/Switcher'
import {
  SwitcherLink,
  SwitcherDivider,
} from 'gatsby-theme-carbon/src/components/Switcher/Switcher'

const CustomSwitcher = props => {
  console.log('Props:', JSON.stringify(props))

  return (
    <Switcher {...props}>
      <SwitcherLink href="https://garrett.io" target="_blank">
        garrett.io
      </SwitcherLink>
      <SwitcherDivider>Rock RMS Sites</SwitcherDivider>
      <SwitcherLink href="https://rockrms.com" target="_blank">
        Rock RMS
      </SwitcherLink>

      <SwitcherLink href="https://rockrms.com/lava" target="_blank">
        Lava Documentation
      </SwitcherLink>
    </Switcher>
  )
}

export default CustomSwitcher