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
import UserList from './Components/UList';
import { Route, Routes } from 'react-router-dom';
import Setting from './Components/Settings';
import RouteAdd from './Components/AddData';
import Axios from './libs/Axios';
import RouteStdGrops from './Components/StdGrops';
import RouteStudent from './Components/TableStuden'
import RouteTeacher from './Components/TableTeaher'
import RouteAdminDash from './Components/AdminDash'
import Record from './Components/Record';
import Course from './Components/SettingsRotue/Course';
import Department from './Components/SettingsRotue/Department';
import NameTitle from './Components/SettingsRotue/NameTitle';
import Major from './Components/SettingsRotue/Major';
import Subject from './Components/SettingsRotue/Subject';
import Room from './Components/SettingsRotue/Room';
import News from './Components/SettingsRotue/News';
import Semester from './Components/SettingsRotue/Semester';
import Boss from './Components/SettingsRotue/Boss';
import ProjectAll from './Components/ProjectAll'
import ReportData from './Components/ReportData';
import ReportProTea from './Components/ReportProTea';


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
    if (role !== 'admin') {
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
                                <Route path="all" element={<ProjectAll />} />
                                <Route path="add" element={<RouteAdd />} />
                                <Route path="add/teacher" element={<RouteTeacher />} />
                                <Route path="add/student" element={<RouteStudent />} />
                                <Route path="add/studentgrops" element={<RouteStdGrops />} />
                                <Route path="add/semester" element={<Semester />} />
                                <Route path="add/boss" element={<Boss />} />
                                <Route path="record" element={<Record />} />
                                <Route path="settings/course" element={<Course />} />
                                <Route path="settings/department" element={<Department />} />
                                <Route path="settings/name_titile" element={<NameTitle />} />
                                <Route path="settings/major" element={<Major />} />
                                <Route path="settings/subject" element={<Subject />} />
                                <Route path="settings/room" element={<Room />} />
                                <Route path="settings/news" element={<News />} />
                                <Route path="/reportdata" element={<ReportData />} />
                                <Route path="/reportdata/teacher" element={<ReportProTea />} />
                                <Route path='/' element={<RouteAdminDash />} />
                                <Route path='*' element={<h1>Not Found 404</h1>} />
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