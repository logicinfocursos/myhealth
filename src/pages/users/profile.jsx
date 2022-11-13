import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiDELETE, apiGET, apiPOST, apiPUT } from '../../services/api'
import { getDateTime, getCode } from '../../functions'
import { Breadcrumb } from '../../components'



const checkFields = false



export default function () {


    const [user, setUser] = useState([])
    const [measurement, setMeasurement] = useState([])
    const { id } = 1 //useParams()



    const fetchdata = async () => {

        const result = await apiGET("users", id, "id")

        setUser(result.data[0])

        const resultMeasurements = await apiGET('measurements')

        let _resultMeasurement = resultMeasurements.data.sort((a, b) => b.id - a.id)[0]
        _resultMeasurement.imc = user.height ? _resultMeasurement.weight / (user.height * user.height) : 0
        setMeasurement(_resultMeasurement)
    }



    useEffect(() => {

        fetchdata()

    }, [])



    if (!user) <></>

    

    return (



        <div className="container">

            <Breadcrumb
                title={`perfil (editar)`}
            />

            <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="deleteMessage">
                <h4 className="alert-heading">excluir registro #{user.id}</h4>
                <p>item que será excluído  name: <strong>{user.name}</strong></p>
                <hr />
                <button type="button" className="btn btn-dark" onClick={() => deleteItem('delete', user.id)}>excluir</button>
                <button type="button" className="btn btn-secondary" onClick={() => deleteItem('quit')}>desistir</button>
            </div>

            <div className="card mt-5 mb-5">

                <div className="card-header">
                    perfil {user.id ? '(# ' + user.id + ")" : ''}
                </div>

                <form className="row p-3" id="Form" onChange={() => fieldsVerify(user)}>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">nome</label>
                        <input type="text" className="form-control" id="name" placeholder="name" defaultValue={user.name} disabled />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="birthdate" className="form-label">data de nascimento</label>
                        <input type="text" className="form-control" id="birthdate" placeholder="nascimento" defaultValue={user.birthdate} onChange={(event) => setUser({ ...user, birthdate: event.target.value })} />
                        <small id="error_message_birthdate" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher a [data de nascimento]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="height" className="form-label">altura</label>
                        <input type="text" className="form-control" id="height" placeholder="altura" defaultValue={user.height} onChange={(event) => setUser({ ...user, height: event.target.value })} />
                        <small id="error_message_height" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher a sua [altura]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="bloodtype" className="form-label">tipo sanguíneo</label>
                        <input type="text" className="form-control" id="bloodtype" placeholder="bloodtype" defaultValue={user.bloodtype} onChange={(event) => setUser({ ...user, bloodtype: event.target.value })} />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="imc" className="form-label">imc</label>
                        <input type="text" className="form-control" id="imc" defaultValue={user.imc} disabled />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="classification" className="form-label">classificação</label>
                        <input type="text" className="form-control" id="classification" defaultValue={user.imcclassification} disabled />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="password" className="form-label">nova senha</label>
                        <input type="password" className="form-control" id="password" placeholder="senha" defaultValue={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
                    </div>
                    <div className="mb-3 col-md-12 mt-5">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event, user, setUser, measurement)} id="submit_button">salvar</button>
                            <button type="button" className="btn btn-danger" id="submit_button" onClick={() => deleteItem("displayMessage")}>deletar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export const submitForm = (event, user, setUser, measurement) => {

    event.preventDefault()

    if (fieldsVerify(user)) {

        const imc = user.height > 0 ? (measurement.weight / (user.height * 2)) : 0

        const _user = {
            code: user.code ? user.code : getCode(5),
            name: user.name ?? '',
            birthdate: user.birthdate ?? '',
            height: parseFloat(user.height).toFixed(2) ?? '',
            bloodtype: user.bloodtype ?? '',
            imc: imc.toFixed(2),
            imcclassification: analysisIMC(imc),
            email: user.email ?? '',
            password: user.password ?? '',
            userCode: 1,
            status: 1,
            created_at: user.created_at ? user.created_at : getDateTime(),
            updated_at: user.updated_at ? user.updated_at : getDateTime(),
        }

        if (user.id && user.id > 0) _user.id = user.id

        analysisIMC(_user.imc)

        setUser(_user)

        if (_user.id && _user.id > 0) updateData(_user)

    }
}



export const updateData = async (_user) => {

    const result = await apiPUT('users', _user)

    if (result && result.id) toast.success("registro atualizado com sucesso!")

    else toast.error("ocorreu um erro ao tentar adicionar o registro!")
}



export const fieldsVerify = (user) => {

    let verifyReturn = true

    if (checkFields) {

        if (!user.birthdate) {

            document.getElementById('error_message_birthdate').style.display = "block"
            verifyReturn = false
        }

        if (!user.height) {

            document.getElementById('error_message_height').style.display = "block"
            verifyReturn = false
        }

        document.getElementById('submit_button').disabled = !verifyReturn
        document.getElementById('delete_button').disabled = !verifyReturn
    }

    return verifyReturn
}



export const deleteItem = async (option, idToDelete) => {

    if (option === "displayMessage") document.getElementById("deleteMessage").style.display = "block"

    else document.getElementById('deleteMessage').style.display = "none"

    if (option === 'delete') {

        const result = await apiDELETE('users', idToDelete)

        if (result) {
            toast.success("registro excluído com sucesso!")

            setTimeout(
                () => window.location.href = "/users",
                1000
            )
        }

        else toast.error("ocorreu um erro ao tentar excluir!")

        setTimeout(
            () => window.location.href = "/users",
            5000
        )
    }
}



export const analysisIMC = (imc) => {

    let _resultAnalysis = ""

    if (imc < 18.5) _resultAnalysis = "abaixo do peso"

    else if (imc >= 18.5 && imc <= 24.9) _resultAnalysis = "peso normal"

    else if (imc >= 25 && imc <= 29.9) _resultAnalysis = "acima do peso (sobrepeso)"

    else if (imc >= 30 && imc <= 34.9) _resultAnalysis = "obesidade I"

    else if (imc >= 35 && imc <= 39.9) _resultAnalysis = "obesidade II"

    else if (imc > 40) _resultAnalysis = "obesidade III"

    return _resultAnalysis
}