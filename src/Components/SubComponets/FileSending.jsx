import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../../libs/Axios';
import { AccordionDetails } from '@mui/material';
import { Accordion, AccordionSummary, Card, Stack, Typography } from '@mui/material';
import { DeleteForeverOutlined, ZoomIn } from '@mui/icons-material';
import { orange, red } from '@mui/material/colors';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileSending({ itemprojectinfo, id_project }) {
    console.log(itemprojectinfo)
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState(null);
    React.useEffect(() => {
        Fecthfile();
    }, [id_project]);


    console.log(fileList)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Validate if the selected file is a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            // Clear the file selection if it's not a PDF
            setFile(null);
            alert('Please select a valid PDF file.');
        }
    };

    // Fecth /projectfilelist with id_project
    const Fecthfile = () => {
        axios.get('/user/projectfilelist', {
            params: {
                id_project: id_project
            }
        }).then((response) => {
            if (response.data.result.length === 0) {
                setFileList(null);
            } else {
                setFileList(response.data.result);
            }
        })
    }


    const handleFileUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('', file);
            formData.append('id_project', id_project)
            formData.append('id_project_status', itemprojectinfo.id_project_status)
            formData.append('id_project_status_title', itemprojectinfo.id_project_status_title)


            // Perform Axios POST request to /user/file/upload
            axios.post('/user/upload/pdf', formData)
                .then(response => {
                    // Handle success
                    console.log('File uploaded successfully:', response.data);
                    window.location.reload();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error uploading file:', error);
                });
        } else {
            alert('Please select a valid PDF file before uploading.');
        }
    };

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
            window.open(dataUrl, '_blank');
        });
    };

    // สร้าง fn เปลี่ยน timestamp เป็นวันที่ เวลา "2024-01-20T18:13:05.951Z"
    const convertDate = (timestamp) => {
        const date = new Date(timestamp);
        const convertedDate = date.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

        return convertedDate;
    }

    const handleFileDelete = (id_file) => {

        axios.post('/user/prove', {
            id_project_status_title: itemprojectinfo.id_project_status_title,
            id_project_file_paths: id_file,
            id_project_status: itemprojectinfo.id_project_status
        }).then((response) => {
            console.log(response.data)
            window.location.reload();
        });
    }


    return (
        <>
            {fileList != null
                ?
                <>
                    {fileList.map((file, index) => (
                        <Accordion key={index} sx={{ mt: 1, width: '100%' }} >
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
                                <Button onClick={() => { handleFileDelete(file.id_project_file_path) }} color='error' variant="outlined" sx={{ pl: 3, color: red[600] }} startIcon={<DeleteForeverOutlined />}></Button>
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
                                            <Typography sx={{ pt: 1, mb: 1, color: 'text.secondary' }}><Button onClick={() => handleFileDownload(file.path)} component="label" variant="contained" startIcon={<ZoomIn />}>View File</Button></Typography>
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
                </>
                :
                ''
            }
            {
                itemprojectinfo.id_project_status_title == 2 ?
                    <Typography variant="h6" gutterBottom component="div">
                        <Stack sx={{ mt: 2 }} spacing={2} direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf" // Allow only PDF files
                                />
                            </Button>

                            <Typography variant="body2" color="text.secondary">
                                {file ? file.name : 'No file selected'}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFileUpload}
                                disabled={!file} // Disable the button if no file selected
                            >
                                Send file
                            </Button>
                        </Stack>
                    </Typography>
                    : ''
            }
        </>
    );
}
