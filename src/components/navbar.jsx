import { NavLink } from "react-router-dom"
import { supabase } from "../../superBaseClient"
export default function NavBar({logOutStaus}){

    async function handleLogout(){
        try{
            const {data,error}=await supabase.auth.signOut()
            if(error){
                console.log("supabase sign out fail")
            }
            else{
                console.log("sign out successfull")
                logOutStaus(null)
            }
        }
        catch(error){
            console.log("signout req failed")
        }
    }

    
    return <nav className="navContainer">
        <h1 className="siteName">PlotSense</h1>
        <ul className="options">
  <li>
    <NavLink 
      to="/" 
      className={({ isActive }) => isActive ? "activeLink" : ""}
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/about" 
      className={({ isActive }) => isActive ? "activeLink" : ""}
    >
      About Us
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/parking" 
      className={({ isActive }) => isActive ? "activeLink" : ""}
    >
      Parking
    </NavLink>
  </li>
</ul>

        <div className="logOutContainer"><button className="logOutBtn" onClick={handleLogout}>Log-Out</button></div>
        </nav>
}