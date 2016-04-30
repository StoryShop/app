import { Observable } from 'rx';
import reactStamp from 'react-stamp';
import IconButton from 'material-ui/lib/icon-button';
import ExportIcon from 'material-ui/lib/svg-icons/file/cloud-download';
import connectToModel from 'behaviours/connect-to-model';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';
import EditorFactory from 'components/outlines/editor';

export function modelToProps ( model, props ) {
  const { world_id, outline_id } = props.params;
  const path = [ 'outlinesById', outline_id ];
  const paths = [
    [ ...path, [
      '_id',
      'title',
      'content'
    ]],
  ];

  return Observable.fromPromise( model.get( ...paths ) )
    .map( ({ json }) => {
      const outline = json.outlinesById[ outline_id ];

      return {
        world_id,
        ...outline,
      };
    })
    ;
};

export function actions ( model ) {
  return {
    setTitle ( _id, title ) {
      model.setValue([ 'outlinesById', _id, 'title' ], title );
    },

    setOutline ( _id, raw ) {
      model.setValue([ 'outlinesById', _id, 'content' ], raw );
    },

    download ( _id ) {
      model.get([ 'outlinesById', _id, 'opml' ])
        .then( ({ json }) => {
          const opml = json.outlinesById[ _id ].opml;
          const link = document.createElement( 'a' );
          link.setAttribute( 'href', `data:Application/octet-stream,${encodeURIComponent(opml)}` );
          link.setAttribute( 'download', 'export.opml' );
          link.click();
        });
    },
  };
}

export default React => {
  const Editor = EditorFactory( React, withShallowCompare );

  return connectToModel( React, modelToProps, actions, props => {
    const {
      _id,
      title,
      content,

      setTitle,
      setOutline,
      download,
    } = props;

    const styles = {
      container: {
        // height: '100%',
      },

      title: {
        margin: '0 0 20px',
        fontSize: '2em',
        fontWeight: 400,
      },
    };

    return (
      <FlexLayout direction="column" style={styles.container}>
        <FlexLayout direction="row">
          <InlineEdit value={title} onChange={title => setTitle( _id, title )} style={styles.title} />
          <span flex></span>

          <IconButton
            tooltip='Export to Scrivener'
            tooltipPosition='bottom-center'
            onClick={e => download( _id )}
          >
            <ExportIcon />
          </IconButton>
        </FlexLayout>

        <Editor
          onChange={e => setOutline( _id, e )}
          value={content}
        />
      </FlexLayout>
    );
  });
};

