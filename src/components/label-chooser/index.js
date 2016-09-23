import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import LabelIcon from 'material-ui/lib/svg-icons/action/label';
import PencilIcon from 'material-ui/lib/svg-icons/content/create';
import PlusIcon from 'material-ui/lib/svg-icons/content/add';

export default class LabelChooser extends React.Component {
    constructor() {
        super();
        this.state = {
            create: {
                open: false,
                value: null,
                error: null
            },

            edit: {
                open: false,
                id: null,
                value: null,
                error: null
            }
        };
    };

    render() {
        return <div className='label-chooser'>
            <List>
                {this.props.labels.map((label, i) => {
                    return <ListItem
                        key={i}
                        primaryText={label.value}
                        leftIcon={
                            <LabelIcon />
                        }
                        rightIconButton={
                            <IconButton tooltip='Edit label' tooltipPosition='bottom-left' onClick={this.openEdit.bind(this, label)}>
                                <PencilIcon />
                            </IconButton>
                        }
                        onClick={this.onSelect.bind(this, label._id)}
                    />;
                })}
                <ListItem
                    primaryText='Add Label'
                    leftIcon={
                        <PlusIcon />
                    }
                    onClick={this.openCreate.bind(this)}
                />
            </List>

            <Dialog
                actions={[
                    <FlatButton label='Cancel' primary={true} onClick={this.closeCreate.bind(this)} />,
                    <FlatButton label='Submit' primary={true} onClick={this.submitCreate.bind(this)} />
                ]}
                open={this.state.create.open}
                title='Create Label'>
                    <span>Enter a the value for the new label.</span>
                    <br />
                    <TextField placeholder='Label' value={this.state.create.value} onChange={this.onChange.bind(this, 'create', 'value')} errorText={this.state.create.error} />
            </Dialog>

            <Dialog
                actions={[
                    <IconButton style={{ float: 'left', width: 38, height: 38, padding: 0 }} onClick={this.remove.bind(this)}>
                        <DeleteIcon style={{ width: 38, height: 38 }} />
                    </IconButton>,
                    <FlatButton label='Cancel' primary={true} onClick={this.closeEdit.bind(this)} />,
                    <FlatButton label='Save' primary={true} onClick={this.submitEdit.bind(this)} />
                ]}
                open={this.state.edit.open}
                title='Edit Label'>
                <span>Enter the new value for the label.</span>
                <br />
                <TextField placeholder='Label' value={this.state.edit.value} onChange={this.onChange.bind(this, 'edit', 'value')} errorText={this.state.edit.error} />
            </Dialog>
        </div>;
    };

    openEdit(label, event) {
        event.stopPropagation();

        let edit = this.state.edit;
        edit.open = true;
        edit.value = label.value;
        edit.id = label._id;
        this.setState({
            edit: edit
        });
    };

    submitEdit() {
        let edit = this.state.edit;
        if (!edit.value)
            edit.error = 'The label value is required.';
        else {
            edit.error = null;
            edit.open = false;
        }

        this.setState({
            edit: edit
        });

        this.props.onChange(this.state.edit.id, this.state.edit.value);
    };

    closeEdit() {
        let edit = this.state.edit;
        edit.open = false;
        edit.error = null;
        this.setState({
            edit: edit
        });
    };

    remove() {
        this.props.onDelete(this.state.edit.id);
        this.closeEdit();
    };

    openCreate() {
        let create = this.state.create;
        create.open = true;
        this.setState({
            create: create
        });
    };

    closeCreate() {
        let create = this.state.create;
        create.open = false;
        create.error = null;
        create.value = null;
        this.setState({
            create: create
        });
    };

    submitCreate() {
        let create = this.state.create;
        if (!create.value)
            create.error = 'The new label value is required.';
        else {
            this.props.onAdd(create.value);
            create.value = null;
            create.open = false;
            create.error = null;
        }

        this.setState({
            create: create
        });

    };

    onChange(base, key, event) {
        let baseState = this.state[base];
        baseState[key] = event.target.value;

        let state = this.state;
        state[base] = baseState;
        this.setState(state);
    };

    onSelect(label) {
        this.props.onSelect(label);
    };
};
