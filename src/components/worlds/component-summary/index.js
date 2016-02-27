import React from 'react';
import { Link } from 'react-router';
import { FlexLayout } from 'components/flex';
import { elementTheme, characterTheme, outlineTheme } from 'themes';
import * as paths from 'utils/paths';

export const Circle = ({
  fillColour,
  style,
  children,
}) => (
  <div
    className='component-summary--circle'
    style={{
      borderRadius: '50%',
      backgroundColor: fillColour,
      textAlign: 'center',
      ...style
    }}
    >
    {children}
  </div>
);

export default ({
  outlines = 0,
  elements = 0,
  characters = 0,
  worldId,

  style = {},
  circleStyle = {},
}) => {
  const styles = {
    container: {
      ...style
    },
    circle: {
      width: '60px',
      height: '60px',
      color: '#FFFFFF',
      lineHeight: '60px',
      fontSize: '24px',
      textDecoration: 'none',
      ...circleStyle
    },
  };

  styles.circle1 = {
    marginRight: '2px',
    ...styles.circle
  };

  styles.circle2 = {
    marginLeft: '2px',
    ...styles.circle
  };

  styles.circle3 = {
    marginBottom: '-5px',
    ...styles.circle
  };

  return (
    <FlexLayout
      element={<div className='component-summary' />}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={styles.container}
      >

      <Link style={{textDecoration: 'none'}} to={paths.outlineList( worldId )}>
        <Circle fillColour={outlineTheme.palette.primary1Color} style={styles.circle3}>
          {outlines}
        </Circle>
      </Link>

      <FlexLayout
        direction='row'
        alignItems='center'
        justifyContent='center'
        >
        <Link style={{textDecoration: 'none'}} to={paths.elementList( worldId )}>
          <Circle fillColour={elementTheme.palette.primary1Color} style={styles.circle1}>
            {elements}
          </Circle>
        </Link>
        <Link style={{textDecoration: 'none'}} to={paths.characterList( worldId )}>
          <Circle fillColour={characterTheme.palette.primary1Color} style={styles.circle2}>
            {characters}
          </Circle>
        </Link>
      </FlexLayout>
    </FlexLayout>
  );
};

