import browser from '../../../../../wdio';

export default id => ({
  titleSelector: '.world-jumbotron h1 textarea',
  circleSelector: '.component-summary--circle',

  outlinesLinkSelector: '.component-summary--link.outlines',
  elementsLinkSelector: '.component-summary--link.elements',
  charactersLinkSelector: '.component-summary--link.characters',

  go () {
    return browser.url( `/worlds/${id}` );
  },

  getComponentSummaryCircles () {
    return browser.elements( this.circleSelector ).then( res => res.value );
  },

  getTitle () {
    return browser.getValue( this.titleSelector );
  },

  setTitle ( title ) {
    return browser.setValue( this.titleSelector, title );
  },
});

