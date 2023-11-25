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
import {ProfileContext} from '../Dashboard';




const Userlist = ({ Open, setOpen }) => {
    const { profile } = React.useContext(ProfileContext)
    console.log(profile);

    Userlist.propTypes = {
        Open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
    };

    const handleClick = () => {
        setOpen(!Open);
    };

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
                    <ListItemButton sx={{ pl: 4 }}>
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
        </React.Fragment >
    );
}

export default Userlist;
