

export default function List(props) {
  
   

    return (
        <div> 
          <h1>{props.name}</h1> 
          <button onClick={props.toggleFavourites}>
            {props.isFavourite? "abc" : "xyz"}
        </button>
          </div>
    )
}
