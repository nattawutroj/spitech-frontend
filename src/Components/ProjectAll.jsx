import React from "react";
import axios from "../libs/Axios";
import { Accordion, Grid } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import ProjectDetail from './SubComponets/ProjectDetail';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import AllProjectList from "../libs/Report/AllProjectList"


export default function AdminDash() {

    const [docgenlist, setDocgenlist] = React.useState([]);

    function keepdoc(file) {
        setDocgenlist((docgenlist) => [...docgenlist, file]);
    }

    const [semester, setSemester] = React.useState([]);

    const getsemester = async () => {
        try {
            const response = await axios.get('/resources/admin/aasemester')
            return response
        } catch (err) {
            console.log(err);
        }
    }

    const fetchsemester = async () => {
        const [semester] = await Promise.all([getsemester()]);
        console.log(semester)
        setSemester(semester.data.result);
    }

    React.useEffect(() => {
        fetchsemester();
    }, [])


    const [fileList, setFileList] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [selectstatus_code, setSelectStatus_code] = React.useState(0);

    const [semester_select, setSemester_Select] = React.useState(-1);

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
        axios.get('resources/admin/reqproject', {}
        ).then(res => {
            setPdfUrl(null)
            console.log(res)
            setFileList(res.data.result);
            setExpanded(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const Viewpdf = (id) => {
        handleFileDownload(id);
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

    //     axios.get('resources/admin/filehistory', {
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
            {
                console.log(semester)
            }
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
                        <FormControl sx={{ m: 1, mt: 2, minWidth: 120 }} size="small">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                สถานะ
                            </InputLabel>
                            <NativeSelect
                                defaultValue={0}
                                inputProps={{
                                    name: 'status_code',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(e) => { setSelectStatus_code(e.target.value) }}
                            >
                                <option value={0}>ทุกสถานะ</option>
                                <option value={1}>รอยื่นสอบหัวข้อ</option>
                                <option value={2}>ยื่นสอบหัวข้อ</option>
                                <option value={3}>สอบหัวข้อผ่านแล้ว</option>
                                <option value={4}>สอบหกสิบ</option>
                                <option value={5}>สอบหกสิบผ่านแล้ว</option>
                                <option value={6}>สอบร้อย</option>
                                <option value={7}>สอบร้อยผ่านแล้ว</option>
                                <option value={8}>เสร็จสมบูรณ์</option>
                                <option value={9}>กำลังเริ่มต้นโครงงาน</option>
                            </NativeSelect>
                        </FormControl>
                        <Button onClick={() => { fillterdata() }} variant="contained" sx={{ mt: 2 }} >พิมพ์รายงาน</Button>
                    </Stack>
                    {
                        docgenlist.length == 0 ? <Typography sx={{ mt: 2 }}>ไม่พบข้อมูล</Typography> :
                            docgenlist.map((file, index) => (
                                <Typography key={index} sx={{ mt: 2 }}>{file.id_project} {file.project_title_th}</Typography>
                            ))
                    }
                    {
                        // setDocgenlist([])
                    }
                    {
                        fileList?.map((file, index) => (
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
                {
                    window.innerWidth > 600 ?
                        <Grid item xs={12} md={12} lg={6}>
                                <AllProjectList />
                        </Grid>
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