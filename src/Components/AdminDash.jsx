import React from "react";
import axios from "../libs/Axios";
import { Accordion, Box, Grid, Modal, TextField } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { ZoomIn } from "@mui/icons-material";
import ProjectDetail from './SubComponets/ProjectDetail';
import { Check as CheckIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalAddJust from "./ModalAddJust";
import { IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Calander from "./SubComponets/Calander";

export default function AdminDash() {

    const [dialogstaff, setDialogstaff] = React.useState(false);
    const [aaid_staff, setAaid_staff] = React.useState('');
    const [openCalander, setOpenCalander] = React.useState(false);


    const handleCloseDelStaff = () => {
        setDialogstaff(false);
    };

    const handleRemoveStaff = (id) => {
        console.log(id);
        setAaid_staff(id);
        setDialogstaff(true);
    }

    const confimdelStaff = () => {
        axios.delete('/user/projectstaff', {
            data: {
                id_project_staff: aaid_staff
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 200) {
                    window.alert("ลบข้อมูลสำเร็จ");
                    setDialogstaff(false);
                    setAct(act + 1);
                } else {
                    window.alert("ลบข้อมูลไม่สำเร็จ");
                }
            }
            )
            .catch(err => {
                console.log(err);
            });
    }


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

    const [fileList, setFileList] = React.useState([]);
    const [projectProcess, setProjectProcess] = React.useState([]);
    const [projectProcessWaitSchdule, setProjectProcessWaitSchdule] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [Canceldatafrom, setCanceldatafrom] = React.useState([]);
    const [Cancelcomment, setCancelcomment] = React.useState('');
    const [selectstatus_code, setSelectStatus_code] = React.useState(21);
    const [openAddJust, setOpenAddJust] = React.useState(false);
    const [projectcode, setProjectcode] = React.useState('');
    const [staff, setStaff] = React.useState([]);
    const [ajid, setAjid] = React.useState('');
    const [act, setAct] = React.useState(0);

    let adviserContent = null;

    React.useEffect(() => {
        axios.get('/resources/admin/projectinfomation/staff',
            {
                params: {
                    id_project: ajid
                }
            }
        ).then(res => {
            setStaff(res.data.result);
        }).catch(err => {
            console.log(err);
        });
    }, [ajid, act]);

    const convertDate = (date) => {
        let d = new Date(date);
        return d.toLocaleString();
    }

    const [pdfUrl, setPdfUrl] = React.useState('');


    const handleFileDownload = (id_file) => {
        axios.get('/resources/public/download/pdf', {
            params: {
                file: id_file
            },
            responseType: 'arraybuffer', // Specify arraybuffer responseType
        }).then((response) => {
            // Create a Blob from the array buffer
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a data URL from the Blob
            const dataUrl = URL.createObjectURL(blob);

            // Open the PDF file in a new window or tab
            if (window.innerWidth < 900) {
                setPdfUrl(null)
                window.open(dataUrl);
            }
            else {
                setPdfUrl(dataUrl);
            }
        }).catch(err => {
            setPdfUrl(null)
            console.log(err);
        }
        );
    };

    const Fetchreqreport = () => {
        axios.get('resources/admin/reqreport',
            {
                params: {
                    status_code: selectstatus_code
                }
            }
        ).then(res => {
            setPdfUrl(null)
            setFileList(res.data.result);
            setExpanded(false);
        }).catch(err => {
            console.log(err);
        })
    }
    const FetchProjectProcess = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 4
            }
        })
            .then(response => {
                const projectProcessData = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessData.map(item => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessData with fileLastUpdates
                        const combinedData = projectProcessData.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcess(prevProjectProcess => [...prevProjectProcess, ...combinedData]);
                setProjectProcess(combinedData);
                console.log(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitSchdule = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 5
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData.map(item => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitSchduleData with fileLastUpdates
                        const combinedData = projectProcessWaitSchduleData.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjectProcessWaitSchdule(combinedData);
                console.log(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const Viewpdf = (id) => {
        console.log(id)
        handleFileDownload(id);
    }


    const handleChange = (panel) => {
        setExpanded(panel);
    }

    React.useEffect(() => {
        Fetchreqreport();
        FetchProjectProcess();
        FetchProjectProcessWaitSchdule();
        console.log(projectProcess)
    }, [selectstatus_code])

    const handlereportCancel = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        console.log(id_project_file_paths, comment, id_project_status_title, id_project_status)
        setCanceldatafrom({
            id_project_file_paths: id_project_file_paths,
            id_project_status_title: id_project_status_title,
            id_project_status: id_project_status
        })
        setOpenCancel(true)
    }

    const handleCancelcomment = () => {
        console.log(Canceldatafrom.id_project_file_paths, Cancelcomment, Canceldatafrom.id_project_status_title, Canceldatafrom.id_project_status)
        axios.post('resources/admin/reqreport/prove',
            {
                id_project_file_paths: Canceldatafrom.id_project_file_paths,
                comment: Cancelcomment,
                id_project_status: Canceldatafrom.id_project_status,
                id_project_status_title: Canceldatafrom.id_project_status_title
            }
        ).then((response) => {
            console.log(response.data)
            window.location.reload();
        });
    }
    const handlereportConfirm = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        if (confirm("ยืนยันการดำเนินการ")) {
            console.log(id_project_file_paths, comment, id_project_status_title, id_project_status)
            axios.post('resources/admin/reqreport/approve',
                {
                    id_project_file_paths: id_project_file_paths,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title
                }
            ).then((response) => {
                console.log(response.data)
                window.location.reload();
            });
        } else {
            null
        }
    }


    return (
        <>
            <FormControl sx={{ m: 1, mt: 2, minWidth: 120 }} size="small">
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    สถานะ
                </InputLabel>
                <NativeSelect
                    defaultValue={21}
                    inputProps={{
                        name: 'status_code',
                        id: 'uncontrolled-native',
                    }}
                    onChange={(e) => { setSelectStatus_code(e.target.value) }}
                >
                    <option value={21}>รอดำเนินการ</option>
                    <option value={18}>ไม่สำเร็จ</option>
                </NativeSelect>
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                    {fileList?.map((file, index) => (
                        <Accordion expanded={expanded === `${file.id_project_file_path}`} onChange={() => { console.log(`${file.id_project_file_path}`), handleChange(`${file.id_project_file_path}`), Viewpdf(file.path) }} key={index} sx={{ mt: 1, width: '100%' }} >
                            {
                                console.log(file)
                            }
                            <AccordionSummary
                                expandIcon={<CloudUploadIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รหัสคำร้อง {file.id_project_file_path}</Typography>
                                {
                                    file.staus_code == 21 ?
                                        <Typography sx={{ pt: 0.3, color: green[600] }}>{file.doc_status_name_title}</Typography>
                                        :
                                        file.staus_code == 18 ?
                                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.doc_status_name_title}</Typography>
                                            :
                                            null
                                }
                            </AccordionSummary>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                sx={{ ml: 4, mr: 4 }}
                            >
                                <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>รายละเอียด</Typography>
                                <Typography sx={{ mt: 0.1, pr: '50%', color: 'text.secondary' }}>{file.id_project}</Typography>
                            </Stack>
                            <ProjectDetail id={file.id_project} />
                            <AccordionDetails>
                                <Card sx={{ p: 1 }}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Stack direction="row" spacing={0}>
                                        <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>เวลา</Typography>
                                        <Stack direction="column" spacing={0}>
                                            <Typography sx={{ mt: 0.3, color: 'text.secondary' }}>{convertDate(file.timestamp)}</Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                                <Card sx={{ p: 1 }}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Stack direction="row" spacing={0}>
                                        <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>สถานะ</Typography>
                                        <Stack direction="column" spacing={0}>
                                            {
                                                file.staus_code == 21 ?
                                                    <Typography sx={{ pt: 0.3, color: orange[600] }}>{file.doc_status_name_title}</Typography>
                                                    :
                                                    file.staus_code == 19 ?
                                                        <Typography sx={{ pt: 0.3, color: red[600] }}>{file.doc_status_name_title}</Typography>
                                                        :
                                                        null
                                            }
                                        </Stack>
                                    </Stack>
                                </Card>
                                <Card sx={{ p: 1 }}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Stack direction="row" spacing={0}>
                                        <Typography sx={{ mt: 2, width: '33%', flexShrink: 0 }}>ไฟล์</Typography>
                                        <Stack direction="column" spacing={0}>
                                            <Typography sx={{ pt: 1, mb: 1, color: 'text.secondary' }}><Button onClick={() => { handleFileDownload(file.path) }} component="label" variant="contained" startIcon={<ZoomIn />}>View File</Button></Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                                {

                                    file.comment != null ?
                                        <Card sx={{ p: 1 }}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Stack direction="row" spacing={0}>
                                                <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>หมายเหตุ</Typography>
                                                <Stack direction="column" spacing={0}>
                                                    <Typography sx={{ mt: 0.3, color: 'text.secondary' }}>{file.comment}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Card> : ''
                                }

                                {
                                    selectstatus_code == 21 ?
                                        <Stack direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            spacing={2} sx={{ mt: 2.5 }}>
                                            <Button onClick={() => { handlereportConfirm(file.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status) }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
                                            {
                                                console.log(file.id_project_file_path)
                                            }
                                            <Button onClick={() => { handlereportCancel(file.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                        </Stack>
                                        :
                                        null
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    {
                        selectstatus_code == 21 && projectProcess.length > 0 ?
                            <Accordion>
                                <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รอแต่งตั้งกรรมการ</Typography>
                                </AccordionSummary>
                                {projectProcess.map((file, index) => (
                                    console.log(file),
                                    <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { console.log(`${file.fileLastUpdate.id_project_file_path}`), handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ mt: 1, width: '100%' }} >
                                        {
                                            console.log(file)
                                        }
                                        <AccordionSummary
                                            expandIcon={<CloudUploadIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รหัสโครงงาน {file.id_project}</Typography>
                                            <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                        </AccordionSummary>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ ml: 4, mr: 4 }}
                                        >
                                            <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>รายละเอียด</Typography>
                                        </Stack>
                                        <ProjectDetail act={act} id={file.id_project} />

                                        <Button onClick={() => { setAjid(file.id_project), setProjectcode(file.id_project), setOpenAddJust(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>แต่งตั้งกรรมการ</Button>
                                        {
                                            <AccordionDetails >
                                                <Stack direction="row"
                                                    justifyContent="flex-end"
                                                    alignItems="center"
                                                    spacing={2} sx={{ mt: 2.5 }}>
                                                    <Button onClick={() => { handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status) }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
                                                    <Button onClick={() => { handlereportCancel(file.fileLastUpdate.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                                </Stack>

                                            </AccordionDetails>
                                        }
                                    </Accordion>
                                ))}
                            </Accordion>
                            :
                            null
                    }
                    {
                        selectstatus_code == 21 && projectProcessWaitSchdule.length > 0 ?
                            <Accordion>
                                <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รอจัดตารางสอบ</Typography>
                                </AccordionSummary>
                                {projectProcessWaitSchdule.map((file, index) => (
                                    console.log(file),
                                    <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { console.log(`${file.fileLastUpdate.id_project_file_path}`), handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ mt: 1, width: '100%' }} >
                                        {
                                            console.log(file)
                                        }
                                        <AccordionSummary
                                            expandIcon={<CloudUploadIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รหัสโครงงาน {file.id_project}</Typography>
                                            <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                        </AccordionSummary>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ ml: 4, mr: 4 }}
                                        >
                                            <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>รายละเอียด</Typography>
                                        </Stack>
                                        <ProjectDetail act={act} id={file.id_project} />

                                        <Button onClick={() => { setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>จัดตารางสอบ</Button>
                                        {
                                            <AccordionDetails >
                                                <Stack direction="row"
                                                    justifyContent="flex-end"
                                                    alignItems="center"
                                                    spacing={2} sx={{ mt: 2.5 }}>
                                                    <Button onClick={() => { handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status) }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
                                                    <Button onClick={() => { handlereportCancel(file.fileLastUpdate.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                                </Stack>

                                            </AccordionDetails>
                                        }
                                    </Accordion>
                                ))}
                            </Accordion>
                            :
                            null
                    }
                </Grid>
                {
                    pdfUrl != null ?
                        window.innerWidth > 600 ?
                            <Grid item xs={12} md={12} lg={6}>
                                <iframe
                                    src={pdfUrl}
                                    title="file"
                                    style={{ width: '100%', height: '100vh', border: 'none' }}
                                />
                            </Grid>
                            :
                            null
                        :
                        null
                }
            </Grid>
            <Modal open={openCancel} onClose={() => { setOpenCancel(false) }}>
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">ความเห็นเพิ่มเติม</h2>
                    <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="comment"
                            label="หมายเหตุ"
                            name="comment"
                            autoFocus
                            value={Cancelcomment}
                            onChange={(e) => { setCancelcomment(e.target.value) }}
                        />

                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2} sx={{ mt: 2.5 }}><Button
                                onClick={() => { handleCancelcomment() }}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                ยืนยัน
                            </Button>
                            <Button onClick={() => { setOpenCancel(false) }} variant='contained' color='error'>ยกเลิก</Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openAddJust}
                onClose={() => setOpenAddJust(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 450 }}>
                    <ModalAddJust act={act} setAct={setAct} setOpenAddJust={setOpenAddJust} projectcode={projectcode} />
                    <Card sx={{ p: 1 }}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Stack direction="row" spacing={0}>
                            <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษา</Typography>
                            <Stack direction="column" spacing={0}>
                                {
                                    staff.map((data, index) => {
                                        console.log("data");
                                        // Use a variable to conditionally render the "ไม่มีที่ปรึกษา" message

                                        data.staff.map((data2, index2) => {

                                            if (data2.id_project === ajid && data2.id_project_staff_position === 2) {
                                                adviserContent = (
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>
                                                        {data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}
                                                        <IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete">
                                                            <DeleteIcon color="error" fontSize="small" />
                                                        </IconButton>
                                                    </Typography>
                                                );
                                            }
                                        });

                                        // Render the content for each staff member
                                        return (
                                            <div key={index}>
                                                {adviserContent ? adviserContent : <Typography sx={{ color: 'red' }} key={index}>ไม่มีกรรมการ</Typography>}
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
                            <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>กรรมการ </Typography>
                            <Stack direction="column" spacing={0}>
                                {
                                    staff.map((data) => (
                                        data.staff.map((data2, index2) => (
                                            (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff),console.log(data2) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                : ''
                                        ))
                                    ))
                                }
                                {
                                    staff.map((data) => (
                                        data.os_staff.map((data2, index2) => (
                                            (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff),console.log(data2) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                : ''
                                        ))
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Card>
                </Box>
            </Modal>

            <Modal open={openCalander} onClose={() => { setOpenCalander(false) }}>
                <Box sx={{ ...style, width: 400 }}>
                    <Calander />
                </Box>
            </Modal>

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
        </>
    )
}