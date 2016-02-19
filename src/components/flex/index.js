import React from 'react';
import invariant from 'invariant';

export const FlexContainer = ({
  Component = 'div',

  flexInline = false,
  flexDirection = 'row',
  flexWrap = false,
  flexJustifyContent = 'flex-start',
  flexAlignItems = 'stretch',
  flexAlignContent = 'stretch',

  ...props
}) => {
  props.style = {
    display: flexInline ? 'inline-flex' : 'flex',
    flexWrap: flexWrap ? 'wrap' : undefined,

    flexDirection,
    flexJustifyContent,
    flexAlignItems,
    flexAlignContent,

    ...props.style
  };

  return ( <Component {...props} /> );
};
FlexContainer.propTypes = {
  Component: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),

  flexInline: React.PropTypes.bool,
  flexWrap: React.PropTypes.bool,

  flexDirection: React.PropTypes.string,
  flexJustifyContent: React.PropTypes.string,
  flexAlignItems: React.PropTypes.string,
  flexAlignContent: React.PropTypes.string,
};

export const Flex = ({
  Component = null,

  flexOrder = 0,
  flexAlignSelf = 'auto',
  flex = null,

  ...props,
}) => {
  invariant(
    Component !== null || ( Component === null && flex === null ),
    'Flex requires a Component prop if a flex prop is provided.'
  );

  // Syntactic sugar, making `<Flex />` === `<Flex Component='span' flex={1} />`
  if ( Component === null ) {
    Component = 'span';
    flex = 1;
  }

  props.style = {
    alignSelf: flexAlignSelf,
    order: flexOrder,
    flex,

    ...props.style
  };

  return( <Component {...props} /> );
};
Flex.propTypes = {
  flexOrder: React.PropTypes.number,
  flexAlignSelf: React.PropTypes.string,
  flex: React.PropTypes.number,
};

