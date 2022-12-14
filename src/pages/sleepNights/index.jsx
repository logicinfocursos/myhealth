import { useEffect, useState } from 'react'

import { apiGET } from '../../services/api'
import { Breadcrumb } from '../../components'



export default function () {



    const [sleepNights, setSleepNights] = useState([])



    const fetchData = async () => {

        const result = await apiGET('sleepNights')

        const _sleepNightsDecSorted = result.data.sort((a, b) => b.id - a.id)

        setSleepNights(_sleepNightsDecSorted)
    }



    useEffect(() => {

        fetchData()

    }, [])



    if (!sleepNights) return <></>



    return (
        <div className="content-wrapper">

            <Breadcrumb
                title="noites de sono"
            />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <a href={`/sleepNight/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>

                                </div>

                                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                                    <table className="table table-head-fixed text-nowrap">

                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>data</th>
                                                <th>início</th>
                                                <th>fim</th>
                                                <th>num horas</th>
                                                <th>sensação</th>
                                                <th>comentários</th>
                                                <th>st</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                sleepNights && sleepNights.length > 0

                                                    ? sleepNights.map((item, key) => {
                                                        return (
                                                            <SleepNightItem
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



export const SleepNightItem = ({ item }) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.created_at}</td>
            <td>{item.start}</td>
            <td>{item.wakeUp}</td>
            <td>{item.sleepHours}</td>
            <td>{item.sleepQualitySensation.length > 20 ? item.sleepQualitySensation.substr(0,20) + " (...)" : item.sleepQualitySensation}</td>
            <td>{item.comments.length > 20 ? item.comments.substr(0,20) + " (...)" : item.comments}</td>
            <td>{item.status == 1 ? 'ok' : ''}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group">
                    <a href={`/sleepNight/${item.id}`} className="btn btn-primary">editar</a>                  
                </div>
            </td>
        </tr>
    )
}