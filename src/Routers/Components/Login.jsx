import React, { useState} from 'react'
import './Css/Login.css'
import { BsEyeglasses } from 'react-icons/bs'
import { PiHandEye } from 'react-icons/pi'
import axios from '../../libs/Axios'
import ChangePassword from './ChangePassword'

function Login(props) {
    const [username, setUsername] = useState('' || localStorage.getItem('username'))
    const [password, setPassword] = useState('' || localStorage.getItem('password'))
    const [Hide, setHide] = useState(false)
    const [RememberMe, setRememberMe] = useState(false || localStorage.getItem('remember'))

    function handleRememberMe() {
        setRememberMe(!RememberMe)
    }

    function handleLogin(e) {
        if (e.target.classList.contains('popup')) {
            e.preventDefault()
            props.toggle()
        }
    }

    async function fetchData() {
        if (username !== '' && password !== '') {
            const payload = {
                user: username,
                password: password
            }

            const res = await axios.post('/login', payload)
            console.log(res.data)
            localStorage.setItem('token', res.data.token)

            if (res.data.data.id_role === '10') {
                console.log('Change password')
                document.querySelector('.overlay').style.display = 'block'
            }
            else {

                localStorage.setItem('loginStatus', true)
                //  ทำการเก็บ remember me ลง localstorage
                if (RememberMe) {
                    localStorage.setItem('remember', true)
                    localStorage.setItem('username', username)
                    localStorage.setItem('password', password)
                }
                else {
                    localStorage.removeItem('remember')
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                }
                //  ทำการเก็บ token ลง localstorage
                props.toggle()
                window.location = '/';
            }
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
            <div className="overlay">
                <ChangePassword />
            </div>
            <div className="popup" onClick={handleLogin}>
                <div className="popup-inner">
                    <div className="HeadLoginTitle">
                        <h1>เข้าสู่ระบบ</h1>
                    </div>
                    <div className="LoginForm">
                        <h3 className='LoginTitle' id="Username">Username</h3>
                        <input placeholder='Enter ID Studen or Username' type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="LoginForm">
                        <h3 className='LoginTitle'>Password</h3>
                        <input placeholder='Enter Password' type="password" id='PasswordField' name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button className="EyeHide" id="EyeHide" onClick={() => setHide(!Hide)}>{Hide ? <BsEyeglasses size={22} /> : <PiHandEye size={22} />}</button>
                    </div>
                    <div className="RememberMe">
                        <label class="container">
                            <input type="checkbox" onChange={handleRememberMe} checked={RememberMe} />
                            <span class="checkmark"></span>
                            Remember Me
                            <a className="ForgotPassword" href='/#'>ลืมรหัสผ่าน?</a>
                        </label>
                    </div>
                    <div className='LoginBtn'>
                        <button onClick={fetchData}>เข้าสู่ระบบ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login