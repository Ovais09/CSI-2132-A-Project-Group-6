import '../App.css';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar  from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';

function PatientProfile({userID}) {
    const [values, setValues] = React.useState({
      userId: userID,
      userName: 'FirstName LastName',
      age: '17',
      DOB: '2004-01-01',
      contact: '613-163-6131',
      address: 'sdsddvsvd'
    });

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
            children: `${name.split(' ')[0]}`,
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
    function getAge(birthDate){
        var today = new Date();
        var age = today.getFullYear() - parseInt(birthDate.substring(0, 4));
        console.log("age  "+age);
        var m = today.getMonth() - parseInt(birthDate.substring(5, 7));
        if (m < 0)
        {
            return age-1;
        }
        else if (m == 0 && today.getDate() < parseInt(birthDate.substring(8,)))
        {
            return age-1;
        }
        return age;
    }

  const getUserInfo = () => {
    fetch('http://localhost:3000/handleProfile', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userID })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"+data.name);
      
      setValues({ ...values, userId: userID, userName: data.name, age: 22, DOB: data.DOB, contact: data.contact, address: data.address});
    });
  }
  useEffect(() => {
    getUserInfo();
  },[]);
  
  return (
    <CardActionArea sx={{ height:'100%', display: 'flex', flexDirection: 'row' }} onClick={handleClick}>
        <CardMedia sx={{width: '50%'}}>
            <Grid container id="Grid" justifyContent="space-evenly">
                <Grid item id="GridItem" sx={{ p: 2 }}>
                    <Avatar {...stringAvatar("name")}/>
                </Grid>
                <Grid item id="GridItem">
                    <Typography variant="caption" color="text.secondary">Name</Typography>
                    <Typography variant="h6">{values.userName.replace(" null", '')}</Typography>
                </Grid>
            </Grid>
        </CardMedia>
        {show ? (
            <CardContent sx={{ width:'50%', p:0 }}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Age</Typography>
                        <Typography variant="subtitle2">{getAge(values.DOB.substring(0, 9))} years</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Date Of Birth</Typography>
                        <Typography variant="subtitle2">{values.DOB.substring(0, 9)}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Contact</Typography>
                        <Typography variant="subtitle2">{values.contact.split(" ")[0]}</Typography>
                        <Typography variant="subtitle2">{values.contact.split(" ")[1]}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary">Address</Typography>
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">{values.address.split(" ")[0]+" "+values.address.split(" ")[1]}</Typography>
                            <Typography variant="subtitle2">{values.address.split(" ")[2]+" "+values.address.split(" ")[3]}</Typography>
                        </Stack>
                    </Grid>
                <IconButton sx={{ position: 'absolute', bottom:'5px', right:'5px' }} aria-label="edit"><EditIcon /></IconButton >
                </Grid>
            </CardContent>
        ) : null}
    </CardActionArea>
  );
}

export default PatientProfile;
