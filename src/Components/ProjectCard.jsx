import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack } from '@mui/material';
import { Edit, Home } from '@mui/icons-material';
import axios from '../libs/Axios';

export default function ProjectCard({ projectinfo }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [member, setMember] = React.useState([]);

    const fetchData = async () => {
        const result = await Promise.all(projectinfo.map(item => search(item)));
        const flattenedResult = result.flat();
        setMember(flattenedResult);
    };

    React.useEffect(() => {
        fetchData();
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

    return (
        <React.Fragment>
            {projectinfo.map((item, index) => (
                <div className="card" key={index}>
                    {console.log(item)}
                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Home sx={{ mr: 1 }} /><Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{'   ' + item.id_project}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_status_name_title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* aa */}
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Edit />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    <Stack direction="column" spacing={0}>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_th}</Typography>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_en}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            {/* aa */}
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Edit />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>กรณีศึกษา</Typography>
                                    <Stack direction="column" spacing={0}>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_th}</Typography>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_en}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Edit />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>ผู้จัดทำโครงงาน</Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            member.map((data, index) => (
                                                (data.id_project === item.id_project) ? 
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
                                            : ''
                                                ))
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Edit />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>ที่ปรึกษา</Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            member.map((data, index) => (
                                                (data.id_project === item.id_project) ? 
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
                                            : ''
                                                ))
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </React.Fragment>
    )
}