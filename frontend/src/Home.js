import { useState, useEffect } from 'react'

const Home = () => {

  const [keys, setKeys] = useState([]);

  useEffect(
    () => {
      const fetchKeys = async () => {
        const response = await fetch('/api/getkeys');
        const json = await response.json();
        if (response.ok) {
          setKeys(json.keys);
          console.log(json.keys);
        }
      }
      fetchKeys();
    },
    []
  );

  return (
    <div className='container'>
      Hello world!
      {keys && keys.map((key1) => {
        return (
          <div key={key1} className="row justify-content-center" >
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Key: {key1}</h5>                
              </div>
            </div>
          </div>
        )

      })}
    </div>
  )




}

export default Home