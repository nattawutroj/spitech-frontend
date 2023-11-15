import React, { useState } from 'react'
import { BsEyeglasses } from 'react-icons/bs'
import { PiHandEye } from 'react-icons/pi'
import axios from '../../libs/Axios'
import './Css/ChangePassword.css'

function Login(props) {
    const [repassword, setrepassword] = useState('')
    const [password, setPassword] = useState('')
    const [Hide, setHide] = useState(false)

    function handleLogin(e) {
        if (e.target.classList.contains('popup')) {
            e.preventDefault()
            props.toggle()
        }
    }

    async function ChangePassword() {
        if (repassword === password && password !== '') {
            const payload = {
                new_password: password
            }

            const res = await axios.put('/login/change', payload)
            console.log(res)
            localStorage.removeItem('token');
            window.location = '/';
        }
    }

    React.useEffect(() => {
        if (Hide) {
            document.getElementById('PasswordField').type = 'text';
        } else {
            document.getElementById('PasswordField').type = 'password';
        }
    }, [Hide])


    return (
        <div>
            <div className="popupChangePassword" onClick={handleLogin}>
                <div className="popup-inner">
                    <div className="HeadLoginTitle">
                        <h1>เปลี่ยนรหัสผ่าน</h1>
                    </div>
                    <div className="LoginForm">
                        <h3 className='LoginTitle' id="Username">Password</h3>
                        <input placeholder='Enter Password' type="password" id='PasswordField' name="password" value={repassword} onChange={e => setrepassword(e.target.value)} />
                    </div>
                    <div className="LoginForm">
                        <h3 className='LoginTitle'>Re-Password</h3>
                        <input placeholder='Enter Password again' type="password" id='PasswordField' name="repassword" value={password} onChange={e => setPassword(e.target.value)} />
                        <button className="EyeHide" id="EyeHide" onClick={() => setHide(!Hide)}>{Hide ? <BsEyeglasses size={22} /> : <PiHandEye size={22} />}</button>
                    </div>
                    <div className='LoginBtn'>
                        <button onClick={ChangePassword}>เปลี่ยนรหัสผ่าน</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login