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
import { ProfileContext } from '../StaffDash';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import axios from '../libs/Axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Userlist = ({ Open, setOpen }) => {
    const { profile } = React.useContext(ProfileContext)
    // const [modalProfile, setModalProfile] = React.useState(false);
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

    const handleClosePro = () => {
        setprofilechangeOpen(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('loginStatus');
        window.location.reload();
    }

    const [majorCode, setMajorCode] = React.useState([]);
    const [nametitle, setNametitle] = React.useState([]);


    const [errAlert, setErrAlert] = React.useState(false);
    const [passwordchangeOpen, setPasswordchangeOpen] = React.useState(false);

    const [profilechangeOpen, setprofilechangeOpen] = React.useState(false);
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
                    setPasswordchangeOpen(!passwordchangeOpen);
                    alert('เปลี่ยนรหัสผ่านสำเร็จ');
                    handleLogout();
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            setErrAlert(true);
        }
    }

    React.useEffect(() => {
        axios.get('/resources/public/major')
            .then(res => {
                setMajorCode(prevMajorCode => {
                    const newMajorCode = res.data.data.map(item => ({
                        label: item.major_code + ' ' + item.major_name,
                        value: item.major_code
                    }));
                    return [...prevMajorCode, ...newMajorCode];
                });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('/resources/public/name_title')
            .then(res => {
                setNametitle(prevNametitle => {
                    const nameTitles = res.data.data.map(item => ({
                        label: item.name_title_th,
                        value: item.id_name_title
                    }));
                    return [...prevNametitle, ...nameTitles];
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const [selectedTitle, setSelectedTitle] = React.useState(null);
    React.useEffect(() => {
        setSelectedTitle(profile.id_name_title);
    }, [profile]);


    const [editProfile, setEditProfile] = React.useState(profile);



    const handleInfoChangeNT = (event) => {
        setEditProfile({ ...editProfile, id_name_title: event.target.value });
        setSelectedTitle(event.target.value);
    }

    const handleInfoChange = (event) => {
        setEditProfile({ ...editProfile, [event.target.name]: event.target.value });
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
                    <ListItemButton onClick={() => setprofilechangeOpen(true)} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton onClick={() => setPasswordchangeOpen(true)} sx={{ pl: 4 }}>
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
            <Modal
                open={profilechangeOpen}
                onClose={handleClosePro}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>
                        ข้อมูลบัญชี
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="initials"
                                name="initials"
                                label="รหัสนักศึกษา"
                                defaultValue={profile.initials}
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="id_name_title"
                                name="id_name_title"
                                label="คำนำหน้า"
                                helperText="กรุณาเลือกคำนำหน้า"
                                select
                                fullWidth
                                variant="standard"
                                value={selectedTitle} // ต้องมี value attribute
                                onChange={handleInfoChangeNT}
                            >
                                {nametitle.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="first_name_th"
                                name="first_name_th"
                                label="ชื่อ"
                                fullWidth
                                variant="standard"
                                defaultValue={profile.first_name_th}
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="last_name_th"
                                name="last_name_th"
                                label="นามสกุล"
                                fullWidth
                                variant="standard"
                                defaultValue={profile.last_name_th}
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="first_name_en"
                                name="first_name_en"
                                label="Name (English)"
                                defaultValue={profile.first_name_en}
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                defaultValue={profile.last_name_en}
                                id="last_name_en"
                                name="last_name_en"
                                label="Surname (English)"
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                defaultValue={profile.email}
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                defaultValue={profile.address}
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                defaultValue={profile.phone}
                                id="phone"
                                name="phone"
                                label="เบอร์โทรศัพท์"
                                fullWidth
                                variant="standard"
                                onChange={handleInfoChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        onClick={() => {
                            axios.put('/resources/admin/staff/edit',
                                {
                                    id_staff: profile.id_staff,
                                    id_name_title: editProfile.id_name_title,
                                    first_name_th: editProfile.first_name_th,
                                    last_name_th: editProfile.last_name_th,
                                    first_name_en: editProfile.first_name_en,
                                    last_name_en: editProfile.last_name_en,
                                    email: editProfile.email,
                                    address: editProfile.address,
                                    phone: editProfile.phone,
                                    initials: editProfile.initials,
                                }
                            ).then((res) => {
                                if (res.status === 200) {
                                    setprofilechangeOpen(!profilechangeOpen);
                                    alert('แก้ไขข้อมูลสำเร็จ');
                                    handleLogout();
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        }
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </React.Fragment >
    );
}

export default Userlist;
