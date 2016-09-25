import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import spy from 'utils/spy';

import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import Dna from './';

test('DNA', t => {
    let expected, actual;

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

    {
        let deleteCalled = false,
            component = shallow(<Dna genes={genes} deleteGene={() => deleteCalled = true} randomGene={{}} />),
            deleteButton = component.find('.dna-wrapper').first().find(IconButton);

        deleteButton.simulate('click');

        expected = true;
        actual = deleteCalled;
        t.equals(expected, actual, 'should call delete gene when clicking the delete gene button');
    };

    {
        let deletedIndex,
            component = shallow(<Dna genes={genes} deleteGene={i => deletedIndex = i} randomGene={{}} />),
            deleteButton = component.find('.dna-wrapper').last().find(IconButton);

        deleteButton.simulate('click');

        expected = 0;
        actual = deletedIndex;
        t.equals(expected, actual, 'should call delete gene with 0 index when clicking the last delete gene button');
    };

    {
        let deletedIndex,
            component = shallow(<Dna genes={genes} deleteGene={i => deletedIndex = i} randomGene={{}} />),
            deleteButton = component.find('.dna-wrapper').first().find(IconButton);

        deleteButton.simulate('click');

        expected = 1;
        actual = deletedIndex;
        t.equals(expected, actual, 'should call delete gene with 1 index when clicking the first of two delete gene buttons');
    };

    {
        let deletedGene,
            component = shallow(<Dna genes={genes} deleteGene={(i, g) => deletedGene = g} randomGene={{}} />),
            deleteButton = component.find('.dna-wrapper').first().find(IconButton);

        deleteButton.simulate('click');

        expected = genes[genes.length-1];
        actual = deletedGene;
        t.equals(expected, actual, 'should call delete gene with last gene when clicking the first delete gene button');
    };

    {
        let component = shallow(<Dna genes={genes} deleteGene={(i, g) => deletedGene = g} randomGene={{}} />),
            geneDivs = component.find('.dna-wrapper');

        expected = genes.length;
        actual = geneDivs.length;
        t.equals(expected, actual, 'should render all gene divs with the "dna-wrapper" css class');
    };

    t.end();
});
