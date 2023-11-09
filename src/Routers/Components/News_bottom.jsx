import "./Css/News_bottom.css"
import { HiOutlineDocumentSearch } from "react-icons/hi"
import { BsDownload } from "react-icons/bs"

const Bottom = () => {
    return (
        <div id="NewsBottom" className="NewsBottom">
            <div className="NewsBottom__content">
                <div className="NewsBottom__content__title">
                    <article>รายชื่อหัวข้อโครงงานพิเศษ</article>
                </div>
                <div className="NewsBottom_BgLogo">
                    <div className="NewsBottom__content__logo">
                        <HiOutlineDocumentSearch />
                    </div>
                </div>
                <div className="NewsBottom_button">
                    <div className="NewsBotton_content_Button">
                        <article>เปิด</article>
                    </div>
                </div>
            </div>
            <div className="NewsBottom__content">
                <div className="NewsBottom__content__title">
                    <article>ดาวน์โหลดเอกสาร</article>
                    <article className="NewsBottom_textsize1">เกี่ยวกับโครงงานพิเศษ</article>
                </div>
                <div className="NewsBottom_BgLogo">
                    <div className="NewsBottom__content__logo">
                        <BsDownload />
                    </div>
                </div>
                <div className="NewsBottom_button">
                    <div className="NewsBotton_content_Button">
                        <article>ดาวน์โหลด</article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bottom;