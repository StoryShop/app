import React from 'react';
import test from 'tape';
import { FlexLayout } from './';
import getShallowInstance from 'utils/shallow';

test( 'FlexLayout', t => {
  let actual, expected, result;

  t.plan( 25 );

  result = getShallowInstance( <FlexLayout element={<div />}><span>Hello</span></FlexLayout> );
  actual = result.props.children[0].type;
  expected = 'span';
  t.equals( actual, expected, 'should pass through children' );

  result = getShallowInstance( <FlexLayout style={{ color: 'red' }} element={<div />}>Hello</FlexLayout> );
  actual = result.props.style.color;
  expected = 'red';
  t.equals( actual, expected, 'should pass through other styles' );

  result = getShallowInstance( <FlexLayout><span>Hello</span></FlexLayout> );
  actual = result.type;
  expected = 'div';
  t.equals( actual, expected, 'should render a div by default' );

  /**
   * Default Styles
   */
  actual = result.props.style.display;
  // expected = [ '-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex' ];
  expected = 'flex';
  t.deepEquals( actual, expected, 'should use default display style' );

  actual = result.props.style.flexDirection;
  expected = 'row';
  t.equals( actual, expected, 'should use default flex direction style' );

  actual = result.props.style.flexWrap;
  expected = null;
  t.equals( actual, expected, 'should use default flex wrap style' );

  actual = result.props.style.justifyContent;
  expected = 'flex-start';
  t.equals( actual, expected, 'should use default flex justify content style' );

  actual = result.props.style.alignItems;
  expected = 'stretch';
  t.equals( actual, expected, 'should use default flex align items style' );

  actual = result.props.style.alignContent;
  expected = 'stretch';
  t.equals( actual, expected, 'should use default flex align content style' );

  /**
   * Default Child Styles
   */

  actual = result.props.children[0].props.style.boxSizing;
  expected = 'border-box';
  t.equals( actual, expected, 'should use border-box on children' );

  /**
   * Style overrides through props
   */
  result = getShallowInstance(
    <FlexLayout
      element={<section style={{color: 'blue'}} />}

      inline={true}
      direction='column'
      wrap={true}
      justifyContent='flex-end'
      alignItems='flex-end'
      alignContent='flex-end'
      padding={8}
      margin={8}
      >
      <span style={{color: 'red'}}>Zero</span>
      <span flex>One</span>
      <span flex='2'>Two</span>
    </FlexLayout>
  );

  actual = result.type;
  expected = 'section';
  t.equals( actual, expected, 'should render the passed element' );

  actual = result.props.style.display;
  // expected = [ '-webkit-inline-box', '-webkit-inline-flex', '-ms-inline-flexbox', 'inline-flex' ];
  expected = 'inline-flex';
  t.deepEquals( actual, expected, 'should use inline display style with flexInline prop' );

  actual = result.props.style.flexDirection;
  expected = 'column';
  t.equals( actual, expected, 'should use overridden flex direction style' );

  actual = result.props.style.flexWrap;
  expected = 'wrap';
  t.equals( actual, expected, 'should use overridden flex wrap style' );

  actual = result.props.style.justifyContent;
  expected = 'flex-end';
  t.equals( actual, expected, 'should use overridden flex justify content style' );

  actual = result.props.style.alignItems;
  expected = 'flex-end';
  t.equals( actual, expected, 'should use overridden flex align items style' );

  actual = result.props.style.alignContent;
  expected = 'flex-end';
  t.equals( actual, expected, 'should use overridden flex align content style' );

  actual = result.props.children[0].props.style.margin;
  expected = 8;
  t.equals( actual, expected, 'should use provided margin around children' );

  actual = result.props.children[0].props.style.padding;
  expected = 8;
  t.equals( actual, expected, 'should use provided padding around children' );

  actual = result.props.style.padding;
  expected = 8;
  t.equals( actual, expected, 'should use provided padding around the element' );

  actual = result.props.style.color;
  expected = 'blue';
  t.equals( actual, expected, 'should preserve element styles' );

  actual = result.props.children[0].props.style.color;
  expected = 'red';
  t.equals( actual, expected, 'should preserve child styles' );

  actual = result.props.children[0].props.style.flex;
  expected = null;
  t.equals( actual, expected, 'should not give flex styling to children without the `flex` prop' );

  actual = result.props.children[1].props.style.flex;
  expected = '1';
  t.equals( actual, expected, 'should apply `flex: 1` to children with the `flex` prop' );

  actual = result.props.children[2].props.style.flex;
  expected = '2';
  t.equals( actual, expected, 'should pass on flex style to children with the `flex` prop' );
});

