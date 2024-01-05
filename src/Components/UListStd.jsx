import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ProfileContext } from '../StudentDash';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField } from '@mui/material';
import axios from '../libs/Axios';


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



const Userlist = ({ Open, setOpen }) => {
    const { profile } = React.useContext(ProfileContext)
    // const [modalProfile, setModalProfile] = React.useState(false);
    console.log(profile);
    Userlist.propTypes = {
        Open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
    };

    const handleClick = () => {
        setOpen(!Open);
    };

    const handleClose = () => {
        setPasswordchangeOpen(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('loginStatus');
        window.location.reload();
    }


    const [errAlert, setErrAlert] = React.useState(false);
    const [passwordchangeOpen, setPasswordchangeOpen] = React.useState(false);
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
                    setPasswordchangeOpen(!passwordchangeOpen);
                    alert('เปลี่ยนรหัสผ่านสำเร็จ');
                    handleLogout();
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

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {Open ? <AccountCircleIcon color='primary' /> : <AccountCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={profile.first_name_th} />
            </ListItemButton>
            <Collapse in={Open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton  onClick={() => setPasswordchangeOpen(true)} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SyncLockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton onClick={handleLogout} sx={{ mt: 2, pl: 4 }}>
                <ListItemIcon>
                    <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
            <Modal
                    open={passwordchangeOpen}
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
        </React.Fragment >
    );
}

export default Userlist;
