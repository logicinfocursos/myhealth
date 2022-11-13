import { useEffect, useState } from 'react'

import { apiGET } from '../../services/api'
import { Breadcrumb } from '../../components'



export default function () {



    const [medicines, setMedicines] = useState([])



    const fetchData = async () => {

        const result = await apiGET('medicines')

        const _medicinesDecSorted = result.data.sort((a, b) => b.id - a.id)

        setMedicines(_medicinesDecSorted)
    }



    useEffect(() => {

        fetchData()

    }, [])



    if (!medicines) return <></>



    return (
        <div className="content-wrapper">

            <Breadcrumb
                title="medicamentos"
            />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <a href={`/medicine/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>

                                </div>

                                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                                    <table className="table table-head-fixed text-nowrap">

                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>genérico</th>
                                                <th>referência</th>
                                                <th>laboratório</th>
                                                <th>posologia</th>
                                                <th>st</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                medicines && medicines.length > 0

                                                    ? medicines.map((item, key) => {
                                                        return (
                                                            <MeasurementItem
                                                                item={item}
                                                                key={key}
                                                            />
                                                        )
                                                    })
                                                    : <></>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



export const MeasurementItem = ({ item }) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.namerefer}</td>
            <td>{item.laboratory}</td>
            <td>{item.dosage}</td>
            <td>{item.status == 1 ? 'ok' : ''}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group">
                    <a href={`/medicine/${item.id}`} className="btn btn-primary">editar</a>                  
                </div>
            </td>
        </tr>
    )
}