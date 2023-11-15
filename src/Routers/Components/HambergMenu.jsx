import React from "react"
import './Css/HambergMenu.css'
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiPrinterLight } from "react-icons/pi";

const HambergMenu = () => {
    return (
        <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <ul class="menu__box">
                <li><a class="menu__item" href="/">แดชบอร์ด<AiOutlineDashboard /></a></li>
                <li><a class="menu__item" href="/">จัดการข้อมูลพื้นฐาน<IoSettingsOutline /></a></li>
                <li><a class="menu__item" href="/">จัดการข่าวสาร<HiOutlineNewspaper /></a></li>
                <li><a class="menu__item" href="/">ออกรายงาน<PiPrinterLight /></a></li>
            </ul>
        </div>
    )
}

export default HambergMenu