import { useEffect, useState, useContext } from 'react'

import { apiGET } from '../../services/api'
import { getDateTime } from '../../functions'
import './user.style.css'



export default function () {



    const [user, setUser] = useState([])



    useEffect(() => {

        getmyHealthuser(setUser, user)

    }, [])



    return (
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">bem vindo de volta!</h3>

                                    <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="notFoundMessage">
                                        <h4 className="alert-heading">não encontrei o seu usuário...</h4>
                                        <hr />
                                        <p>usuário não cadastrado / ou senha incorreta</p>
                                        <p>por gentileza, tente inserir um usuário e senha válidos para processir!</p>
                                    </div>

                                    <form onChange={fieldsVerify}>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="email, exemplo: name@example.com" defaultValue={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} />
                                            <label htmlFor="email">email</label>
                                            <small id="error_message_email" className='text-danger' style={{ display: 'none' }}>*** é necessário informar o [email]! ***</small>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="password" placeholder="senha" defaultValue={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
                                            <label htmlFor="password">senha</label>
                                            <small id="error_message_password" className='text-danger' style={{ display: 'none' }}>*** é necessário informar a [senha]! ***</small>
                                        </div>
                                        <div className="form-check mb-5 mt-5">
                                            <input className="form-check-input" type="checkbox" defaultValue id="loginRemenber" />
                                            <label className="form-check-label" htmlFor="loginRemenber">
                                                se lembrar do usuário e senha
                                            </label>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="button" onClick={() => searchUser(user, setUser)} id="submitformbutton" >entrar</button>
                                            <div className="text-center">
                                                <a className="small" href="/forgotThePassword">esqueceu a senha?</a>
                                                <br />
                                                <a className="small" href="/signup">quer se cadastrar?</a>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export const getmyHealthuser = (setUser, user) => {

    let _userLocalstorage = localStorage.getItem('myHealthuser')
    let _user = JSON.parse(_userLocalstorage)

    if (_user) {
        setUser({
            ...user,
            email: _user.email,
            password: _user.password
        })
    }
}



export const searchUser = async (user, setUser) => {

    if (!user) return null

    if (fieldsVerify) {

        if (user.email) {

            const result = await apiGET(`users`, user.email, 'email')

            if (result.data[0].password == user.password) {
                
                setUser(result.data[0])
      
          
                if (document.getElementById("loginRemenber").checked) {
                    const _user = {
                        ...user,
                        email: user.email,
                        password: user.password,
                        logged_at: getDateTime()
                    }

                    localStorage.setItem('myHealthuser', JSON.stringify(_user))

                } else {

                    localStorage.removeItem("myHealthuser")

                }

                window.location.href = "/"

                return null
            }

        }

        document.getElementById('notFoundMessage').style.display = 'block'

        setTimeout(function () {

            document.getElementById('notFoundMessage').style.display = 'none'

        }, 10000)
    }
}



export const fieldsVerify = () => {

    document.getElementById('error_message_email').style.display = "none"
    document.getElementById('error_message_password').style.display = "none"

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    let fieldsValidation = true
    let email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!email_regex.test(email)) {
        document.getElementById('error_message_email').style.display = "block"
        fieldsValidation = false

    } else {
        if (!email || email.length < 6 || email.indexOf(".") < 1) {
            document.getElementById('error_message_email').style.display = "block"
            fieldsValidation = false

        } else document.getElementById('error_message_email').style.display = "none"
    }

    if (!password || password.length < 3) {
        document.getElementById('error_message_password').style.display = "block"
        fieldsValidation = false
    }

    document.getElementById("submitformbutton").disabled = !fieldsValidation

    return fieldsValidation
}