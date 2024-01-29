'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { isAuthenticated } from "@/utils/authUtils";


async function getUserData() {
  const res = await fetch(`http://localhost:3311/api/user`, {
    cache: "no-store",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    
  });
  // console.log(res.json())

  if (!res.ok) {
    throw new Error("Failed to fetch data");

  }

  // return res.json();

  
}


function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {


    if(isAuthenticated){
      router.push('/dashboard');
      return;
    }

    if (!isAuthenticated()) {
      router.push('/login');
      return;
     
    }
    const fetchData = async () => {
      try {
        // Assuming you have the user ID, replace '123' with the actual ID
        const result = await getUserData();
        setUserData(result);
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    };

    if(!localStorage.getItem('token')){
      router.push('/login');
      return;
    }

    fetchData();
    // console.log(userData)
  }, [userData]);

  return (
    <div>
      <div className="text-3xl flex gap-5 mt-4 bg-emerald-300 p-3 text-fuchsia-500 font-bold">
        <div className="text-3xl flex gap-5 mt-4 bg-emerald-300 p-3 text-fuchsia-500 font-bold">
          <Link href="/">Home</Link>
          <Link href="/dashboard/profile">Profile</Link>
          <Link href="/dashboard/status">Status</Link>
        </div>
      </div>
      <h1>Welcome</h1>
      {userData && <p>{userData.userId}</p>
      
      
      }
      {userData && <p>{userData.email}</p>}
    </div>
  );
}

export default DashboardPage;
