import React from 'react';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/lib/raised-button';
import { FlexLayout } from 'components/flex';

export default ({ children }) => {
  const betaMessage = (
    <FlexLayout direction="row" style={{ margin: '20px' }}>
      <span flex></span>
      <RaisedButton
        label='Beta Login'
        primary={true}
        linkButton={true}
        href='/#/login'
      />
      <span flex></span>
    </FlexLayout>
  );

  return (
    <DocumentTitle title='StoryShop Beta'>
      { children || betaMessage }
    </DocumentTitle>
  );
};

