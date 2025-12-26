    import { useState } from "react"
    import { supabase } from "../superBaseClient"

    export default function Login({currStatus}){
        const [email,setEmail]=useState("")
        const [password,setPassword]=useState("")
        function handleEmail(e){
            setEmail(e.target.value)
        }

        function handlePassword(e){
            setPassword(e.target.value)
        }

        async function handleSubmit(){
            try{
                const {data,error}=await supabase.auth.signInWithPassword({email:email,password:password})
                if(error){
                    console.log("Sign in failed")
                }
                else{
                    console.log(data)
                    console.log(data.user.email)
                    console.log("sign in successfull")
                    const {data:name}=await supabase.from("userDet").select("name").eq("email",data.user.email).single()
                    console.log(name.name)
                    currStatus(data.session,name.name)
                }
            }
            catch(error){
                console.log("Submit Failed")
            }
        }

        return <div className="page">
            {/* <h1>Smart Park</h1> */}
            <div className="loginContainer">
                <div className="loginHeading"><h1>Login</h1></div>
                <div className="loginLabel"><label htmlFor="email" >Enter Email :</label></div>
                <input type="text" onChange={handleEmail} value={email} placeholder="Enter Email" />
                <div className="loginLabel"><label htmlFor="email">Enter Password :</label></div>
                <input type="password" placeholder="Enter Password" value={password} onChange={handlePassword}/>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    }