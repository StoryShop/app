import falcor, { Model } from 'falcor';
import ids from '../../build/ids.json';

const $ref = Model.ref;
const $atom = Model.atom;

const cache = {
  /**
   * Worlds
   */
  worldsById: {
    [ids.world1]: {
      id: ids.world1,
      title: 'Sesame Street',
      slug: 'sesame-street',

      // user-assigned colour-coding
      colour: 'yellow',

      owners: [
        $ref( `usersById["${ids.user1}"]` ),
      ],

      // users with roles
      writers: [
      ],
      readers: [
      ],

      elements: {
        0: $ref( `elementsById["${ids.element1}"]` ),
        length: 1,
      },

      outlines: {
        0: $ref( `outlinesById["${ids.outline1}"]` ),
        length: 1,
      },

      characters: {
        0: $ref( `charactersById["${ids.character1}"]` ),
        length: 1,
      },
    },
  },

  /**
   * Elements
   */
  elementsById: {
    [ids.element1]: {
      title: 'Stuffed Animals',

      // Optional. Probably auto-determined from image list
      displayImage: '/path/to/image',

      // images, pdfs, etc.
      attachments: [],

      // wysiwyg
      content: 'This is an important fact about his stuffed animals.',
    },
  },

  // TODO(jdm): Autocomplete for '#'; perhaps call?
  elementsByTitlePartial: {
  },

  /**
   * Story Beat Boards
   */
  outlinesById: {
    [ids.outline1]: {
      title: 'Episode 1',
      sections: [
        $ref( `sectionsById["${ids.section1}"]` ),
      ],
    },
  },

  /**
   * Sections
   */
  sectionsById: {
    [ids.section1]: {
      title: 'Scene 1',
      beats: [
        $ref( `beatsById["${ids.beat1}"]` ),
      ],

      // references used within this section's beats
      characters: [
        $ref( `charactersById["${ids.character1}"]` ),
      ],
      elements: [
        $ref( `elementsById["${ids.element1}"]` ),
      ],
    },

    [ids.section2]: {
      title: 'Big Bird Hatched',
      beats: [
        $ref( `beatsById["${ids.beat2}"]` ),
      ],

      // references used within this section's beats
      characters: [
        $ref( `charactersById["${ids.character1}"]` ),
      ],
      elements: [
        $ref( `elementsById["${ids.element1}"]` ),
      ],
    },
  },

  /**
   * Cards
   */
  beatsById: {
    [ids.beat1]: {
      // hyperlinked with elements and characters
      content: 'Something about @BigBird and his #StuffedAnimals',

      // Some storage options for replacing refs on render
      // refs: [
      //   {
      //     start: 16,
      //     end: 24,
      //     type: 'character',
      //     $ref( `charactersById["${ids.character1}"]` ),
      //   }
      // ],
      refs: {
        '@BigBird': $ref( `charactersById["${ids.character1}"]` ),
        '#StuffedAnimals': $ref( `elementsById["${ids.element1}"]` ),
      },
    },

    [ids.beat2]: {
      content: '@BigBird is born/hatched and gifted his first #StuffedAnimals.',
      refs: {
        '@BigBird': $ref( `charactersById["${ids.character1}"]` ),
        '#StuffedAnimals': $ref( `elementsById["${ids.element1}"]` ),
      },
    },
  },

  /**
   * Characters
   */
  charactersById: {
    [ids.character1]: {
      name: 'Big Bird',
      coverImage: '/path/to/image',
      avatarImage: '/path/to/image',
      aliases: $atom([
        'Yellow Beak',
      ]),

      /**
       * Includes ability to:
       *   - upload to world;
       *   - use hyperlink from web to add to world;
       *   - search for new image from "the web" to add to world;
       *   - use existing image to which the user has access (e.g. in same or different world, or
       *     perhaps purchased from a market);
       *
       * Likely a reference to another place on the graph.
       */
      images: [],

      // Like from story beat boards, but used e.g. for backstory.
      sections: [
        $ref( `sectionsById["${ids.section2}"]` ),
      ],

      // user-added k/v pairs; system-wide autocomplete
      attributes: [
        $atom([ 'feather colour', 'yellow' ]),
      ],

      // Questions that have been answered.
      genes: [
        {
          question: $ref( `dna.questionsById["${ids.dnaq1}"]` ),
          answer: 'A freak of nature, yet somehow beloved.',
        },
        {
          question: $ref( `dna.questionsById["${ids.dnaq2}"]` ),
          answer: 'When everyone acknowledged @Snuffy was real.',
        },
      ],

      relationships: [
        {
          description: 'Friend',
          character: $ref( `charactersById["${ids.character2}"]` ),

          /**
           * Query for beats:
           *   - character bio beats where this character appears
           *   - character bio beats of this character where the above character is referenced
           *   - story beat beats where both characters are referenced
           */
          beats: [
          ],
        },
      ],

      // Probably post-MVP
      // groups: [
      //   $ref( `characterGroupsById["${ids.characterGroup1}"]` ),
      // ],
    },

    [ids.character2]: {
      name: 'Snuffy',

      relationships: [
        {
          description: 'Friend',
          character: $ref( `charactersById["${ids.character1}"]` ),
        },
      ],
    },
  },

  // Probably post-MVP
  // characterGroupsById: {
  //   [ids.characterGroup1]: {
  //     description: 'AA Group',
  //     characters: [
  //       $ref( `charactersById["${ids.character1}"]` ),
  //       $ref( `charactersById["${ids.character2}"]` ),
  //     ],
  //   },
  // },

  dna: {
    questionsById: {
      [ids.dnaq1]: {
        question: 'What is your social status?',
        category: $ref( `dna.categoresById["${ids.dcat1}"]` ),
      },

      [ids.dnaq2]: {
        question: 'What is your happiest memory?',
        category: $ref( `dna.categoresById["${ids.dcat1}"]` ),
      },
    },

    categoresById: {
      [ids.dcat1]: {
        name: 'Demographics',
      },

      [ids.dcat2]: {
        name: 'Self and Personality',
      },
    },
  },

  /**
   * Users
   */
  usersById: {
    [ids.user1]: {
      email: 'seth@strangewind.com',
      name: {
        first: 'Seth',
        last: 'Merrick',
        display: 'Seth Merrick',
      },

      worlds: [
        $ref( `worldsById["${ids.world1}"]` ),
      ],

      ux: {
        lastVisited: `/worlds/${ids.world1}`,
      },
    },
  },

  /**
   * A reference to the currently authenticated user.
   */
  currentUser: $ref( `usersById["${ ids.user1 }"]` ),
};

const model = new Model({ cache }).batch();
if ( global.window ) {
  global.window.model = model;
}
export default model;

