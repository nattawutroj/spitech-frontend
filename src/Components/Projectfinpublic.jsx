import React from "react";
import axios from "../libs/Axios";
import { Accordion, Grid } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import ProjectDetail from './SubComponets/ProjectDetailPub';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import AllProjectList from "../libs/Report/AllProjectList"
import Box from "@mui/material/Box";


export default function AdminDash() {

    const [docgenlist, setDocgenlist] = React.useState([]);

    function keepdoc(file) {
        setDocgenlist((docgenlist) => [...docgenlist, file]);
    }

    const [semester, setSemester] = React.useState([]);

    const getsemester = async () => {
        try {
            const response = await axios.get('/resources/public/aasemester')
            return response
        } catch (err) {
            console.log(err);
        }
    }

    const fetchsemester = async () => {
        const [semester] = await Promise.all([getsemester()]);
        setSemester(semester.data.result);
    }

    React.useEffect(() => {
        fetchsemester();
    }, [])


    const [fileList, setFileList] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [selectstatus_code, setSelectStatus_code] = React.useState(8);

    const [semester_select, setSemester_Select] = React.useState(-1);

    const [pdfUrl, setPdfUrl] = React.useState('');
    const [resetCounter, setResetCounter] = React.useState(0);


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

                setPdfUrl(null)
                window.open(dataUrl);
        }).catch(err => {
            setPdfUrl(null)
            console.log(err);
        }
        );
    };


    const Fetchreqreport = () => {
        axios.get('resources/public/reqproject', {}
        ).then(res => {
            setPdfUrl(null)
            setFileList(res.data.result);
            setExpanded(false);
            console.log(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    const Viewpdf = (id) => {
        console.log(id)
        axios.get('resources/public/fefile', {
            params: {
                id_project: id
            }
        }
        ).then(res => {
            console.log(res)
            handleFileDownload(res.data.result[0].path)
        }).catch(err => {
            console.log(err);
        })
    }


    const handleChange = (panel) => {
        setExpanded(panel);
    }

    React.useEffect(() => {
        Fetchreqreport();
    }, [selectstatus_code])

    function fillterdata() {
        setDocgenlist([]);
        fileList?.map((file) => (
            semester_select == -1 ?
                selectstatus_code == 0 ?
                    keepdoc(file)
                    :
                    selectstatus_code == 1 ?
                        file.id_project_status_title == 2 ?
                            keepdoc(file)
                            :
                            null
                        :
                        selectstatus_code == 2 ?
                            file.id_project_status_title == 3 || file.id_project_status_title == 4 || file.id_project_status_title == 5 || file.id_project_status_title == 6 ?
                                keepdoc(file)
                                :
                                null
                            :
                            selectstatus_code == 3 ?
                                file.id_project_status_title == 7 ?
                                    keepdoc(file)
                                    :
                                    null
                                :
                                selectstatus_code == 4 ?
                                    file.id_project_status_title == 8 || file.id_project_status_title == 9 || file.id_project_status_title == 10 ?
                                        keepdoc(file)
                                        :
                                        null
                                    :
                                    selectstatus_code == 5 ?
                                        file.id_project_status_title == 11 ?
                                            keepdoc(file)
                                            :
                                            null
                                        :
                                        selectstatus_code == 6 ?
                                            file.id_project_status_title == 12 || file.id_project_status_title == 13 || file.id_project_status_title == 14 ?
                                                keepdoc(file)
                                                :
                                                null
                                            :
                                            selectstatus_code == 7 ?
                                                file.id_project_status_title == 15 ?
                                                    keepdoc(file)
                                                    :
                                                    null
                                                :
                                                selectstatus_code == 8 ?
                                                    file.id_project_status_title == 17 ?
                                                        keepdoc(file)
                                                        :
                                                        null
                                                    :
                                                    selectstatus_code == 9 ?
                                                        file.id_project_status_title == 0 ?
                                                            keepdoc(file)
                                                            :
                                                            null
                                                        :
                                                        null
                :
                semester_select == file.id_semester ?
                    selectstatus_code == 0 ?
                        keepdoc(file)
                        :
                        selectstatus_code == 1 ?
                            file.id_project_status_title == 2 ?
                                keepdoc(file)
                                :
                                null
                            :
                            selectstatus_code == 2 ?
                                file.id_project_status_title == 3 || file.id_project_status_title == 4 || file.id_project_status_title == 5 || file.id_project_status_title == 6 ?
                                    keepdoc(file)
                                    :
                                    null
                                :
                                selectstatus_code == 3 ?
                                    file.id_project_status_title == 7 ?
                                        keepdoc(file)
                                        :
                                        null
                                    :
                                    selectstatus_code == 4 ?
                                        file.id_project_status_title == 8 || file.id_project_status_title == 9 || file.id_project_status_title == 10 ?
                                            keepdoc(file)
                                            :
                                            null
                                        :
                                        selectstatus_code == 5 ?
                                            file.id_project_status_title == 11 ?
                                                keepdoc(file)
                                                :
                                                null
                                            :
                                            selectstatus_code == 6 ?
                                                file.id_project_status_title == 12 || file.id_project_status_title == 13 || file.id_project_status_title == 14 ?
                                                    keepdoc(file)
                                                    :
                                                    null
                                                :
                                                selectstatus_code == 7 ?
                                                    file.id_project_status_title == 15 ?
                                                        keepdoc(file)
                                                        :
                                                        null
                                                    :
                                                    selectstatus_code == 8 ?
                                                        file.id_project_status_title == 17 ?
                                                            keepdoc(file)
                                                            :
                                                            null
                                                        :
                                                        selectstatus_code == 9 ?
                                                            file.id_project_status_title == 0 ?
                                                                keepdoc(file)
                                                                :
                                                                null
                                                            :
                                                            null
                    :
                    null
        ))

        console.log(docgenlist)
        // open AllProjectList component new window

    }


    // const fetchfilehistory = (xid_project) => {

    //     axios.get('resources/public/filehistory', {
    //         params: {
    //             id_project: xid_project
    //         }
    //     }
    //     ).then(res => {
    //         console.log(res)
    //         return res
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }


    return (
        <>
            <Grid container spacing={2}>
                <Grid sx={{ height: '100vh', overflowY: 'scroll' }} item xs={12} md={12} lg={6}>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <FormControl sx={{ m: 1, mt: 2, minWidth: 120 }} size="small">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                ภาคการศึกษา
                            </InputLabel>
                            <NativeSelect
                                defaultValue={-1}
                                inputProps={{
                                    name: 'semester',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(e) => { setSemester_Select(e.target.value) }}
                            >
                                <option value={-1}>ทุกภาคการศึกษา</option>
                                {
                                    semester?.map((item, index) => (
                                        <option value={item.id_semester} key={index}>{item.semester}/{item.year}</option>
                                    ))
                                }
                            </NativeSelect>
                        </FormControl>
                    </Stack>
                    {
                        // setDocgenlist([])
                    }
                    {
                        fileList?.map((file, index) => (
                            console.log(file),
                            semester_select == -1 ?
                                selectstatus_code == 0 ?
                                    <Ifodata file={file} index={index} key={index} />
                                    :
                                    selectstatus_code == 1 ?
                                        file.id_project_status_title == 2 ?
                                            <Ifodata file={file} index={index} key={index} />
                                            :
                                            null
                                        :
                                        selectstatus_code == 2 ?
                                            file.id_project_status_title == 3 || file.id_project_status_title == 4 || file.id_project_status_title == 5 || file.id_project_status_title == 6 ?
                                                <Ifodata file={file} index={index} key={index} />
                                                :
                                                null
                                            :
                                            selectstatus_code == 3 ?
                                                file.id_project_status_title == 7 ?
                                                    <Ifodata file={file} index={index} key={index} />
                                                    :
                                                    null
                                                :
                                                selectstatus_code == 4 ?
                                                    file.id_project_status_title == 8 || file.id_project_status_title == 9 || file.id_project_status_title == 10 ?
                                                        <Ifodata file={file} index={index} key={index} />
                                                        :
                                                        null
                                                    :
                                                    selectstatus_code == 5 ?
                                                        file.id_project_status_title == 11 ?
                                                            <Ifodata file={file} index={index} key={index} />
                                                            :
                                                            null
                                                        :
                                                        selectstatus_code == 6 ?
                                                            file.id_project_status_title == 12 || file.id_project_status_title == 13 || file.id_project_status_title == 14 ?
                                                                <Ifodata file={file} index={index} key={index} />
                                                                :
                                                                null
                                                            :
                                                            selectstatus_code == 7 ?
                                                                file.id_project_status_title == 15 ?
                                                                    <Ifodata file={file} index={index} key={index} />
                                                                    :
                                                                    null
                                                                :
                                                                selectstatus_code == 8 ?
                                                                    file.id_project_status_title == 17 ?
                                                                        <Ifodata file={file} index={index} key={index} />
                                                                        :
                                                                        null
                                                                    :
                                                                    selectstatus_code == 9 ?
                                                                        file.id_project_status_title == 0 ?
                                                                            <Ifodata file={file} index={index} key={index} />
                                                                            :
                                                                            null
                                                                        :
                                                                        null
                                :
                                semester_select == file.id_semester ?
                                    selectstatus_code == 0 ?
                                        <Ifodata file={file} index={index} key={index} />
                                        :
                                        selectstatus_code == 1 ?
                                            file.id_project_status_title == 2 ?
                                                <Ifodata file={file} index={index} key={index} />
                                                :
                                                null
                                            :
                                            selectstatus_code == 2 ?
                                                file.id_project_status_title == 3 || file.id_project_status_title == 4 || file.id_project_status_title == 5 || file.id_project_status_title == 6 ?
                                                    <Ifodata file={file} index={index} key={index} />
                                                    :
                                                    null
                                                :
                                                selectstatus_code == 3 ?
                                                    file.id_project_status_title == 7 ?
                                                        <Ifodata file={file} index={index} key={index} />
                                                        :
                                                        null
                                                    :
                                                    selectstatus_code == 4 ?
                                                        file.id_project_status_title == 8 || file.id_project_status_title == 9 || file.id_project_status_title == 10 ?
                                                            <Ifodata file={file} index={index} key={index} />
                                                            :
                                                            null
                                                        :
                                                        selectstatus_code == 5 ?
                                                            file.id_project_status_title == 11 ?
                                                                <Ifodata file={file} index={index} key={index} />
                                                                :
                                                                null
                                                            :
                                                            selectstatus_code == 6 ?
                                                                file.id_project_status_title == 12 || file.id_project_status_title == 13 || file.id_project_status_title == 14 ?
                                                                    <Ifodata file={file} index={index} key={index} />
                                                                    :
                                                                    null
                                                                :
                                                                selectstatus_code == 7 ?
                                                                    file.id_project_status_title == 15 ?
                                                                        <Ifodata file={file} index={index} key={index} />
                                                                        :
                                                                        null
                                                                    :
                                                                    selectstatus_code == 8 ?
                                                                        file.id_project_status_title == 17 ?
                                                                            <Ifodata file={file} index={index} key={index} />
                                                                            :
                                                                            null
                                                                        :
                                                                        selectstatus_code == 9 ?
                                                                            file.id_project_status_title == 0 ?
                                                                                <Ifodata file={file} index={index} key={index} />
                                                                                :
                                                                                null
                                                                            :
                                                                            null
                                    :
                                    null
                        ))}
                </Grid>
                {console.log(docgenlist.length)}
                {
                    docgenlist.length > 0 ?
                        window.innerWidth > 600 ?
                            <Grid item xs={12} md={12} lg={6}>
                                <Box
                                    height={'100vh'}
                                    width={'100%'}
                                    display="flex"
                                >
                                    <AllProjectList docgenlist={docgenlist} key={resetCounter} /></Box>
                            </Grid>
                            :
                            null
                        :
                        null
                }
            </Grid>
        </>
    )


    function Ifodata({ file, index }) {

        // keepdoc(file);

        return (<Accordion expanded={expanded === `${file.id_project}`} onChange={() => { handleChange(`${file.id_project}`) }} key={index} sx={{ mt: 1, width: '100%' }} >
            <AccordionSummary
                expandIcon={<CloudUploadIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{ pt: 0.3, width: '65%', flexShrink: 0 }}> {file.id_project} {file.project_title_th} </Typography>
                {
                    file.staus_code != -1 ?
                        // <Typography sx={{ pt: 0.3, color: green[600] }}>ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา</Typography>
                        <Typography sx={{ pt: 0.3, color: green[600] }}>{file.project_status_name_title}</Typography>
                        :
                        file.staus_code == 18 ?
                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_status_name_title}</Typography>
                            :
                            null
                }
            </AccordionSummary>

            {/* btn */}
            <Stack direction="row"
                                                            justifyContent="flex-end"
                                                            alignItems="center"
                                                            spacing={2} sx={{ mr: 2.5 }}>
            <Button onClick={() => { Viewpdf(file.id_project) }} variant="contained" sx={{ mr:2,mt: 1, ml: 1, mb: 1 }}>ดูรายละเอียด ทก.01</Button>
            </Stack>

            <ProjectDetail id={file.id_project} />

            {/* <AccordionDetails>
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
                                </AccordionDetails> */}
        </Accordion>)
    }
}
