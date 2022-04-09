/* @flow */

import React, { Component } from 'react';
import IconButton from './IconButton';
import InputPopover from './InputPopover';
import autobind from 'class-autobind';
import { Callout } from '@fluentui/react';

type Props = {
  iconName: string,
  showPopover: boolean,
  defaultValue?: string,
  checkOptions?: {
    [key: string]: { label: string, defaultValue: boolean },
  },
  onTogglePopover: Function,
  onSubmit: Function,
};

export default class PopoverIconButton extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let { onTogglePopover, showPopover, checkOptions, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div>
        <IconButton id={props.iconName} {...props} onClick={onTogglePopover}>
          {/* {this._renderPopover()} */}
        </IconButton>
        {this.props.showPopover && (
          <Callout
            target={`#${this.props.iconName}`}
            onDismiss={onTogglePopover}
          >
            <InputPopover
              defaultValue={this.props.defaultValue}
              checkOptions={this.props.checkOptions}
              onSubmit={this._onSubmit}
              onCancel={this._hidePopover}
            />
          </Callout>
        )}
      </div>
    );
  }

  _renderPopover() {
    if (!this.props.showPopover) {
      return null;
    }
    return (
      <InputPopover
        defaultValue={this.props.defaultValue}
        checkOptions={this.props.checkOptions}
        onSubmit={this._onSubmit}
        onCancel={this._hidePopover}
      />
    );
  }

  _onSubmit() {
    this.props.onSubmit(...arguments);
  }

  _hidePopover() {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...arguments);
    }
  }
}
