import React, { useState, useEffect } from "react"
import Header from "./Components/Header"
import List from "./Components/List"
import StarEmpty from "./Svg/StarEmpty"
import StarFilled from "./Svg/StarFilled"
import SearchImage from "./Svg/SearchImage"
import {nanoid} from "nanoid"
import './App.css';


function App() {
  const [friendsList, setFriendsList] = useState([])
  const [newFriend, setNewFriend] = useState("")
  const [filteredFriends, setFilteredFriends] = useState([])

  
function handleChange(event) {
  const { value } = event.target;
  setNewFriend(value)
}

function toggleFavourites(id) {
  setFriendsList(prevArr => prevArr.map(star=> {
    return star.id === id ?
    {...star, isFavourite: !star.isFavourite} : star
  }))
}

function handleSubmit(event) {
    event.preventDefault()
    const friendToBeAdded = {
      name: newFriend,
      isFavourite: false,
      id: nanoid()
    } 
    setFriendsList([
      ...friendsList,
      friendToBeAdded
    ])
    setNewFriend("")  
}
function handleCheck(event) {
  setFilteredFriends() 
}
  
  const filter = (event) => {
    const { value } = event.target
  
    if (value !== '') {
      const results = friendsList.filter((searched) => {
        return searched.name.toLowerCase().includes(value.toLowerCase());   
      });
      setFilteredFriends(results);
    } else {
      setFilteredFriends(friendsList); 
    } 
  };
  
  const favouritesFiltered= (event) => {
    const { checked } = event.target
    if (checked) {
      const favouritesList = filteredFriends.filter((starred) => starred.isFavourite===true)
      setFilteredFriends(favouritesList);
    } else {
      setFilteredFriends(friendsList)
    }
  }

  const finalList = filteredFriends.map((mapped)=> 
  <List 
    name={mapped.name} 
    toggleFavourites={()=>toggleFavourites(mapped.id)} 
    isFavourite={mapped.isFavourite} 
    key={mapped.id}
  />)
  
 
  useEffect(() => {
    setFilteredFriends(friendsList)
  }, [friendsList])

    return (
        <div className="container">
          <header className='header'>
                <h1><u>Friends List</u></h1>
                <form className='forms'>
                    <div>
                        <input 
                          type="checkbox" 
                          id="favourites"
                          checked={filteredFriends.isFavourite}
                          name={"isFriendly"}
                          onChange={favouritesFiltered}

                        />
                        <label htmlFor="favourites">Show Favourites</label>
                    </div>
                    <input type="text" placeholder='Search for a friend' onChange={filter}/>
                </form>
          </header>
          <form onSubmit={handleSubmit}>
            <input 
              className="enterName"
              type="text"
              name="friend"
              placeholder="Enter your Friend's name"
              onChange={handleChange}
              value={newFriend}
            />
          </form>
          
           <div>
          {finalList}
           </div>
          
      
          
        </div>
  );
}

export default App;
// const finalList = filteredFriends.map(({ name, isFavourite, id })=> (
//   <div key={id} className="list-container"> 
//     <p>{name}</p>
//     <button onClick={() => toggleFavourites(friendsList.id)}>
//         {isFavourite? StarFilled : StarEmpty}
//     </button>
//   </div>
// ))