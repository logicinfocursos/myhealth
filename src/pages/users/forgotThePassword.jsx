import { useState, } from 'react'

import './user.style.css'



export default function () {



    const [user, setUser] = useState([])



    return (
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">esqueceu a sua senha?</h3>

                                    <div className="alert alert-primary mb-3 mt-3" role="alert" style={{ display: "none" }} id="notFoundMessage">
                                        <h4 className="alert-heading">sobre o envio da nova senha</h4>
                                        <hr />
                                        <p>se você já tiver um usuário cadastrado receberá em seu email uma nova senha</p>
                                    </div>

                                    <form onChange={fieldsVerify}>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" defaultValue={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} />
                                            <label htmlFor="email">email</label>
                                            <small id="error_message_email" className='text-danger' style={{ display: 'none' }}>*** é necessário informar o [email]! ***</small>
                                        </div>

                                        <div className="d-grid mt-5">
                                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="button" onClick={() => requestANewPassword(user)} id="submitformbutton" disabled>solicitar uma nova senha</button>
                                            <div className="text-center mt-5">
                                                <a className="small" href="/login">login</a>
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



export const requestANewPassword = (user) => {

    if (fieldsVerify) {
     
        // todo
    }
}



export const fieldsVerify = () => {

    document.getElementById('error_message_email').style.display = "none"

    const email = document.getElementById('email').value

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

    document.getElementById("submitformbutton").disabled=!fieldsValidation

    return fieldsValidation
}