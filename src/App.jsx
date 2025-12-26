import NavBar from "./components/navbar"
import DashBoard from "./components/dashboard"
import Footer from "./components/footer"
import Login from "./login";
import { useState,useEffect } from "react";
import { supabase } from "../superBaseClient";

export default function app({ session, setSession }){
  // const [session,setSession]=useState(null)
  const [currUser,setCurrUser]=useState("")
  const [slots, setSlots] = useState([
        { id: 1, status: "" },
        { id: 2, status: "" },
        { id: 3, status: "" },
        { id: 4, status: "" }
      ]);
  const [freeParking,setFreeParking]=useState(0);
  async function fetchStatus() {
    try {
      console.log("api started");
      const {data,error}=await supabase.from("parking").select("id,status")
      // console.log(data);
      if(error){
        console.log("supabase error")
        return null
      }
      setSlots(data);   // store the API result
      setSlots(data.sort((a, b) => a.id - b.id));
      // console.log("slots:\n");
      // console.log(slots)
    } catch (err) {
      console.log("react  call failed");
    }
  }

  useEffect(() => {
    fetchStatus()
    console.log(slots)
  }, []);
  useEffect(() => {
  if (!slots || slots.length === 0) return;

  const occupiedCount = slots.filter(slot => slot.status === "o").length;
  setFreeParking(occupiedCount);
}, [slots]);

  useEffect(()=>{
    const channel=supabase.channel("parking-channel")
    .on("postgres_changes",{event:"UPDATE",schema:"public",table:"parking"},
      (payload)=>{
        setSlots((prev)=>
          prev.map((slot)=>
            slot.id===payload.new.id?{...slot,status:payload.new.status}:slot
          )
        )
      }
    ).subscribe();

    return ()=>{
      supabase.removeChannel(channel);
    }
  })

  // useEffect(() => {
  //   fetchStatus();  // first call immediately

  //   const interval = setInterval(() => {
  //     fetchStatus();    // call every 3 sec
  //   }, 3000);

  //   return () => clearInterval(interval);  // cleanup when component unmounts
  // }, []);
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

  // useEffect(() => {
  //   // Fetch the current session on component mount
  //   async function fetchSession(){
  //     const {data,error}=await supabase.auth.getSession()
  //     console.log(data)
  //     setSession(data.session)
  //   }

  //   fetchSession();

  //   // Listen for auth state changes (login/logout)
  //   const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //     console.log("Auth state changed:", session);
  //   });

  //   // Cleanup the listener on component unmount
  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);


  useEffect(()=>{
          if(!session)
              return;
      async function getName() {
        const {data:user,error}=await supabase.auth.getUser()
        console.log("email:",user.user.email)
        const {data}=await supabase.from("userDet").select("name").eq("email",user.user.email).single()
        console.log(data.name)
        setCurrUser(data.name)
      }
      getName()
    },[session])


  return (
  session ?  (
    <div className="mainContainer">
      <NavBar logOutStaus={(currSession)=>setSession(currSession)}/>
      <DashBoard slots={slots} availableParking={freeParking} greeting={currUser} />
      <Footer />
    </div>
  ):
  (
    <Login
  currStatus={(currSession, currname) => {
    setSession(currSession);
    setCurrUser(currname);
  }}
/>

  ) 
)

}