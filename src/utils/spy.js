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

    oldMethod.apply( target, args );
  };

  return spy;
};

