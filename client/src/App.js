import React, { useState } from 'react';
import axios from 'axios'

const App = () => {

    const [data, setdata] = useState([])
    const [photos, setphotos] = useState({})

    const clickHandler = async () => {
        const res = await axios.get('http://localhost:8000/get');
        console.log("hio")
        console.log(res.data)
        setdata(res.data)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("photo", photos)
        console.log(formData)
        const res1 = await axios.post('http://localhost:8000/post', formData)
        console.log(res1)
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="file" name="photo" onChange={(e) => setphotos(e.target.files[0])} />
                <button type="submit">Submit</button>
            </form>
            <button onClick={clickHandler}>Get Data</button>
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item._id}</p>
                        <img src={item.photo} alt="hi" />
                    </div>
                )
            })}
        </>
    )
}

export default App
