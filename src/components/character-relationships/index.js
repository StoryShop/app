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

export default class CharacterRelationships extends React.Component {
    constructor() {
        super();
        this.state = {
            editDialogOpen: false,
        };
    };

    render() {
        return <div className='character-relationships'>
            <List>
                <List>
                    {this.props.relationships.map(relationship => {
                        return <ListItem
                                    primaryText={relationship.name}
                                    secondaryText={relationship.description}
                                    leftAvatar={
                                        relationship.avatar ? <Avatar src={relationship.avatar} /> : <Avatar icon={ <PersonIcon /> } />
                                    }
                                    rightIconButton={
                                        <IconButton tooltip='Remove relationship' onClick={this.remove.bind(this, relationship)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    onClick={this.edit.bind(this, relationship)}
                                />;
                    })}
                </List>
            </List>

            <Dialog
                actions={[
                    <FlatButton label='Cancel' primary={true} onClick={this.close.bind(this)} />,
                    <FlatButton label='Submit' primary={true} onClick={this.save.bind(this)} />
                ]}
                open={this.state.editDialogOpen}
                title='Edit Relationship'>
                <span>Enter a new description for the relationship below.</span>
                <br />
                <TextField placeholder='Description' value={this.state.description} onChange={this.onChange.bind(this)} errorText={this.state.error} />
            </Dialog>
        </div>;
    };

    remove(relationship, event) {
        this.props.onDelete(relationship._id);
        event.stopPropagation();
    };

    edit(relationship) {
        this.setState({
            id: relationship._id,
            description: relationship.description,
            editDialogOpen: true
        });
    };

    close() {
        this.setState({
            editDialogOpen: false
        });
    };

    save(relationship) {
        if (!this.validate())
            return;

        this.props.onEdit(this.state.id, this.state.description);
        this.close();
    };

    validate() {
        if (this.state.description === '') {
            this.setState({
                error: 'The description is required.'
            });
            return false;
        }

        return true;
    };

    onChange(e) {
        this.setState({
            description: e.target.value
        });
    };
};
