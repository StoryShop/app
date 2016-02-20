import test from 'tape';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import withTheme from './';
import spyOn from 'utils/spy';

test( 'withTheme behaviour', t => {
  let expected, actual;
  t.plan( 3 );

  expected = 'function';
  actual = typeof withTheme;
  t.equals( actual, expected, 'should be a function' );

  const theme = { palette: {} };
  const result = withTheme( theme );

  expected = 'object';
  actual = typeof result;
  t.equals( actual, expected, 'should return an object' );

  const spy = spyOn( ThemeManager, 'getMuiTheme' );
  result.getChildContext();
  expected = [ theme ];
  actual = spy.calls[0].args;
  t.deepEquals( actual, expected, 'should call ThemeManager with passed theme' );
});

