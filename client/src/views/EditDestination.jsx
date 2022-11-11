import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateDestination, getDestinationById } from '../services/internalApiService';

export const EditDestination = (props) => {
    const { id } = useParams();

    const [formData, setFormData] = useState({})

    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getDestinationById(id)
            .then((data) => {
                setFormData(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key] === false) {
                delete formData[key]
            }
        }
        updateDestination(id, formData)
            .then((data) => {
                console.log('update destination data:', data)
                navigate(`/destinations/${data._id}`)
            })
            .catch((error) => {
                console.log(error.response)
                setErrors(error.response?.data?.errors)
            })
    }

    const handleFormChanges = (e) => {
        if (e.target.type === "checkbox") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked
            })
            return null;
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (formData === null) {
        return null;
    }

    const { summer, winter, spring, fall } = formData;

    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3 className="text-center">
                New Destination
            </h3>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }}>
                <div className="form-group">
                    <label className="h6">Location</label>
                    <input onChange={handleFormChanges}
                        type='text'
                        name='location'
                        value={formData.location}
                        className="form-control"
                    />
                    {
                        errors?.location && (
                            <span className="text-danger">{errors.location?.message}</span>
                        )
                    }
                </div>
                <div className="form-group">
                    <label className="h6">Description</label>
                    <input onChange={handleFormChanges}
                        type='text'
                        name='description'
                        value={formData.description}
                        className="form-control"
                    />
                    {
                        errors?.description && (
                            <span className="text-danger">{errors.description?.message}</span>
                        )
                    }
                </div>
                <div className="form-group">
                    <label className="h6">Media Url</label>
                    <input onChange={handleFormChanges}
                        type='text'
                        name='src'
                        value={formData.src}
                        className="form-control"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="h6">Media Type</label>
                    <select onChange={handleFormChanges}
                        type='text'
                        name="srcType"
                    >
                        <option value='img'>Image</option>
                        <option value='Google Maps Embed'>Google Maps Embed</option>
                        <option value='YouTube Embed'>YouTube Embed</option>
                    </select>
                </div>
                <hr />
                <h5>Travel Seasons</h5>
                <div className="form-check">
                    <input onChange={handleFormChanges}
                        name='summer'
                        type='checkbox'
                        className="form-check-input"
                        checked={summer}
                    />
                    <label className="h6 form-check-label">Summer</label>
                </div>
                <div className="form-check">
                    <input onChange={handleFormChanges}
                        name='spring'
                        type='checkbox'
                        className="form-check-input"
                        checked={spring}
                    />
                    <label className="h6 form-check-label">Spring</label>
                </div>
                <div className="form-check">
                    <input onChange={handleFormChanges}
                        name='fall'
                        type='checkbox'
                        className="form-check-input"
                        checked={fall}
                    />
                    <label className="h6 form-check-label">Fall</label>
                </div>
                <div className="form-check">
                    <input onChange={handleFormChanges}
                        name='winter'
                        type='checkbox'
                        className="form-check-input"
                        checked={winter}
                    />
                    <label className="h6 form-check-label">Winter</label>
                </div>
                <button className="btn btn-small btn-outline-success">Submit</button>
            </form>
        </div>
    )
}