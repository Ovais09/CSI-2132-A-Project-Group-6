import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar  from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        width: '30px', 
        height: '30px',
        fontSize: '20px',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Link component="button" variant="subtitle1" underline="hover" sx={{ color: 'text.primary', fontSize: 34, p: 3 }} onClick={() => {console.info("I'm a button."); }}>
          Disconnect
        </Link>
        <Link component="button" variant="subtitle1" underline="hover" sx={{ color: 'text.primary', fontSize: 34, p: 3 }} onClick={() => {console.info("I'm a button."); }}>
          Employee Dashboard
        </Link>
        <Link component="button" variant="subtitle1" underline="hover" sx={{ color: 'text.primary', fontSize: 34, p: 3 }} onClick={() => {console.info("I'm a button."); }}>
          Help
        </Link>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}
          >PATIENT DASHBOARD</Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show mails" color="inherit">
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Avatar {...stringAvatar('Firstname Lastname')}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}