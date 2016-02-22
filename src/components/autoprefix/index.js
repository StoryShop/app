import React from 'react';
import prefix from 'utils/autoprefix';

export default Component => ({ style = {}, ...props }) => (
  <Component style={prefix( style )} {...props} />
);

