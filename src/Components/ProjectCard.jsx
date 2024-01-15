import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, Stack } from '@mui/material';
import { Edit, Home } from '@mui/icons-material';
import axios from '../libs/Axios';

export default function ProjectCard({ projectinfo }) {

    const [member, setMember] = React.useState([]);
    const [staff, setStaff] = React.useState([]);
    const [staffos, setStaffos] = React.useState([]);

    const fetchData = async () => {
        const result = await Promise.all(projectinfo.map(item => search(item)));
        const flattenedResult = result.flat();
        setMember(flattenedResult);
    };

    const fetchStaff = async () => {
        const result = await Promise.all(projectinfo.map(item => searchStaff(item)));
        console.log(staffos)
        // const flattenedResult = result.flat();
        // console.log(flattenedResult)
        // setStaff(flattenedResult);
    };

    React.useEffect(() => {
        fetchData();
        fetchStaff();
    }, [projectinfo]);

    const search = async (item) => {
        try {
            const response = await axios.post('/user/checkjoin', {
                id_project: item.id_project
            });

            return response.data.status === 200 ? response.data.result : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const searchStaff = async (item) => {
        try {
            const response = await axios.post('/user/projectstafflist', {
                id_project: item.id_project
            });
            console.log(response.data.result)
            setStaff(response.data.result)
            return response.data.status === 200 ? response.data.result : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    return (
        <React.Fragment>
            {console.log(staff)}
            {projectinfo.map((item, index) => (
                <div className="card" key={index}>
                    {console.log(item)}
                    <Accordion sx={{ mt: 1 }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Home sx={{ mr: 1 }} /><Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{'   ' + item.id_project}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_status_name_title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                            member.map((data, index) => (
                                                (data.id_project === item.id_project) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
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
                                            staff.map((data) => (
                                                data.staff.map((data2, index2) => (
                                                    console.log(data2),
                                                    console.log(index2),
                                                    (data2.id_project === item.id_project) ?
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                                        : (index2 == 0) ? 'ไม่มีที่ปรึกษา' : ''
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
                                    <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษาร่วม</Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            staff.map((data) => (
                                                data.os_staff.map((data2, index2) => (
                                                    (data2.id_project === item.id_project) ?
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                                        : (index2 == 0) ? 'ไม่มีที่ปรึกษาร่วม' : ''
                                                ))
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </React.Fragment>
    )
}