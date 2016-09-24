import React from 'react';
import { cyan700, green700 } from 'material-ui/lib/styles/colors';

const MentionComponent = ({ mention, className, mentionPrefix, children }) => (
  <a
    href={mention.get('link')}
    className={className}
    style={{
      background: 'none',
      color: mention.get('type') === 'character' ? cyan700 : green700,
    }}
  >
    {mentionPrefix}{children}
  </a>
);

export default MentionComponent;
