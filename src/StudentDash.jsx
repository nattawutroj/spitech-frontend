import * as React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './Components/listItems';
import UserList from './Components/UListStd';
import { Route, Routes } from 'react-router-dom';
import Setting from './Components/Settings';
import RouteAdd from './Components/AddData';
import Axios from './libs/Axios';
import RouteStdGrops from './Components/StdGrops';
import RouteStudent from './Components/TableStuden'
import RouteTeacher from './Components/TableTeaher'
import ProjectDash from './Components/ProjectDash';



const drawerWidth = 240;

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
export const ProfileContext = React.createContext();
export default function Dashboard() {
    const role = localStorage.getItem('role');
    if(role !== 'student')
    {
        localStorage.removeItem('token')
    }

    const [profile, setProfile] = React.useState({});
    React.useEffect(() => {
        Axios.get('/user/profile').then(res => {
            setProfile(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
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
                                {!open ? <MenuIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainListItems}
                            <Divider sx={{ my: 1 }} />
                            <UserList Open={open} setOpen={setOpen} />
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Container maxWidth='null'>
                            <Routes>
                                <Route path="configs" element={<Setting />} />
                                <Route path="add" element={<RouteAdd />} />
                                <Route path="add/teacher" element={<RouteTeacher />} />
                                <Route path="add/student" element={<RouteStudent />} />
                                <Route path="add/studentgrops" element={<RouteStdGrops />} />
                                <Route path='*' element={<ProjectDash />} />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </ProfileContext.Provider >
    );
}


// <Grid container spacing={0}>
// <Grid item xs={12} md={6} lg={6}>
//     --
// </Grid>
// <Grid item xs={12} md={6} lg={6}>
//     --
// </Grid>
// </Grid>