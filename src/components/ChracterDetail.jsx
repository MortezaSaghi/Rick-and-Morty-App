import CircularProgress from "@mui/material/CircularProgress";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline"
import { episodes} from "./../../public/data/data"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function ChracterDetail({selectedId}) {
  const [character,setCharacter]=useState(null)
  const [isLoding,setIsLoding]=useState(false);
  
  useEffect(()=>{
    async function getData(){
        try{
          setIsLoding(true)
          setCharacter(null)
          const {data}=await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
          setCharacter(data)
          
        }catch(err){
          toast.error(err.response.data.error)
        }finally{
          setIsLoding(false)
        }

      }
    
    if (selectedId) getData();
  },[selectedId])
  if (isLoding) return <div style={{marginLeft:"22%",flex:"1"}}><CircularProgress /></div>
  if (!character || !selectedId) return <div className="name" style={{flex:"1"}}>Search and select a Character</div>
  return (
    <div style={{flex:1}}>
      <div className="character-detail">
        <img src={character.image} alt={character.name} className="character-detail__img" />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male"?"👨 ":"👩 "}</span>
            <span>{character.name}</span>
          </h3>
          <div className="info">
            <span className={`status ${character.status === "Dead"?"red":""}`}></span>
            <span>&nbsp;{character.status}</span>
            <span>&nbsp;- {character.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">
              Add to Favourite
            </button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
          <div className="title">
            <h2>List of Episodes:</h2>
            <button >
              <ArrowDownCircleIcon className="icon" />
            </button>
          </div>
          <ul>
              {
                episodes.map((item,index)=>(
                <li key={item.id}>
                  <div>
                    {String(index+1).padStart(2,0)} {item.episode} <strong>{item.name}</strong>
                  </div>
                  <div className="badge badge--secondary">
                    {item.air_date}
                  </div>
                </li>))
              }
            </ul>
      </div>
    </div>
  )
}
