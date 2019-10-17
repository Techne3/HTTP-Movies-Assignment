import React,{useState, useEffect} from 'react'
import axios from 'axios';

function UpdateMovie({match, history}) {

    const [updated,setUpdated] = useState({
        id: null,
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    );
  
    useEffect(() => {
        const item = match.params.id
      axios.get(`http://localhost:5000/api/movies/${item}`)
        .then( res =>setUpdated(res.data))
        .catch( err => console.log(err));
    }, [match.params.id])
  


    const changeHandler = (e) => {
  
      let value = e.target.value;
  
      if (e.target.name === "stars"){
        value = value.split(","); 
      }
  
    setUpdated({
        ...updated,
        [e.target.name]:value
      });
    }
  
    const submitHandler = (e) => {
      e.preventDefault();
      const item = match.params.id
      axios
        .put(`http://localhost:5000/api/movies/${item}`, updated)
        .then( res => {
        setUpdated({
            title: "",
            director: "",
            metascore: "",
            stars: []
          });
          history.push('/');
        })
        .catch( err => console.log(err.response));
    }
  
    return (
      <div className="form-container">
        <h1>Update Movie</h1>
        <form className="update-form" onSubmit={submitHandler}>
          <input
            type="text"  
            name="title"
            value={updated.title}
            onChange={changeHandler}
            placeholder="Title"
            className="inputs"
          />
          <input
            type="text"  
            name="director"
            value={updated.director}
            onChange={changeHandler}
            placeholder="Director"
            className="inputs"
          />
          <input
            type="number"  
            name="metascore"
            value={updated.metascore}
            onChange={changeHandler}
            placeholder="Metastore"
            className="inputs"
          />
          <input
            type="text"  
            name="stars"
            value={updated.stars}
            onChange={changeHandler}
            placeholder="Stars"
            className="inputs"
          />
          <button>Update Movie</button>
        </form>
      </div>
    );
  }
 
export default UpdateMovie;