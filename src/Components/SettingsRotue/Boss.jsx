import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import axios from '../../libs/Axios';
import { Button, Typography } from '@mui/material';

export default function Boss() {
    const [id_staff, setIdStaff] = React.useState(-1);

    const [staffList, setStaffList] = React.useState([]);


    React.useEffect(() => {
        FetchStaff();
        feschboss();

    }, []);


    function handleChange(event) {
        setIdStaff(event.target.value);
    }

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

    async function docboss() {
        const response = await axios.get('/resources/public/boss', {});
        return response.data.data;
    }

    const feschboss = async () => {
        try {
            const [boss] = await Promise.all([
                docboss()
            ]
            );
            setIdStaff(boss[0].id_staff);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        position: 'absolute',
                        top: '12%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                    },
                }}
            >
                <Paper sx={{p :2}} elevation={3}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography sx={{ pt: 3 }} variant="h5" gutterBottom>
                            เปลี่ยนหัวหน้าภาควิชา
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">หัวหน้าภาควิชา</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={id_staff}
                                label="หัวหน้าภาควิชา"
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
                        <Button fullWidth variant="contained" color="primary" onClick={() => {
                            window.confirm('คุณต้องการบันทึกหรือไม่') ?
                                axios.put('/resources/admin/boss', {
                                    id_staff: id_staff
                                }).then(res => {
                                    console.log(res);
                                    window.location.reload();
                                }).catch(err => {
                                    console.log(err);
                                })
                                : console.log('cancel');
                        }
                        }>
                            บันทึก
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </React.Fragment>
    );
}