import React from 'react';
import invariant from 'invariant';
import autoprefix from 'utils/autoprefix';

export const FlexLayout = ({
  element = <div />,

  /**
   * Flex Options
   */
  inline = false,
  direction = 'row',
  wrap = false,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'stretch',

  /**
   * Child Layout Options
   */
  padding = false,
  margin = false,

  style = {},
  childStyle = {},
  children,
}) => {
  style = {
    boxSizing: 'border-box',
    display: inline ? 'inline-flex' : 'flex',
    flexWrap: wrap ? 'wrap' : null,

    flexDirection: direction,
    justifyContent,
    alignItems,
    alignContent,

    ...style
  };

  childStyle = {
    boxSizing: 'border-box',

    ...childStyle
  }

  if ( padding ) {
    style.padding = padding;
    childStyle.padding = padding;
  }
  
  if ( margin ) {
    childStyle.margin = margin;
  }

  children = React.Children.map( children, child => {
    const oldStyle = child.props && child.props.style ? child.props.style : {};

    const style = {
      ...childStyle,
      flex: child.props && child.props.flex ? 1 : null,
      ...oldStyle
    };

    if ( child.props && child.props.flex ) {
      if ( child.props.flex !== true ) {
        style.flex = child.props.flex;
      } else {
        style.flex = '1';
      }
    }

    return React.cloneElement( child, { style: autoprefix( style ) } );
  });

  return React.cloneElement( element, { style: autoprefix( style ), children } );
};
FlexLayout.propTypes = {
  element: React.PropTypes.oneOfType([
    React.PropTypes.element,
  ]),

  inline: React.PropTypes.bool,
  wrap: React.PropTypes.bool,

  direction: React.PropTypes.string,
  justifyContent: React.PropTypes.string,
  alignItems: React.PropTypes.string,
  alignContent: React.PropTypes.string,

  margin: React.PropTypes.number,
  padding: React.PropTypes.number,
};

