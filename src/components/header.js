import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher, faGraduationCap, faGrip, faUserGraduate, faChartLine, faBook, faClipboardUser, faTrophy } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const listStyles = {
    subheader: {
      padding: '8px',
    },
    listItem :{
      '&:hover': {
        background: '#b0d7f9',
        color: 'black',
        fontweight: 'bold',
      },
     
    },
    listItemIcon: {
      color: 'black',
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListSubheader inset sx={listStyles.subheader}>Admin</ListSubheader>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faGrip} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faUser} />
              </ListItemIcon>
              <ListItemText primary="Employee Details" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faUserGraduate} />
              </ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faChartLine} />
              </ListItemIcon>
              <ListItemText primary="Financial Management " />
            </ListItem>
            <Divider />
            <ListSubheader inset sx={listStyles.subheader}>Teacher</ListSubheader>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faGrip} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faBook} />
              </ListItemIcon>
              <ListItemText primary="Course Details" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </ListItemIcon>
              <ListItemText primary="Semester Progress" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faUser} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListSubheader inset sx={listStyles.subheader}>Student</ListSubheader>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faGrip} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faClipboardUser} />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faTrophy} />
              </ListItemIcon>
              <ListItemText primary="Academics" />
            </ListItem>
            <ListItem button sx={listStyles.listItem}>
              <ListItemIcon sx={listStyles.listItemIcon}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Drawer>
        
          <Toolbar />
         
        
      </Box>
    </ThemeProvider>
  );
}
