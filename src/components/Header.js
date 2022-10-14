import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 2 }} >
      <AppBar position="static" style={{background: '#BA262B'}}>
        <Toolbar variant="dense" style={{justifyContent: "center"}}>
          <Typography variant="h2" color="inherit" component="div">
            YoutubeViewer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}