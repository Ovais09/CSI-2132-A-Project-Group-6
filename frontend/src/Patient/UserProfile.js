import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar  from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import PendingIcon from '@mui/icons-material/Pending';


function PatientProfile() {
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
  return (
    <div className="PatientProfile">
        <div className="Body">
            <Accordion>
                <AccordionSummary 
                expandIcon={<PendingIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                    <Grid container id="Grid" justifyContent="space-evenly">
                        <Grid item id="GridItem">
                            <Grid item sm={5} md={12} id="GridItem">
                                <Avatar {...stringAvatar('Firstname Lastname')}/>
                            </Grid>
                            <Grid item sm={7} md={12} id="GridItem">
                                <Typography variant="caption" color="text.secondary">Name</Typography>
                                <Typography variant="h6">Firstname Lastname</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Age</Typography>
                            <Typography variant="subtitle2">[age] years</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Date Of Birth</Typography>
                            <Typography variant="subtitle2">[YYYY-MM-DD]</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Contact</Typography>
                            <Typography variant="subtitle2">[XXX-XXX-XXXX]</Typography>
                            <Typography variant="subtitle2">[XXXXXX@XXXXXX.XX]</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Address</Typography>
                            <Typography variant="subtitle2">[full address]</Typography>
                        </Grid>
                    </Grid>
            </Accordion>
          </div>
    </div>
  );
}

export default PatientProfile;
