import { Stack } from '@mui/material';
import * as React from 'react';
import { AccordionDetails } from '@mui/material';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import axios from '../../libs/Axios';


export default function ProjectDetail({ act,id }) {

    const [item, setItem] = React.useState([]);
    const [staff, setStaff] = React.useState([]);
    const [member, setMember] = React.useState([]);
    let adviserContent = null;
    let countStd = 0;



    const projectinfomation = () => {
        axios.get('/resources/admin/projectinfomation',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setItem(res.data.result[0]);
        }).catch(err => {
            console.log(err);
        })

        axios.get('/resources/admin/projectinfomation/staff',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setStaff(res.data.result);
        }).catch(err => {
            console.log(err);
        })

        axios.get('/resources/admin/projectinfomation/student',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setMember(res.data.result.rows);
        }
        ).catch(err => {
            console.log(err);
        }
        )

    }


    React.useEffect(() => {
        projectinfomation();
    }
        , [act])

    return (
        <React.Fragment>
            <AccordionDetails  >
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                        <Stack direction="column" spacing={0}>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_th}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_en}</Typography>
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>กรณีศึกษา</Typography>
                        <Stack direction="column" spacing={0}>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_th}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_en}</Typography>
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ผู้จัดทำโครงงาน</Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                member?.map((data, index) => (
                                    (data.id_project === item.id_project) ?
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{countStd++}{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
                                        : ''
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษา</Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data, index) => {
                                    // Use a variable to conditionally render the "ไม่มีที่ปรึกษา" message

                                    data.staff.map((data2, index2) => {

                                        if (data2.id_project === item.id_project && data2.id_project_staff_position === 1) {
                                            adviserContent = (
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>
                                                    {data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}
                                                </Typography>
                                            );
                                        }
                                    });

                                    // Render the content for each staff member
                                    return (
                                        <div key={index}>
                                            {adviserContent ? adviserContent : <Typography sx={{ color: 'red' }} key={index}>ไม่มีที่ปรึกษา</Typography>}
                                        </div>
                                    );
                                })
                            }

                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษาร่วม </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data) => (
                                    data.staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data) => (
                                    data.os_staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ประธาน </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data) => (
                                    data.staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 2) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data) => (
                                    data.os_staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 2) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>กรรมการ </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data) => (
                                    data.staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 3) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data) => (
                                    data.os_staff.map((data2, index2) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 3) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
            </AccordionDetails>
        </React.Fragment>
    )
}