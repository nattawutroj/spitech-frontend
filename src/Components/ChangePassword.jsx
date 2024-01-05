import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm({changepassword,rechangepassword,setChangepassword,setRechangepassword,changepasserrorAlert}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Password"
            type='password'
            fullWidth
            defaultValue={changepassword}
            autoComplete="cc-name"
            variant="standard"
            error={changepasserrorAlert}
            helperText={changepasserrorAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
            onChange={(e)=>setChangepassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="repassword"
            label="Re-password"
            type='password'
            fullWidth
            defaultValue={rechangepassword}
            autoComplete="cc-number"
            variant="standard"
            error={changepasserrorAlert}
            helperText={changepasserrorAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
            onChange={(e)=>setRechangepassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
