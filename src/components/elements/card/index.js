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
import EditorFactory from 'components/outlines/editor';
import InlineEdit from 'components/inline-edit';
import { FlexLayout } from 'components/flex';

const Editor = EditorFactory( React );

export default reactStamp( React ).compose({
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
      _id,
      title,
      content,
      cover,
      world_id,
      tags = [],

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
          title={<InlineEdit value={title} onChange={val => setTitle( _id, val )} />}
        />

        { content ? <CardText>
          <Editor
            readOnly={false}
            value={content}
            onChange={e => setContent( _id, e )}
          />
        </CardText> : null }

        {/*
          { tags.length ? <div style={styles.tagList}> { tagEls } </div> : null }
        */}

        <CardActions style={styles.actions}>
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
      </Card>
    );
  },
});

