# Contributing

A general overview of our preferred Git Workflow can be found here:

[https://gist.github.com/joshdmiller/dd1a0cc40e06f1aa47c7](https://gist.github.com/joshdmiller/dd1a0cc40e06f1aa47c7)

One key point is that we would prefer all Pull Requests be submitted from branches on our main `StoryShop` repos, rather than from engineers' forks, so that we are in a better position to expedite review & approval by making small corrections if need be. If you are not already a member of the org, please let us know if you would like to be granted write access for the purpose of submitting a PR.

## Introduction

For this walkthrough, we're going to create a new route that handles the items for a character. This is not something that we would implement in the actual project and is only intended to demonstrate the structure of the app.

A few things you should review before getting started:

1. [Material-UI](http://www.material-ui.com/#/)
2. [Tape](https://github.com/substack/tape)
3. [RxJS Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)
4. [react-stamp](https://github.com/stampit-org/react-stamp)

## Routing

The directory structure mirrors the URL structure. For our new `items` route, we would need to nest it within a single character.

```js
// src/routes/worlds/one/characters/one/items/route.js
import React from 'react';
import Items from './';

export default {
  path: ':character_id/items',
  component: Items,
};
```

And since this is a child route of `characters`, we should add this as a childRoute:

```js
// src/routes/worlds/one/characters/index.js
import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import characterListRoute from './list/route';
import characterRoute from './one/route';
import itemsRoute from './one/items/route';

export default {
  path: 'characters',
  indexRoute: characterListRoute,
  onEnter: () => {
    uiStore.dispatch( setTheme( 'characters' ) );
  },
  childRoutes: [
    characterRoute,
    itemsRoute,
  ],
};
```

The last thing we need to do for routing is update our route utility, which keeps track of all our routes.

```js
// src/utils/paths.js
...

export const characterItems = ( wid, cid ) => `/app/worlds/${wid}/characters/${cid}/items`;

...
```

## Components

We're going to build a simple component that renders a list of items that belong to the character.

Since we're using MaterialUI, we will use their components whenever possible. In this case, we are using the `List` and `ListItem` components from MaterialUI.

```js
// src/components/characters/items/index.js
import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { FlexLayout } from 'components/flex';

export default ({
  character,
  items = {},
}) => {
  const rows = Object.getOwnPropertyNames( items )
    .filter( k => k.match ( /^\d+$/ ) )
    .sort()
    .map( k => ({ idx: k, item: items[ k ] }) )
    .map( ({ idx, item: { name } }) => (
      <ListItem
        key={idx}
        primaryText={name}
      />
    ));

  return (
    <FlexLayout direction="column">
      <h2>Items for {character.name}</h2>

      { rows }
    </FlexLayout>
  )
}
```

We need to wrap our component in some data, so in the higher-order component below, we're mapping our model and our action to `props`. If you've used Redux, this is similar to the `connect` function.

```js
// src/../characters/one/items/index.js
import React from 'react';
import connectToModel from 'behaviours/connect-to-model';
import modelToProps from './model-to-props';
import mapActionToProps from './actions';
import Items from 'components/characters/items'

export default connectToModel( React, modelToProps, mapActionToProps, Items );
```

We also need to make the action that will be mapped to our component. Anything that is returned will get passed in as a prop, so the idea is that you would want to return functions that work as actions that interact directly with the model.

```js
// src/../characters/one/items/actions.js
export default function ( model ) {
  return {
    setName ( id, name ) {
      model.setValue([ 'itemsById', id, 'name' ], name);
    }
  }
}

```

## ModelToProps

In the example below, we're mocking the actual data we would receive by using `Observable.of`, but normally we would not use that block and we would get the actual data from Falcor.

```js
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';
import Relationships from 'components/characters/relationships';

export default function modelToProps ( model, props ) {
  return Observable.of({
    character: {
      name: 'Joe'
    },
    items: {
      length: 2,
      0: {
        _id: '1',
          name: 'Magic Flute',
      },
      1: {
        _id: '2',
          name: 'Sword of Gondhor',
      },
      2: {
        _id: '3',
          name: 'Amulet of Truthiness',
      },
    },
  });

  /**
   * it would really be like this...
   */
  const { character_id } = props.params;
  const path = [ 'charactersById', character_id, 'items' ];

  const prefetchPaths = [
    [ ...path, 'length' ],
  ];

  return Observable.fromPromise( model.get( ...prefetchPaths ) )
    .concatMap( data => {
      const { json } = data;
      const {
        items,
      } = json.charactersById[ character_id ];

      const paths = [
        // 'charactersById', '1234', 'items', { from: 0, to: items.length }, [ '_id', 'name' ]
        [ ...path, { from: 0, to: items.length }, [ '_id', 'name' ] ],
      ];

      return model.get( ...paths, ...prefetchPaths ).then( v => v );
    })
    .map( ({ json }) => {
      const items = json.charactersById[ character_id ].items;

      return {
        items,
      };
    });
}
```

## Working with Falcor

Falcor sends data as an object that mimics the behavior of an array by using numerical keys. For example, if your data looks like this in json:

```json
[
  {
    "prop": "value"
  }
]
```

It would look like this in Falcor, with a length property that designates the number of items in the dataset. This is because Falcor requires pagination.

```js
{
  0: {
    prop: "value"
  },
  length: 1
}
```

## Testing

We use [Tape](https://github.com/substack/tape) for testing. We are advocates for test driven development, but you are by no means obligated to do so. You should, however, write tests before submitting a pull request.

For our character items example, a sample test would look something like the following:

```js
import test from 'tape';
import CharacterItems from './';

test('CharacterItems', t => {
  t.plan( 1 );
  t.ok( true, 'this is a basic test' );
})
```

## Larger components

For larger components that need to manage local state, we use `react-stamp` to compose them, which is a way of composing React elements.

<!-- TODO -->
