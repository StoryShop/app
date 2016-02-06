import falcor, { Model } from 'falcor';

const $ref = Model.ref;

const cache = {
  peopleById: {
    josh: {
      id: 'josh',
      name: 'Josh',
      tags: [ 'cool', 'happy' ],
    },
    seth: {
      id: 'seth',
      name: 'Seth',
      tags: [ 'cool', 'excited' ],
    },
  },

  people: [
    $ref( 'peopleById.seth' ),
    $ref( 'peopleById.josh' ),
  ],
};

const model = new Model({ cache });
export default model;

