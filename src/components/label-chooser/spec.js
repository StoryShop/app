import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import spy from 'utils/spy';

import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import LabelChooser from './';

test('LabelChooser', t => {
    let expected, actual;

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

    {
        let component = shallow(<LabelChooser labels={labels} />);

        expected = labels.length + 1;
        actual = component.find(ListItem).length;
        t.equals(expected, actual, 'rendered list items should be one greater than label count');
    };

    {
        let component = shallow(<LabelChooser labels={labels}  />),
            event = { stopPropagation: () => true },
            eventSpy = spy(event, 'stopPropagation'),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton'));

        editButton.simulate('click', event);

        expected = 1;
        actual = eventSpy.calls.length;
        t.equals(expected, actual, 'should prevent event bubbling on edit');
    };

    {
        let component = shallow(<LabelChooser labels={labels} onSelect={() => true} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton'));

        editButton.simulate('click', { stopPropagation: () => true });

        expected = { error: null, open: true, value: labels[0].value, id: labels[0]._id };
        actual = component.state('edit');
        t.deepEqual(expected, actual, 'should set edit data when clicking a label');
    };

    {
        let component = shallow(<LabelChooser labels={labels} onChange={() => true} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton')),
            submitButton = shallow(component.find(Dialog).last().prop('actions')[2]);

        editButton.simulate('click', { stopPropagation: () => true });
        submitButton.simulate('click');

        expected = false;
        actual = component.state('edit').open;
        t.deepEqual(expected, actual, 'should close edit dialog on submit');
    };

    {
        let changeValues,
            component = shallow(<LabelChooser labels={labels} onChange={(id, value) => changeValues = { id: id, value: value }} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton')),
            submitButton = shallow(component.find(Dialog).last().prop('actions')[2]);

        editButton.simulate('click', { stopPropagation: () => true });

        let state = component.state();
        state.edit.value = 'the new value';
        component.setState(state);

        submitButton.simulate('click');

        expected = { id: state.edit.id, value: state.edit.value };
        actual = changeValues;
        t.deepEqual(expected, actual, 'should call onChange prop with label\'s ID and new value when editing a label');
    };

    {
        let component = shallow(<LabelChooser labels={labels} onChange={() => true} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton')),
            closeButton = shallow(component.find(Dialog).last().prop('actions')[1]);

        editButton.simulate('click', { stopPropagation: () => true });
        closeButton.simulate('click');

        expected = { open: false, error: null, id: labels[0]._id, value: labels[0].value };
        actual = component.state('edit');
        t.deepEqual(expected, actual, 'should reset edit state when closing the edit dialog');
    };

    {
        let component = shallow(<LabelChooser labels={labels} onChange={() => true} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton')),
            submitButton = shallow(component.find(Dialog).last().prop('actions')[2]);

        editButton.simulate('click', { stopPropagation: () => true });

        let state = component.state();
        state.edit.value = '';
        component.setState(state);

        submitButton.simulate('click');

        actual = component.state('edit').error;
        t.ok(actual, 'should display error when new label value is missing');
    };

    {
        let deleteCalled = false,
            component = shallow(<LabelChooser labels={labels} onDelete={() => deleteCalled = true} />),
            iconButton = shallow(component.find(Dialog).last().prop('actions')[0]);

        iconButton.simulate('click', { stopPropagation: () => true });

        expected = true;
        actual = deleteCalled;
        t.equals(expected, actual, 'should call onDelete prop when removing a label');
    };

    {
        let deletedLabelId,
            component = shallow(<LabelChooser labels={labels} onDelete={id => deletedLabelId = id} />),
            editButton = shallow(component.find(ListItem).first().prop('rightIconButton')),
            removeButton = shallow(component.find(Dialog).last().prop('actions')[0]);

        editButton.simulate('click', { stopPropagation: () => true });
        removeButton.simulate('click');

        expected = labels[0]._id;
        actual = deletedLabelId;
        t.equals(expected, actual, 'should pass deleted label ID to onDelete prop when removing a label');
    };

    {
        let component = shallow(<LabelChooser labels={labels} />),
            addListItem = component.find(ListItem).last();

        addListItem.simulate('click');

        expected = true;
        actual = component.state('create').open;
        t.equals(expected, actual, 'should open create dialog when adding a new label');
    };

    {
        let component = shallow(<LabelChooser labels={labels} />),
            closeButton = shallow(component.find(Dialog).first().prop('actions')[0]);

        closeButton.simulate('click');

        expected = { open: false, value: null, error: null };
        actual = component.state('create');
        t.deepEqual(expected, actual, 'should reset create state when clicking cancel');
    };

    {
        let component = shallow(<LabelChooser labels={labels} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]);

        submitButton.simulate('click');

        actual = component.state('create').error;
        t.ok(actual, 'should show error when no value is provided on submit');
    };

    {
        let addedValue,
            component = shallow(<LabelChooser labels={labels} onAdd={v => addedValue = v} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]),
            state = component.state(),
            value = 'the new value';

        state.create.value = value;
        component.setState(state);

        submitButton.simulate('click');

        expected = value;
        actual = addedValue;
        t.equals(expected, actual, 'should call onAdd prop with entered value on submit');
    };

    {
        let component = shallow(<LabelChooser labels={labels} onAdd={() => true} />),
            submitButton = shallow(component.find(Dialog).first().prop('actions')[1]),
            state = component.state();

        state.create.value = 'the new value';
        component.setState(state);

        submitButton.simulate('click');

        expected = { value: null, open: false, error: null };
        actual = component.state('create');
        t.deepEqual(expected, actual, 'should reset create state on successful submit');
    };

    {
        let component = shallow(<LabelChooser labels={labels} />),
            textField = component.find(Dialog).first().find(TextField),
            value = 'the new value';

        textField.simulate('change', {
            target: {
                value: value
            }
        });

        expected = value;
        actual = component.state().create.value;
        t.equals(expected, actual, 'should update the edit value when changing the create text field');
    };

    {
        let component = shallow(<LabelChooser labels={labels} />),
            textField = component.find(Dialog).last().find(TextField),
            value = 'the new value';

        textField.simulate('change', {
            target: {
                value: value
            }
        });

        expected = value;
        actual = component.state().edit.value;
        t.equals(expected, actual, 'should update the edit value when changing the edit text field');
    };

    {
        let selectValue,
            component = shallow(<LabelChooser labels={labels} onSelect={v => selectValue = v} />),
            listItem = component.find(ListItem).first();

        listItem.simulate('click');

        expected = labels[0]._id;
        actual = selectValue;
        t.equals(expected, actual, 'should call onSelect prop with selected label\'s ID');
    };

    t.end();
});
