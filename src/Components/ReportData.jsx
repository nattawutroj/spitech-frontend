import '../assets/css/Settings.css'
import { GrUserAdmin } from "react-icons/gr";
import { Link } from 'react-router-dom';
import Item from '@mui/material/Grid'
import Grid from '@mui/material/Grid'
import { PiStudent } from "react-icons/pi";


const settings = () => {
    return (
            <div className="Settings_Container">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent={'center'}>
                    <Grid item xs={4} sm={4} md={3} mb={2}>
                        <Item><Link to='teacher'>
                            <div className="Setting_Menu">
                                <div className="title">
                                    รายงานโครงงานตามอาจารย์
                                </div>
                                <div className="logo">
                                    <GrUserAdmin />
                                </div>
                            </div>
                        </Link></Item>
                    </Grid>
                </Grid>
            </div>
    )
}

export default settings