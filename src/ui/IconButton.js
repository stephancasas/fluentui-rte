/* @flow */

import React, { Component } from 'react';
import cx from 'classnames';
import Button from './Button';
import ButtonWrap from './ButtonWrap';

import { IconButton as FluentIconButton, getTheme } from '@fluentui/react';
import FluentUiIconMap from '../lib/FluentUiIconMap';

const SemanticColors = getTheme().semanticColors;
const ThemeColors = getTheme().palette;

type Props = {
  iconName: string,
  isActive?: boolean,
  children?: ReactNode,
  className?: string,
  label?: string,
  isSwitch?: boolean,
};

export default class IconButton extends Component {
  props: Props;

  render() {
    let { props } = this;
    let {
      className,
      iconName,
      label,
      children,
      isActive,
      isSwitch,
      ...otherProps
    } = props;

    return (
      <FluentIconButton
        {...otherProps}
        secondaryText={label}
        iconProps={{ iconName: FluentUiIconMap[iconName] }}
        className={className}
        aria-checked={isActive}
        checked={isActive}
        styles={{
          icon: { color: SemanticColors.buttonText },
          rootChecked: {
            backgroundColor: ThemeColors.themeLight,
          },
          rootCheckedHovered: {
            backgroundColor: ThemeColors.themeTertiary,
          },
        }}
      />
    );
  }
}
