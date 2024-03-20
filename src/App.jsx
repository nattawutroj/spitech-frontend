import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './Components/Home';
import Dashboard from './Dashboard';
import RouteStudenDash from './StudentDash';
import Report from './Components/SubComponets/Report';
import Schedule from './libs/Report/Schedule'; 
import StaffDash from './StaffDash'
import Projectfinpublic from './Components/Projectfinpublic';

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/staffdash/*" element={<StaffDash />} />
          <Route path="/studentdash/*" element={<RouteStudenDash />} />
          <Route path="/testreport/:id/:selectReport" element={<Report />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/allpro" element={<Projectfinpublic />} />
          <Route path="/*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
