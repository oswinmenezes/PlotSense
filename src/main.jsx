import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import About from './components/about.jsx';
import Login from './login.jsx';
import DisplayParkingStatus from './components/Parking.jsx'
import { useEffect } from 'react';
import { supabase } from '../superBaseClient.js';


function Root(){
  const [session,setSession]=useState(null)
  // useEffect(()=>{
  //   async function getName() {
  //     const {data:user,error}=await supabase.auth.getUser()
  //     console.log("email:",user.user.email)
  //     const {data}=await supabase.from("userDet").select("name").eq("email",user.user.email).single()
  //     console.log(data.name)
  //     setCurrUser(data.name)
  //   }
  //   getName()
  // },[])

  useEffect(() => {
    // Fetch the current session on component mount
    async function fetchSession(){
      const {data,error}=await supabase.auth.getSession()
      console.log(data)
      setSession(data.session)
    }

    fetchSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Auth state changed:", session);
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  
    const router=createBrowserRouter([
    {
      path:"/",
      element:<App session={session} setSession={setSession}/>
    },
    {
      path:"/about",
      element:<About session={session} setSession={setSession}/>
    },
    {
      path:"/parking",
      element:<DisplayParkingStatus session={session} setSession={setSession}/>
    },

    ])
    return <RouterProvider router={router} />

}







createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Root />
  </StrictMode>,
)
