import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Dna from './';

storiesOf('DNA', module )
    .add( 'default', () => {
        let genes = [
            {
                id: 'the first id',
                gene: 'the first gene',
                allele: 'the first allele'
            },
            {
                id: 'the second id',
                gene: 'the second gene',
                allele: 'the second allele'
            }
        ];

        return <Dna
            genes={genes}
            randomGene={{}}
            addGene={() => true}
            changeGene={() => true}
            deleteGene={action('delete')}
            id='the id'
        />;
    });
