import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, AppBar as MuiAppBar, Toolbar, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Drawer as MuiDrawer, Typography } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import headerImage from '../WhatsApp Image 2024-07-05 at 11.15.22_43710085.jpg'; // Adjust the path accordingly

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
      color: '#828299',
      '&:hover': {
        background: 'rgba(218, 218, 255, 1)',
        color: 'Black',
        fontweight: 'bold',
      },
    },
    listItemIcon: {
      color: '#828299',
    },
  };

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(parseInt(storedUserRole, 10));
    console.log(storedUserRole );
  }, []);

  const renderTabs = () => {
    if (userRole === 1) {
      return (
        <>
          <img src={headerImage} alt="Header" style={{ width: 'auto', height: '100px' }} />
          <ListSubheader inset sx={listStyles.subheader}>
            Admin
          </ListSubheader>
          <ListItem button component={Link} to="/Dashboard" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">dashboard</span>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/EmployeeDetails" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">person</span>
            </ListItemIcon>
            <ListItemText primary="Employee Details" />
          </ListItem>
          <ListItem button component={Link} to="/studentdetails" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">school</span>
            </ListItemIcon>
            <ListItemText primary="Student Details" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">bar_chart</span>
            </ListItemIcon>
            <ListItemText primary="Financial Management" />
          </ListItem>
          <Divider />
          <ListSubheader inset sx={listStyles.subheader}>
            Teacher
          </ListSubheader>
          <ListItem button component={Link} to="/teacherdashboard" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">dashboard</span>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/assigncourse" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">book</span>
            </ListItemIcon>
            <ListItemText primary="Assign Courses" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">co_present</span>
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem button component={Link} to="/eventcalander" sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">calendar_today</span>
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">assignment</span>
            </ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">grading</span>
            </ListItemIcon>
            <ListItemText primary="Grade Profile" />
          </ListItem>
          <Divider />
          <ListSubheader inset sx={listStyles.subheader}>
            Student
          </ListSubheader>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">dashboard</span>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">co_present</span>
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">book</span>
            </ListItemIcon>
            <ListItemText primary="Course Details" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">calendar_today</span>
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">assignment</span>
            </ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
            <ListItemIcon sx={listStyles.listItemIcon}>
              <span className="material-symbols-rounded">grading</span>
            </ListItemIcon>
            <ListItemText primary="Grade Profile" />
          </ListItem>
          <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">logout</span>
        </ListItemIcon>
        <button onClick={handleLogout}>Logout</button>
      </ListItem>
        </>
      );
    }   //teacher//
    if (userRole === 2) {
      return (
        <>
          <ListSubheader inset sx={listStyles.subheader}>
            Professor
          </ListSubheader>
          <ListItem button component={Link} to="/teacherdashboard" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/coursedetail" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button  component={Link} to="/attendance"sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button  component={Link} to="/eventcalander" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">grading</span>
        </ListItemIcon>
        <ListItemText primary="Grade Profile" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">logout</span>
        </ListItemIcon>
        <button onClick={handleLogout}>Logout</button>
      </ListItem>
        </>
      );
    }
    //user//
    if (userRole === 3) {
      return (
        <>
         <ListSubheader inset sx={listStyles.subheader}>
        Student
      </ListSubheader>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">dashboard</span>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">co_present</span>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">book</span>
        </ListItemIcon>
        <ListItemText primary="Course Details" />
      </ListItem>
      <ListItem button  component={Link} to="/eventcalander" sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">calendar_today</span>
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">assignment</span>
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">school</span>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button sx={listStyles.listItem}>
        <ListItemIcon sx={listStyles.listItemIcon}>
          <span className="material-symbols-rounded">logout</span>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              gap: '2rem',
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '50px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
             
            </IconButton>
            <Box sx={{ flexGrow: '1' }} />
            <Typography variant="h5" component="h5" color='black'>
                  Welcome to Edu System 👋
                </Typography>
            <IconButton>
              <span className="material-symbols-rounded">chat_bubble</span>
            </IconButton>
            <IconButton>
              <span className="material-symbols-rounded">mail</span>
            </IconButton>
            <IconButton>
              <span className="material-symbols-rounded">notification_important</span>
            </IconButton>
            <IconButton>
              <span className="material-symbols-rounded">account_circle</span>
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
        
          <Toolbar />
          
        </Box>
      
    </ThemeProvider>
  );
}
