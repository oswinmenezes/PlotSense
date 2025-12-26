import NavBar from "./navbar"
import Vission from "./vission"
import Footer from "./footer"
import Login from "../login"

export default function About({ session, setSession }){
    return session?<div>
        <NavBar logOutStaus={(currSession)=>setSession(currSession)}/>
        {/* <h1 className="aboutUsHeader">About Us</h1> */}
        <Vission />
        <Footer />
    </div>:<Login />
}