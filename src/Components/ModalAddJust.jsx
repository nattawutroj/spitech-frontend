import * as React from 'react';
import axios from '../libs/Axios';
import { Box, Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function ModalAddJust({ act, setAct, projectcode, setOpenAddJust }) {

    const [id_staff, setIdStaff] = React.useState(-1);


    const [nametitle, setNametitle] = useState([]);

    const [editProfileAlert, setEditProfileAlert] = useState(false);

    const [selectedTitle, setSelectedTitle] = useState('');
    const [staffList, setStaffList] = React.useState([]);
    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
        handleChangesub(event);
    };

    const [id_project_staff_position, setIdProjectStaffPosition] = React.useState(-1);
    React.useEffect(() => {
        FetchStaff();

    }, []);




    const [subOpen] = React.useState(false);

    const [formData, setFormData] = useState({
        id_project: projectcode,
        id_project_staff_position: '4',
        id_name_title: '',
        first_name_th: '',
        last_name_th: '',
        first_name_en: '',
        last_name_en: '',
        phone: '',
        email: '',
    });

    const handleChangesub = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // ทำบันทึกข้อมูลที่คุณต้องการทำ
        console.log('Saved data:', formData);
        if (formData.id_name_title == '' || formData.first_name_th == '' || formData.last_name_th == '' || formData.first_name_en == '' || formData.last_name_en == '' || formData.phone == '' || formData.email == '') {
            setEditProfileAlert(true);
        }
        else {
            setEditProfileAlert(false);
            axios.post('/user/staffos', {
                id_project: projectcode,
                id_project_staff_position: '4',
                id_name_title: formData.id_name_title,
                first_name_th: formData.first_name_th,
                last_name_th: formData.last_name_th,
                first_name_en: formData.first_name_en,
                last_name_en: formData.last_name_en,
                phone: formData.phone,
                email: formData.email,
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        window.alert("เพิ่มข้อมูลสำเร็จ");
                    } else {
                        window.alert("เพิ่มข้อมูลไม่สำเร็จ");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    React.useEffect(() => {
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

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
                    // setOpenAddJust(false);

                    console.log("act >>", act);
                    setAct(act + 1);

                    // window.location.reload();
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
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2, mt: 2 }}
                >
                    <h3>จัดตั้งกรรมการ</h3>
                </Stack>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">กรรมการ</InputLabel>
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
                <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="select2">ตำแหน่ง</InputLabel>
                    <Select
                        labelId="select2"
                        id="demo-simple-select"
                        value={id_project_staff_position}
                        label="Staff"
                        onChange={handleChangeposition}
                    >
                        <MenuItem value={-1}><em>เลือกตำแหน่ง</em></MenuItem>
                        <MenuItem value={2}>ประธาน</MenuItem>
                        <MenuItem value={3}>กรรมการ</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2} sx={{ mt: 2.5 }}>
                <Button color='success' variant="contained" onClick={() => { id_staff == -1 || id_project_staff_position == -1 ? window.alert("โปรดเลือกข้อมูลให้ครบถ้วน") : addStaff() }}>เพิ่ม</Button>
                <Button variant="contained" onClick={() => { setOpenAddJust(false) }}>ยกเลิก</Button>
            </Stack>
            <Modal
                open={subOpen}
                onClose={() => setOpenAddJust(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={{ ...style, width: 450 }}>
                    <h2>เพิ่มที่ปรึกษาภายนอก</h2>
                    <TextField
                        required
                        error={editProfileAlert}
                        id="id_name_title"
                        name="id_name_title"
                        label="คำนำหน้า"
                        helperText="กรุณาเลือกคำนำหน้า"
                        select
                        fullWidth
                        variant="standard"
                        value={selectedTitle} // ต้องมี value attribute
                        onChange={handleTitleChange}
                    >
                        {nametitle.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                {console.log(option.value)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{ mt: 1 }}
                        label="ชื่อจริง (ไทย)"
                        fullWidth
                        name="first_name_th"
                        value={formData.first_name_th}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="นามสกุล (ไทย)"
                        fullWidth
                        name="last_name_th"
                        value={formData.last_name_th}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="ชื่อจริง (อังกฤษ)"
                        fullWidth
                        name="first_name_en"
                        value={formData.first_name_en}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="นามสกุล (อังกฤษ)"
                        fullWidth
                        name="last_name_en"
                        value={formData.last_name_en}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="อีเมล"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <Stack direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2} sx={{ mt: 2.5 }}>
                        <Button color='success' variant="contained" onClick={() => { handleSave() }}>ยืนยัน</Button>
                        <Button variant="contained" onClick={() => { setOpenAddJust(false) }}>ยกเลิก</Button>
                    </Stack>
                </Box>
            </Modal>
        </React.Fragment >
    );
}