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
import { ProfileContext } from '../Dashboard';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


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

    const [modalProfile, setModalProfile] = React.useState(false);
    console.log(profile);

    Userlist.propTypes = {
        Open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
    };

    const handleClick = () => {
        setOpen(!Open);
    };

    const handleClose = () => {
        setModalProfile(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('loginStatus');
        window.location.reload();
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
                    <ListItemButton  onClick={() => setModalProfile(true)} sx={{ pl: 4 }}>
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
                    open={modalProfile}
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
                </Modal>
 
        </React.Fragment >
    );
}

export default Userlist;
