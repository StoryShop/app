import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import InlineEdit from './';

storiesOf( 'InlineEdit', module )
  .add( 'default', () => (
    <InlineEdit
      defaultValue='value...'
      onChange={action('onChange')}
    />
  ))
  ;

