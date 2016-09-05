import React from 'react';
import LoginFactory from 'components/login';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withUiStore from 'behaviours/with-ui-store';

const Login = LoginFactory(
  React,
  withShallowCompare
);

export default {
  component: Login,
};
