import './App.css';
import { useEffect, useState } from 'react';
import CabinService from './services/CabinService';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import CabinCard from './components/CabinCard'
import {useForm} from "react-hook-form";

function App() {

  const {register, handleSubmit, reset} = useForm();
  const [cabins, setCabins] = useState([])
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [cabinCreated, setCabinCreated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    CabinService.getCabins().then((cabins) => setCabins(cabins))
  }, [cabinCreated])

  const changeFile = (event) => {
    setFile(event.target.files[0]);
  }

  const handleCreate = (data) => {
    if(file !== null){
      setLoading(true)
    const formData = new FormData()
    formData.append('name', data.name);
    formData.append('image', file);

    CabinService.createCabin(formData).then(() => {
      setLoading(false)
      handleClose()
      reset()
      setFile(null)
      setCabinCreated(!cabinCreated)
    })
    }
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "50px"}}>
      <Typography align="center" variant="h4">Cabins</Typography>
      <Box>
        <Grid sx={{padding: "40px 10px"}} container spacing={2} alignItems="center" justifyContent="center">
          {cabins.length > 0 ? cabins.map((cabin) => {
            return <Grid item key={cabin.id}> <CabinCard props={cabin}/> </Grid>}) : <h2>No cabins</h2>}
        </Grid>
      </Box>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button variant='contained' onClick={handleClickOpen}>Add cabin</Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
          Add cabin
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
            <TextField
              autoFocus
              variant="outlined"
              {...register(
                "name",
                {required: 'Name required'})}
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
          />
            <Button color="primary" aria-label="upload picture" component="label" 
              sx={{height:"100%", width:"100%", borderRadius: "0px", paddingTop: "10px"}}>
              <input hidden accept="image/*" type="file" onChange={(e) => changeFile(e)} />
              Select an image
            </Button>
            <Box sx={{paddingTop: "10px"}}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">Create</Button>
            </Box>
          </form>
          <Box sx={{paddingTop:"10px"}}>
            {loading ? <LinearProgress /> : <></>}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
    
  );
}

export default App;
