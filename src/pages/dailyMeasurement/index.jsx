import { useEffect, useState } from 'react'

import { apiGET, apiDELETE } from '../../services/api'
import { Breadcrumb } from '../../components'



export default function () {



    const [measurements, setMeasurements] = useState([])



    const fetchData = async () => {

        const result = await apiGET('measurements')

        const _measurementsDecSorted = result.data.sort((a, b) => b.id - a.id)

        setMeasurements(_measurementsDecSorted)
    }



    useEffect(() => {

        fetchData()

    }, [])



    if (!measurements) return <></>



    return (
        <div className="content-wrapper">

            <Breadcrumb
                title="medições"
            />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <a href={`/dailyMeasurement/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>
                                </div>

                                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                                    <table className="table table-head-fixed text-nowrap">

                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>dt</th>
                                                <th>peso</th>
                                                <th>máxima</th>
                                                <th>minima</th>
                                                <th>batimentos</th>
                                                <th>st</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                measurements && measurements.length > 0

                                                    ? measurements.map((item, key) => {
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
            <td>{item.created_at}</td>
            <td>{item.weight}</td>
            <td>{item.maximum}</td>
            <td>{item.minimum}</td>
            <td>{item.heartbeat}</td>
            <td>{item.status}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group">
                    <a href={`/dailyMeasurement/${item.id}`} className="btn btn-primary"><i className="fas fa-pen text-primary"></i>editar</a>                    
                </div>
            </td>
        </tr>
    )
}