 import React from 'react';
import { Link } from 'react-router';
import { FlexLayout } from 'components/flex';
import * as themes from 'themes';
import * as paths from 'utils/paths';

export const Circle = ({
  fillColour,
  style,
  children,
  className = '',
}) => (
  <div
    className={`component-summary--circle ${className}`}
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
  title,

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

      <Link
        className='component-summary--link outlines'
        style={{textDecoration: 'none'}}
        to={paths.outlineList( worldId )}
        >
        <Circle fillColour={themes.outlines.palette.primary1Color} style={styles.circle3}>
          {outlines}
        </Circle>
      </Link>

      <FlexLayout
        direction='row'
        alignItems='center'
        justifyContent='center'
        >
        <Link
          className='component-summary--link elements'
          style={{textDecoration: 'none'}}
          to={paths.elementList( worldId, title )}
          >
          <Circle fillColour={themes.elements.palette.primary1Color} style={styles.circle1}>
            {elements}
          </Circle>
        </Link>
        <Link
          className='component-summary--link characters'
          style={{textDecoration: 'none'}}
          to={paths.characterList( worldId, title )}
          >
          <Circle fillColour={themes.characters.palette.primary1Color} style={styles.circle2}>
            {characters}
          </Circle>
        </Link>
      </FlexLayout>
    </FlexLayout>
  );
};
