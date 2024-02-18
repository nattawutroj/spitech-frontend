import React from "react";
import { ProfileContext } from "../StudentDash";
import { Box, Button, CssBaseline, Modal, Stack, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "../libs/Axios";
import Accord from "./Accord";
import ProjectCard from "./ProjectCard";
import ProjectStudentHome from "./ProjectStudentHome";
import { Select, MenuItem, InputLabel } from "@mui/material";


export default function ProjectDash() {
    const profile = React.useContext(ProfileContext);
    const [subject, setSubject] = React.useState(-1);
    const [subjectList, setSubjectList] = React.useState('');
    const handleChangesubject = (e) => {
        setSubject(e.target.value);
    }

    console.log(profile);
    const [open, setOpen] = React.useState(false);
    const [openBuild, setOpenBuild] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const styleModal = {
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenBuild = () => {
        setOpenBuild(true);
        setOpen(false);
    };
    const handleCloseBuild = () => setOpenBuild(false);
    const handleOpenJoin = () => {
        setOpenJoin(true);
        setOpen(false);
    };
    const handleCloseJoin = () => setOpenJoin(false);

    const [errAlert, setErrAlert] = React.useState(false);
    const submitBuild = (e) => {
        e.preventDefault();
        const project_title_th = e.target.project_title_th.value;
        const project_title_en = e.target.project_title_en.value;
        const project_study_title_th = e.target.project_study_title_th.value;
        const project_study_title_en = e.target.project_study_title_en.value;
        if (project_title_th == '' || project_title_en == '' || subject == -1) {
            setErrAlert(true);
            return;
        }
        axios.post('/user/build', {
            project_title_th: project_title_th,
            project_title_en: project_title_en,
            project_study_title_th: project_study_title_th,
            project_study_title_en: project_study_title_en,
            subject_code: subject
        }).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
                setErrAlert(false);
                window.location.reload();
            } else {
                setErrAlert(true);
            }
        }).catch((err) => {
            console.log(err);
            setErrAlert(true);
        })
    }
    const [searchJoinField, setSearchJoinField] = React.useState('');

    const handleSearchJoinField = (e) => {
        setSearchJoinField(e.target.value);
    }

    const [submitJoinDisabled, setSubmitJoinDisabled] = React.useState(true);

    const [accDetail, setAccDetail] = React.useState(false);
    const [joinDetail, setJoinDetail] = React.useState();

    const searchJoin = () => {
        const id_project = searchJoinField;
        console.log(id_project);
        axios.post('/user/checkjoin', {
            id_project: id_project
        }).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
                setErrAlert(false);
                setAccDetail(true);
                setJoinDetail(res.data.result);
                setSubmitJoinDisabled(false);
                res.data.result.map((item) => {
                    if (item.student_code == profile.profile.student_code) {
                        setSubmitJoinDisabled(true);
                    }
                }
                )
            }
        }).catch((err) => {
            console.log(err);
            setAccDetail(false);
            setErrAlert(true);
            setSubmitJoinDisabled(true);
        })
    }

    const fetchsubject = () => {
        console.log("fetchsubject");
        axios.get('/resources/public/subject').then((res) => {
            console.log(res);
            if (res.data.code == 200) {
                console.log(res.data);
                setSubjectList(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const submitJoin = () => {
        console.log("asd");
        axios.post('/user/join', {
            id_project: searchJoinField
        }).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
                setErrAlert(false);
                window.location.reload();
            } else {
                setErrAlert(true);
            }
        }).catch((err) => {
            console.log(err);
            setErrAlert(true);
        })
    }

    const [addProjectBtn, setAddProjectBtn] = React.useState(true);
    const [projectinfo, setProjectinfo] = React.useState([{}]);
    React.useEffect(() => {
        axios.get('/user/projectinfo').then((res) => {
            console.log("res");
            console.log(res);
            if (res.data.status == 200) {
                if (res.data.result.length != 0) {
                    setProjectinfo(res.data.result);
                    console.log("addProjectBtn");
                    setAddProjectBtn(false);
                }
            }
        }).catch((err) => {
            console.log(err);
        })
        fetchsubject();
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            {
                console.log(projectinfo)
            }{
                addProjectBtn
                    ?
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        sx={{ mt: 2 }}
                        onClick={handleOpen}
                        disabled={!addProjectBtn}
                        hidden={!addProjectBtn}
                    >
                        Add Project
                    </Button>
                    :
                    projectinfo[0].id_project_status_title == 0
                        ?
                        < ProjectCard projectinfo={projectinfo} />
                        :
                        <ProjectStudentHome projectinfo={projectinfo} />
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title"></h2>
                    <Stack direction="row" spacing={2}>
                        <Button sx={{ width: '50%', height: '100px' }} mr="3" variant="contained" onClick={handleOpenBuild}>
                            สร้างโปรเจค
                        </Button>
                        <Button sx={{ width: '50%', height: '100px' }} variant="contained" onClick={handleOpenJoin}>
                            เข้าร่วมโปรเจค
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal
                open={openBuild}
                onClose={handleCloseBuild}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title">Build Your Project</h2>
                    <Box component="form" noValidate onSubmit={submitBuild} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="project_title_th"
                            label="ชื่อโปรเจ็คภาษาไทย"
                            name="project_title_th"
                            autoFocus
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
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="project_study_title_en"
                            label="แหล่งกรณีศึกษาภาษาอังกฤษ"
                            name="project_study_title_en"
                            autoFocus
                        />
                        <InputLabel id="select-subject">เลือกรายวิชาโครงงานพิเศษ</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-subject"
                            id="demo-simple-select"
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
                                    <MenuItem key={index} value={item.subject_code}>{item.subject_code + "  " +item.subject_name}</MenuItem>
                                )
                            }) : ''}
                        </Select>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openJoin}
                onClose={handleCloseJoin}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title">Join Project </h2>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id_project"
                            label="รหัสโปรเจ็ค"
                            name="id_project"
                            onChange={handleSearchJoinField}
                            value={searchJoinField}
                            autoFocus
                            error={errAlert}
                            helperText={errAlert ? 'ไม่พบข้อมูล' : ''}
                        />
                        <Button
                            onClick={searchJoin}
                            size="small"
                            width="100%"
                            variant="contained"
                        >
                            Search
                        </Button>
                    </Stack>
                    {accDetail ? <Accord joinDetail={joinDetail} /> : ''}
                    <Button
                        onClick={submitJoin}
                        fullWidth
                        variant="contained"
                        disabled={submitJoinDisabled}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {submitJoinDisabled ? 'Join' : setAccDetail ? 'Join' : 'Joined'}
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

