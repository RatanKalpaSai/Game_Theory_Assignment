/* eslint-disable react/prop-types */
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import People from "@mui/icons-material/People";
import Dashboard from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

// frontend/src/components/Sidebar.jsx
const Sidebar = ({ width, ...restProps }) => {
  const [clickedItem, setClickedItem] = useState(0); // Start with the first item

  const navigate = useNavigate();

  const handleListItemClick = (index) => {
    setClickedItem(index);
    if (index === 0) {
      navigate('/');
    } else if (index === 1) {
      navigate('/customer');
    } else if (index === 2) {
      navigate('/schedule');
    }
  };

  return (
    <Box {...restProps} sx={{ width, background: '#0f172a', height: '100%', position: 'absolute' }}>
      <Typography variant="h4" color="white" padding={3} fontStyle='italic' fontFamily='Salsa, cursive'>Game Theory Booking App</Typography>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'white', height: '2px' }} />
      <List
        sx={{ width: '100%', maxWidth: 360, color: 'white' }}
        component="nav"
      >
        {["Dashboard", "Customers", "Schedule"].map((text, index) => (
          <ListItemButton
            key={text}
            onClick={() => handleListItemClick(index)}
            sx={{
              transition: 'transform 0.2s ease',
              opacity: clickedItem === index ? '1' : '0.6', 
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <ListItemIcon>
              {index === 0 ? <Dashboard sx={{color: 'white'}} /> : index === 1 ? <People sx={{ color: 'white' }} /> : <CalendarMonth sx={{ color: 'white' }} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;