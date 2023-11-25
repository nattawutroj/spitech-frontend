import axios from '../libs/Axios';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { CloudDownloadTwoTone } from '@mui/icons-material';

const Form = ({setList,selectedFile, setSelectedFile}) => {


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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('', selectedFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        await axios.post('/resources/admin/upload/csv', formData, config).then((response) => {
            console.log(response.data);
            if(response.data.code === 200){
                setList(response.data.data)
            }
        });
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <>
            <Button component="label" onChange={handleFileSelect} variant="contained" startIcon={<CloudUploadIcon />}>
                เรียกไฟล์
                <VisuallyHiddenInput type="file" />
            </Button>
            <Typography mt={1} variant="body1" component="h6" gutterBottom > {selectedFile ? selectedFile.name : 'No file selected'} </Typography>
            <Button onClick={handleSubmit} variant="contained" startIcon={<CloudDownloadTwoTone />}> ดึงข้อมูล</Button>
            
        </>
    )
};

export default Form;