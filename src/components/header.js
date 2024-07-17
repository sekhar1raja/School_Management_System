import React, { useState, useEffect } from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

// Import Material-UI icons
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment'; // For Leave Request
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'rgb(93, 93, 255, 0.04)',

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
      backgroundColor: 'rgb(93, 93, 255, 0.04)',
      color: '#000000',
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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const listStyles = {
    subheader: {
      alignItems: 'start',
      background: '#5d5dff',
      color: '#fff',
      textAlign: 'start',
      paddingLeft: '23px',
      borderRadius: '10px',
      margin: '25px 25px',
    },
    listItem: {
      alignItems: 'centre',
      textAlign: 'start',
      borderRadius: '10px',
      '&:hover': {
        background: 'rgba(218, 218, 255, 1)',
        color: 'Black',
        fontweight: 'bold',
      },
    },
    listItemIcon: {
      color: '#000000', 
    },
  };

  const handleLogout = () => {
    // Navigate to login page
    navigate('/login');
  };

  useEffect(() => {
    // Read user role from local storage
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(parseInt(storedUserRole, 10));
  }, []);

  const renderTabs = () => {
    if (userRole === 1) {
      return (
        <>
         <ListSubheader inset sx={listStyles.subheader}>
        Admin
      </ListSubheader>
      <ListItem button component={Link} to="/Dashboard" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/EmployeeDetails" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">person</span>
        </ListItemIcon>
        <ListItemText primary="Employee Details" />
      </ListItem>
      <ListItem button component={Link} to="/studentdetails" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">school</span>
        </ListItemIcon>
        <ListItemText primary="Student Details" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">bar_chart</span>
        </ListItemIcon>
        <ListItemText primary="Financial Management" />
      </ListItem>
      <Divider />
      <ListSubheader inset sx={listStyles.subheader}>
        Teacher
      </ListSubheader>
      <ListItem button component={Link} to="/teacherdashboard" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">grading</span>
        </ListItemIcon>
        <ListItemText primary="Grade Profile" />
      </ListItem>
      <Divider />
      <ListSubheader inset sx={listStyles.subheader}>
        Student
      </ListSubheader>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">school</span>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">logout</span>
        </ListItemIcon>
        <button onClick={handleLogout}>Logout</button>
      </ListItem>
        </>
      );
    }
    //teacher//
    if (userRole === 3) {
      return (
        <>
          <ListSubheader inset sx={listStyles.subheader}>
            Teacher
          </ListSubheader>
          <ListItem button component={Link} to="/teacherdashboard" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">grading</span>
        </ListItemIcon>
        <ListItemText primary="Grade Profile" />
      </ListItem>
 
        </>
      );
    }
    //user//
    if (userRole === 2) {
      return (
        <>
         <ListSubheader inset sx={listStyles.subheader}>
        Student
      </ListSubheader>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">school</span>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-outlined">logout</span>
        </ListItemIcon>
        <button onClick={handleLogout}>Logout</button>
      </ListItem>
           
        </>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // Keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton >
              <InboxIcon />
            </IconButton>
            <IconButton >
              <NotificationsIcon />
            </IconButton>
            <IconButton >
              <AssignmentIcon />
            </IconButton>
            <IconButton >
              <AccountCircle />
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
          <List>{renderTabs()}</List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
