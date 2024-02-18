import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack } from '@mui/material';
import { Edit, Home } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Add from '@mui/icons-material/Add';
import axios from '../libs/Axios';
import ModalAddStaff from './ModalAddStaff';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { InputLabel } from '@mui/material';


export default function ProjectCard({ projectinfo, editMode, setEditMode }) {
    const [subject, setSubject] = React.useState(-1);
    const [subjectList, setSubjectList] = React.useState();
    const handleChangesubject = (event) => {
        setSubject(event.target.value);
    };
    React.useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get('/resources/public/subject');
                
                setSubjectList(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubject();
    }, []);

    const [dialog, setDialog] = React.useState(false);
    const [dialogstaff, setDialogStaff] = React.useState(false);
    const [deldatastaffos, setDeldatastaffos] = React.useState();
    const [dialogdelProject, setdialogDelProject] = React.useState(false);
    const [errAlert, setErrAlert] = React.useState(false);
    const [project_title_th, setProject_title_th] = React.useState(projectinfo[0].project_title_th);
    const [project_title_en, setProject_title_en] = React.useState(projectinfo[0].project_title_en);
    const [project_study_title_th, setProject_study_title_th] = React.useState(projectinfo[0].case_study_title_th);
    const [project_study_title_en, setProject_study_title_en] = React.useState(projectinfo[0].case_study_title_en);
    const [openAddStaff, setOpenAddStaff] = React.useState(false);

    const [member, setMember] = React.useState([]);
    const [staff, setStaff] = React.useState([]);
    const [openBuild, setOpenBuild] = React.useState(false);

    const [projectcode, setProjectcode] = React.useState();
    let adviserContent = null;
    let countStd = 0;
    const fetchData = async () => {
        const result = await Promise.all(projectinfo.map(item => search(item)));
        const flattenedResult = result.flat();
        setMember(flattenedResult);
    };

    const fetchStaff = async () => {
        await Promise.all(projectinfo.map(item => searchStaff(item)));
    };

    const handleCloseDel = () => {
        setDialog(false);
    };

    function AlertDialog(data2) {
        setDialog(true),
            setDeldatastaffos(data2.id_project_os_staff)
    }

    function confimdel() {
        delstaffos(deldatastaffos)
    }

    React.useEffect(() => {
        fetchData();
        fetchStaff();
    }, [projectinfo]);

    const handleCloseBuild = () => {
        setOpenBuild(false);
    };

    const submitBuild = async (e) => {
        e.preventDefault();
        if (project_title_th === '' || project_title_en === '' || subject === -1) {
            setErrAlert(true)
        } else {
            try {
                await axios.put('/user/build', {
                    id_project: projectinfo[0].id_project,
                    project_title_th: project_title_th,
                    project_title_en: project_title_en,
                    case_study_title_th: project_study_title_th,
                    case_study_title_en: project_study_title_en,
                    subject_code: subject
                });
                setOpenBuild(false);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

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

    const delstaffos = async (item) => {
        try {
            await axios.delete('/user/staffos', {
                data: {
                    id_project_os_staff: item
                }
            });
            setDialog(false)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const delstaff = async (item) => {
        try {
            await axios.delete('/user/projectstaff', {
                data: {
                    id_project_staff: item
                }
            });
            setDialogStaff(false)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const btninitalcomfirm = async (item) => {
        if (editMode == 1) {
            setEditMode(0)
        }
        else {
            try {
                await axios.put('/user/initalcomfirm', {
                    id_project_status: item
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCloseDelStaff = () => {
        setDialogStaff(false);
    };

    function AlertDialogStaff(data2) {
        setDialogStaff(true),
            setDeldatastaffos(data2.id_project_staff)
    }

    function confimdelStaff() {
        delstaff(deldatastaffos)
    }
    const delProject = async (item) => {
        try {
            await axios.delete('/user/join', {
                data: {
                    params: {
                        id_project: item
                    }
                }
            });
            setDialogStaff(false)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    const handleCloseDelProject = () => {
        setdialogDelProject(false);
    };

    function AlertDialogProject(data2) {
        setdialogDelProject(true),
            setDeldatastaffos(data2.id_project)
    }

    function confimdelProject() {
        delProject(deldatastaffos)
    }

    return (
        <React.Fragment>
            {console.log(staff)}
            {projectinfo.map((item, index) => (
                <div className="card" key={index}>
                    {console.log(item)}
                    <Accordion key={index} sx={{ mt: 1 }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Home sx={{ mr: 1 }} /><Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{'   ' + item.id_project}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_status_name_title}</Typography>
                        </AccordionSummary>
                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2} sx={{ mr: 2.5 }}>
                            <Button onClick={() => { setOpenBuild(true) }} variant="outlined" href="#outlined-buttons">
                                <Edit />
                            </Button>
                        </Stack>
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
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{countStd++}{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
                                                    : ''
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Card>
                            <Button onClick={() => { setOpenAddStaff(true), setProjectcode(item.id_project) }} sx={{ mt: 2.5, mb: 1 }} variant='contained' color='primary' startIcon={<Add />}>เพิ่มที่ปรึกษา</Button>
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
                                                                <IconButton onClick={() => { AlertDialogStaff(data2) }} sx={{ pb: 1.2 }} aria-label="delete">
                                                                    <DeleteIcon color="error" fontSize="small" />
                                                                </IconButton>
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
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { AlertDialogStaff(data2) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                        : ''
                                                ))
                                            ))
                                        }
                                        {
                                            staff.map((data) => (
                                                data.os_staff.map((data2, index2) => (
                                                    (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { AlertDialog(data2) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                        : ''
                                                ))
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Card>
                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}>
                                <Button onClick={() => { btninitalcomfirm(item.id_project_status) }} disabled={adviserContent == null} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
                                <Button onClick={() => { AlertDialogProject(item) }} variant='contained' color='error' startIcon={<DeleteIcon />}>{countStd > 1 ? 'ออกจากโครงงาน' : 'ลบโครงงาน'}</Button>
                            </Stack>

                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
            <Dialog
                open={dialog}
                onClose={handleCloseDel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Remove"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ยืนยันต้องการลบข้อมูลนี้หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDel}>ยกเลิก</Button>
                    <Button onClick={confimdel} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogstaff}
                onClose={handleCloseDelStaff}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Remove"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ยืนยันต้องการลบข้อมูลนี้หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelStaff}>ยกเลิก</Button>
                    <Button onClick={confimdelStaff} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogdelProject}
                onClose={handleCloseDelProject}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ยืนยันต้องการออกจากโครงงานนี้หรือไม่
                    </DialogContentText>
                    <h4>*หากโครงงานไม่มีสมาชิกอื่นๆ โครงงานจะถูกลบออกจากระบบ</h4>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelProject}>ยกเลิก</Button>
                    <Button onClick={confimdelProject} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal
                open={openAddStaff}
                onClose={() => setOpenAddStaff(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 450 }}>
                    <ModalAddStaff setOpenAddStaff={setOpenAddStaff} projectcode={projectcode} />
                </Box>
            </Modal>
            <Modal
                open={openBuild}
                onClose={handleCloseBuild}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Edit Your Project</h2>
                    <Box component="form" noValidate onSubmit={submitBuild} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="project_title_th"
                            label="ชื่อโปรเจ็คภาษาไทย"
                            name="project_title_th"
                            autoFocus
                            value={project_title_th}
                            onChange={(e) => { setProject_title_th(e.target.value) }}
                            error={errAlert}
                            helperText={errAlert ? 'กรุณากรอกข้อมูล' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="project_title_en"
                            label="ชื่อโปรเจ็คภาษาอังกฤษ"
                            name="project_title_en"
                            autoFocus
                            value={project_title_en}
                            onChange={(e) => { setProject_title_en(e.target.value) }}
                            error={errAlert}
                            helperText={errAlert ? 'กรุณากรอกข้อมูล' : ''}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="project_study_title_th"
                            label="แหล่งกรณีศึกษาภาษาไทย"
                            name="project_study_title_th"
                            autoFocus
                            value={project_study_title_th}
                            onChange={(e) => { setProject_study_title_th(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="project_study_title_en"
                            label="แหล่งกรณีศึกษาภาษาอังกฤษ"
                            name="project_study_title_en"
                            autoFocus
                            value={project_study_title_en}
                            onChange={(e) => { setProject_study_title_en(e.target.value) }}
                        />
                        <InputLabel id="select-subject">เลือกรายวิชาโครงงานพิเศษ</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-subject"
                            id="select-subject"
                            value={subject}
                            error={errAlert}
                            label="เลือกรายวิชาโครงงานพิเศษ"
                            onChange={handleChangesubject}
                        >
                            {
                                console.log(subjectList)
                            }
                            <MenuItem value={-1}></MenuItem>
                            {subjectList ? subjectList.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.subject_code}>{item.subject_code + "  " + item.subject_name}</MenuItem>
                                )
                            }) : ''}
                        </Select>
                        <Button
                            type="submit"
                            required
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}