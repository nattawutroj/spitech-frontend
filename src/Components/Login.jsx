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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const defaultTheme = createTheme();

export default function SignInSide() {
    const [open, setOpen] = React.useState(false);
    const [errAlert, setErrAlert] = React.useState(false);
    const [loginAlert, setLoginAlert] = React.useState(false);
    const [remember, setRemember] = React.useState(localStorage.getItem('remember') ? true : false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangPassword = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const datalist = {
            password: data.get('repassword1'),
            repassword: data.get('repassword2'),
        }
        if (datalist.password === datalist.repassword) {
            axios.put('/user/change', {
                new_password: datalist.password
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setOpen(!open);
                }
            }).catch ((err) => {
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
                    if(res.data.data.id_role == 1){
                        localStorage.setItem('role', 'admin');
                        window.location.href = '/dashboard';
                    }
                    else if(res.data.data.id_role == undefined){
                        localStorage.setItem('role', 'student');
                        window.location.href = '/student';
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
                                    onChange={()=>setRemember(!remember)}
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
                                    type="repassword2"
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
            </Grid>
        </ThemeProvider>
    );
}