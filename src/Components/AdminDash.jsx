import React from "react";
import axios from "../libs/Axios";
import { Accordion, Grid } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { ZoomIn } from "@mui/icons-material";


export default function AdminDash() {
    const [fileList, setFileList] = React.useState([]);

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
            if(window.innerWidth < 900)
            {
                setPdfUrl(null)
                window.open(dataUrl);
            }
            else
            {
                setPdfUrl(dataUrl);
            }
        }).catch(err => {
            setPdfUrl(null)
            console.log(err);
        }
        );
    };

    const Fetchreqreport = () => {
        axios.get('resources/admin/reqreport').then(res => {
            setFileList(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    const Viewpdf = (id) => {
        console.log(id)
        handleFileDownload(id);
    }

    React.useEffect(() => {
        Fetchreqreport();
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    {fileList.map((file, index) => (
                        <Accordion onChange={() => { Viewpdf(file.path) }} key={index} sx={{ mt: 1, width: '100%' }} >
                            <AccordionSummary
                                expandIcon={<CloudUploadIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>รหัสคำร้อง {file.id_project_file_path}</Typography>
                                {
                                    file.staus_code == 21 ?
                                        <Typography sx={{ pt: 0.3, color: orange[600] }}>{file.project_status_name_title}</Typography>
                                        :
                                        file.staus_code == 19 ?
                                            <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_status_name_title}</Typography>
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
                                {/* remove button */}
                            </Stack>
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
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
                {/* ถ้า ขนาดหน้าจอ เท่ากับ xs ไม่ต้่องแสดง */}
                {
                    pdfUrl != null ?
                        window.innerWidth > 600 ?
                            <Grid item xs={12} md={6} lg={6}>
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
        </>
    )
}