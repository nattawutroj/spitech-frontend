import React from "react";
import NevBar from "./Components/NevBar";
import News from "./Components/News";
import axios from "../libs/Axios";

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
                <News />
            </div>
        </InfomationContext.Provider>
    )
};

export default Home;