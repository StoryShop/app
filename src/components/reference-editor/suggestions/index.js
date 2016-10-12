import React from 'react';
import { fromJS } from 'immutable';
import EntryComponent from './entry';

export default function (MentionSuggestions) {
  return ({ suggestions, ...rest }) => (
    <MentionSuggestions
      {...rest}
      suggestions={fromJS(suggestions)}
      entryComponent={EntryComponent}
      style={{ boxShadow: 'none' }}
    />
  );
}
