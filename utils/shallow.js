import TestUtils from 'react-addons-test-utils';

export default function getShallowInstance ( Component ) {
  const renderer = TestUtils.createRenderer();
  renderer.render( Component );
  return renderer.getRenderOutput();
};

