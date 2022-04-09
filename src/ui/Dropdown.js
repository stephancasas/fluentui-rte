/* @flow */
import React, { Component } from 'react';
import autobind from 'class-autobind';
import cx from 'classnames';

import {
  Dropdown as FluentUiDropdown,
  Icon,
  IconButton,
} from '@fluentui/react';

import { getTheme } from '@fluentui/react';
const SemanticColors = getTheme().semanticColors;

import styles from './Dropdown.css';
import FluentUiIconMap from '../lib/FluentUiIconMap';

type Choice = {
  label: string,
  className?: string,
};

type Props = {
  choices: Map<string, Choice>,
  selectedKey: ?string,
  onChange: (selectedKey: string) => any,
  className?: string,
};

export default class Dropdown extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let { choices, selectedKey, className, ...otherProps } = this.props;
    className = cx(className, styles.root);
    let selectedItem = selectedKey == null ? null : choices.get(selectedKey);
    let selectedValue = (selectedItem && selectedItem.label) || '';
    return (
      <IconButton
        iconProps={{ iconName: FluentUiIconMap[selectedKey] }}
        styles={{ icon: { color: SemanticColors.buttonText } }}
        menuProps={this._renderChoices()}
      />
    );
  }

  _onChange(value) {
    this.props.onChange(value);
  }

  _renderChoices() {
    let { choices } = this.props;
    let entries = Array.from(choices.entries());
    const items = entries.map(([key, { label: text }]) => ({
      key,
      text,
      iconProps: { iconName: FluentUiIconMap[key] },
      onClick: () => this._onChange(key),
    }));

    return { directionalHintFixed: true, items };
  }

  _onRenderFluentUiOption(option) {
    return (
      <div key={option.key}>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  _onRenderFluentUiTitle(options) {
    const option = options[0];

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }
}
