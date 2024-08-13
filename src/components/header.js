import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Drawer as MuiDrawer,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { ThemeProvider, styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import headerImage from "../WhatsApp Image 2024-07-05 at 11.15.22_43710085.jpg"; // Adjust the path accordingly
import "./style.css";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: "rgb(93, 93, 255, 0.04)",
    color: "#000000",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'scrolled',
})(({ theme, open, scrolled }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin', 'box-shadow', 'background-color', 'backdrop-filter'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(scrolled && {
    boxShadow: 'rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    backdropFilter: 'saturate(200%) blur(1.875rem)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'rgb(52, 71, 103)',
  }),
}));

const listStyles = {
  subheader: {
    alignItems: "start",
    background: "#5d5dff",
    color: "#fff",
    textAlign: "start",
    paddingLeft: "23px",
    borderRadius: "10px",
    margin: "25px 25px",
  },
  listItem: {
    alignItems: "center",
    textAlign: "start",
    borderRadius: "10px",
    color: "#828299",
    "&:hover": {
      background: "rgba(218, 218, 255, 1)",
      color: "black",
      fontWeight: "bold",
    },
  },
  listItemIcon: {
    color: "#828299",
  },
};

export default function Dashboard() {
  const [isDrawerOpen, setOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(''); // New state for user name
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50); // Adjust the scroll position value as needed
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(parseInt(storedUserRole, 10));
    const storedUserName = localStorage.getItem('firstName'); // Fetch user name from local storage
    setUserName(storedUserName || 'User'); // Default to 'User' if no name is found
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const breadcrumbNameMap = {
    "/dashboard": "Dashboard",
    "/employeedetails": "Employee Details",
    "/studentdetails": "Student Details",
    "/financialmanagement": "Financial Management",
    "/teacherdashboard": "Teacher Dashboard",
    "/assigncourse": "Assign Courses",
    "/attendance": "Attendance",
    "/eventcalendar": "Calendar",
    "/assignassignments": "Assignments",
    "/gradeprofile": "Grade Profile",
    "/profile": "Profile",
  };

  const breadcrumbs = location.pathname
    .split("/")
    .filter((x) => x)
    .map((value, index, array) => {
      const last = index === array.length - 1;
      const to = `/${array.slice(0, index + 1).join("/")}`;
      return last ? (
        <Typography color="textPrimary" key={to}>
          {breadcrumbNameMap[to]}
        </Typography>
      ) : (
        <MuiLink component={Link} to={to} key={to}>
          {breadcrumbNameMap[to]}
        </MuiLink>
      );
    });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" scrolled={scrolled} sx={{ background: "tranaprent" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 5, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={userName}>
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={isDrawerOpen}>
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <img
                src={headerImage}
                alt="Header"
                style={{ width: "auto", height: "100px" }}
              />
              <ListSubheader inset sx={listStyles.subheader}>
                {userRole === 1 && "Admin"}
                {userRole === 2 && "Teacher"}
                {userRole === 3 && "Student"}
              </ListSubheader>
              {/* Render list items based on userRole */}
              {userRole === 1 && (
                <>
                  <ListItem
                    button
                    component={Link}
                    to="/Dashboard"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        dashboard
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/EmployeeDetails"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">person</span>
                    </ListItemIcon>
                    <ListItemText primary="Employee Details" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/studentdetails"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">school</span>
                    </ListItemIcon>
                    <ListItemText primary="Student Details" />
                  </ListItem>
                  <ListItem button sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        bar_chart
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Financial Management" />
                  </ListItem>
                  <Divider />
                  <ListSubheader inset sx={listStyles.subheader}>
                    Teacher
                  </ListSubheader>
                  <ListItem
                    button
                    component={Link}
                    to="/teacherdashboard"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        dashboard
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/assigncourse"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">book</span>
                    </ListItemIcon>
                    <ListItemText primary="Assign Courses" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/attendance"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        co_present
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/eventcalander"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        calendar_today
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
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
                  <>
                  <ListItem
                    button
                    component={Link}
                    to="/attedancestudent"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        co_present
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                  </ListItem>
                  <ListItem button component={Link}
                    to="/studentcourse" sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">book</span>
                    </ListItemIcon>
                    <ListItemText primary="Course Details" />
                  </ListItem>
                  <ListItem button component={Link}
                    to="/LeaveRequest" sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">book</span>
                    </ListItemIcon>
                    <ListItemText primary="LeaveRequest" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/eventcalander"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        calendar_today
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                  </ListItem>
                  <ListItem button    component={Link}
                    to="/studentdetailsform"sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">school</span>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <Divider />
                </>
                  <Divider />
                </>
              )}
              {userRole === 2 && (
                <>
                  
                    <ListItem
                      button
                      component={Link}
                      to="/teacherdashboard"
                      sx={listStyles.listItem}
                    >
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">
                          dashboard
                        </span>
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/coursedetail"
                      sx={listStyles.listItem}
                    >
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">book</span>
                      </ListItemIcon>
                      <ListItemText primary="Course Details" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/attendance"
                      sx={listStyles.listItem}
                    >
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">
                          co_present
                        </span>
                      </ListItemIcon>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/eventcalander"
                      sx={listStyles.listItem}
                    >
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">
                          calendar_today
                        </span>
                      </ListItemIcon>
                      <ListItemText primary="Calendar" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/assignassignments"
                      sx={listStyles.listItem}
                    >
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">
                          assignment
                        </span>
                      </ListItemIcon>
                      <ListItemText primary="Assignments" />
                    </ListItem>
                    <ListItem button sx={listStyles.listItem}>
                      <ListItemIcon sx={listStyles.listItemIcon}>
                        <span className="material-symbols-rounded">
                          grading
                        </span>
                      </ListItemIcon>
                      <ListItemText primary="Grade Profile" />
                    </ListItem>
                   

                  <Divider />
                </>
              )}
              {userRole === 3 && (
                <>
                  <ListItem button  component={Link}
                    to="/studentannouncements" sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        dashboard
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Announcements" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/attedancestudent"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        co_present
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                  </ListItem>
                  <ListItem button component={Link}
                    to="/studentcourse" sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">book</span>
                    </ListItemIcon>
                    <ListItemText primary="Course Details" />
                  </ListItem>
                  <ListItem button component={Link}
                    to="/LeaveRequest" sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">book</span>
                    </ListItemIcon>
                    <ListItemText primary="LeaveRequest" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/eventcalander"
                    sx={listStyles.listItem}
                  >
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">
                        calendar_today
                      </span>
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                  </ListItem>
                  <ListItem button    component={Link}
                    to="/studentdetailsform"sx={listStyles.listItem}>
                    <ListItemIcon sx={listStyles.listItemIcon}>
                      <span className="material-symbols-rounded">school</span>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem button onClick={handleLogout} sx={listStyles.listItem}>
                <ListItemIcon sx={listStyles.listItemIcon}>
                  <span className="material-symbols-rounded">logout</span>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "transparent",
            p: 3,
            marginTop: "64px",
            padding: "24px",
          }}
        >
          {/* Render the rest of the content based on the selected route */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
