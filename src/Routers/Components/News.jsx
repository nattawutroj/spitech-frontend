import './Css/News.css'
import ITLogo from '../Images/ITlogo.png'
import Topic from './News_Topic.jsx'
import Bottom from './News_bottom.jsx'
function News() {
    return (
        <>
            <div className="NewOutContainer">
                <div className="NewsContainer">
                    <div className='NewsText'>
                        <p className='NewsMainTitle'>ระบบบริหารจัดการข้อมูลโครงงานพิเศษ</p>
                        <p className='NewsSubTitle1'>ข่าวประชาสัมพันธ์จากภาควิชา</p>
                    </div>
                    <div className="NewsImg">
                        <img src={ITLogo} alt="IT Logo" />
                    </div>
                </div>
                <div className="NewsTopicContainer">
                    <Topic />
                </div>
                <div className="NewsBottom">
                    <Bottom />
                </div>
            </div>

        </>
    )
}

export default News;