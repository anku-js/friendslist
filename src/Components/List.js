import { useState } from "react"
import { AiFillStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti"
import { RxCross2 } from "react-icons/rx"

export default function List({ name, handleConfirmDelete, toggleFavourites, isFavourite }) {
  const [deleteFriend, setDeleteFriend] = useState(false)

  function handleDelete() {
    setDeleteFriend(prev => !prev)
  }

  return (
    <div className="friends"> 
      { deleteFriend ? (
        <div className="delete-container">
          <p className="delete-container-p">Are you sure you want to delete?</p>
          <div className="delete-button">
            <button onClick={handleDelete}>
              <RxCross2 />
            </button>
            <button onClick={handleConfirmDelete}>
              <TiTick />
            </button>
          </div>
        </div>
      ) : (
        <div className="list-container">
          <div className="friend-name-container">
            <h2 className="friend-name">{name}</h2>
            <p className="friend-name-p">is your friend</p> 
          </div>
          <div className="button-container">
            <button onClick={toggleFavourites}>
              {isFavourite? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <button onClick={handleDelete}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      )}
   </div>
  ) 
}