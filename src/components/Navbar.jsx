import {HeartIcon} from "@heroicons/react/24/outline"

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar__logo">Logo</div>
        <input type="text" className="text-field" placeholder="Search..."/>
        <div className="navbar__result">Found X characters</div>
        <button className="heart">
            <HeartIcon className="icon"/>
            <span className="badge">2</span>
        </button>
    </nav>
  )
}
