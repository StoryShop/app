import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import ElementCard from 'components/elements/card';
import { FlexLayout } from 'components/flex';

const ElementList = ({
  world_id,
  elements,
  setContent,
  setTitle,
  deleteElement,
}) => {
  const styles = {
    card: {
      // cursor: 'pointer',
    },
  };

  const elementEls = Object.getOwnPropertyNames( elements )
    .filter( k => k.match( /^\d+$/ ) )
    .map( k => ({ idx: k, element: elements[ k ] }) )
    .map( ({ idx, element }) => (
      <div
        key={idx}
        style={{width: '25%'}}
      >
        <ElementCard
          world_id={world_id}
          setTitle={setTitle}
          setContent={setContent}
          deleteElement={deleteElement}
          style={styles.card}
          {...element}
        />
      </div>
    ));

  return (
    <div>
      <FlexLayout direction="row" wrap padding={10} style={{marginBottom: 10}}>
        { elementEls }
      </FlexLayout>
    </div>
  );
};

ElementList.modelPaths = function ( conf ) {
  const pagination = conf.pagination;

  return [
    [ pagination, [
      '_id',
      'title',
      'content',
      'cover',
      'tags',
    ]],
  ];
};

export default ElementList;

