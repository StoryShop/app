import TestUtils from 'react-addons-test-utils';

export default function getShallowInstance ( Component, context ) {
  const renderer = TestUtils.createRenderer();
  renderer.render( Component, context );
  return renderer.getRenderOutput();
};

