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
import axios from '../../libs/Axios';
import Checkbox from '../../assets/checkbox.jpg';

Font.register({ family: 'THSarabunNew', fonts: [{ src: THSN }, { src: THSN_B, fontWeight: 'bold' }] });
var nullline = 0;
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
        paddingTop: 5,
        paddingBottom: 5,
        border: "1px solid #000000",
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
        justifyContent: "center",
    },
    section: {
        paddingLeft: 9,
        paddingRight: 9,
    },
    border: {
        margin: 10,
        padding: 1,
        height: '98%',
        border: "1px solid #000000",
    },
    borderIN: {
        padding: 1,
        marginTop: 1,
        height: '98%',
        border: "1px solid #000000",
    },

    borderTable: {
        border: "1px solid #000000",
    },
    bb: {
        borderBottom: "1px solid #000000",
    },
    bt: {
        borderTop: "1px solid #000000",
    },
    bl: {
        height: '100%',
        borderLeft: "1px solid #000000",
    },
    br: {

        height: '100%',
        borderRight: "1px solid #000000",
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    forntSmall: {
        fontSize: 12,
    },
    breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
});

// Create Document Component
// function BasicDocument({ projectinfo, member, staff, boss, selectReport }) {

function BasicDocument({ docgenlist }) {

    async function docprojectinfomation(id) {
        const response = await axios.get('/resources/public/projectinfomation', {
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
        const response = await axios.get('/resources/public/projectinfomation/student', {
            params: {
                id_project: id
            }
        });
        return response.data.result.rows;
    }

    async function docstaff(id) {
        const response = await axios.get('/resources/public/projectinfomation/staff', {
            params: {
                id_project: id
            }
        });
        return response.data.result[0];
    }

    const [isLoading, setIsLoading] = React.useState(true);

    const feedid_project = async () => {
        try {
            await Promise.all(
                docgenlist.map(async (item) => {
                    console.log('Fetching data for project:', item.id_project);
                    const [projectinfo, member, staff] = await Promise.all([
                        docprojectinfomation(item.id_project),
                        docmember(item.id_project),
                        docstaff(item.id_project),
                    ]);

                    item.projectinfo = projectinfo[0];
                    item.member = member;
                    item.staff = staff;
                    console.log('Data fetched for project:', item.id_project);

                })
            );
            console.log('Data fetching completed');
            if (docgenlist.length > 0) {
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            console.log('Finally');
        }
    };

    React.useEffect(() => {
        feedid_project();
    }, [docgenlist]);

    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    return (

        <PDFViewer style={styles.viewer}>
            <Document>
                {/*render a single page*/}
                <Page orientation="landscape" size="A4" style={styles.page}>

                    <View style={styles.section}>
                        <Header />
                    </View>
                    <View style={styles.section}>
                        <Information docgenlist={docgenlist} />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default BasicDocument;

function Header() {
    return (
        <>
            <View style={[styles.row, { marginTop: 10 }]}>
                <View style={{ width: '5%' }}>
                </View>
                <View style={{ width: '10%' }}>
                    <Image src={logoKMUTNB} />
                </View>

                <View style={{ width: '5%' }}>
                </View>
                <View style={{ width: '70%', marginTop: 15 }}>
                    <Text style={styles.title}>รายงานสถานะโครงงานพิเศษ (ปริญญานิพนธ์)</Text>
                    <Text>ภาควิชาเทคโนโลยีสารสนเทศ คณะเทคโนโลยีและการจัดการอุตสาหกรรม</Text>
                    <Text>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตปราจีนบุรี</Text>
                </View>
                <View style={{ width: '10%' }}>
                </View>
            </View>
        </>
    )
}

function Information({ docgenlist }) {
    return (
        <>
            <View style={[styles.row, { marginTop: 10 }, styles.bb, styles.bt]}>
                <Text style={[styles.bl, { width: '10%', textAlign: 'center', fontWeight: 'bold', }]}>รหัสโครงงาน</Text>
                <Text style={[styles.bl, { width: '20%', textAlign: 'center', fontWeight: 'bold', }]}>ชื่อโครงงาน/กรณีศึกษา</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ผู้จัดทำโครงงาน</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ที่ปรึกษา/ที่ปรึกษาร่วม</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ประธาน/กรรมการ</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>สถานะโครงงาน</Text>
                <Text style={[styles.bl, styles.br, { width: '10%', textAlign: 'center', fontWeight: 'bold', }]}>หมายเหตุ</Text>
            </View>
            {
                docgenlist?.map((item, index) => {
                    return (
                        <View style={[styles.row, styles.bb]} key={index}>
                            <Text style={[styles.bl, { width: '10%', textAlign: 'center', fontWeight: 'light', }]}>{item.id_project}</Text>
                            <View style={[styles.column, styles.bl, { width: '20%', textAlign: 'left', fontWeight: 'light', }]}>
                                <Text style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '13' }]}>{item.project_title_th}</Text>
                                <Text style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{item.case_study_title_th}</Text>
                            </View>
                            <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                {
                                    item.member.map((member, index) => {
                                        return (
                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{member.name_title_th}{member.first_name_th} {member.last_name_th}</Text>
                                        )
                                    }
                                    )
                                }
                            </View>
                            <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                {
                                    item.staff.staff.map((staff, index) => {
                                        return (
                                            <>
                                                {
                                                    staff.project_staff_position_title === "ปรึกษา" ?
                                                        <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }
                                    )
                                }
                                {
                                    item.staff.staff.map((staff, index) => {
                                        return (
                                            <>
                                                {
                                                    staff.project_staff_position_title === "ปรึกษาร่วม" ?
                                                        <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }
                                    )
                                }
                                {
                                    item.staff.os_staff.map((staff, index) => {
                                        return (
                                            <>
                                                {
                                                    staff.project_staff_position_title === "ปรึกษาร่วม" ?
                                                        <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }
                                    )
                                }
                            </View>
                            <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                {
                                    item.staff.staff.map((staff, index) => {
                                        return (
                                            <>
                                                {
                                                    staff.project_staff_position_title === "ประธาน" ?
                                                        <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }
                                    )
                                }
                                {
                                    item.staff.staff.map((staff, index) => {
                                        return (
                                            <>
                                                {
                                                    staff.project_staff_position_title === "กรรมการ" ?
                                                        <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '12' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }
                                    )
                                }
                            </View>
                            <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '13' }]}>{item.project_status_name_title}</Text>
                            </View>
                            <Text style={[styles.bl, styles.br, { width: '10%', textAlign: 'center', fontWeight: 'light', }]}> </Text>
                        </View >
                    )
                }
                )
            }
        </>
    )
}
