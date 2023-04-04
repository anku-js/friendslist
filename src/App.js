import React, { useState, useEffect } from "react"
import List from "./Components/List"
import {nanoid} from "nanoid"
import './App.css';
import { AiOutlineSearch } from "react-icons/ai"

function App() {
  const [friendsList, setFriendsList] = useState([])
  const [newFriend, setNewFriend] = useState("")
  const [filteredFriends, setFilteredFriends] = useState([])

function handleChange(event) {
  const { value } = event.target;
  setNewFriend(value)
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

function toggleFavourites(id) {
  setFriendsList(prevArr => prevArr.map(star=> {
    return star.id === id ?
    {...star, isFavourite: !star.isFavourite} : star
  }))
}
  
const searchedFriend = (event) => {
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
    const favouritesList = filteredFriends.filter((starred) => starred.isFavourite === true)
    setFilteredFriends(favouritesList);
  } else {
    setFilteredFriends(friendsList)
  }
}

function handleConfirmDelete(id) {
  const newState = friendsList.filter((friend)=> friend.id !== id)
  setFriendsList(newState)
}

useEffect(() => {
  setFilteredFriends(friendsList)
}, [friendsList])

  return (
    <div className="container">
      <header className='header'>
            <h1>F.R.I.E.N.D.S</h1>
            <form className='forms'>
                <div className="showFavourite">
                    <input 
                      type="checkbox" 
                      id="favourites"
                      checked={filteredFriends.isFavourite}
                      name={"isFriendly"}
                      onChange={favouritesFiltered}

                    />
                    <label htmlFor="favourites">Show Favourites</label>
                </div>
                <label className="search-label">
                  <input 
                    className="search-friend"
                    type="text" 
                    placeholder='Search for a friend' 
                    onChange={searchedFriend}
                  />
                  <AiOutlineSearch />
                </label>                    
            </form>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            className="add-friend-input"
            type="text"
            name="friend"
            placeholder="Enter your Friend's name"
            onChange={handleChange}
            value={newFriend}
          />
        </label>
      </form>
      <div>
        { filteredFriends.map( (mapped) => 
          <List 
            name={mapped.name} 
            toggleFavourites={ () => toggleFavourites(mapped.id)} 
            isFavourite={mapped.isFavourite} 
            key={mapped.id}
            id={mapped.id}
            handleConfirmDelete={ () => handleConfirmDelete(mapped.id)}
          />
        )}
      </div> 
    </div>
  );
}

export default App;
