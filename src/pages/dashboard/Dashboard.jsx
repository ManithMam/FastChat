import React from 'react'
import app from '../../firebase'

const Dashboard = () => {
  return (
    <button onClick={() => app.auth().signOut()}>LogOut</button>
  )
}

export default Dashboard