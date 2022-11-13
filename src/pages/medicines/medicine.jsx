import { useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiDELETE, apiGET, apiPOST, apiPUT } from '../../services/api'
import { getDateTime, getCode } from '../../functions'
import { Breadcrumb } from '../../components'



const checkFields = false



export default function () {



    const [medicine, setMedicine] = useState([])
    const [measurement, setMeasurement] = useState([])
    const { id } = useParams()
    const operation = id == 'add' ? 'add' : 'edit'



    const fetchdata = async () => {

        const result = await apiGET(`medicines/${id}`)

        setMedicine(result.data)

        const resultMeasurements = await apiGET('measurements')

        let _resultMeasurement = resultMeasurements.data.sort((a, b) => b.id - a.id)[0]
        _resultMeasurement.imc = medicine.height ? _resultMeasurement.weight / (medicine.height * medicine.height) : 0
        setMeasurement(_resultMeasurement)
    }



    useEffect(() => {

        if (operation !== "add") fetchdata()

    }, [])



    if (!medicine) <></>



    return (



        <div className="container">

            <Breadcrumb
                title={`medicamento (${operation == "add" ? "novo" : "editar"})`}
                previewPage='medicamentos'
                previewPageLink='medicines'
            />

            {
                operation !== "add"
                    ? <a href={`/medicine/add`} className="btn btn-secondary" id="add_button"><i className="fas fa-plus"></i>  criar um registro</a>
                    : <></>
            }

            <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="deleteMessage">
                <h4 className="alert-heading">excluir registro #{medicine.id}</h4>
                <p>item que será excluído  name: <strong>{medicine.name}</strong></p>
                <hr />
                <button type="button" className="btn btn-dark" onClick={() => deleteItem('delete', medicine.id)}>excluir</button>
                <button type="button" className="btn btn-secondary" onClick={() => deleteItem('quit')}>desistir</button>
            </div>

            <div className="card mt-5 mb-5">

                <div className="card-header">
                    medicamento {medicine.id ? '(# ' + medicine.id + ")" : ''}
                </div>

                <form className="row p-3" id="Form" onChange={() => fieldsVerify(medicine)}>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">nome genérico</label>
                        <input type="text" className="form-control" id="name" placeholder="nome genérico" defaultValue={medicine.name} onChange={(event) => setMedicine({ ...medicine, name: event.target.value })} />
                        <small id="error_message_name" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher o [nome genérico do medicamento]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="namerefer" className="form-label">nome de referência</label>
                        <input type="text" className="form-control" id="namerefer" placeholder="nome de referência" defaultValue={medicine.namerefer} onChange={(event) => setMedicine({ ...medicine, namerefer: event.target.value })} />                       
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="laboratory" className="form-label">laboratório</label>
                        <input type="text" className="form-control" id="laboratory" placeholder="nome de referência" defaultValue={medicine.laboratory} onChange={(event) => setMedicine({ ...medicine, laboratory: event.target.value })} />                       
                    </div>                    
                    <div className="mb-3 col-md-6">
                        <label htmlFor="price" className="form-label">preço</label>
                        <input type="text" className="form-control" id="price" placeholder="preço" defaultValue={medicine.price} onChange={(event) => setMedicine({ ...medicine, price: event.target.value })} />
                    </div>   
                    <div className="mb-3 col-md-12">
                        <label htmlFor="dosage" className="form-label">posologia</label>
                        <textarea type="text" className="form-control" id="height" placeholder="posologia" defaultValue={medicine.dosage} onChange={(event) => setMedicine({ ...medicine, dosage: event.target.value })} />
                        <small id="error_message_dosage" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher a sua [altura]! ***</small>
                    </div>                
                    <div className="mb-3 col-md-12 mt-5">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event, medicine, measurement, setMedicine)} id="submit_button">salvar</button>
                            <button type="button" className="btn btn-danger" id="delete_button"onClick={() => deleteItem("displayMessage")}>deletar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export const submitForm = (event, medicine, measurement, setMedicine) => {

    event.preventDefault()

    if (fieldsVerify(medicine)) {

        const imc = medicine.height > 0 ? (measurement.weight / (medicine.height * 2)) : 0

        const _medicine = {
            code: medicine.code ? medicine.code : getCode(5),
            name: medicine.name,
            namerefer: medicine.namerefer,
            laboratory: medicine.laboratory,
            dosage: medicine.dosage ?? '',
            imc: imc,
            analysisImc: analysisIMC(imc),
            price: parseFloat(medicine.price).toFixed(2) ?? '',
            status: 1,
            created_at: medicine.created_at ? medicine.created_at : getDateTime(),
            updated_at: medicine.updated_at ? medicine.updated_at : getDateTime(),
        }

        setMedicine(_medicine)

        if (medicine.id && medicine.id > 0) _medicine.id = medicine.id

        if (_medicine.id && _medicine.id > 0) updateData(_medicine)
        else addData(_medicine)
    }
}



export const addData = async (_medicine) => {

    const result = await apiPOST('medicines', _medicine)

    if (result && result.id) {
        toast.success("registro adicionado com sucesso!")

        setTimeout(
            () => window.location.href = `/medicine/${result.id}`,
            1000
        )

    } else toast.error("ocorreu um erro ao tentar adicionar o registro!")
}



export const updateData = async (_medicine) => {

    const result = await apiPUT('medicines', _medicine)

    if (result && result.id) toast.success("registro atualizado com sucesso!")

    else toast.error("ocorreu um erro ao tentar adicionar o registro!")
}



export const fieldsVerify = (medicine) => {

    let verifyReturn = true

    if (checkFields) {

        if (!medicine.birthdate) {

            document.getElementById('error_message_birthdate').style.display = "block"
            verifyReturn = false
        }

        if (!medicine.height) {

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

        const result = await apiDELETE('medicines', idToDelete)

        if (result) {
            toast.success("registro excluído com sucesso!")

            setTimeout(
                () => window.location.href = "/medicines",
                1000
            )
        }

        else toast.error("ocorreu um erro ao tentar excluir!")

        setTimeout(
            () => window.location.href = "/medicines",
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