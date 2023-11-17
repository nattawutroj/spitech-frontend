import React from "react";
import NevBar from "./Components/NevBar";
import News from "./Components/News";
import axios from "../libs/Axios";
import { Route, Routes } from "react-router-dom";
import Admintor from "./Components/Admintor";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Col4 from "./Components/Col4";
import "./Components/Css/Home.css";

export const InfomationContext = React.createContext();

const Home = () => {
    const [LoginStatus, setLoginStatus] = React.useState({ loginStatus: localStorage.getItem('loginStatus') || false })

    React.useEffect(() => {
        async function fetchData() {
            if (LoginStatus.loginStatus) {
                const res = await axios.get('/checker/expired')
                setLoginStatus({ loginStatus: true, ...res.data })
            }
        }
        fetchData();
    }, [LoginStatus.loginStatus]);

    return (
        <InfomationContext.Provider value={{ LoginStatus, setLoginStatus }}>
            <div className="Home">
                <NevBar />
                    <Routes>
                        <Route path='/' element={<News />} />
                        <Route path='/admintor'>
                            <Route path='' element={<Admintor />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='settings' element={<Settings />} />
                            <Route path='settings/name_titile' element={<Col4 api={"/resources/name_title"} header={"คำนำหน้าชื่อ"} command={"A2"} col1={["id_name_title","รหัส"]} col2={["name_title_th","ภาษาไทย"]} col3={["name_title_en","ภาษาอังกฤษ"]} />} />
                        </Route>
                    </Routes>
            </div>
        </InfomationContext.Provider>
    )
};

export default Home;


