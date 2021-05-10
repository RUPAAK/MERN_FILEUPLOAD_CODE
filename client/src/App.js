import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia } from '@material-ui/core'

const App = () => {

    const [data, setdata] = useState([])
    const [photos, setphotos] = useState()

    const clickHandler = async () => {
        const res = await axios.get('http://localhost:8000/get');
        console.log(res.data[0])
        setdata(res.data)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        //photos is an object of files so changes it to array
        Array.from(photos).forEach(image => {
            formData.append('photo', image)
        })
        console.log(formData)
        const res1 = await axios.post('http://localhost:8000/post', formData);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="file" name="photo" onChange={(e) => setphotos(e.target.files)} multiple />
                <button type="submit">Submit</button>
            </form>
            <button onClick={clickHandler}>Get Data</button>
            <Grid container spacing={3}> 
                {data.map((item, index) => {
                    return (
                        <Grid item xm={12}>
                            <Card>
                                <img style={{width: '200px', height: '300px'}} src={item.photo[0].img} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default App
