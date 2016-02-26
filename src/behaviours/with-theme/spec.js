import test from 'tape';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import withTheme from './';
import spyOn from 'utils/spy';

test( 'withTheme behaviour', t => {
  let expected, actual;
  t.plan( 2 );

  const theme = { palette: {} };
  const instance = { muiTheme () { return theme; }, ...withTheme };

  const spy = spyOn( ThemeManager, 'getMuiTheme' );

  expected = 'object';
  actual = typeof instance.getChildContext();
  t.equals( actual, expected, 'should return an object' );

  expected = [ theme ];
  actual = spy.calls[0].args;
  t.deepEquals( actual, expected, 'should call ThemeManager with passed theme' );
});

