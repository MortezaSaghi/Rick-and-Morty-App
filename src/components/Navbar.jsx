import {HeartIcon} from "@heroicons/react/24/outline"

export default function Navbar({numOfResult , query ,onQuery ,numOfFavourites}) {
  // console.log(numOfResult);
  return (
    <nav className="navbar">
        <div className="navbar__logo"><img src="./../../public/Rick_and_Morty.png" alt="" /></div>
        <input type="text" className="text-field" placeholder="Search..." value={query} onChange={(e)=>onQuery(e.target.value)}/>
        <div className="navbar__result">Found {numOfResult} characters</div>
        <button className="heart">
            <HeartIcon className="icon"/>
            <span className="badge">{numOfFavourites}</span>
        </button>
    </nav>
  )
}
