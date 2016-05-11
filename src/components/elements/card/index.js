import React from 'react';
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
import AttachFileIcon from 'material-ui/lib/svg-icons/editor/attach-file';
import EditorFactory from 'components/outlines/editor';
import InlineEdit from 'components/inline-edit';
import { UploadDialog } from 'components/files/upload';
import { FlexLayout } from 'components/flex';

const Editor = EditorFactory( React );

export default reactStamp( React ).compose({
  state: {
    hover: false,
    uploadDialogVisible: false,
  },

  onMouseEnter () {
    if ( ! this.props.readOnly ) return;

    this.setState({ hover: true });
  },

  onMouseLeave () {
    if ( ! this.props.readOnly ) return;

    this.setState({ hover: false });
  },

  _showUploadDialog () {
    this.setState({ uploadDialogVisible: true });
  },

  _hideUploadDialog () {
    this.setState({ uploadDialogVisible: false });
  },

  attachFile ( ref ) {
    this._hideUploadDialog();
    this.props.addAttachment( this.props._id, ref );

    if ( ! this.props.cover ) {
      this.props.setCover( this.props._id, ref );
    }
  },

  render () {
    const {
      _id,
      title,
      content,
      cover,
      world_id,
      readOnly = false,
      tags = [],
      files = [],

      style,
      setTitle,
      setContent,
      deleteElement,
      ...props
    } = this.props;

    const styles = {
      card: {
        ...style
      },

      content: {
      },

      contentGhost: {
        display: 'block',
        position: 'absolute',
        height: 75,
        top: 125,
        left: 0,
        right: 0,
        backgroundImage: 'linear-gradient( to bottom, transparent, white )',
        zIndex: 10,
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
        opacity: ! readOnly || this.state.hover ? '100' : 0,
      },
    };

    if ( readOnly ) {
      styles.content = {
        ...styles.content,

        maxHeight: 200,
        height: 200,
        overflow: 'hidden',
        position: 'relative', // to use absolute positioning on the ghost
      };
    }

    const tagEls = tags.map( ( tag, idx ) => (
      <span key={idx} style={styles.tag}>{tag}</span>
    ));

    const Component = readOnly ? Card : 'div';

    return (
      <Component
        flex
        style={styles.card}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}

        {...props}
      >
        { cover ? <CardMedia><img src={cover.url} /></CardMedia> : null }

        <CardTitle
          title={readOnly ? title : <InlineEdit value={title} onChange={val => setTitle( _id, val )} />}
        />

        { readOnly && ! content ? null : <CardText style={styles.content}>
          { readOnly ? <span style={styles.contentGhost} /> : null }

          <Editor
            readOnly={readOnly}
            value={content}
            onChange={e => setContent( _id, e )}
          />
        </CardText> }

        {/*
          { tags.length ? <div style={styles.tagList}> { tagEls } </div> : null }
        */}

        <CardActions style={styles.actions}>
          <IconButton onTouchTap={e => this._showUploadDialog()}>
            <AttachFileIcon color='#666' hoverColor='#000' />
          </IconButton>
          {/* <IconButton>
            <ActionLabel color='#666' hoverColor='#000' />
          </IconButton>
          <IconButton>
            <ImageColorLens color='#666' hoverColor='#000' />
          </IconButton> */}
          <IconButton onClick={e => deleteElement( world_id, _id )}>
            <ActionDelete color='#666' hoverColor='#000' />
          </IconButton>
        </CardActions>

        <UploadDialog
          open={this.state.uploadDialogVisible}
          onRequestClose={e => this._hideUploadDialog()}
          onSelect={ref => this.attachFile( ref )}
        />
      </Component>
    );
  },
});

