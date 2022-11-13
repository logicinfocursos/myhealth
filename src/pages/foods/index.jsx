import { useEffect, useState } from 'react'

import { apiGET } from '../../services/api'
import { Breadcrumb } from '../../components'



export default function () {



    const [foods, setFoods] = useState([])



    const fetchData = async () => {

        const result = await apiGET('foods')

        const _foodsDecSorted = result.data.sort((a, b) => b.id - a.id)

        setFoods(_foodsDecSorted)
    }



    useEffect(() => {

        fetchData()

    }, [])



    if (!foods) return <></>



    return (
        <div className="content-wrapper">

            <Breadcrumb
                title="alimentação diária"
            />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <a href={`/food/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>

                                </div>

                                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                                    <table className="table table-head-fixed text-nowrap">

                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>data</th>
                                                <th>type</th>
                                                <th>cals</th>
                                                <th>sensação</th>
                                                <th>detalhes</th>
                                                <th>comentários</th>
                                                <th>st</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                foods && foods.length > 0

                                                    ? foods.map((item, key) => {
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
            <td>{item.type}</td>
            <td>{item.estimatedCalories}</td>
            <td>{item.perceivedSensation}</td>
            <td>{item.foodDetails.length > 20 ? item.foodDetails.substr(0, 20) + " (...)" : item.foodDetails}</td>
            <td>{item.comments.length > 20 ? item.comments.substr(0, 20) + " (...)" : item.comments}</td>
            <td>{item.status == 1 ? 'ok' : ''}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group">
                    <a href={`/food/${item.id}`} className="btn btn-primary">editar</a>
                </div>
            </td>
        </tr>
    )
}