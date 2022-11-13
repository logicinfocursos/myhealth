import { useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiDELETE, apiGET, apiPOST, apiPUT } from '../../services/api'
import { getDateTime, getCode } from '../../functions'
import { Breadcrumb } from '../../components'
import axios from 'axios'



const checkFields = false



export default function () {



    const [weight, setWeight] = useState([])

    const { id } = useParams()
    const operation = id == 'add' ? 'add' : 'edit'



    const fetchdata = async () => {

        const result = await apiGET(`weights/${id}`)

        setWeight(result.data)

    }



    useEffect(() => {

        if (operation !== "add") fetchdata()

    }, [])



    if (!weight) <></>



    return (



        <div className="container">

            <Breadcrumb
                title={`pesagem diária (${operation == "add" ? "novo" : "editar"})`}
                previewPage='pesagens'
                previewPageLink='weights'
            />

            {
                operation !== "add"
                    ? <a href={`/weight/add`} className="btn btn-secondary" id="add_button"><i className="fas fa-plus"></i>  criar um registro</a>
                    : <></>
            }

            <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="deleteMessage">
                <h4 className="alert-heading">excluir registro #{weight.id}</h4>
                <p>esse item será excluído, confirma?</p>
                <hr />
                <button type="button" className="btn btn-dark" onClick={() => deleteItem('delete', weight.id)}>excluir</button>
                <button type="button" className="btn btn-secondary" onClick={() => deleteItem('quit')}>desistir</button>
            </div>

            <div className="card mt-5 mb-5">

                <div className="card-header">
                    pesagem {weight.id ? '(# ' + weight.id + ")" : ''}
                </div>

                <form className="row p-3" id="Form" onChange={() => fieldsVerify(weight)}>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="value" className="form-label">peso</label>
                        <input type="text" className="form-control" id="value" placeholder="qual o seu peso hoje?" defaultValue={weight.value} onChange={(event) => setWeight({ ...weight, value: event.target.value })} />
                        <small id="error_message_value" className='text-danger' style={{ display: 'none' }}>*** é necessário informar o [peso]! ***</small>
                    </div>

                    <div className="mb-3 col-md-6">
                        <label htmlFor="comments" className="form-label">comentários</label>
                        <textarea type="text" className="form-control" id="comments" placeholder="comentários" defaultValue={weight.comments} onChange={(event) => setWeight({ ...weight, comments: event.target.value })} rows={1} />
                    </div>
                    <div className="mb-3 col-md-12 mt-5">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event, weight, setWeight)} id="submit_button">salvar</button>
                            <button type="button" className="btn btn-danger" id="delete_button" onClick={() => deleteItem("displayMessage")}>deletar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export const submitForm = (event, weight, setWeight) => {

    event.preventDefault()

    if (fieldsVerify(weight)) {

        const _weight = {
            code: weight.code ? weight.code : getCode(5),
            value: parseFloat(weight.value).toFixed(2) ?? 0,
            comments: weight.comments ?? "",
            status: 1,
            created_at: weight.created_at ? weight.created_at : getDateTime(),
            updated_at: weight.updated_at ? weight.updated_at : getDateTime(),
        }

        setWeight(_weight)

        if (weight.id && weight.id > 0) _weight.id = weight.id

        if (_weight.id && _weight.id > 0) updateData(_weight)
        else addData(_weight)
    }
}



export const addData = async (_weight) => {

    const result = await apiPOST('weights', _weight)

    if (result && result.id) {
        toast.success("registro adicionado com sucesso!")

        setTimeout(
            () => window.location.href = `${result.id}`,
            1000
        )

    } else toast.error("ocorreu um erro ao tentar adicionar o registro!")
}



export const updateData = async (_weight) => {

    const result = await apiPUT('weights', _weight)

    if (result && result.id) toast.success("registro atualizado com sucesso!")

    else toast.error("ocorreu um erro ao tentar adicionar o registro!")
}




export const fieldsVerify = (weight) => {

    let verifyReturn = true

    if (checkFields) {

        if (weight.value < 1) {

            document.getElementById('error_message_value').style.display = "block"
            verifyReturn = false
        }


        document.getElementById('submit_button').disabled = !verifyReturn
        document.getElementById('delete_button').disabled = !verifyReturn
    }

    return verifyReturn
}



export const deleteItem = async (option, idToDelete) => {

    if(option==="displayMessage")  document.getElementById("deleteMessage").style.display = "block"
   
    else document.getElementById('deleteMessage').style.display = "none"
    
    if (option === 'delete') {

        const result = await apiDELETE('weights', idToDelete)

        if (result) {
            toast.success("registro excluído com sucesso!")

            setTimeout(
                () => window.location.href = "/weights",
                1000
            )
        }

        else toast.error("ocorreu um erro ao tentar excluir!")

        setTimeout(
            () => window.location.href = "/weights",
            5000
        )
    }
}