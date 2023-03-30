import React from "react"
import Header from "./Components/Header"
import List from "./Components/List"
import StarEmpty from "./Svg/StarEmpty"
import StarFilled from "./Svg/StarFilled"
import SearchImage from "./Svg/SearchImage"
import {nanoid} from "nanoid"
import './App.css';

function App() {
  const [updated, setUpdated] = React.useState([])

  function handleDown(event) {
    const friends= event.target.value;
    if (event.key==="Enter") {
      setUpdated(prev=> {return [...updated, {id: nanoid(), name: friends, isFavourite: false, isActive: true}]})
    }
}   
console.log(updated)

function handleToggle(id) {
  setUpdated(prevArr => prevArr.map(star=> {
    return star.id === id ?
    {...star, isFavourite: !star.isFavourite} : star
  }))
}


const newList=updated.map((x)=>
            <div className="list-container"> 
                <p>{x.name}</p>
                <button onClick={()=>handleToggle(x.id)}>
                     {x.isFavourite? StarFilled : StarEmpty}
                </button>
            </div>
      )

  
  

    return (
        <div className="container">
          <header className='header'>
                <h1><u>Friends List</u></h1>
                <form className='forms'>
                    <div>
                        <input type="checkbox"/>
                        <label>Show Favourites</label>
                    </div>
                    <input type="text" placeholder='Search for a friend' />
                </form>
          </header>
          <input className="enterName"
                   type="text"
                   name="friend"
                   placeholder="Enter your Friend's name"
                   
                   onKeyDown={handleDown}
            />
            
            <div>{newList}</div>
        </div>
  );
}

export default App;
