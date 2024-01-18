import * as React from 'react';
import axios from '../libs/Axios';
import { Box, Button, Stack } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ModalAddStaff({ projectcode, setOpenAddStaff }) {

    const [id_staff, setIdStaff] = React.useState(-1);

    const [staffList, setStaffList] = React.useState([]);

    const [id_project_staff_position, setIdProjectStaffPosition] = React.useState(-1);
    React.useEffect(() => {
        FetchStaff();

    }, []);

    function FetchStaff() {
        axios.get('/user/stafflist')
            .then(res => {
                console.log(res.data);
                setStaffList(res.data.result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleChange(event) {
        setIdStaff(event.target.value);
    }

    function handleChangeposition(event) {
        setIdProjectStaffPosition(event.target.value);
    }

    function addStaff() {
        axios.post('/user/projectstaff', {
            id_project: projectcode,
            id_staff: id_staff,
            id_project_staff_position: id_project_staff_position
        })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 200) {
                    window.alert("เพิ่มข้อมูลสำเร็จ");
                    setOpenAddStaff(false);
                    window.location.reload();
                } else {
                    window.alert("เพิ่มข้อมูลไม่สำเร็จ");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <Box sx={{ width: '100%', height: '100%' }}>
                <h1>{id_staff}</h1>
                <h1>{id_project_staff_position}</h1>
                <h2>เลือกที่ปรึกษาโครงงาน</h2>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ที่ปรึกษา</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id_staff}
                        label="Staff"
                        onChange={handleChange}
                    >
                        <MenuItem value={-1}><em>เลือกที่ปรึกษา</em></MenuItem>
                        {
                            staffList.map((staff, index) => {
                                return (
                                    <MenuItem key={index} value={staff.id_staff}>{staff.name_title_th + ' ' + staff.first_name_th + ' ' + staff.last_name_th}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{mt:1}}>
                    <InputLabel id="select2">ตำแหน่ง</InputLabel>
                    <Select
                        labelId="select2"
                        id="demo-simple-select"
                        value={id_project_staff_position}
                        label="Staff"
                        onChange={handleChangeposition}
                    >
                        <MenuItem value={-1}><em>เลือกตำแหน่ง</em></MenuItem>
                        <MenuItem value={1}>ที่ปรึกษา</MenuItem>
                        <MenuItem value={4}>ที่ปรึกษาร่วม</MenuItem>
                        
                    </Select>
                </FormControl>
            </Box>
            <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2} sx={{ mt: 2.5 }}>
                <Button color='success' variant="contained" onClick={() => { id_staff == -1 || id_project_staff_position == -1 ? window.alert("โปรดเลือกข้อมูลให้ครบถ้วน") : addStaff() }}>ยืนยัน</Button>
                <Button variant="contained" onClick={() => { setOpenAddStaff(false) }}>ยกเลิก</Button>
            </Stack>
        </React.Fragment >
    );
}