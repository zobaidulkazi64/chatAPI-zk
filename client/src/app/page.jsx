'use server'

import io from 'socket.io-client';


 async function Home() {

  const socket = io('http://localhost:3311');

  socket.on('connect', () => {
    console.log('Connected to server');
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })
  return (
    <div>
      <h1>Home</h1>
      
    </div>
  )

}

export default Home