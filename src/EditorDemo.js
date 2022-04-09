/* @flow */
import React, { Component } from 'react';
import RichTextEditor, { createEmptyValue } from './RichTextEditor';
import { convertToRaw } from 'draft-js';
import autobind from 'class-autobind';

import {
  getTextAlignBlockMetadata,
  getTextAlignClassName,
} from './lib/blockStyleFunctions';

import type { EditorValue } from './RichTextEditor';

type Props = {};
type State = {
  value: EditorValue,
  format: string,
  readOnly: boolean,
};

export default class EditorDemo extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: createEmptyValue(),
      format: 'html',
      readOnly: false,
    };
  }

  render() {
    let { value } = this.state;

    return (
      <div>
        <RichTextEditor
          value={value}
          onChange={this._onChange}
          placeholder="Say something fluently..."
          toolbarOnBottom
          readOnly={this.state.readOnly}
          blockStyleFn={getTextAlignClassName}
        />
      </div>
    );
  }

  _logState() {
    let editorState = this.state.value.getEditorState();
    let contentState = (window.contentState = editorState
      .getCurrentContent()
      .toJS());
    console.log(contentState);
  }

  _logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = (window.rawContentState = convertToRaw(contentState));
    console.log(JSON.stringify(rawContentState));
  }

  _onChange(value: EditorValue) {
    this.setState({ value });
  }

  _onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format, {
        customBlockFn: getTextAlignBlockMetadata,
      }),
    });
  }

  _onChangeFormat(event: Object) {
    this.setState({ format: event.target.value });
  }

  _onChangeReadOnly(event: Object) {
    this.setState({ readOnly: event.target.checked });
  }
}
