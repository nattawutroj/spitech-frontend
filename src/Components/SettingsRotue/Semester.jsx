import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import axios from '../../libs/Axios';
import { Button, Typography } from '@mui/material';

export default function Semester() {

    const [semester, setSemester] = React.useState(0);

    const getsemester = async () => {
        try {
            const response = await axios.get('/resources/admin/semester')
            return response
        } catch (err) {
            console.log(err);
        }
    }

    const fetchsemester = async () => {
        const [semester] = await Promise.all([getsemester()]);
        console.log(semester)
        setSemester(semester);
    }

    React.useEffect(() => {
        fetchsemester();
    }, [])

    if (semester === 0) {
        return <div>Loading...</div>
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
                <Paper sx={{ p: 2 }} elevation={3}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography sx={{ pt: 3 }} variant="h5" gutterBottom>
                            เปลี่ยนภาคการศึกษา
                        </Typography>
                        <Typography sx={{ pt: 3, pb: 1 }} variant="h6" gutterBottom>
                            ภาคการศึกษาปัจจุบัน : {semester.data.result[0].semester}/{semester.data.result[0].year}
                        </Typography>

                        <Button fullWidth variant="contained" color="primary" onClick={() => {
                            window.confirm('คุณต้องการเปลี่ยนเป็นปีการศึกษาถัดไปหรือไม่') ?
                                axios.post('/resources/admin/semester', {
                                    semester: semester.data.result[0].semester,
                                    year: semester.data.result[0].year
                                }).then(res => {
                                    console.log(res);
                                    window.location.reload();
                                }).catch(err => {
                                    console.log(err);
                                })
                                : console.log('cancel');
                        }
                        }>
                            เปลี่ยน
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </React.Fragment>
    );
}