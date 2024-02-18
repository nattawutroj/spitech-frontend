import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Font,
    Image,
} from "@react-pdf/renderer";

import THSN from '../../assets/THSarabunNew/THSarabunNew.ttf';
import THSN_B from '../../assets/THSarabunNew/THSarabunNewBold.ttf';
import logoKMUTNB from '../../assets/logoKMUTNB.png';
import Checkbox from '../../assets/checkbox.jpg';

Font.register({ family: 'THSarabunNew', fonts: [{ src: THSN }, { src: THSN_B, fontWeight: 'bold' }] });

// Create styles
const styles = StyleSheet.create({
    title: {
        fontFamily: 'THSarabunNew'
    },
    page: {
        backgroundColor: "white",
        color: "black",
        fontFamily: 'THSarabunNew',
        fontSize: 16,
    },
    header: {
        margin: 10,
        padding: 10,
        fontWeight: "bold",
        borderBottom: "1px solid #d3d3d3",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 20,
        paddingRight: 10,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
});

// Create Document Component
function BasicDocument() {
    const projectinfo = {
        "id_project": "66200008",
        "project_title_th": "ทดสอบสร้างโปรเจ็ค 05",
        "project_title_en": "ทดสอบสร้างโปรเจ็ค 05",
        "case_study_title_th": "Chome",
        "case_study_title_en": "Chome",
        "build_timestamp": "2024-01-31T08:04:26.924Z",
        "id_semester": 2,
        "subject_code": "60223122",
        "subject_name": "โครงงานพิเศษ (iti)",
        "credit": 3,
        "semester": "2",
        "year": "2566"
    }

    const boss = [
        {
            "id_boss": 1,
            "id_staff": 6,
            "username": "ITKNM",
            "initials": "KNM",
            "id_name_title": 17,
            "first_name_th": "ขนิษฐา",
            "last_name_th": "นามี",
            "first_name_en": null,
            "last_name_en": null,
            "phone": null,
            "address": null,
            "email": null,
            "password": "ITKNM",
            "id_role": 3,
            "name_title_th": "ผศ. ดร.",
            "name_title_en": null
        }
    ]

    const member = [
        {
            "id_project_member": 51,
            "id_project": "66200008",
            "id_student": 3,
            "student_code": "6506021421129",
            "first_name_th": "ณัฐกานต์",
            "last_name_th": "กระแสร์ลาภ",
            "id_name_title": 2,
            "course_code": 620620,
            "phone": "0621595519",
            "address": "39 หมู่ 10 ตำบลตาลเดี่ยว อำเภอแก่งคอย จังหวัดสระบุรี 18110",
            "id_project_status": 20,
            "id_project_status_title": 6,
            "status_timestamp": "08:04:26.990544+00",
            "project_title_th": "ทดสอบสร้างโปรเจ็ค 05",
            "project_title_en": "ทดสอบสร้างโปรเจ็ค 05",
            "case_study_title_th": "Chome",
            "case_study_title_en": "Chome",
            "build_timestamp": "2024-01-31T08:04:26.924Z",
            "id_semester": 2,
            "semester": "2",
            "year": "2566",
            "name_title_th": "นางสาว",
            "name_title_en": "Miss",
            "course_name": "อุตสาหกรรมศาสตรบัณฑิต",
            "credit": 3
        },
        {
            "id_project_member": 55,
            "id_project": "66200008",
            "id_student": 321,
            "student_code": "6606021421276",
            "first_name_th": "ทรวภพ",
            "last_name_th": "ขูจิต",
            "id_name_title": 5,
            "course_code": 486022,
            "phone": "0902907811",
            "address": "25000",
            "id_project_status": 20,
            "id_project_status_title": 6,
            "status_timestamp": "08:04:26.990544+00",
            "project_title_th": "ทดสอบสร้างโปรเจ็ค 05",
            "project_title_en": "ทดสอบสร้างโปรเจ็ค 05",
            "case_study_title_th": "Chome",
            "case_study_title_en": "Chome",
            "build_timestamp": "2024-01-31T08:04:26.924Z",
            "id_semester": 2,
            "semester": "2",
            "year": "2566",
            "name_title_th": "คุณ",
            "name_title_en": "K.",
            "course_name": "อุตสาหกรรมศาสตรบัณฑิต (ต่อเนื่อง)",
            "credit": 3
        }
    ]

    const staff = {
        "staff": [
            {
                "id_project_staff": 25,
                "id_project": "66200008",
                "id_staff": 2,
                "id_project_staff_position": 1,
                "id_name_title": 1,
                "first_name_th": "(S) ณัฐวุฒิ",
                "last_name_th": "(S) โรจนจันทร์",
                "name_title_th": "นาย",
                "name_title_en": "Mr.",
                "project_staff_position_title": "ปรึกษา"
            },
            {
                "id_project_staff": 70,
                "id_project": "66200008",
                "id_staff": 9,
                "id_project_staff_position": 3,
                "id_name_title": 17,
                "first_name_th": "นัฎฐพันธ์",
                "last_name_th": "นาคพงษ์",
                "name_title_th": "ผศ. ดร.",
                "name_title_en": null,
                "project_staff_position_title": "กรรมการ"
            },
            {
                "id_project_staff": 68,
                "id_project": "66200008",
                "id_staff": 23,
                "id_project_staff_position": 2,
                "id_name_title": 18,
                "first_name_th": "สมชัย",
                "last_name_th": "เชียงพงศ์พันธุ์",
                "name_title_th": "ผศ.",
                "name_title_en": null,
                "project_staff_position_title": "ประธาน"
            },
            {
                "id_project_staff": 69,
                "id_project": "66200008",
                "id_staff": 24,
                "id_project_staff_position": 3,
                "id_name_title": 20,
                "first_name_th": "อนิราช",
                "last_name_th": "มิ่งขวัญ",
                "name_title_th": "รศ. ดร.",
                "name_title_en": null,
                "project_staff_position_title": "กรรมการ"
            }
        ],
        "os_staff": []
    }


    const [selectReport, setSelectReport] = React.useState(0)
    return (

        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/
                console.log('hello')
            }
            <Document>
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    {
                        selectReport === 1 ?
                            <>
                                <View style={styles.section}>
                                    <Header selectReport={selectReport} />
                                </View>
                                <View style={styles.section}>
                                    <Information projectinfo={projectinfo} member={member} staff={staff} />
                                </View>
                                <View style={styles.section}>
                                    <Examreport1 />
                                </View>
                                <View style={styles.section}>
                                    <Singature1 staff={staff} />
                                </View>
                                {
                                    staff.staff.map((item, index) => {
                                        return (
                                            (item.project_staff_position_title === 'ประธาน') ?
                                                <>
                                                    <View key={index} style={styles.section} break>
                                                        <Header selectReport={selectReport} />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <Information projectinfo={projectinfo} member={member} staff={staff} />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <Examreport2 />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <SingatureItem item={item} />
                                                    </View>
                                                </>
                                                :
                                                null
                                        )
                                    })
                                }
                                {
                                    staff.staff.map((item, index) => {
                                        return (
                                            (item.project_staff_position_title === 'กรรมการ') ?
                                                <>
                                                    <View key={index} style={styles.section} break>
                                                        <Header selectReport={selectReport} />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <Information projectinfo={projectinfo} member={member} staff={staff} />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <Examreport2 />
                                                    </View>
                                                    <View style={styles.section}>
                                                        <SingatureItem item={item} />
                                                    </View>
                                                </>
                                                :
                                                null
                                        )
                                    })
                                }
                            </>
                            :
                            null
                    }
                    {
                        selectReport === 0 ?
                            <>
                                <View style={styles.section}>
                                    <Header selectReport={selectReport} />
                                </View>
                                <View style={styles.section}>
                                    <Information2 projectinfo={projectinfo} member={member} staff={staff} />
                                </View>
                                <View style={styles.section}>
                                    <Singature0 />
                                </View>
                                <View style={styles.section}>
                                    <Bottom01 boss={boss} staff={staff} />
                                </View>
                            </>
                            :
                            null
                    }
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default BasicDocument;

function Header({ selectReport }) {
    return (
        <>
            <View style={[styles.header, styles.row]}>
                <View style={{ width: '20%', marginRight: 23, marginLeft: 10 }}>
                    <Image src={logoKMUTNB} />
                </View>
                <View style={{ width: '70%', marginTop: 15 }}>
                    {
                        (selectReport === 1) ?
                            <Text style={styles.title}>แบบประเมินหัวข้อโครงงานพิเศษ</Text>
                            :
                            null

                    }
                    {
                        (selectReport === 0) ?
                            <Text style={styles.title}>แบบเสนอหัวข้อโครงงานพิเศษ (ปริญญานิพนธ์)</Text>
                            :
                            null

                    }
                    <Text>ภาควิชาเทคโนโลยีสารสนเทศ คณะเทคโนโลยีและการจัดการอุตสาหกรรม</Text>
                    <Text>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตปราจีนบุรี</Text>
                </View>
            </View>
        </>
    )
}

function Information({ projectinfo, member, staff }) {
    var countadvisor = 0;
    return (
        <>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>รหัสโครงงาน</Text>
                <Text style={{ width: '67%', }}>{projectinfo.id_project}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>ชื่อโครงงาน (ภาษาไทย)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.project_title_th}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>(ภาษาอังกฤษ)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.project_title_en}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>กรณีศึกษา (ภาษาไทย)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.case_study_title_th}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>(ภาษาอังกฤษ)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.case_study_title_en}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>ชื่อนักศึกษาผู้จัดทำโครงงานพิเศษ</Text>
                <Text style={{ width: '67%', }}></Text>
            </View>
            {
                member.map((item, index) => {
                    return (
                        <View style={styles.row} key={index}>
                            <Text style={{ width: '5%', fontWeight: 'bold', textAlign: 'left' }}> </Text>
                            <Text style={{ width: '35%', textAlign: 'left' }}>{item.name_title_th}{item.first_name_th} {item.last_name_th}</Text>
                            <Text style={{ width: '15%', textAlign: 'left', fontWeight: 'bold' }}>รหัสประจำตัว</Text>
                            <Text style={{ width: '17%', textAlign: 'left' }}>{item.student_code}</Text>
                            <Text style={{ width: '10%', textAlign: 'left', fontWeight: 'bold' }}>โทรศัพท์</Text>
                            <Text style={{ width: '18%', textAlign: 'left' }}>{item.phone}</Text>
                        </View>
                    )
                })
            }
            <View style={styles.row}>
                <Text style={{ width: '30%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>อาจารย์ที่ปรึกษา</Text>
                <Text style={{ width: '70%', }}></Text>
            </View>
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ปรึกษา') ?
                            <View style={styles.row} key={index}>
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '90%', textAlign: 'left' }}>{index + 1}. {item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
            <View style={styles.row}>
                <Text style={{ width: '30%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>อาจารย์ที่ปรึกษาร่วม</Text>
                <Text style={{ width: '70%', }}></Text>
            </View>
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ปรึกษาร่วม') ?
                            <View style={styles.row} key={index}>
                                {countadvisor++}
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '90%', textAlign: 'left' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
            {
                countadvisor === 0 ?
                    <View style={styles.row}>
                        <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                        <Text style={{ width: '90%', textAlign: 'left' }}>ไม่มีที่ปรึกษาร่วม</Text>
                        <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                    </View>
                    :
                    null
            }
            <View style={styles.row}>
                <Text style={{ width: '30%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>คณะกรรมการสอบโครงงานพิเศษ</Text>
                <Text style={{ width: '70%', }}></Text>
            </View>
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ประธาน') ?
                            <View style={styles.row} key={index}>
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '45%', textAlign: 'left' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '45%', textAlign: 'left', marginRight: 30 }}>{item.project_staff_position_title}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'กรรมการ') ?
                            <View style={styles.row} key={index}>
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '45%', textAlign: 'left' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '45%', textAlign: 'left', marginRight: 30 }}>{item.project_staff_position_title}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
        </>
    )
}

function Information2({ projectinfo, member, staff }) {
    var countadvisor = 0;
    return (
        <>
            <View style={styles.row}>
                <Text style={{ width: '20%', fontWeight: 'bold' }}>ชื่อ - สกุลนักศึกษา</Text>
                <Text style={{ width: '45%' }}>{member[0].name_title_th} {member[0].first_name_th} {member[0].last_name_th}</Text>
                <Text style={{ width: '1%' }}> </Text>
                <Text style={{ width: '14%', fontWeight: 'bold' }}>รหัสประจำตัว</Text>
                <Text style={{ width: '20%' }}>{member[0].student_code}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '50%', fontWeight: 'bold' }}>ที่อยู่ปัจจุบันที่สามารถติดต่อได้สะดวก</Text>
                <Text style={{ width: '15%' }}> </Text>
                <Text style={{ width: '1%' }}> </Text>
                <Text style={{ width: '14%', fontWeight: 'bold' }}>โทรศัพท์</Text>
                <Text style={{ width: '20%' }}>{member[0].phone}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '90%' }}>{member[0].address}</Text>
                <Text style={{ width: '2%' }}> </Text>
                <Text style={{ width: '2%' }}> </Text>
                <Text style={{ width: '2%' }}> </Text>
                <Text style={{ width: '4%' }}> </Text>
            </View>
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={{ width: '55%', fontWeight: 'bold' }}>มีความประสงค์จะขอสอบโครงงานพิเศษ (ปริญญานิพนธ์) หลักสูตร</Text>
                <Text style={{ width: '2%' }}> </Text>
                <Text style={{ width: '37%' }}>{member[0].course_name}</Text>
                <Text style={{ width: '2%' }}> </Text>
                <Text style={{ width: '4%' }}> </Text>
            </View>
            <View style={[styles.row]}>
                <Text style={{ width: '10%', fontWeight: 'bold' }}>วิชา</Text>
                <Text style={{ width: '35%' }}>{projectinfo.subject_code} {projectinfo.subject_name}</Text>
                <Text style={{ width: '20%', fontWeight: 'bold' }}>จำนวนหน่วยกิต</Text>
                <Text style={{ width: '5%', textAlign: 'left' }}>{projectinfo.credit}</Text>
                <Text style={{ width: '10%', fontWeight: 'bold' }}>หน่วยกิต</Text>
                <Text style={{ width: '10%', fontWeight: 'bold' }}>ปีการศึกษา</Text>
                <Text style={{ width: '10%' }}>{projectinfo.semester + "/" + projectinfo.year}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '20%', textAlign: 'left', fontWeight: 'bold' }}>รหัสโครงงานพิเศษ</Text>
                <Text style={{ width: '80%', }}>{projectinfo.id_project}</Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>ชื่อโครงงาน (ภาษาไทย)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.project_title_th}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>(ภาษาอังกฤษ)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.project_title_en}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>กรณีศึกษา (ภาษาไทย)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.case_study_title_th}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'right', fontWeight: 'bold', marginRight: 50 }}>(ภาษาอังกฤษ)</Text>
                <Text style={{ width: '67%', }}>{projectinfo.case_study_title_en}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '33%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>ชื่อนักศึกษาร่วมโครงงาน</Text>
                <Text style={{ width: '67%', }}></Text>
            </View>
            {
                member.map((item, index) => {
                    return (
                        index !== 0 ?
                            <View style={styles.row} key={index}>
                                <Text style={{ width: '10%', fontWeight: 'bold', textAlign: 'left' }}>ชื่อ - สกุล</Text>
                                <Text style={{ width: '30%', textAlign: 'center' }}>{item.name_title_th}{item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '15%', textAlign: 'left', fontWeight: 'bold' }}>รหัสประจำตัว</Text>
                                <Text style={{ width: '17%', textAlign: 'left' }}>{item.student_code}</Text>
                                <Text style={{ width: '10%', textAlign: 'left', fontWeight: 'bold' }}>โทรศัพท์</Text>
                                <Text style={{ width: '18%', textAlign: 'left' }}>{item.phone}</Text>
                            </View>
                            :
                            null
                    )
                })
            }
            <View style={styles.row}>
                <Text style={{ width: '30%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>อาจารย์ที่ปรึกษา</Text>
                <Text style={{ width: '70%', }}></Text>
            </View>
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ปรึกษา') ?
                            <View style={styles.row} key={index}>
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '90%', textAlign: 'left' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
            <View style={styles.row}>
                <Text style={{ width: '30%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>อาจารย์ที่ปรึกษาร่วม</Text>
                <Text style={{ width: '70%', }}></Text>
            </View>
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ปรึกษาร่วม') ?
                            <View style={styles.row} key={index}>
                                {countadvisor++}
                                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                <Text style={{ width: '90%', textAlign: 'left' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                            </View>
                            :
                            null
                    )
                })
            }
            {
                countadvisor === 0 ?
                    <View style={styles.row}>
                        <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                        <Text style={{ width: '90%', textAlign: 'left' }}>ไม่มีที่ปรึกษาร่วม</Text>
                        <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                    </View>
                    :
                    null
            }
            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 30, marginTop: 50 }}></Text>
                <Text style={{ width: '90%', textAlign: 'left', fontWeight: 'bold' }}>จึงเรียนมาเพื่อโปรดพิจารณา</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    )
}


function Examreport1() {
    return (
        <>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '15%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>ผลการสอบโครงงานพิเศษ</Text>
                <Text style={{ width: '15%', textAlign: 'left' }}><Image src={Checkbox} /> ผ่าน </Text>
                <Text style={{ width: '65%', textAlign: 'left' }}>................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '15%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}> </Text>
                <Text style={{ width: '15%', textAlign: 'left' }}><Image src={Checkbox} /> ไม่ผ่าน </Text>
                <Text style={{ width: '65%', textAlign: 'left' }}>................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    );
}

function Examreport2() {
    return (
        <>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '15%', textAlign: 'left', fontWeight: 'bold', marginRight: 50 }}>ผลการสอบโครงงานพิเศษ</Text>
                <Text style={{ width: '15%', textAlign: 'left' }}> </Text>
                <Text style={{ width: '65%', textAlign: 'left' }}> </Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '20%', textAlign: 'left', fontWeight: 'bold' }}> </Text>
                <Text style={{ width: '20%', textAlign: 'left' }}><Image src={Checkbox} /> ผ่าน </Text>
                <Text style={{ width: '20%', textAlign: 'left' }}><Image src={Checkbox} /> ผ่านแบบมีเงื่อนไข </Text>
                <Text style={{ width: '20%', textAlign: 'left' }}><Image src={Checkbox} /> ไม่ผ่าน </Text>
                <Text style={{ width: '20%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '5%', textAlign: 'left', fontWeight: 'bold' }}> </Text>
                <Text style={{ width: '90%', textAlign: 'left' }}>....................................................................................................................................................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '5%', textAlign: 'left', fontWeight: 'bold' }}> </Text>
                <Text style={{ width: '90%', textAlign: 'left' }}>....................................................................................................................................................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={{ width: '5%', textAlign: 'left', fontWeight: 'bold' }}> </Text>
                <Text style={{ width: '90%', textAlign: 'left' }}>....................................................................................................................................................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={[styles.row, { marginTop: 10, marginBottom: 20 }]}>
                <Text style={{ width: '5%', textAlign: 'left', fontWeight: 'bold' }}> </Text>
                <Text style={{ width: '90%', textAlign: 'left' }}>....................................................................................................................................................................................</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    );
}

function Singature0() {
    return (
        <>
            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}> </Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                <Text style={{ width: '50%', textAlign: 'center', marginRight: 30 }}>ลงชื่อ  ..................................................... (ผู้ยื่นคำร้อง)</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50, marginTop: 20 }}></Text>
                <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                <Text style={{ width: '50%', textAlign: 'left', marginLeft: 34, marginTop: 5 }}>............./........................../............</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    )
}


function Singature1({ staff }) {
    return (
        <>

            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'ประธาน') ?
                            <>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}> </Text>
                                </View>
                                <View key={index} style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '50%', textAlign: 'center', marginRight: 30 }}>ลงชื่อ  .....................................................  {item.project_staff_position_title}</Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}></Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                            </>
                            :
                            null
                    )
                })
            }
            {
                staff.staff.map((item, index) => {
                    return (
                        (item.project_staff_position_title === 'กรรมการ') ?
                            <>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}> </Text>
                                </View>
                                <View key={index} style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '50%', textAlign: 'center', marginRight: 30 }}>ลงชื่อ  .....................................................  {item.project_staff_position_title}</Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                                    <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                                    <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}></Text>
                                    <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                                </View>
                            </>
                            :
                            null
                    )
                })
            }

            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50, marginTop: 20 }}></Text>
                <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                <Text style={{ width: '50%', textAlign: 'left', marginLeft: 34, marginTop: 5 }}>............./........................../............</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    )
}

function SingatureItem({ item }) {
    return (
        <>
            {
                (item.project_staff_position_title === 'ประธาน') ?
                    <>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}> </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '50%', textAlign: 'center', marginRight: 30 }}>ลงชื่อ  .....................................................  {item.project_staff_position_title}</Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}></Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                    </>
                    :
                    null
            }
            {
                (item.project_staff_position_title === 'กรรมการ') ?
                    <>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}> </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '50%', textAlign: 'center', marginRight: 30 }}>ลงชื่อ  .....................................................  {item.project_staff_position_title}</Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ width: '5%', textAlign: 'right', marginRight: 50 }}></Text>
                            <Text style={{ width: '38%', textAlign: 'left' }}></Text>
                            <Text style={{ width: '52%', textAlign: 'center', marginRight: 30 }}></Text>
                            <Text style={{ width: '5%', textAlign: 'right' }}></Text>
                        </View>
                    </>
                    :
                    null
            }
            <View style={styles.row}>
                <Text style={{ width: '5%', textAlign: 'right', marginRight: 50, marginTop: 20 }}></Text>
                <Text style={{ width: '40%', textAlign: 'left' }}></Text>
                <Text style={{ width: '50%', textAlign: 'left', marginLeft: 34, marginTop: 5 }}>............./........................../............</Text>
                <Text style={{ width: '5%', textAlign: 'right' }}></Text>
            </View>
        </>
    )
}


function Bottom01({ boss, staff }) {
    var x = 0;

    var countstaffa = 0;
    var countstaffb = 0;
    staff?.staff.map((item) => {
        if (item.project_staff_position_title === 'ประธาน') {
            countstaffa++;
        } else if (item.project_staff_position_title === 'กรรมการ') {
            countstaffb++;
        }
    }
    )
    return (
        <>
            <View style={[styles.row, {}]}>
                <View style={[styles.column, { width: '33%', marginLeft: 1, marginRight: 1, textAlign: 'left', border: "2px solid #d3d3d3" }]}>
                    <Text style={{ paddingTop: 10, width: '100%', textAlign: 'center' }}>ความเห็นอาจารย์ที่ปรึกษา</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}> </Text>
                    {
                        staff.staff.map((item) => {
                            return (
                                (item.project_staff_position_title === 'ปรึกษา' && x === 0) ?
                                    <>
                                        {x++}
                                        <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>ลงชื่อ  ....................................................</Text>
                                        <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>{item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                    </>
                                    :
                                    null
                            )
                        })
                    }

                    <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>............./........................../............</Text>
                </View>
                <View style={[styles.column, { width: '33%', marginLeft: 1, marginRight: 1, textAlign: 'left', border: "2px solid #d3d3d3" }]}>
                    <Text style={{ paddingTop: 10, width: '100%', textAlign: 'center' }}>ความเห็นหัวหน้าภาควิชา</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}>________________________</Text>
                    <Text style={{ width: '100%', textAlign: 'center' }}> </Text>
                    <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>ลงชื่อ  ....................................................</Text>
                    <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>{boss[0].name_title_th} {boss[0].first_name_th} {boss[0].last_name_th}</Text>
                    <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>............./........................../............</Text>
                </View>
                <View style={[styles.column, { width: '33%', height : '100%', marginLeft: 1, marginRight: 1, textAlign: 'left', border: "2px solid #d3d3d3" }]}>
                    <Text style={{ paddingTop: 10, width: '100%', textAlign: 'center' }}>รายชื่อคณะกรรมการสอบ</Text>
                    {
                        (countstaffa === 0 && countstaffb === 0) ?
                            <>
                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'center' }}>ประธาน_________________________</Text>
                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'center' }}>กรรมการ________________________</Text>
                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'center' }}>กรรมการ________________________</Text>
                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'center' }}>กรรมการ________________________</Text>
                            </>
                            :
                            (staff.staff.map((item) => {
                                return (
                                    <>
                                        {
                                            (item.project_staff_position_title === 'ประธาน') ?
                                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'left', paddingLeft: 5 }}>ประธาน {item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                                :
                                                null
                                        }
                                    </>
                                )
                            }))
                    }                    {
                        (countstaffa === 0 && countstaffb === 0) ?
                            null
                            :
                            (staff.staff.map((item) => {
                                return (
                                    <>
                                        {
                                            (item.project_staff_position_title === 'กรรมการ') ?
                                                <Text style={{ width: '100%', fontSize: 14, marginTop: 6, textAlign: 'left', paddingLeft: 5 }}>กรรมการ {item.name_title_th} {item.first_name_th} {item.last_name_th}</Text>
                                                :
                                                null
                                        }
                                    </>
                                )
                            }))
                    }
                    <Text style={{ width: '100%', textAlign: 'center' }}> </Text>
                    <Text style={{ width: '100%', fontSize: 14, textAlign: 'center' }}>วันที่สอบ ............/........................../...........</Text>
                    <Text style={{ width: '100%', fontSize: 14, marginTop: 5, textAlign: 'center' }}>สถานที่จัดสอบ ...........................................</Text>
                </View>
            </View >
        </>
    )
}