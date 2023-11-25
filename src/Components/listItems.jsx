import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';


export const mainListItems = (
    <React.Fragment>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="แดชบอร์ด" />
        </ListItemButton>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="โปรเจ็คทั้งหทด" />
        </ListItemButton>
        <ListItemButton href='/dashboard/add'>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="เพิ่มข้อมูลบุคคล" />
        </ListItemButton>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="ออกรายงาน" />
        </ListItemButton>
        <ListItemButton href='/dashboard/configs'>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="ตั้งค่าระบบ" />
        </ListItemButton>
    </React.Fragment>
);
