import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import LabelChooser from './';

storiesOf( 'Label Chooser', module )
    .add( 'default', () => {
        let labels = [
            {
                _id: 'the first id',
                value: 'the first label'
            },
            {
                _id: 'the second id',
                value: 'the second label'
            }
        ];

        return <LabelChooser
            labels={labels}
            onSelect={action('select')}
            onAdd={action('add')}
            onDelete={action('delete')}
            onChange={action('change')}
        />;
    });
