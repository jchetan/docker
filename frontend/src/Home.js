import { useState, useEffect } from 'react'

const Home = () => {

  useEffect(    
    () => {
      const fetchWorkouts = async () => {
        console.log("json");
        const response = await fetch('/api');
        const json = await response.json();
        if (response.ok) {          
          console.log(json);
        }
      }
      fetchWorkouts();
    },
    []
  );

  return (
    <div className='container'>

      Hello World Dear Chetan J!
    </div>
  )
}

export default Home