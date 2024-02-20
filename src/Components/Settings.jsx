import '../assets/css/Settings.css'
import { RiQuillPenLine, RiSurveyLine } from "react-icons/ri";
import { BsListColumnsReverse } from "react-icons/bs";
import { LiaObjectGroup } from "react-icons/lia";
import { PiBookBookmark } from "react-icons/pi";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { Link } from 'react-router-dom';
import Item from '@mui/material/Grid'
import Grid from '@mui/material/Grid'


const settings = () => {
    return (
        <div className="Settings_Container">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent={'center'}>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to={'../settings/name_titile'}>
                        <div className="Setting_Menu">
                            <div className="title">
                                คำนำหน้าชื่อ
                            </div>
                            <div className="logo">
                                <RiQuillPenLine />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/subject'>
                        <div className="Setting_Menu">
                            <div className="title">
                                วิชาเรียน
                            </div>
                            <div className="logo">
                                <BsListColumnsReverse />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/course'>
                        <div className="Setting_Menu">
                            <div className="title">
                                หลักสูตร
                            </div>
                            <div className="logo">
                                <LiaObjectGroup />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/major'>
                        <div className="Setting_Menu">
                            <div className="title">
                                สาขาวิชา
                            </div>
                            <div className="logo">
                                <LiaObjectGroup />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/department'>
                        <div className="Setting_Menu">
                            <div className="title">
                                ภาควิชา
                            </div>
                            <div className="logo">
                                <PiBookBookmark />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/news'>
                        <div className="Setting_Menu">
                            <div className="title">
                                ข่าวสาร
                            </div>
                            <div className="logo">
                                <RiSurveyLine />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
                <Grid item xs={4} sm={4} md={3} mb={2}>
                    <Item><Link to='../settings/room'>
                        <div className="Setting_Menu">
                            <div className="title">
                                ห้องสอบ
                            </div>
                            <div className="logo">
                                <MdOutlineMeetingRoom />
                            </div>
                        </div>
                    </Link></Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default settings