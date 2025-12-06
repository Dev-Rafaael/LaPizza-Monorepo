import React from 'react'

import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
  //  const logout = ()=>{

  //   //  signOut()
  //   //  if(!currentUser?.isLogged ){
  //   //   alert('Saindo')
  //   //   navigate('/Login')
  //   //  }
  // }
  return (
    <div>
      <h1>Deus é Fiel</h1>
      <button >Clicar</button>
    </div>
  )
}

export default Home
