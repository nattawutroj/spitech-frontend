import React from "react";
import axios from "../libs/Axios";
import { Accordion, Box, Grid, Modal, TextField } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { CloudUpload as CloudUploadIcon, Print } from "@mui/icons-material";
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: 'Kanit, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
})

export default function AdminDash() {
    const [dialogstaff, setDialogstaff] = React.useState(false);
    const [aaid_staff, setAaid_staff] = React.useState('');
    const [openCalander, setOpenCalander] = React.useState(false);
    const [lableexam1, setLableexam1] = React.useState(0);
    const [lableexam2, setLableexam2] = React.useState(0);
    const [lableexam3, setLableexam3] = React.useState(0);
    const [projectProcessCount, setProjectProcessCount] = React.useState(0);
    const [projectProcessWaitSchduleCount, setProjectProcessWaitSchduleCount] = React.useState(0);
    const [projectProcessWaitSchdule60Count, setProjectProcessWaitSchdule60Count] = React.useState(0);
    const [projectProcessWaitSchdule100Count, setProjectProcessWaitSchdule100Count] = React.useState(0);
    const [projectProcessWaitRecordCount, setProjectProcessWaitRecordCount] = React.useState(0);
    const [projectProcessWaitConfiremT01Count, setprojectProcessWaitConfiremT01Count] = React.useState(0);
    const [projectProcessWaitRecord60Count, setProjectProcessWaitRecord60Count] = React.useState(0);
    const [projectProcessWaitRecord100Count, setProjectProcessWaitRecord100Count] = React.useState(0);
    const [projectProcessWaitRecordFinalCount, setProjectProcessWaitRecordFinalCount] = React.useState(0);
    const listcount = () => {
        setLableexam1(0);
        setLableexam2(0);
        setLableexam3(0);
        setProjectProcessCount(0);
        setProjectProcessWaitSchduleCount(0);
        setProjectProcessWaitSchdule60Count(0);
        setProjectProcessWaitSchdule100Count(0);
        setProjectProcessWaitRecordCount(0);
        setprojectProcessWaitConfiremT01Count(0);
        setProjectProcessWaitRecord60Count(0);
        setProjectProcessWaitRecord100Count(0);
        setProjectProcessWaitRecordFinalCount(0);
        fileList.map((file) => {
            if (file.id_project_status_title == 3) {
                setLableexam1((prevLableexam1) => prevLableexam1 + 1);
            }
            if (file.id_project_status_title == 8) {
                setLableexam2((prevLableexam2) => prevLableexam2 + 1);
            }
            if (file.id_project_status_title == 12) {
                setLableexam3((prevLableexam3) => prevLableexam3 + 1);
            }
        }
        )
        projectProcess?.map((file) => {
            setProjectProcessCount((prevProjectProcessCount) => prevProjectProcessCount + 1);
        }
        )
        projectProcessWaitSchdule?.map((file) => {
            setProjectProcessWaitSchduleCount((prevProjectProcessWaitSchduleCount) => prevProjectProcessWaitSchduleCount + 1);
        }
        )
        projectProcessWaitSchdule60?.map((file) => {
            setProjectProcessWaitSchdule60Count((prevProjectProcessWaitSchdule60Count) => prevProjectProcessWaitSchdule60Count + 1);
        }
        )
        projectProcessWaitSchdule100?.map((file) => {
            setProjectProcessWaitSchdule100Count((prevProjectProcessWaitSchdule100Count) => prevProjectProcessWaitSchdule100Count + 1);
        }
        )
        projectProcessWaitRecord?.map((file) => {
            setProjectProcessWaitRecordCount((prevProjectProcessWaitRecordCount) => prevProjectProcessWaitRecordCount + 1);
        })
        projectProcessWaitRecord60?.map((file) => {
            setProjectProcessWaitRecord60Count((prevProjectProcessWaitRecord60Count) => prevProjectProcessWaitRecord60Count + 1);
        })
        projectProcessWaitRecord100?.map((file) => {
            setProjectProcessWaitRecord100Count((prevProjectProcessWaitRecord100Count) => prevProjectProcessWaitRecord100Count + 1);
        })
        projectProcessWaitConfiremT01?.map((file) => {
            setprojectProcessWaitConfiremT01Count((prevprojectProcessWaitConfiremT01Count) => prevprojectProcessWaitConfiremT01Count + 1);
        })
        projectProcessWaitRecordFinal.map((file) => {
            console.log("hello")
            setProjectProcessWaitRecordFinalCount((prevProjectProcessWaitRecordFinalCount) => prevProjectProcessWaitRecordFinalCount + 1);
        })
    }


    const handleCloseDelStaff = () => {
        setDialogstaff(false);
    };

    const handleRemoveStaff = (id) => {
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
    const [projectProcessWaitSchdule60, setProjectProcessWaitSchdule60] = React.useState([]);
    const [projectProcessWaitSchdule100, setProjectProcessWaitSchdule100] = React.useState([]);
    const [projectProcessWaitRecord, setProjetProcessWaitRecord] = React.useState([]);
    const [projectProcessWaitConfiremT01, setProjectProcessWaitConfiremT01] = React.useState([]);
    const [projectProcessWaitRecord60, setProjetProcessWaitRecord60] = React.useState([]);
    const [projectProcessWaitRecord100, setProjetProcessWaitRecord100] = React.useState([]);
    const [projectProcessWaitRecordFinal, setProjetProcessWaitRecordFinal] = React.useState([]);
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
    const [idprojectstatustitle, setIdprojectstatustitle] = React.useState('');
    const [modalRecord, setmodalRecord] = React.useState(false);
    const [modalRecord2, setmodalRecord2] = React.useState(false);
    const [examrecord, setExamrecord] = React.useState('');
    const [examrecordcomment, setExamrecordcomment] = React.useState('');
    const [a1, setA1] = React.useState('');
    const [a2, setA2] = React.useState('');
    const [a3, setA3] = React.useState('');
    const [a4, setA4] = React.useState('');

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

    const cfrecordexam = () => {
        var x = 0;
        if (idprojectstatustitle == 6) {
            x = 1;
        }
        if (examrecord == 'ผ่าน') {
            handlereportConfirmUNC(a1, a2, a3, a4)
        }
        else if (examrecord == 'ไม่ผ่าน') {
            handleCancelcommentUNC(a1, examrecordcomment, a3, a4)
        }
        else if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            handleCancelcommentUNC(a1, examrecordcomment, a3, a4)
        }
        axios.post('/resources/admin/recordexam',
            {
                id_project: ajid,
                id_test_category: x,
                status_exam: examrecord,
                comment_exam: examrecordcomment
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }



    const Fetchreqreport = () => {
        axios.get('resources/admin/reqreport',
            {
                params: {
                    status_code: selectstatus_code
                }
            }
        ).then(res => {
            setPdfUrl(null)
            console.log(res)
            setFileList(res.data.result);
            setExpanded(false);
        }).catch(err => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        listcount();
    }, [fileList, projectProcess, projectProcessWaitSchdule, projectProcessWaitSchdule60, projectProcessWaitSchdule100, projectProcessWaitRecord, projectProcessWaitRecord60, projectProcessWaitRecord100, projectProcessWaitRecordFinal, projectProcessWaitConfiremT01])

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
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const FetchProjectProcessWaitSchdule60 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 9
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData60 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData60.map(item => {
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
                        // Combine projectProcessWaitSchduleData60 with fileLastUpdates
                        const combinedData = projectProcessWaitSchduleData60.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                setProjectProcessWaitSchdule60(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitSchdule100 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 13
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData100 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData100.map(item => {
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
                        const combinedData = projectProcessWaitSchduleData100.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                setProjectProcessWaitSchdule100(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtam = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 6
            }
        })
            .then(response => {
                const projectProcessWaitRecord = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord.map(item => {
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
                        // Combine projectProcessWaitRecord with fileLastUpdates
                        const combinedData = projectProcessWaitRecord.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtam60 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 10
            }
        })
            .then(response => {
                const projectProcessWaitRecord60 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord60.map(item => {
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
                        // Combine projectProcessWaitRecord60 with fileLastUpdates
                        const combinedData = projectProcessWaitRecord60.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord60(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const FetchProjectProcessWaitRecordExtam100 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 14
            }
        })
            .then(response => {
                const projectProcessWaitRecord100 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord100.map(item => {
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
                        // Combine projectProcessWaitRecord100 with fileLastUpdates
                        const combinedData = projectProcessWaitRecord100.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord100(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtamFinal = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 15
            }
        })
            .then(response => {
                const projectProcessWaitRecordFinal = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecordFinal.map(item => {
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
                        // Combine projectProcessWaitRecordFinal with fileLastUpdates
                        const combinedData = projectProcessWaitRecordFinal.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecordFinal(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitConfiremT01 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 28
            }
        })
            .then(response => {
                const projectProcessWaitConfiremT01 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitConfiremT01.map(item => {
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
                        // Combine projectProcessWaitRecord100 with fileLastUpdates
                        const combinedData = projectProcessWaitConfiremT01.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjectProcessWaitConfiremT01(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const Viewpdf = (id) => {
        handleFileDownload(id);
    }


    const handleChange = (panel) => {
        setExpanded(panel);
    }

    React.useEffect(() => {
        Fetchreqreport();
        FetchProjectProcess();
        FetchProjectProcessWaitSchdule();
        FetchProjectProcessWaitSchdule60();
        FetchProjectProcessWaitSchdule100();
        FetchProjectProcessWaitConfiremT01();
        FetchProjectProcessWaitRecordExtam();
        FetchProjectProcessWaitRecordExtam60();
        FetchProjectProcessWaitRecordExtam100();
        FetchProjectProcessWaitRecordExtamFinal();
    }, [selectstatus_code])

    const handlereportCancel = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        setCanceldatafrom({
            id_project_file_paths: id_project_file_paths,
            id_project_status_title: id_project_status_title,
            id_project_status: id_project_status
        })
        setOpenCancel(true)
    }

    const handleCancelcomment = () => {
        console.log(Canceldatafrom.id_project_file_paths, Cancelcomment, Canceldatafrom.id_project_status_title, Canceldatafrom.id_project_status);
        if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            axios.post('resources/admin/reqreport/provere',
                {
                    id_project_file_paths: Canceldatafrom.id_project_file_paths,
                    comment: Cancelcomment,
                    id_project_status: Canceldatafrom.id_project_status,
                    id_project_status_title: Canceldatafrom.id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
        else {
            axios.post('resources/admin/reqreport/prove',
                {
                    id_project_file_paths: Canceldatafrom.id_project_file_paths,
                    comment: Cancelcomment,
                    id_project_status: Canceldatafrom.id_project_status,
                    id_project_status_title: Canceldatafrom.id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
    }
    const handlereportConfirm = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        console.log(id_project_file_paths, comment, id_project_status_title, id_project_status);
        if (confirm("ยืนยันการดำเนินการ")) {
            axios.post('resources/admin/reqreport/approve',
                {
                    id_project_file_paths: id_project_file_paths,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        } else {
            null
        }
    }
    const handleCancelcommentUNC = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            axios.post('resources/admin/reqreport/provere',
                {
                    id_project_file_paths: id_project_file_paths,
                    comment: comment,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
        else {

            axios.post('resources/admin/reqreport/prove',
                {
                    id_project_file_paths: id_project_file_paths,
                    comment: comment,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
    }
    const handlereportConfirmUNC = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        axios.post('resources/admin/reqreport/approve',
            {
                id_project_file_paths: id_project_file_paths,
                id_project_status: id_project_status,
                id_project_status_title: id_project_status_title,
                id_project: ajid
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    const openDoc = (id, selectReport) => {
        window.open(`/testreport/${id}/${selectReport}`);
    }

    const openDocWidget = (id, selectReport) => {
        if (window.innerWidth < 900) {
            setPdfUrl(null)
            window.open(`/testreport/${id}/${selectReport}`);
        }
        else {
            setPdfUrl(`/testreport/${id}/${selectReport}`);
        }
    }



    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid sx={{ height: '100vh', overflowY: 'scroll' }} item xs={12} md={12} lg={6}>
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
                        <Accordion>
                            <AccordionSummary sx={{}} expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบหัวข้อ</Typography>
                                {
                                    lableexam1 > 0 ?
                                        <Typography sx={{ pt: 0.3, color: green[800] }}>มี {lableexam1} โครงงานรอทำรายการ</Typography>
                                        :
                                        <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                }
                            </AccordionSummary>
                            <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                            </Stack>
                            {
                                console.log(fileList)
                            }
                            {
                                fileList?.map((file, index) => (
                                    file.id_project_status_title == 3 ?
                                        < Accordion expanded={expanded === `${file.id_project_file_path}`} onChange={() => { handleChange(`${file.id_project_file_path}`), Viewpdf(file.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                {
                                                    file.staus_code == 21 ?
                                                        <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                        :
                                                        file.staus_code == 18 ?
                                                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_title_th}</Typography>
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
                                                            <Button onClick={() => { handlereportCancel(file.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                        :
                                        null
                                ))}
                        </Accordion>



                        {
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>แต่งตั้งกรรมการ</Typography>
                                        {
                                            projectProcessCount > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessCount} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcess.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
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
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>จัดตารางสอบหัวข้อ</Typography>
                                        {
                                            projectProcessWaitSchduleCount > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchduleCount} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitSchdule.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>จัดตารางสอบ</Button>
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => {
                                                                axios.get('/resources/admin/room/schedule', {
                                                                    params: {
                                                                        id_project: ajid,
                                                                        id_project_status_title: idprojectstatustitle
                                                                    }
                                                                })
                                                                    .then(res => {
                                                                        console.log(res.data.result)
                                                                        if (res.data.result.length === 0 || res.data.result.name == 'error') {
                                                                            window.alert("คุณยังไม่ได้จัดตารางสอบ")
                                                                        } else {
                                                                            // ถ้ามีข้อมูล
                                                                            handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status)
                                                                        }
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                    });
                                                            }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
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
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบหัวข้อ</Typography>
                                        {
                                            projectProcessWaitRecordCount > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecordCount} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitRecord.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), openDocWidget(file.id_project, 1) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Stack direction="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                    {/* <Typography sx={{ pt: 0.3 }}>{file.id_project_status_title == 6 ? 'สอบหัวข้อ' : ''}</Typography> */}
                                                </Stack>
                                            </AccordionSummary>

                                            <Stack direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                spacing={2} sx={{ mt: 2.5, mr: 2 }}>
                                                <Button onClick={() => { openDoc(file.id_project, 1) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>พิมพ์ใบประเมินการสอบ</Button>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            {/* <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>บันทึกผลการสอบ</Button> */}
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => { setA1(file.fileLastUpdate.id_project_file_path), setA2("สำเร็จ"), setA3(file.id_project_status_title), setA4(file.id_project_status), setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setmodalRecord(true) }} variant='contained' color='success' startIcon={<CheckIcon />}>บันทึกผลการสอบ</Button>
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
                            selectstatus_code == 21 ?
                                <Accordion sx={{ mt: 1, mb: 1 }}>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นยันการแก้ไข ทก.01</Typography>
                                        {
                                            projectProcessWaitConfiremT01Count > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitConfiremT01Count} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitConfiremT01.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            {/* <Button onClick={() => { setAjid(file.id_project), setProjectcode(file.id_project), setOpenAddJust(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>แต่งตั้งกรรมการ</Button> */}
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
                        <Accordion>
                            <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบหกสิบ</Typography>
                                {
                                    lableexam2 > 0 ?
                                        <Typography sx={{ pt: 0.3, color: green[600] }}>มี {lableexam2} โครงงานรอทำรายการ</Typography>
                                        :
                                        <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                }
                            </AccordionSummary>
                            <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                            </Stack>
                            {
                                fileList?.map((file, index) => (
                                    file.id_project_status_title == 8 ?
                                        <Accordion expanded={expanded === `${file.id_project_file_path}`} onChange={() => { handleChange(`${file.id_project_file_path}`), Viewpdf(file.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                {
                                                    console.log(file)
                                                }
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                {
                                                    file.staus_code == 21 ?
                                                        <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                        :
                                                        file.staus_code == 18 ?
                                                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_title_th}</Typography>
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
                                                            <Button onClick={() => { handlereportCancel(file.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                        :
                                        null
                                ))}
                        </Accordion>
                        {
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>จัดตารางสอบหกสิบ</Typography>
                                        {
                                            projectProcessWaitSchdule60Count > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchdule60Count} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitSchdule60.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>จัดตารางสอบ</Button>
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => {
                                                                axios.get('/resources/admin/room/schedule', {
                                                                    params: {
                                                                        id_project: ajid,
                                                                        id_project_status_title: idprojectstatustitle
                                                                    }
                                                                })
                                                                    .then(res => {
                                                                        if (res.data.result.length === 0 || res.data.result.name == 'error') {
                                                                            window.alert("คุณยังไม่ได้จัดตารางสอบ")
                                                                        } else {
                                                                            // ถ้ามีข้อมูล
                                                                            handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status)
                                                                        }
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                    });
                                                            }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
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
                            selectstatus_code == 21 ?
                                <Accordion sx={{ mb: 1 }}>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบหกสิบ</Typography>
                                        {
                                            projectProcessWaitRecord60Count > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecord60Count} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitRecord60.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), openDocWidget(file.id_project, 61) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Stack direction="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                    <Typography sx={{ pt: 0.3 }}>{file.id_project_status_title == 6 ? 'สอบหัวข้อ' : ''}</Typography>
                                                </Stack>
                                            </AccordionSummary>

                                            <Stack direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                spacing={2} sx={{ mt: 2.5, mr: 2 }}>
                                                <Button onClick={() => { openDoc(file.id_project, 61) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>พิมพ์ใบประเมินการสอบ</Button>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            {/* <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>บันทึกผลการสอบ</Button> */}
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => { setA1(file.fileLastUpdate.id_project_file_path), setA2("สำเร็จ"), setA3(file.id_project_status_title), setA4(file.id_project_status), setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setmodalRecord(true) }} variant='contained' color='success' startIcon={<CheckIcon />}>บันทึกผลการสอบ</Button>
                                                    </Stack>

                                                </AccordionDetails>
                                            }
                                        </Accordion>
                                    ))}
                                </Accordion>
                                :
                                null
                        }
                        <Accordion>
                            <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบร้อย</Typography>
                                {
                                    lableexam3 > 0 ?
                                        <Typography sx={{ pt: 0.3, color: green[600] }}>มี {lableexam3} โครงงานรอทำรายการ</Typography>
                                        :
                                        <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                }
                            </AccordionSummary>
                            <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                            </Stack>
                            {
                                fileList?.map((file, index) => (
                                    file.id_project_status_title == 12 ?
                                        <Accordion expanded={expanded === `${file.id_project_file_path}`} onChange={() => { handleChange(`${file.id_project_file_path}`), Viewpdf(file.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                {
                                                    file.staus_code == 21 ?
                                                        <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                        :
                                                        file.staus_code == 18 ?
                                                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_title_th}</Typography>
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
                                                            <Button onClick={() => { handlereportCancel(file.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                        :
                                        null
                                ))}
                        </Accordion>
                        {
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ตารางสอบร้อย</Typography>
                                        {
                                            projectProcessWaitSchdule100Count > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchdule100Count} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitSchdule100.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>จัดตารางสอบ</Button>
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => {
                                                                axios.get('/resources/admin/room/schedule', {
                                                                    params: {
                                                                        id_project: ajid,
                                                                        id_project_status_title: idprojectstatustitle
                                                                    }
                                                                })
                                                                    .then(res => {
                                                                        if (res.data.result.length === 0 || res.data.result.name == 'error') {
                                                                            window.alert("คุณยังไม่ได้จัดตารางสอบ")
                                                                        } else {
                                                                            // ถ้ามีข้อมูล
                                                                            handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status)
                                                                        }
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                    });
                                                            }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
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
                            selectstatus_code == 21 ?
                                <Accordion>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบร้อย</Typography>
                                        {
                                            projectProcessWaitRecord100Count > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecord100Count} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitRecord100.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), openDocWidget(file.id_project, 101) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Stack direction="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                                    <Typography sx={{ pt: 0.3 }}>{file.id_project_status_title == 6 ? 'สอบหัวข้อ' : ''}</Typography>
                                                </Stack>
                                            </AccordionSummary>

                                            <Stack direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                spacing={2} sx={{ mb: 2, mr: 2 }}>
                                                <Button onClick={() => { openDoc(file.id_project, 101) }} sx={{ mt: 0, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>พิมพ์ใบประเมินการสอบ</Button>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            {/* <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>บันทึกผลการสอบ</Button> */}
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button
                                                            onClick={() => { setA1(file.fileLastUpdate.id_project_file_path), setA2("สำเร็จ"), setA3(file.id_project_status_title), setA4(file.id_project_status), setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setmodalRecord(true) }} variant='contained' color='success' startIcon={<CheckIcon />}>บันทึกผลการสอบ</Button>
                                                    </Stack>

                                                </AccordionDetails>
                                            }
                                        </Accordion>
                                    ))}
                                </Accordion>
                                :
                                null
                        }
{/* asdvv */}
                        {
                            selectstatus_code == 21 ?
                                <Accordion sx={{ mt: 1, mb: 1 }}>
                                    <AccordionSummary expandIcon={<CloudUploadIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ส่งปริญญานิพนธ์ฉบับสมบูรณ์ และ CD</Typography>
                                        {
                                            projectProcessWaitRecordFinalCount > 0 ?
                                                <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecordFinalCount} โครงงานรอทำรายการ</Typography>
                                                :
                                                <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                                        }
                                    </AccordionSummary>
                                    <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                                        <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                                        <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    </Stack>
                                    {projectProcessWaitRecordFinal.map((file, index) => (
                                        <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), Viewpdf(file.fileLastUpdate.path) }} key={index} sx={{ backgroundColor: "#FFD4B7", mt: 1, width: '100%' }} >
                                            <AccordionSummary
                                                expandIcon={<CloudUploadIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                                <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                            </AccordionSummary>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                sx={{ ml: 4, mr: 4 }}
                                            >
                                            </Stack>
                                            <ProjectDetail act={act} id={file.id_project} />

                                            {/* <Button onClick={() => { setAjid(file.id_project), setProjectcode(file.id_project), setOpenAddJust(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>แต่งตั้งกรรมการ</Button> */}
                                            {
                                                <AccordionDetails >
                                                    <Stack direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={2} sx={{ mt: 2.5 }}>
                                                        <Button onClick={() => { handlereportConfirm(file.fileLastUpdate.id_project_file_path, "สำเร็จ", file.id_project_status_title, file.id_project_status) }} variant='contained' color='success' startIcon={<CheckIcon />}>ยืนยัน</Button>
                                                        {/* <Button onClick={() => { handlereportCancel(file.fileLastUpdate.id_project_file_path, "ทดสอบยกเลิก", file.id_project_status_title, file.id_project_status) }} variant='contained' color='error' startIcon={<DeleteIcon />}>ยกเลิก</Button>  */} {/* ถ้าต้องใช้งานยังไม่เพิ่ม ใน API */}
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
                        <RadioGroup
                            onChange={(e) => { setExamrecord(e.target.value) }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา" control={<Radio />} label="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา" />
                            <FormControlLabel value="ไม่ผ่าน" control={<Radio />} label="ไม่ผ่าน" />
                        </RadioGroup>
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
                                        staff.map((data) => (
                                            data.staff.map((data2, index2) => (
                                                (data2.id_project === ajid && data2.id_project_staff_position === 2) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
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
                                                (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                    : ''
                                            ))
                                        ))
                                    }
                                    {
                                        staff.map((data) => (
                                            data.os_staff.map((data2, index2) => (
                                                (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
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
                    <Box sx={{ ...style, width: '900px' }}>
                        <Calander idprojectstatustitle={idprojectstatustitle} setOpenCalander={setOpenCalander} ajid={ajid} />
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
                <Modal open={modalRecord} onClose={() => { setmodalRecord(false) }}>
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">บันทึกผลการสอบ</h2>
                        <RadioGroup
                            onChange={(e) => { setExamrecord(e.target.value) }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ผ่าน" control={<Radio />} label="ผ่าน" />
                            <FormControlLabel value="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา" control={<Radio />} label="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา" />
                            <FormControlLabel value="ไม่ผ่าน" control={<Radio />} label="ไม่ผ่าน" />
                        </RadioGroup>
                        <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="หมายเหตุ"
                                name="comment"
                                autoFocus
                                value={examrecordcomment}
                                onChange={(e) => { setExamrecordcomment(e.target.value) }}
                            />

                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}><Button
                                    onClick={() => {
                                        examrecord != ''
                                            ?
                                            examrecord == 'ไม่ผ่าน' || examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา'
                                                ?
                                                examrecordcomment != ''
                                                    ?
                                                    confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                        ?
                                                        cfrecordexam()
                                                        :
                                                        null
                                                    :
                                                    window.alert('กรุณากรอกหมายเหตุ')
                                                :
                                                confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                    ?
                                                    cfrecordexam()
                                                    :
                                                    null
                                            :
                                            window.alert('กรุณาเลือกผลการสอบ')
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ยืนยัน
                                </Button>
                                <Button onClick={() => { setmodalRecord(false) }} variant='contained' color='error'>ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={modalRecord2} onClose={() => { setmodalRecord(false) }}>
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">บันทึกผลการตรวจ ทก.01</h2>
                        <RadioGroup
                            onChange={(e) => { setExamrecord(e.target.value) }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ผ่าน" control={<Radio />} label="ผ่าน" />
                            <FormControlLabel value="ไม่ผ่านยื่นใหม่ภายในช่วงเวลา" control={<Radio />} label="ไม่ผ่านยื่นส่งใหม่" />
                            <FormControlLabel value="ไม่ผ่าน" control={<Radio />} label="ไม่ผ่าน" />
                        </RadioGroup>
                        <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="หมายเหตุ"
                                name="comment"
                                autoFocus
                                value={examrecordcomment}
                                onChange={(e) => { setExamrecordcomment(e.target.value) }}
                            />

                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}><Button
                                    onClick={() => {
                                        examrecord != ''
                                            ?
                                            examrecord == 'ไม่ผ่าน' || examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา'
                                                ?
                                                examrecordcomment != ''
                                                    ?
                                                    confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                        ?
                                                        cfrecordexam()
                                                        :
                                                        null
                                                    :
                                                    window.alert('กรุณากรอกหมายเหตุ')
                                                :
                                                confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                    ?
                                                    cfrecordexam()
                                                    :
                                                    null
                                            :
                                            window.alert('กรุณาเลือกผลการสอบ')
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ยืนยัน
                                </Button>
                                <Button onClick={() => { setmodalRecord(false) }} variant='contained' color='error'>ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider >
        </>
    )
}