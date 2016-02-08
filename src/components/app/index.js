import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import WithFalcor from '../../with-falcor';

export const App = ({ names, children }) => (
  <div>
    <AppBar title={`Hello, ${names || 'Loading...'}!`} />
    <div>{children}</div>
  </div>
);

export const resolve = json => {
  const names = [0, 1].map( p => json.people[p].name ).join( ' and ');
  return { names };
};

export default WithFalcor( App, resolve, 'people[0..1]["name"]' );

