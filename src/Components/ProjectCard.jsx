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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckIcon from '@mui/icons-material/Check';
import Add from '@mui/icons-material/Add';
import axios from '../libs/Axios';
import ModalAddStaff from './ModalAddStaff';

export default function ProjectCard({ projectinfo }) {


    const [dialog, setDialog] = React.useState(false);
    const [dialogstaff, setDialogStaff] = React.useState(false);
    const [deldatastaffos, setDeldatastaffos] = React.useState();
    const [dialogdelProject, setdialogDelProject] = React.useState(false);

    const [openAddStaff, setOpenAddStaff] = React.useState(false);

    const [member, setMember] = React.useState([]);
    const [staff, setStaff] = React.useState([]);
    const [staffos, setStaffos] = React.useState([]);

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
        try {
            await axios.put('/user/initalcomfirm', {
                id_project_status: item
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
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
                                <Button onClick={() => {btninitalcomfirm(item.id_project_status)}} disabled={adviserContent == null} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
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
        </React.Fragment>
    )
}