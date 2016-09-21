import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import spy from 'utils/spy';

import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import CharacterRelationships from './';

test('CharacterRelationships', t => {
    let expected, actual;

    let relationships = [
        {
            _id: 'the first id',
            avatar: 'https://en.gravatar.com/userimage/10460545/28033602a20a2b3e9cd4db965c3b43c4.jpeg',
            name: 'Chris Harrington',
            description: 'Father'
        },
        {
            _id: 'the second id',
            name: 'Bruce Wayne',
            description: 'Batman'
        }
    ];

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />);

        expected = relationships.length;
        actual = component.find(ListItem).length;
        t.equals(expected, actual, 'rendered list items should match relationship count');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} onDelete={() => true} />),
            event = { stopPropagation: () => true },
            eventSpy = spy(event, 'stopPropagation'),
            rightIconButton = shallow(component.find(ListItem).first().prop('rightIconButton'));

        rightIconButton.simulate('click', event);

        expected = 1;
        actual = eventSpy.calls.length;
        t.equals(expected, actual, 'should prevent event bubbling on remove');
    };

    {
        let deleteCalled = false,
            component = shallow(<CharacterRelationships relationships={relationships} onDelete={() => deleteCalled = true} />),
            rightIconButton = shallow(component.find(ListItem).first().prop('rightIconButton'));

        rightIconButton.simulate('click', { stopPropagation: () => true });

        expected = true;
        actual = deleteCalled;
        t.equals(expected, actual, 'should call onDelete prop when removing a relationship');
    };

    {
        let deletedRelationshipId,
            component = shallow(<CharacterRelationships relationships={relationships} onDelete={r => deletedRelationshipId = r} />),
            rightIconButton = shallow(component.find(ListItem).first().prop('rightIconButton'));

        rightIconButton.simulate('click', { stopPropagation: () => true });

        expected = relationships[0]._id;
        actual = deletedRelationshipId;
        t.equals(expected, actual, 'should pass deleted relationship ID to onDelete prop');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />),
            listItem = component.find(ListItem).first();

        listItem.simulate('click');

        expected = relationships[0]._id;
        actual = component.state('id');
        t.equals(expected, actual, 'should set state with edited relationship on edit');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />),
            listItem = component.find(ListItem).first();

        listItem.simulate('click');

        expected = relationships[0].description;
        actual = component.state('description');
        t.equals(expected, actual, 'should set state with edited relationship\'s description on edit');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />),
            listItem = component.find(ListItem).first();

        listItem.simulate('click');

        expected = true;
        actual = component.state('editDialogOpen');
        t.equals(expected, actual, 'should open the edit dialog on edit');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />),
            cancelButton = shallow(component.find(Dialog).first().prop('actions')[0]);

        cancelButton.simulate('click');

        expected = false;
        actual = component.state('editDialogOpen');
        t.equals(expected, actual, 'should close the edit dialog on close');
    };

    {
        let editCalled = false,
            component = shallow(<CharacterRelationships relationships={relationships} onEdit={() => editCalled = true} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]);

        submitButton.simulate('click');

        expected = false;
        actual = editCalled;
        t.equals(expected, actual, 'should do nothing when the user failed to enter a description on save');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]);

        submitButton.simulate('click');

        expected = true;
        actual = !!component.state('error');
        t.equals(expected, actual, 'should set the error when the description is missing on save');
    };

    {
        let editCalled = false,
            component = shallow(<CharacterRelationships relationships={relationships} onEdit={() => editCalled = true} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]);

        component.setState({ description: 'the description' });
        submitButton.simulate('click');

        expected = true;
        actual = editCalled;
        t.equals(expected, actual, 'should call onEdit prop after passing validation on save');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} onEdit={() => true} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]);

        component.setState({ description: 'the description' });
        submitButton.simulate('click');

        expected = false;
        actual = component.state('editDialogOpen');
        t.equals(expected, actual, 'should close the dialog after passing validation on save');
    };

    {
        let component = shallow(<CharacterRelationships relationships={relationships} onEdit={() => true} />),
            descriptionText = component.find(TextField),
            event = { target: {
                value: 'the value'
            }};

        descriptionText.simulate('change', event);

        expected = event.target.value;
        actual = component.state('description');
        t.equals(expected, actual, 'should update the description on input change');
    };

    t.end();
});
