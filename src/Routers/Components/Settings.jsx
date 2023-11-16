import React from 'react'
import './Css/Settings.css'
import { RiQuillPenLine, RiSurveyLine } from "react-icons/ri";
import { BsListColumnsReverse } from "react-icons/bs";
import { LiaObjectGroup } from "react-icons/lia";
import { PiBookBookmark, PiStudent } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";


const settings = () => {
    const URL = '/admintor/settings'
    return (
        <div className="Settings_Container">
            <a href={URL+'/name_titile'}>
            <div className="Setting_Menu">
                <div className="title">
                    คำนำหน้าชื่อ
                </div>
                <div className="logo">
                    <RiQuillPenLine />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    หลักสูตร
                </div>
                <div className="logo">
                    <BsListColumnsReverse />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    คณะ
                </div>
                <div className="logo">
                    <LiaObjectGroup />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    ภาควิชา
                </div>
                <div className="logo">
                    <PiBookBookmark />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    สาขาวิชา
                </div>
                <div className="logo">
                    <RiSurveyLine />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    ประเภทการสอบ
                </div>
                <div className="logo">
                    <SlNotebook />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    สถานะโครงงาน
                </div>
                <div className="logo">
                    <CiBoxList />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    ห้องสอบ
                </div>
                <div className="logo">
                    <MdOutlineMeetingRoom />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    เจ้าหน้าที่/อาจารย์
                </div>
                <div className="logo">
                    <GrUserAdmin />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className="Setting_Menu">
                <div className="title">
                    นักศึกษา
                </div>
                <div className="logo">
                    <PiStudent />
                </div>
            </div>
            </a>
        </div>
    )
}

export default settings