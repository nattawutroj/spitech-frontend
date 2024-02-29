import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { PausePresentation } from '@mui/icons-material';


export const mainListItems = (
    <React.Fragment>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="แดชบอร์ด" />
        </ListItemButton>
        <ListItemButton href='/dashboard/all'>
            <ListItemIcon>
                <PausePresentation />
            </ListItemIcon>
            <ListItemText primary="โปรเจ็คทั้งหทด" />
        </ListItemButton>
        <ListItemButton href='/dashboard/add'>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="เพิ่มข้อมูลบุคคล" />
        </ListItemButton>
        <ListItemButton href='/dashboard/reportdata'>
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
