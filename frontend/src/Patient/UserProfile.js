import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar  from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

function PatientProfile() {
    const [show, setShow] = React.useState(false);
    const [width, setWidth] = React.useState(12);
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
            width: '10vw', 
            height: '10vw',
            fontSize: '6vw',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    function handleClick () {
        setShow(!show);
        if (show){
            setWidth(12);
        }
        else{
            setWidth(6);
        }
    }
  return (
    <CardActionArea sx={{ height:'100%', display: 'flex', flexDirection: 'row' }} onClick={handleClick}>
        <CardMedia sx={{width: '50%'}}>
            <Grid container id="Grid" justifyContent="space-evenly">
                <Grid item id="GridItem" sx={{ p: 2 }}>
                    <Avatar {...stringAvatar('Firstname Lastname')}/>
                </Grid>
                <Grid item id="GridItem">
                    <Typography variant="caption" color="text.secondary">Name</Typography>
                    <Typography variant="h6">Firstname Lastname</Typography>
                </Grid>
            </Grid>
        </CardMedia>
        {show ? (
            <CardContent sx={{ width:'50%', p:0 }}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Age</Typography>
                        <Typography variant="subtitle2">[age] years</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Date Of Birth</Typography>
                        <Typography variant="subtitle2">[YYYY-MM-DD]</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Contact</Typography>
                        <Typography variant="subtitle2">[XXX-XXX-XXXX]</Typography>
                        <Typography variant="subtitle2">[XXXXXX@XXXXXX.XX]</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Address</Typography>
                        <Typography variant="subtitle2">[full address]</Typography>
                    </Grid>
                <IconButton sx={{ position: 'absolute', bottom:'5px', right:'5px' }} aria-label="edit"><EditIcon /></IconButton >
                </Grid>
            </CardContent>
        ) : null}
    </CardActionArea>
  );
}

export default PatientProfile;
