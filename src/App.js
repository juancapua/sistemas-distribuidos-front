import './App.css';
import { useEffect, useState } from 'react';
import UserService from './services/UserService';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material';
import UserCard from './components/UserCard'
import {set, useForm} from "react-hook-form";

function App() {

  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const [users, setUsers] = useState([])

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const [userCreated, setUserCreated] = useState(false)

  const [loading, setLoading] = useState(false)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    UserService.getUsers().then((users) => setUsers(users))
  }, [userCreated])

  const changeFile = (event) => {
    setFile(event.target.files[0]);
  }

  const handleCreate = (data) => {
    if(file !== null){
      setLoading(true)
    const formData = new FormData()
    formData.append('name', data.name);
    formData.append('image', file);

    UserService.createUser(formData).then(() => {
      setLoading(false)
      handleClose()
      reset()
      setFile(null)
      setUserCreated(!userCreated)
    })
    }
  }

  return (
    <Box>
      <Grid sx={{padding: "40px 10px"}} container spacing={2}>
        {users.length > 0 ? users.map((user) => {
          return <Grid key={user.id}> <UserCard props={user} /> </Grid>
        }) : <h2>No users</h2>}
      </Grid>
      <Button variant='contained' onClick={handleClickOpen}>Add user</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
          Add user
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
            <Button color="primary" aria-label="upload picture" component="label" sx={{height:"100%", width:"100%", borderRadius: "0px", paddingTop: "10px"}}>
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
