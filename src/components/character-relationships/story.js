import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CharacterRelationships from './';

storiesOf( 'Character Relationships', module )
    .add( 'default', () => {
        var relationships = [
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

        return <CharacterRelationships
            relationships={relationships}
            onEdit={(relationshipId, description) => console.log(`edit ${relationshipId} ${description}`)}
            onDelete={relationshipId => console.log(`delete ${relationshipId}`)}
        />;
    });
