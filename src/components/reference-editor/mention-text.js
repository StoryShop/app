import React from 'react';
import { Link } from 'react-router';
import { cyan700, green700 } from 'material-ui/lib/styles/colors';

const MentionComponent = ({ mention, className, mentionPrefix, children }) => (
  <Link
    to={mention.get('link')}
    className={className}
    style={{
      background: 'none',
      color: mention.get('type') === 'character' ? cyan700 : green700,
    }}
  >
    {mentionPrefix}{children}
  </Link>
);

export default MentionComponent;
