import React from 'react'
import { BsMouse, BsPersonCircle } from 'react-icons/bs'
import './Css/NevBar.css'
import Login from './Login'
import { InfomationContext } from '../home'
import HambergMenu from './HambergMenu'
import { FaAngleDown } from "react-icons/fa6";

const NevBar = () => {
    const [Open, setOpen] = React.useState(false)
    const [DropDown, setDropDown] = React.useState(false)
    const { LoginStatus } = React.useContext(InfomationContext)


    function togglePop() {
        setOpen(!Open);
    };

    function toggleDropDown() {
        setDropDown(!DropDown)
    }

    return (
        <>

            <ul className="NevBarContainer">
                {
                    LoginStatus.status
                        ?
                        <HambergMenu />
                        :
                        null
                }
                <li className="LogoNevBar">
                    <a className='TextNevBar' href='/'>
                        <BsMouse /><b className="text">SPITECT</b>
                    </a>
                </li>{
                    LoginStatus.status ?
                        null :
                        (
                            <>
                                <li className="NevMenu">
                                    <a href='#NewsBottom'>รายชื่อโครงงานพิเศษ</a>
                                </li>
                                <li className="NevMenu">
                                    <a href='#NewsBottom'>ดาวน์โหลดเอกสาร</a>
                                </li>
                            </>
                        )
                }
                {
                    LoginStatus.status
                        ?
                        <li className="NevMenu1">
                            <button className='LoginBtn' onClick={toggleDropDown} >
                                <FaAngleDown size={10} /> Hello {LoginStatus.result.data.first_name_th} <b> <BsPersonCircle /> </b>
                            </button>
                        </li>
                        :
                        <li className="NevMenu1">
                            <button className='LoginBtn' onClick={togglePop}>
                                ลงชื่อเข้าใช้ <b> <BsPersonCircle /> </b>
                            </button>
                        </li>
                }
                {Open ? <Login toggle={togglePop} /> : null}
            </ul>
        </>
    )
}

export default NevBar;

