import Login from "../login";
import NavBar from "./navbar";
import { setColor } from "./dashboard";
import Footer from "./footer";
import { useState,useEffect } from "react";
import { supabase } from "../../superBaseClient";

export default function DisplayParkingStatus({ session, setSession }) {
    const [slots, setSlots] = useState([
      { id: 1, status: "" },
      { id: 2, status: "" },
      { id: 3, status: "" },
      { id: 4, status: "" }
    ]);
     
      async function fetchStatus() {
          try {
            console.log("fetching data from supabase");
            const {data,error}=await supabase.from("parking").select("id,status")
            
            console.log(data);
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
    
    
      // useEffect(() => {
      //   fetchStatus();  // first call immediately
    
      //   const interval = setInterval(() => {
      //     fetchStatus();    // call every 3 sec
      //   }, 3000);
    
      //   return () => clearInterval(interval);  // cleanup when component unmounts
      // }, []);

      useEffect(() => {
        fetchStatus();  // first call immediately
      }, []);

  useEffect(() => {
  const channel = supabase
    .channel("parking-channel")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "parking" },
      (payload) => {
        setSlots((prev) =>
          prev.map((slot) =>
            slot.id === payload.new.id ? { ...slot, status: payload.new.status } : slot
          )
        );
      }
    )
    .subscribe();

  // Cleanup when component unmounts
  return () => {
    supabase.removeChannel(channel);
  };
}, []);



    return (session?
      <div>
    <NavBar logOutStaus={(currSession)=>setSession(currSession)}/> 
    {slots[0].status === "" ? (
      <h1>Loading Parking Status Please Wait...</h1>
    ) : (
      <>
        <div className="allParkings">
          <div className="parkingSlot1 slot" style={{ backgroundColor: setColor(slots[0].status) }}>
            <h3 className='slotName'>Slot-1</h3>
          </div>
          <div className="parkingSlot2 slot" style={{ backgroundColor: setColor(slots[1].status) }}>
            <h3 className='slotName'>Slot-2</h3>
          </div>
          <div className="parkingSlot3 slot" style={{ backgroundColor: setColor(slots[2].status) }}>
            <h3 className='slotName'>Slot-3</h3>
          </div>
          <div className="parkingSlot4 slot" style={{ backgroundColor: setColor(slots[3].status) }}>
            <h3 className='slotName'>Slot-4</h3>
          </div>
        </div>
      </>
    )}
    <div className="parkingFooter"><Footer /></div>
  </div>:<Login />
);
}