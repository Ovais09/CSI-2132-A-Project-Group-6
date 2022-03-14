import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [show, setShow] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  function handleClick () {
      setShow(!show);
  }

  return (
    <CardActionArea sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }} onClick={handleClick}>
            <CardMedia>
              <Typography variant="h5" align="left">Rate [branch name]</Typography>
            </CardMedia>
            {show ? (
                <CardContent>
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption" color="text.secondary" sx={{pt: 3 }}>Professionnalism of employees</Typography>
                      <Rating name="hover-feedback" value={value} precision={0.5} 
                          onChange={(event, newValue) => {setValue(newValue);}}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{p: 2 }} size="large"  />
                      <TextField id="outlined-textarea" label="Tell us how we did!" placeholder="Review" multiline
                      />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption" color="text.secondary" sx={{pt: 3 }}>Professionnalism of employees</Typography>
                      <Rating name="hover-feedback" value={value} precision={0.5} 
                          onChange={(event, newValue) => {setValue(newValue);}}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{p: 2 }} size="large"  />
                      <TextField id="outlined-textarea" label="Tell us how we did!" placeholder="Review" multiline
                      />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption" color="text.secondary" sx={{pt: 3 }}>Professionnalism of employees</Typography>
                      <Rating name="hover-feedback" value={value} precision={0.5} 
                          onChange={(event, newValue) => {setValue(newValue);}}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{p: 2 }} size="large"  />
                      <TextField id="outlined-textarea" label="Tell us how we did!" placeholder="Review" multiline
                      />
                    </div>
                    <Button variant="contained" color="secondary" sx={{ mt: 3 }} endIcon={<SendIcon />}>Send</Button>
                </CardContent>
            ) : null}
        </CardActionArea>
  );
}