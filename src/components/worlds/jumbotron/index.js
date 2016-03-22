import React from 'react';
import * as colours from 'material-ui/lib/styles/colors';
import InlineEdit from 'components/inline-edit';
import { FlexLayout } from 'components/flex';
import ComponentSummary from 'components/worlds/component-summary';

const Jumbotron = ({
  worldId,
  title,
  colour,
  outlines,
  characters,
  elements,

  onTitleChange = () => true,
  style = {},

  ...props
}) => {
  const colourShade = 'A100';

  const styles = {
    container: {
      height: '400px',
      padding: '60px 20px',
      backgroundColor: colours[ `${colour}${colourShade}` ] || colours[ 'faintBlack' ],
      borderRadius: '4px',
      textAlign: 'center',

      ...style
    },

    header: {
      margin: 0,
      fontWeight: 400,
      width: '100%',
    },

    edit: {
      textAlign: 'center',
    },
  };

  return (
    <FlexLayout
      element={<div className='world-jumbotron' style={styles.container} />}
      direction='column'
      alignItems='center'
      justifyContent='center'
      >
      <ComponentSummary
        worldId={worldId}
        outlines={outlines}
        elements={elements}
        characters={characters}
        style={{ marginBottom: '20px' }}
      />
      <div flex />
      <h1 style={styles.header}>
        <InlineEdit value={title} style={styles.edit} onChange={onTitleChange} />
      </h1>
    </FlexLayout>
  );
};

Jumbotron.propTypes = {
  worldId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  outlines: React.PropTypes.number.isRequired,
  characters: React.PropTypes.number.isRequired,
  elements: React.PropTypes.number.isRequired,
  onTitleChange: React.PropTypes.func,
  colour: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default Jumbotron;

