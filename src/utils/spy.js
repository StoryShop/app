export default ( target, method ) => {
  let spy = {
    calls: [],

    reset () {
      this.calls = [];
    },
  };

  const oldMethod = target[ method ];
  target[ method ] = ( ...args ) => {
    spy.calls.push({
      args: args,
    });

    return oldMethod.apply( target, args );
  };

  return spy;
};

export const createSpy = oldMethod => {
  let spy;

  spy = function ( ...args ) {
    spy.calls.push({
      args: args,
    });

    if ( oldMethod ) {
      return oldMethod( ...args );
    }
  };

  spy.calls = [];
  spy.reset = () => spy.calls = [];

  return spy;
};

