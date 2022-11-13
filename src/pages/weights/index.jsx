import { useEffect, useState } from 'react'

import { apiGET } from '../../services/api'
import { Breadcrumb } from '../../components'



export default function () {



    const [weights, setWeights] = useState([])



    const fetchData = async () => {

        const result = await apiGET('weights')

        const _weightsDecSorted = result.data.sort((a, b) => b.id - a.id)

        setWeights(_weightsDecSorted)
    }



    useEffect(() => {

        fetchData()

    }, [])



    if (!weights) return <></>



    return (
        <div className="content-wrapper">

            <Breadcrumb
                title="pesagem"
            />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <a href={`/weight/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>

                                </div>

                                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                                    <table className="table table-head-fixed text-nowrap">

                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>data</th>
                                                <th>valor</th>
                                                <th>comentários</th>
                                                <th>st</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                weights && weights.length > 0

                                                    ? weights.map((item, key) => {
                                                        return (
                                                            <WeightItem
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



export const WeightItem = ({ item }) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.created_at}</td>
            <td>{item.value}</td>
            <td>{item.comments}</td>
            <td>{item.status == 1 ? 'ok' : ''}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group">
                    <a href={`/weight/${item.id}`} className="btn btn-primary">editar</a>                  
                </div>
            </td>
        </tr>
    )
}