import React, { useEffect } from "react";
import BasicDocument from "../../libs/Report/Helloworld";
import axios from "../../libs/Axios";
import { useParams } from "react-router-dom";

function App() {
    const { id, selectReport } = useParams();
    const [projectinfo, setProjectinfo] = React.useState([]);
    const [boss, setBoss] = React.useState([]);
    const [member, setMember] = React.useState([]);
    const [staff, setStaff] = React.useState([]);

    async function docprojectinfomation(id) {
        const response = await axios.get('/resources/admin/projectinfomation', {
            params: {
                id_project: id
            }
        });
        return response.data.result;
    }

    async function docboss() {
        const response = await axios.get('/resources/public/boss', {});
        return response.data.data;
    }

    async function docmember(id) {
        const response = await axios.get('/resources/admin/projectinfomation/student', {
            params: {
                id_project: id
            }
        });
        return response.data.result.rows;
    }

    async function docstaff(id) {
        const response = await axios.get('/resources/admin/projectinfomation/staff', {
            params: {
                id_project: id
            }
        });
        return response.data.result[0];
    }

    const printdoc = async (id) => {
        try {
            const [projectinfo, boss, member, staff] = await Promise.all([
                docprojectinfomation(id),
                docboss(),
                docmember(id),
                docstaff(id)
            ]);
            setProjectinfo(projectinfo[0]);
            setBoss(boss);
            setMember(member);
            setStaff(staff);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        printdoc(id);
    }, [id]); // เพิ่ม dependencies เพื่อหลีกเลี่ยงการเรียกซ้ำ

    console.log("projectinfo");
    
    // ตรวจสอบว่าข้อมูลพร้อมใช้งานหรือไม่
    if (projectinfo.length === 0 || boss.length === 0 || member.length === 0 || !staff) {
        // แสดง loader หรือข้อความ loading ตามที่คุณต้องการ
        return <div>Loading...</div>;
    }
    return (
        <div className="App">
            <BasicDocument projectinfo={projectinfo} boss={boss} member={member} staff={staff} selectReport={parseInt(selectReport)} />
        </div>
    );
}

export default App;
