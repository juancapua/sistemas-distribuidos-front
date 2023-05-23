import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const CabinCard = ({props}) => {
  return (
    <Box sx={{padding: "10px", paddingBottom: "10px"}}>
      <Card sx={{ minWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{props.name}</Typography>
          <Typography gutterBottom variant="body" component="div">Beds: {props.beds}</Typography>
          <Typography gutterBottom variant="body" component="div">Price per night: ${props.price}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CabinCard