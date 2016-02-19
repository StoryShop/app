import React from 'react';
import test from 'tape';
import { FlexContainer, Flex } from './';
import getShallowInstance from '../../../utils/shallow';

test( 'FlexContainer', t => {
  let actual, expected, result;

  t.plan( 16 );

  result = getShallowInstance( <FlexContainer Component='div'>Hello</FlexContainer> );
  actual = result.props.children;
  expected = 'Hello';
  t.equals( actual, expected, 'should pass through children' );

  result = getShallowInstance( <FlexContainer style={{ color: 'red' }} Component='div'>Hello</FlexContainer> );
  actual = result.props.style.color;
  expected = 'red';
  t.equals( actual, expected, 'should pass through other styles' );

  result = getShallowInstance( <FlexContainer /> );
  actual = result.type;
  expected = 'div';
  t.equals( actual, expected, 'should render a div by default' );

  /**
   * Default Styles
   */
  actual = result.props.style.display;
  expected = 'flex';
  t.equals( actual, expected, 'should use default display style' );

  actual = result.props.style.flexDirection;
  expected = 'row';
  t.equals( actual, expected, 'should use default flex direction style' );

  actual = result.props.style.flexWrap;
  expected = undefined;
  t.equals( actual, expected, 'should use default flex wrap style' );

  actual = result.props.style.flexJustifyContent;
  expected = 'flex-start';
  t.equals( actual, expected, 'should use default flex justify content style' );

  actual = result.props.style.flexAlignItems;
  expected = 'stretch';
  t.equals( actual, expected, 'should use default flex align items style' );

  actual = result.props.style.flexAlignContent;
  expected = 'stretch';
  t.equals( actual, expected, 'should use default flex align content style' );

  /**
   * Style overrides through props
   */
  result = getShallowInstance(
    <FlexContainer
      Component='section'

      flexInline={true}
      flexDirection='column'
      flexWrap={true}
      flexJustifyContent='flex-end'
      >
      Hello
    </FlexContainer>
  );

  actual = result.type;
  expected = 'section';
  t.equals( actual, expected, 'should render the passed component' );

  actual = result.props.style.display;
  expected = 'inline-flex';
  t.equals( actual, expected, 'should use inline display style with flexInline prop' );

  actual = result.props.style.flexDirection;
  expected = 'column';
  t.equals( actual, expected, 'should use overridden flex direction style' );

  actual = result.props.style.flexWrap;
  expected = 'wrap';
  t.equals( actual, expected, 'should use overridden flex wrap style' );

  actual = result.props.style.flexJustifyContent;
  expected = 'flex-end';
  t.equals( actual, expected, 'should use overridden flex justify content style' );

  actual = result.props.style.flexAlignItems;
  expected = 'stretch';
  t.equals( actual, expected, 'should use overridden flex align items style' );

  actual = result.props.style.flexAlignContent;
  expected = 'stretch';
  t.equals( actual, expected, 'should use overridden flex align content style' );
});

test( 'Flex', t => {
  let actual, expected, result;

  t.plan( 13 );

  /**
   * Defaults
   */
  result = getShallowInstance( <Flex Component='div'>Hello</Flex> );
  actual = result.props.children;
  expected = 'Hello';
  t.equals( actual, expected, 'should pass through children' );

  result = getShallowInstance( <Flex style={{ color: 'red' }} Component='div'>Hello</Flex> );
  actual = result.props.style.color;
  expected = 'red';
  t.equals( actual, expected, 'should pass through other styles' );

  /**
   * Defaults
   */
  result = getShallowInstance( <Flex Component='span' /> );

  actual = result.type;
  expected = 'span';
  t.equals( actual, expected, 'should render a span by default' );

  actual = result.props.style.order;
  expected = 0;
  t.equals( actual, expected, 'should use the default flex order' );

  actual = result.props.style.alignSelf;
  expected = 'auto';
  t.equals( actual, expected, 'should use the default flex align self' );

  actual = result.props.style.flex;
  expected = null;
  t.equals( actual, expected, 'should use the default flex' );

  /**
   * Overrides through props
   */
  result = getShallowInstance(
    <Flex
      Component='div'

      flexOrder={1}
      flexAlignSelf='flex-start'
      flex={1}
    />
  );

  actual = result.type;
  expected = 'div';
  t.equals( actual, expected, 'should render the overriden component' );

  actual = result.props.style.order;
  expected = 1;
  t.equals( actual, expected, 'should use the overridden flex order' );

  actual = result.props.style.alignSelf;
  expected = 'flex-start';
  t.equals( actual, expected, 'should use the overridden flex align self' );

  actual = result.props.style.flex;
  expected = 1;
  t.equals( actual, expected, 'should use the overridden flex' );

  /**
   * Use syntactic sugar for stretching flex child
   */
  result = getShallowInstance( <Flex /> );

  actual = result.props.style.flex;
  expected = 1;
  t.equals( actual, expected, 'should use flex 1 for syntactic sugar' );

  actual = result.type;
  expected = 'span';
  t.equals( actual, expected, 'should use span for syntactic sugar' );

  /**
   * Allowing for sugar without requires props
   */
  result = () => getShallowInstance( <Flex flex={1} /> );

  t.throws( result, 'should throw when flex prop is provided without a Component prop' );
});

