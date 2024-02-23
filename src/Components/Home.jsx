import * as React from 'react';
import { Box } from "@mui/joy";
import { Grid, Typography } from "@mui/material";
import LogoImg from '../assets/ITlogo.png';
import BgImg from '../assets/bgimg.jpg'
import Login from "./Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "../libs/Axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PausePresentation } from '@mui/icons-material';


const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.9rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.9rem',
    },
};
theme.typography.h4 = {
    fontSize: '1rem',
    '@media (min-width:600px)': {
        fontSize: '1.1rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem',
    },
};

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '20vw',
    height: '6vh',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



const Home = () => {

    const [news, setNews] = React.useState([]);

    const fecthNews = () => {
        axios.get('/resources/public/newshome')
            .then((response) => {
                setNews(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    React.useEffect(() => {
        fecthNews();
    }, [])

    const handleLink = (e) => {
        // if e check not start with http or https
        if (!e.startsWith('http')) {
            e = 'http://' + e;
        }
        window.open(e);
    }

    console.log(news);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2} sx={{ backgroundImage: `url(${BgImg})`, backgroundPosition: '81% 40%', height: '100%', }}>
                    <Grid item xs={12} md={4} display="flex"  >
                        <Login />
                    </Grid>
                    <Grid item sx={{
                        right: 0,
                        top: 0,
                        bottom: 0,
                        left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                        transition:
                            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        backgroundColor: 'background.level1',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }} md={8} height={'100%'} >
                        <Box ml={-2} mt={-2} pl={4} pr={4} md={8} height={'100vh'} sx={{ backdropFilter: 'blur(13px)', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                            <Box sx={{ height: '30vh', display: 'flex' }}>
                                <Box sx={{ m: 'auto', width: '80%', display: 'inline' }}>
                                    <Typography variant="h3" color="initial">ระบบบริหารจัดการข้อมูลโครงงานพิเศษ</Typography>
                                    <Typography variant="h4" color="initial">ข่าวประชาสัมพันธ์จากภาควิชา</Typography>
                                </Box>
                                <Box variant="div"
                                    component="img"
                                    sx={{
                                        m: 'auto',
                                        maxHeight: { xs: 100, md: 200 },
                                        maxWidth: { xs: 100, md: 200 },
                                        display: 'inline'
                                    }} alt="Logo" src={LogoImg} />
                            </Box>
                            <Stack
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                spacing={1}
                                sx={{ mb: 3 }}
                            >
                                <DemoPaper square={false}>
                                    <ListItemButton href='/dashboard'>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="ตารางสอบ" />
                                    </ListItemButton></DemoPaper>
                                <DemoPaper square={false}>
                                    <ListItemButton href='/dashboard/record'>
                                        <ListItemIcon>
                                            <PausePresentation />
                                        </ListItemIcon>
                                        <ListItemText primary="โปรเจ็คทั้งหทด" />
                                    </ListItemButton></DemoPaper>


                            </Stack>
                            <Grid sx={{ width: '100%', overflowY: 'auto', maxHeight: '45vh' }} container justifyContent="center" spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 5, md: 15 }}>
                                {
                                    news.map((item, index) => {
                                        return (
                                            <Accordion key={index}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1-content"
                                                    sx={{ width: '100%' }}
                                                    id="panel1-header"
                                                >
                                                    {item.topic}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container sx={{ marginLeft: '60vw', marginRight: '60vw' }} justifyContent="center" spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 5, md: 15 }}>
                                                    </Grid>
                                                    <Typography variant="body2" color="textSecondary">วันที่ {item.build_timestamp}</Typography>
                                                    <Typography variant="body1" color="textSecondary">{item.arctical}</Typography>
                                                </AccordionDetails>
                                                {item.file_path === null ? <></> :
                                                    <AccordionActions>
                                                        <Button onClick={() => { handleLink(item.file_path) }}>Link</Button>
                                                    </AccordionActions>}
                                            </Accordion>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Grid >
            </ThemeProvider >
        </>
    )
}
export default Home;