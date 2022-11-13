import { useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiGET, apiPOST } from '../../services/api'

import './user.style.css'



export default function () {



    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })




    return (
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">que bom você se juntar à nós!</h3>

                                    <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="userAlreadyRegistered">
                                        <h4 className="alert-heading">usuário já cadastrado!</h4>
                                        <hr />
                                        <p>já existe um usuário com esse email</p>
                                    </div>

                                    <form onChange={fieldsVerify} autocomplete="off">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" placeholder="qual o seu nome?" defaultValue={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} autocomplete="off" />
                                            <label htmlFor="name">nome</label>
                                            <small id="error_message_name" className='text-danger' style={{ display: 'none' }}>*** é necessário informar o [nome]! ***</small>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="email, exemplo: name@example.com" defaultValue={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} autocomplete="off" />
                                            <label htmlFor="email">email</label>
                                            <small id="error_message_email" className='text-danger' style={{ display: 'none' }}>*** é necessário informar o [email]! ***</small>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="password" placeholder="senha" defaultValue={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} autocomplete="off" />
                                            <label htmlFor="password">senha</label>
                                            <small id="error_message_password" className='text-danger' style={{ display: 'none' }}>*** é necessário informar a [senha]! ***</small>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="password2" placeholder="confirmação da senha" defaultValue={user.password2} onChange={(event) => setUser({ ...user, password2: event.target.value })} autocomplete="off" />
                                            <label htmlFor="password2">senha</label>
                                            <small id="error_message_password2" className='text-danger' style={{ display: 'none' }}>*** é necessário redigitar a [senha]! ***</small>
                                        </div>
                                        <div className="form-check mb-5 mt-5">
                                            <input className="form-check-input" type="checkbox" defaultValue id="loginRemenber" />
                                            <label className="form-check-label" htmlFor="loginRemenber">
                                                se lembrar do usuário e senha
                                            </label>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="button" onClick={()=>signupUser(user)} id="submitformbutton">cadastrar</button>
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



export const signupUser = async (user) => {

    if (fieldsVerify) {

        const resultSearch = await apiGET("users", user.email, 'email')

        if (resultSearch.data.length > 0) {

            document.getElementById('userAlreadyRegistered').style.display = 'block'

            setTimeout(function () {

                document.getElementById('userAlreadyRegistered').style.display = 'none'

            }, 10000)

            return null
        }

        const result = await apiPOST("users", user)

        if (result) window.location.href = "/login"

    }
}



export const fieldsVerify = () => {

    document.getElementById('error_message_name').style.display = "none"
    document.getElementById('error_message_email').style.display = "none"
    document.getElementById('error_message_password').style.display = "none"
    document.getElementById('error_message_password2').style.display = "none"

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value

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

    if (name.length < 5 || !name.match(/^[ A-Za-z]+$/)) {
        document.getElementById('error_message_name').style.display = "block"
        fieldsValidation = false
    }

    if (!password || password.length < 3) {
        document.getElementById('error_message_password').style.display = "block"
        fieldsValidation = false
    }

    if (password != password2) {
        document.getElementById('error_message_password2').style.display = "block"
        fieldsValidation = false
    }

    document.getElementById("submitformbutton").disabled = !fieldsValidation

    return fieldsValidation
}