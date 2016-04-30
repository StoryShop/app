global.STORYSHOP_API_URI = 'http://nonexistent';
const req = require.context( '.', true, /spec\.js$/ );
req.keys().forEach( req );

