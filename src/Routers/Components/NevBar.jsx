import { BsMouse,BsPersonCircle } from 'react-icons/bs'
import './Css/NevBar.css'
const NevBar = () => {
    return (
        <>
            <ul className="NevBarContainer">
                <li className="LogoNevBar"><a href='#'><BsMouse /><h1 className='TextNevBar'>SPITECT</h1></a></li>
                <li className="NevMenu1"><a href='#'><h4 className='LoginText'>ลงชื่อเข้าใช้</h4><h4 className='LoginLogo'><BsPersonCircle /></h4></a></li>
                <li className="NevMenu"><a href='#NewsBottom'>ดาวน์โหลดเอกสาร</a></li>
                <li className="NevMenu"><a href='#NewsBottom'>รายชื่อโครงงานพิเศษ</a></li>
            </ul>
        </>
    )
}

export default NevBar;