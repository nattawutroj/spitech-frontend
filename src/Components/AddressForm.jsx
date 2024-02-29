import { useState, useEffect,useCallback } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Axios from '../libs/Axios';


export default function AddressForm({ profile, setProfile, editProfileAlert }) {

  const [majorCode, setMajorCode] = useState([]);


  const [nametitle, setNametitle] = useState([]);


  const [selectedTitle, setSelectedTitle] = useState('');

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
    handleInfoChange(event);
  };

  const [selectedMajor, setSelectedMajor] = useState('');

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
    handleInfoChange(event);
  }


  useEffect(() => {
    Axios.get('/resources/public/major')
      .then(res => {
        setMajorCode(prevMajorCode => {
          const newMajorCode = res.data.data.map(item => ({
            label: item.major_initial + ' ' + item.major_name,
            value: item.major_code
          }));
          return [...prevMajorCode, ...newMajorCode];
        });
      })
      .catch(err => {
        console.log(err);
      });
  
    Axios.get('/resources/public/name_title')
      .then(res => {
        setNametitle(prevNametitle => {
          const nameTitles = res.data.data.map(item => ({
            label: item.name_title_th,
            value: item.id_name_title
          }));
          return [...prevNametitle, ...nameTitles];
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  const [FileList, setFileList] = useState({
    first_name_en: '',
    last_name_en: '',
    email: '',
    address: '',
    phone: '',
    id_name_title: '',
    major_code: '',
  });

  const handleInfoChange = (e) => {
    setFileList({ ...FileList, [e.target.name]: e.target.value });
    profileUpdate();
  }

  const profileUpdate = useCallback(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      first_name_en: FileList.first_name_en,
      last_name_en: FileList.last_name_en,
      email: FileList.email,
      address: FileList.address,
      phone: FileList.phone,
      id_name_title: selectedTitle,
      major_code: selectedMajor,
    }));
  }, [selectedTitle, selectedMajor, FileList, setProfile]);
  
  useEffect(() => {
    profileUpdate();
  }, [profileUpdate]);
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ข้อมูลนักศึกษา
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="student_code"
            name="student_code"
            label="รหัสนักศึกษา"
            disabled={true}
            defaultValue={profile.student_code}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={editProfileAlert}
            id="id_name_title"
            name="id_name_title"
            label="คำนำหน้า"
            helperText="กรุณาเลือกคำนำหน้า"
            select
            fullWidth
            variant="standard"
            value={selectedTitle} // ต้องมี value attribute
            onChange={handleTitleChange}
          >
            {nametitle.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
                {console.log(option.value)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="first_name_th"
            name="first_name_th"
            label="ชื่อ"
            fullWidth
            variant="standard"
            defaultValue={profile.first_name_th}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="last_name_th"
            name="last_name_th"
            label="นามสกุล"
            fullWidth
            variant="standard"
            defaultValue={profile.last_name_th}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={editProfileAlert}
            id="first_name_en"
            name="first_name_en"
            label="Name (English)"
            fullWidth
            variant="standard"
            onChange={handleInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={editProfileAlert}
            id="last_name_en"
            name="last_name_en"
            label="Surname (English)"
            fullWidth
            variant="standard"
            onChange={handleInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={editProfileAlert}
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            onChange={handleInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={editProfileAlert}
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={handleInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={editProfileAlert}
            id="phone"
            name="phone"
            label="เบอร์โทรศัพท์"
            fullWidth
            variant="standard"
            onChange={handleInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            error={editProfileAlert}
            id="major_code"
            name="major_code"
            label="สาขาวิชา"
            helperText="กรุณาเลือกสาขาวิชา"
            select
            fullWidth
            variant="standard"
            value={selectedMajor} // ต้องมี value attribute
            onChange={handleMajorChange}
          >
            {majorCode.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
                {console.log(option.value)}
              </MenuItem>
            ))}
          </TextField>
          {console.log(profile)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
