import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { getAllDestinations, deleteDestination } from "../services/internalApiService"

export const AllDestinations = (props) => {
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        getAllDestinations()
            .then((data) => {
                setDestinations(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDeleteClick = (idToDelete) => {
        deleteDestination(idToDelete)
            .then((data) => {
                const filterDestinations = destinations.filter((destination) => {
                    return destination._id !== idToDelete
                })
                setDestinations(filterDestinations)
                // setDestinations(destinations.filter((destination) => destination._id !== idToDelete))
            })
            .catch((error) => {
                console.log(error)
            })
}

    return (
        <div className="w-50 mx-auto text-center">
            <h2>Travel Destinations</h2>
            {
                destinations.map((destination, i) => {
                    const {_id, location, description, summer, winter, spring, fall} = destination
                    return (
                        <div key={i} className="shadow mb-4 rounded border p-4">
                            <Link to={`/destinations/${_id}`} >
                            <h3>{location}</h3>
                            </Link>
                            <p>{description}</p>
                            <p>Travel Seasons</p>
                            <ul className="list-group">
                                {summer && <li className='list-group-item'>Summer</li>}
                                {spring && <li className='list-group-item'>Spring</li>}
                                {fall && <li className='list-group-item'>Fall</li>}
                                {winter && <li className='list-group-item'>Winter</li>}
                            </ul>
                            <button onClick={(e) => {
                                handleDeleteClick(_id)
                            }} 
                            className="btn btn-sm btn-outline-danger mx-1 mt-3">
                                Delete
                            </button>
                            <Link className="btn btn-sm btn-outline-warning mx-1 mt-3" to={`/destinations/${_id}/edit`}>Edit</Link>
                        </div>
                    )
                })
            }
        </div>    
    )
}