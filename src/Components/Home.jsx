import { Box } from "@mui/joy";
import { Grid, Typography } from "@mui/material";
import LogoImg from '../assets/ITlogo.png';
import Card from './Card'
import BgImg from '../assets/bgimg.jpg'
import Login from "./Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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


const Home = () => {
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
                    }} md={8} height={'100%'}>
                        <Box ml={-2} mt={-2} pl={4} pr={4} md={8} height={'100vh'} sx={{ backdropFilter: 'blur(13px)', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                            <Box sx={{ height: '30vh', display: 'flex' }}>
                                <Box sx={{ m: 'auto', width: '80%', display: 'inline' }}>
                                    <Typography variant="h3" color="initial">ระบบบริหารจัดการข้อมูลโครงงานพิเศษ</Typography>
                                    <Typography variant="h4" color="initial">ข่าวประชาสัมพันธ์จากภาวิชา</Typography>
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
                            <Grid container justifyContent="center" spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 5, md: 15 }}>
                                {Array.from(Array(5)).map((_, index) => (
                                    index !== 4 ?
                                        <Grid item xs={6} sm={2} md={7} key={index} m={1}>
                                            <Card />
                                        </Grid> : <Grid item xs={2} sm={2} md={4} key={index}>
                                            More
                                        </Grid>

                                ))}
                            </Grid>

                        </Box>
                    </Grid>
                </Grid >
            </ThemeProvider>
        </>
    )
}
export default Home;