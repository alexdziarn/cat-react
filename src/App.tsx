import React, { useState, useEffect, FormEvent } from 'react';
import './App.css';

function App() {
  let [data, setData] = useState<Picture[]>([])

  interface Picture {
    id: string,
    url: string,
    width: number,
    height: number
  }

  function handleDelete(e: HandleDeleteElement) {
    e.preventDefault()
    setData(data.filter((d) => d.id !== e.target.id))
  }

  useEffect(() => {
    let ignore = false;
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then(res => res.json())
    .then((d: Picture[]) => {
      if(!ignore) {
        setData(d)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="App">
      <ul>
        {data.map((d) => {
          return (
            <ListItem id={d.id} url={d.url} handleDelete={handleDelete} />
          )
        })}
      </ul>
    </div>
  );
}

interface ListItemProps {
  id: string,
  url: string,
  handleDelete: (e: HandleDeleteElement) => void
}

type HandleDeleteElement = FormEvent<HTMLFormElement> & {target: {id: string}}

function ListItem({id, url, handleDelete}: ListItemProps) {
  return (<li className="m-2">
    <form className="flex items-center justify-center" id={id} onSubmit={handleDelete}>
      <img src={url} alt={id+"-cat"} className="w-20 h-20"/>
      <button className="ml-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Delete</button>
    </form>
  </li>)
}

export default App;
