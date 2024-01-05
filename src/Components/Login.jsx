import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MouseIcon from '@mui/icons-material/Mouse';
import axios from '../libs/Axios';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { Modal } from '@mui/material';
import { AppBar } from '@mui/material';
import { Container } from '@mui/material';
import { Paper } from '@mui/material';
import { Stepper } from '@mui/material';
import { Step } from '@mui/material';
import { StepLabel } from '@mui/material';
import { CssBaseline } from '@mui/material';
import AddressForm from './AddressForm'
import ChangePassword from './ChangePassword'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://sites.google.com/fitm.kmutnb.ac.th/fitmit">
                Information Technology KMUTNB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.only('md')]: {
        width: '50%',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
});

const defaultTheme = createTheme();



export default function SignInSide() {

    const [profile, setProfile] = React.useState({});

    const [notComplete, setNotComplete] = React.useState(false);

    const [activeStep, setActiveStep] = React.useState(0);

    const [editProfileAlert, setEditProfileAlert] = React.useState(false);

    const handleNext = () => {
        console.log("not complete" + profile);
        if ((changepassword !== rechangepassword || changepassword === '' || rechangepassword === '') && !notComplete) {
            setChangepasserrorAlert(true);
        }
        else if (profile.address === '' || profile.email === '' || profile.id_name_title === '' || profile.first_name_en === '' || profile.last_name_en === '' || profile.major_code === '') {
            setEditProfileAlert(true)
        }
        else {
            setChangepasserrorAlert(false);
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [changepassword, setChangepassword] = React.useState('');
    const [rechangepassword, setRechangepassword] = React.useState('');
    const [changepasserrorAlert, setChangepasserrorAlert] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [profileEdit, setProfileEdit] = React.useState(false);
    const [errAlert, setErrAlert] = React.useState(false);
    const [loginAlert, setLoginAlert] = React.useState(false);
    const [remember, setRemember] = React.useState(localStorage.getItem('remember') ? true : false);


    const steps = ['Change Password', 'Information details'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ChangePassword rechangepassword={rechangepassword} changepassword={changepassword} setChangepassword={setChangepassword} setRechangepassword={setRechangepassword} changepasserrorAlert={changepasserrorAlert} />;
            case 1:
                return <AddressForm profile={profile} setProfile={setProfile} editProfileAlert={editProfileAlert} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleCloseProfile = () => {
        setProfileEdit(false);
    }

    const handleChangPassword = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const datalist = {
            password: data.get('repassword1'),
            repassword: data.get('repassword2'),
        }
        if (datalist.password === datalist.repassword && datalist.password !== '' && datalist.repassword !== '') {
            axios.put('/user/change', {
                new_password: datalist.password
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setOpen(!open);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            setErrAlert(true);
        }
        console.log(datalist);
    }

    const handleChangePasswordStd = () => {
        const datalist = {
            password: changepassword,
            repassword: rechangepassword,
        }
        if ((datalist.password === datalist.repassword && datalist.password !== '' && datalist.repassword !== '') && !notComplete) {
            axios.put('/user/change', {
                new_password: datalist.password
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    axios.put('/user/profile', {
                        student_code: profile.student_code,
                        id_name_title: profile.id_name_title,
                        first_name_en: profile.first_name_en,
                        last_name_en: profile.last_name_en,
                        email: profile.email,
                        address: profile.address,
                        phone: profile.phone,
                        major_code: profile.major_code,
                    }).then((res) => {
                        if (res.status === 200) {
                            console.log(res.data);
                            localStorage.setItem('loginStatus', true);
                            localStorage.setItem('role', 'student');
                            console.log("1");
                            console.log(profile);
                            window.location.href = '/studentdash';
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else if (notComplete) {
            axios.put('/user/profile', {
                student_code: profile.student_code,
                id_name_title: profile.id_name_title,
                first_name_en: profile.first_name_en,
                last_name_en: profile.last_name_en,
                email: profile.email,
                address: profile.address,
                phone: profile.phone,
                major_code: profile.major_code,
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    localStorage.setItem('loginStatus', true);
                    localStorage.setItem('role', 'student');
                    console.log("2");
                    console.log(profile);
                    window.location.href = '/studentdash';
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            setErrAlert(true);
        }
        console.log(datalist);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            user: data.get('user'),
            password: data.get('password'),
        });
        axios.post('/user/login', {
            user: data.get('user'),
            password: data.get('password'),
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                console.log(res.data.data.id_role);
                if (res.data.data.id_role == 10) {
                    console.log('not admin');
                    setOpen(!open)
                }
                else if (res.data.data.id_role == 11) {
                    console.log('not admin');
                    axios.get('/user/profile')
                        .then(res => {
                            console.log(res.data.result);
                            setProfile(res.data.result);
                            setProfileEdit(!profileEdit)
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else {
                    console.log(remember);
                    if (remember) {
                        localStorage.setItem('remember', true);
                        localStorage.setItem('user', data.get('user'));
                        localStorage.setItem('password', data.get('password'));
                    }
                    else {
                        localStorage.removeItem('remember');
                        localStorage.removeItem('user');
                        localStorage.removeItem('password');
                    }
                    localStorage.setItem('loginStatus', true);
                    if (res.data.data.id_role == 1) {
                        localStorage.setItem('role', 'admin');
                        window.location.href = '/dashboard';
                    }
                    else if (res.data.data.id_role == undefined) {
                        localStorage.setItem('role', 'student');
                        if (res.data.data.address === null || res.data.data.email === null || res.data.data.id_name_title === null || res.data.data.first_name_en === null || res.data.data.last_name_en === null || res.data.data.major_code === null) {
                            axios.get('/user/profile')
                                .then(res => {
                                    console.log(res.data.result);
                                    setProfile(res.data.result);
                                    setNotComplete(true);
                                    setChangepasserrorAlert(false);
                                    setActiveStep(activeStep + 1);
                                    setProfileEdit(!profileEdit);
                                    handleNext();
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                        else {
                            window.location.href = '/studentdash';
                        }
                    }
                }
            }
        }).catch((err) => {
            if (err.response.data.action === 'tryAgain') {
                setLoginAlert(true);
            }
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '900px', // form will stretch when viewport is below `769px`
                        '--Cover-width': '50vw', // must be `vw` only
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Grid container component="main"
                sx={{
                    width:
                        'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255,255,255,0.3)'
                }}>
                <Grid item xs={12} md={11} sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }} elevation={6}>
                    <Box
                        sx={{
                            my: 12,
                            mt: 3,
                            mx: 4,
                            mr: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ my: 0, mb: 15 }} component="h1" variant="h4">
                            <MouseIcon />SPITECH
                        </Typography>
                        <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="Username"
                                name="user"
                                defaultValue={localStorage.getItem('remember') ? localStorage.getItem('user') : ''}
                                autoComplete="username"
                                autoFocus
                                error={loginAlert}
                                helperText={loginAlert ? 'Username or Password is incorrect' : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                defaultValue={localStorage.getItem('remember') ? localStorage.getItem('password') : ''}
                                autoComplete="current-password"
                                error={loginAlert}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Copyright sx={{ mt: 10 }} />
                        </Box>
                    </Box>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                my: 12,
                                mt: 3,
                                mx: 4,
                                mr: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                เปลี่ยนรหัสผ่าน
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleChangPassword} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="repassword1"
                                    label="Password"
                                    type='password'
                                    name="repassword1"
                                    autoFocus
                                    error={errAlert}
                                    helperText={errAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="repassword2"
                                    label="Re-Password"
                                    type="password"
                                    id="repassword2"
                                    autoComplete="current-password"
                                    error={errAlert}
                                    helperText={errAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={profileEdit}
                    onClose={handleCloseProfile}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflow: 'auto' }}
                >
                    <React.Fragment>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Get started
                                </Typography>
                                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                {activeStep === steps.length ? (
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            Thank you for your information.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            You can edit your information in profile page.
                                        </Typography>
                                        {handleChangePasswordStd()}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} disabled={notComplete}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 3, ml: 1 }}
                                            >
                                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}
                            </Paper>
                        </Container>
                    </React.Fragment>
                </Modal>
            </Grid>
        </ThemeProvider>
    );
}