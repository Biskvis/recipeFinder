import { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'


function App() {

  const [ recipes, setRecipes ] = useState([])
  const [ search, setSearch ] = useState('')

  function searchRecipe() {
    Axios.get(`https://api.edamam.com/search?q=${search}&app_id=${import.meta.env.VITE_APP_ID}&app_key=${import.meta.env.VITE_API_KEY}`)
      .then(response => setRecipes(response.data.hits))
      .catch(err => console.log(err))
  }
  
  const cards = recipes.map((item, index) => (
    <div key={index} className='border flex-shrink-0 w-80 h-96 hover:scale-110 m-2 overflow-hidden overflow-y-auto'>
      <label className='absolute bg-sky-500 text-white p-2 rounded-lg m-2 '>{item.recipe.dishType}</label>
      <img src={item.recipe.image} alt={item.recipe.label} className='w-full h-48 object-cover object-center rounded-t-lg' />
      <p className='text-center text-xl'>{item.recipe.label}</p>
      <p className='pl-2'>Ingredients:</p>
      <p className='text-xs '>

        {item.recipe.ingredientLines.map((ingredient, index) => (
          <span key={index} className="p-2">
            {ingredient}
          </span>
        ))}
        <a href={item.recipe.url} className='p-2 text-sky-500 hover:scale-110'>View Recipe</a>
      </p>
    </div>
  ));
  

  return (
    <>
      <div className='bg-sky-500 h-32 flex justify-center items-center m-2'>

        <h1 className='text-center font-bold text-white text-5xl'>Recipe finder</h1>
      </div>
      <div className='flex justify-center items-center'> 

        <div className='bg-white border w-9/12 h-24 m-20 flex justify-center items-center'>
          <input 
            placeholder='Search for a recipe..'
            className='bg-gray-200 w-9/12 h-10 p-2 rounded-xl border border-sky-500'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className='ml-4 bg-sky-500 p-2 rounded-xl text-white font-bold hover:bg-sky-600'
            onClick={() => searchRecipe(search)}
          >Search Recipe</button>
        </div>
      </div>
      <div className='flex  flex-wrap  justify-center items-center p-4'>
        {cards}
      </div>
    </>
  )
}

export default App
