import React from 'react';
import DropZone from 'react-dropzone';

const UploadFromComputer = ({
  onDrop,
  style,

  ...props
}) => {
  const styles = {
    dropzone: {
      width: '100%',
      border: '1px dashed #666',
      borderRadius: 5,

      ...style
    },

    content: {
      margin: 'auto',
    },
  };

  return (
    <DropZone onDrop={ onDrop } style={styles.dropzone}>
      <div style={styles.content}>
        Drop some bitches up in here!
      </div>
    </DropZone>
  );
};

UploadFromComputer.propTypes = {
  onDrop: React.PropTypes.func.isRequired,
};

export default UploadFromComputer;

