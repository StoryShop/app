import reactStamp from 'react-stamp';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import IconButton from 'material-ui/lib/icon-button';
import ActionLabel from 'material-ui/lib/svg-icons/action/label';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ImageColorLens from 'material-ui/lib/svg-icons/image/color-lens';
import {
  Editor,
  ContentState,
  EditorState,
  createFromBlockArray,
  createFromText,
  convertFromRaw,
} from 'draft-js';
import { FlexLayout } from 'components/flex';

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.object,
    style: React.PropTypes.object,
  },

  state: {
    hover: false,
  },

  onMouseEnter () {
    this.setState({ hover: true });
  },

  onMouseLeave () {
    this.setState({ hover: false });
  },

  render () {
    const {
      title,
      content,
      cover,
      tags = [],

      style,
      ...props
    } = this.props;
    let contentState;

    if ( content ) {
      const { entityMap, blocks } = content;
      contentState = ContentState.createFromBlockArray( convertFromRaw({
        entityMap,
        blocks: blocks.slice( 0, 2 ),
      }));
    } else {
      contentState = ContentState.createFromText( '' );
    }

    const editorState = EditorState.createWithContent( contentState );

    const styles = {
      card: {
        ...style
      },

      tagList: {
        padding: 16,
        fontSize: 14,
        transition: 'all 250ms linear',
        opacity: this.state.hover ? '100' : 0,
      },

      tag: {
        marginRight: 5,
        backgroundColor: '#ddd',
        color: '#666',
        padding: 5,
        borderRadius: 2,
      },

      actions: {
        transition: 'all 250ms linear',
        opacity: this.state.hover ? '100' : 0,
      },
    };

    const tagEls = tags.map( ( tag, idx ) => (
      <span key={idx} style={styles.tag}>{tag}</span>
    ));

    return (
      <Card
        flex
        style={styles.card}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}

        {...props}
      >
        { cover ? <CardMedia><img src={cover} /></CardMedia> : null }

        <CardTitle
          title={title}
        />

        { content ? <CardText>
          <Editor
            readOnly={true}
            editorState={editorState}
          />
        </CardText> : null }

        { tags.length ? <div style={styles.tagList}> { tagEls } </div> : null }

        <CardActions style={styles.actions}>
          <IconButton>
            <ActionLabel color='#666' hoverColor='#000' />
          </IconButton>
          <IconButton>
            <ImageColorLens color='#666' hoverColor='#000' />
          </IconButton>
          <IconButton>
            <ActionDelete color='#666' hoverColor='#000' />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
}, ...behaviours );

