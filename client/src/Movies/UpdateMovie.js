import React,{useState, useEffect} from 'react'
import axios from 'axios';

const UpdateMovie = (props) => {
    const [itemUpdate, setItemUpdate] = useState()
    const newItem = props.match.params.id;

    useEffect(() => {
		console.log(newItem)
		axios(`http://localhost:5000/api/movies/${newItem}`)
		.then(res => setItemUpdate(res.data))
        .catch(err => console.log(err))
        

    }, [props.match.params.id])
    

    const changeHandler = e => {
		setItemUpdate({
            ...itemUpdate,
             [e.target.name]: e.target.value})
	}

	const submitHandler = e => {
		e.preventDefault()
		const item = props.match.params.id;
        axios
        .put(`http://localhost:5000/api/movies/${newItem}`, itemUpdate)
		.then(() => props.history.push("/"))
		.catch(err => {
			console.log(err)
        })
    }


	if(!itemUpdate) {
		return <h2>Loading</h2>
	}


    return (  
        
        <form onSubmit={submitHandler}>
            <input 
				type="text"
				name="title"
				value={itemUpdate.title}
				onChange={changeHandler}
			/>
			<input 
				type="text"
				name="director"
				value={itemUpdate.director}
				onChange={changeHandler}
			/>
			<input 
				type="text"
				name="metascore"
				value={itemUpdate.metascore}
				onChange={changeHandler}
			/>
			<input 
				type="text"
				name="stars"
				value={itemUpdate.stars}
				onChange={changeHandler}
			/>
            <button type='submit'>Update Now</button>
        </form>
         
        
    );
}
 
export default UpdateMovie;