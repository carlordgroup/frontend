import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './avatarIcon.css'

function AccountIcon() {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar alt ="default" sx={{ width: 45, height: 45 }} />
      </Stack>
    );
}

const AvatarIcon = () => {
    return (
      <div className='iconPad'>
          <AccountIcon />
      </div>
    )
}

export default AvatarIcon