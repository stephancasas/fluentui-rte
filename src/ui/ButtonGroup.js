/* @flow */

import React from 'react';
import cx from 'classnames';

import styles from './ButtonGroup.css';
import { Stack } from '@fluentui/react';

type Props = {
  className?: string,
};

export default function ButtonGroup(props: Props) {
  let className = cx(props.className, styles.root);
  return (
    <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
      <Stack horizontal tokens={{ childrenGap: 4 }}>
        {props.children}
      </Stack>
    </div>
  );
}
