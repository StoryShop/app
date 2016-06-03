import React from 'react';
import Paper from 'material-ui/lib/paper';
import MaterialAvatar from 'material-ui/lib/avatar';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import { FlexLayout } from 'components/flex';
import { UploadDropzone } from 'components/files/upload';
import InlineEdit from 'components/inline-edit';

const Avatar = ({
  name,
  aliases = '',
  avatar,
  style = {},
  onNameChange = () => true,
  onAliasChange = () => true,
  onAvatarChange = () => true,
  ...props
}) => {
  const styles = {
    container: {
      padding: 16,
      ...style
    },

    avatar: {
      width: 80,
      height: 80,
    },

    name: {
      fontWeight: 400,
      textAlign: 'center',
    },

    aliases: {
      textAlign: 'center',
    },

    akaLabel: {
      fontWeight: 800,
      fontSize: '12px',
      color: '#AAAAAA',
    },
  };

  return (
    <FlexLayout
      element={<Paper style={styles.container} />}
      direction="column"
      alignItems="center"
      justifyContent="center"
      >

      <FlexLayout
        direction="row"
        alignItems="center"
        justifyContent="center"
        element={<UploadDropzone onUpload={ref => onAvatarChange( ref )} />}
      >
        { avatar && avatar.url ?
          <MaterialAvatar
            src={avatar.url}
            size={100}
          /> : <MaterialAvatar icon={<CharacterIcon style={styles.avatar} />} size={100} />
        }
      </FlexLayout>

      <h2>
        <InlineEdit value={name} onChange={onNameChange} style={styles.name} />
      </h2>

    </FlexLayout>
  );
};

Avatar.displayName = 'CharacterAvatar';
Avatar.propTypes = {
  name: React.PropTypes.string.isRequired,
  aliases: React.PropTypes.string,
  style: React.PropTypes.object,
  onNameChange: React.PropTypes.func,
};

Avatar.modelPaths = () => {
  return [
    [
      'name',
      'aliases',
    ],
    [
      'avatar',
      [ 'url' ],
    ],
  ];
};

export default Avatar;

