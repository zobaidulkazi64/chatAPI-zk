import React from 'react'
import Link from 'next/link'

function Profile() {
  return (
    <div>
        <div>
            <nav className='text-3xl bg-purple-200  flex justify-around text-emerald-500 font-bold  p-4'>
          
            <Link href="dashboard/profile/users" >Update Profile</Link>
            <Link href="/dashboard/status" >Remove </Link>
            </nav>
        </div>
        <div>
            <h1 className='text-3xl text-center'>User Info</h1>
        </div>
    </div>
  )
}

export default Profile