import { useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiGET, apiPOST, apiPUT, apiDELETE } from '../../services/api/'
import { getDateTime, getCode } from '../../functions'
import { Breadcrumb } from '../../components'



const checkFields = false



export default function () {



    const [measurement, setMeasurement] = useState([])
    const { id } = useParams()
    const operation = id == 'add' ? 'add' : 'edit'



    const fetchdata = async () => {

        const result = await apiGET(`measurements/${id}`)

        setMeasurement(result.data)
    }



    useEffect(() => {

        if (operation !== "add") fetchdata()

    }, [])



    if (!measurement) <></>



    return (



        <div className="container">

            <Breadcrumb
                title={`medição (${operation == "add" ? "novo" : "editar"})`}
                previewPage="medições"
                previewPageLink="dailyMeasurements"
            />

            {
                operation !== "add"
                    ? <a href={`/dailyMeasurement/add`} className="btn btn-secondary" id="add_button"><i className="fas fa-plus"></i>  criar um registro</a>
                    : <></>
            }

            <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="deleteMessage">
                <h4 className="alert-heading">excluir registro #{measurement.id}</h4>
                <p>esse item será excluído, confirma?</p>
                <hr />
                <button type="button" className="btn btn-dark" onClick={() => deleteItem('delete', measurement.id)}>excluir</button>
                <button type="button" className="btn btn-secondary" onClick={() => deleteItem('quit')}>desistir</button>
            </div>

            <div className="card mt-5 mb-5">
                <div className="card-header">
                    peso / pressão  {measurement.id ? '(# ' + measurement.id + ")" : ''}
                </div>
                <form className="row p-3" id="Form" onChange={() => fieldsVerify(measurement)}>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="weight" className="form-label">peso</label>
                        <input type="text" className="form-control" id="weight" placeholder="peso" defaultValue={measurement.weight} onChange={(event) => setMeasurement({ ...measurement, weight: event.target.value })} />
                        <small id="error_message_weight" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher o [peso]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="maximum" className="form-label">pressão arterial sistólica</label>
                        <input type="text" className="form-control" id="maximum" placeholder="máxima" defaultValue={measurement.maximum} onChange={(event) => setMeasurement({ ...measurement, maximum: event.target.value })} />
                        <small id="error_message_maximum" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher a [máxima]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="minimum" className="form-label">pressão arterial diastólica</label>
                        <input type="text" className="form-control" id="minimum" placeholder="minima" defaultValue={measurement.minimum} onChange={(event) => setMeasurement({ ...measurement, minimum: event.target.value })} />
                        <small id="error_message_minimum" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher a [minima]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="heartbeat" className="form-label">nº de batimentos</label>
                        <input type="text" className="form-control" id="heartbeat" placeholder="batimentos" defaultValue={measurement.heartbeat} onChange={(event) => setMeasurement({ ...measurement, heartbeat: event.target.value })} />
                        <small id="error_message_heartbeat" className='text-danger' style={{ display: 'none' }}>*** é necessário preencher o número de [batimentos]! ***</small>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="created_at" className="form-label">data / hora medição (formato: aaaa/mm/dd 99:99:99)</label>
                        <input type="text" className="form-control" id="created_at" placeholder="data e hora" defaultValue={measurement.created_at} onChange={(event) => setMeasurement({ ...measurement, created_at: event.target.value })} />
                    </div>
                    <div className="mb-3 col-md-12 mt-5">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event, measurement, setMeasurement)} id="submit_button">salvar</button>
                            <button type="button" className="btn btn-danger" id="delete_button" onClick={() => deleteItem("displayMessage")}>deletar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export const submitForm = (event, measurement, setMeasurement) => {

    event.preventDefault()

    if (fieldsVerify(measurement)) {

        const _measurement = {
            code: measurement.code ? measurement.code : getCode(5),
            weight: measurement.weight ? parseFloat(measurement.weight).toFixed(2):0,
            maximum: parseInt(measurement.maximum) ?? '',
            minimum: parseInt(measurement.minimum) ?? '',
            heartbeat: parseInt(measurement.heartbeat) ?? '',
            userCode: 1, //measurement.userCode,
            status: 1, //measurement.status,
            created_at: measurement.created_at ? measurement.created_at : getDateTime(),
            updated_at: measurement.updated_at ? measurement.updated_at : getDateTime(),
        }

        setMeasurement(_measurement)

        if (measurement.id && measurement.id > 0) _measurement.id = measurement.id

        if (_measurement.id && _measurement.id > 0) updateData(_measurement)
        else addData(_measurement)
    }
}



export const addData = async (_measurement) => {

    const result = await apiPOST('measurements', _measurement)

    if(result){
        toast.success("registro incluído com sucesso")

        setTimeout(
            () =>   window.location.href = `/dailyMeasurement/${result.id}`,
            1000
        )
    
    } else {
        toast.error("ocorreu um erro ao se tentar incluir o registro")
    }    
}



export const updateData = async (_measurement) => {

    const result = await apiPUT('measurements', _measurement)

    if(result) toast.success("registro atualizado com sucesso") 
    
    else toast.error("ocorreu um erro ao se tentar atualizar o registro")
}




export const fieldsVerify = (measurement) => {

    let verifyReturn = true

    if (checkFields) {

        if (!measurement.weight) {

            document.getElementById('error_message_weight').style.display = "block"
            verifyReturn = false
        }

        if (!measurement.maximum) {

            document.getElementById('error_message_maximum').style.display = "block"
            verifyReturn = false
        }

        if (!measurement.minimum) {

            document.getElementById('error_message_minimum').style.display = "block"
            verifyReturn = false
        }

        if (!measurement.heartbeat) {

            document.getElementById('error_message_heartbeat').style.display = "block"
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

        const result = await apiDELETE('measurements', idToDelete)

        if (result) {
            toast.success("registro excluído com sucesso!")

            setTimeout(
                () => window.location.href = "/physicalActivities",
                1000
            )
        }

        else toast.error("ocorreu um erro ao tentar excluir!")

        setTimeout(
            () => window.location.href = "/physicalActivities",
            5000
        )
    }
}