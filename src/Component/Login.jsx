import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { SERVER_URL } from '../config/config'

const Login = (props) => {
  return (
    <div className={"lakskaljiejaiwawaw"} style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center", minHeight: "90vh"}}>
        <Box style={{width: "100%", maxWidth: 600}}>
            <div style={{width: "100%", height: 60, display: "flex", justifyContent: 'center', alignItems: "center", background: "orange"}}>
                <p className={"fjlajskjdkjiawaw"} style={{fontWeight: 600, fontSize: 18, color: "#fff", textTransform: "uppercase"}}>QM - ENGLISH</p>
            </div>
            <MainLogin />
        </Box>
    </div>
  )
}

const MainLogin= (props)=> {
    const [account, setAccount]= useState(()=> "")
    const [password, setPassword]= useState(()=> "")

    const login= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/login`,
            method: "post",
            data: {
                account, password
            }
        })  
        const result= await res.data
        console.log(result)
        if(result.login=== true) {
            Cookies.set("uid", result.userId)
            window.location.reload()
        }
    }

    return (
        <div className={"kskasjrioejsklasa"} style={{width: "100%", padding: 20, background: "#d9d9d9"}}>
            <Box style={{width: "100%", background: "#fff", overflow: "hidden"}}>
                <TextField onChange={(e)=> setAccount(e.target.value)} type={"text"} style={{width: "100%", outlineColor: "#2e89ff"}} placeholder={"Username"} />
            </Box>
            <br />
            <Box style={{width: "100%", background: "#fff"}}>
                <TextField onChange={(e)=> setPassword(e.target.value)} type={"password"} style={{width: "100%", outlineColor: "#2e89ff"}} placeholder={"Password"} />
            </Box>
            <br />
            <div className={'vkdjdkjsklajskfrw'} style={{width: "100%"}}>
                <Box className={"dskakslkaslaks"} style={{width: "100%",}}>
                    <Button onClick={login} variant={"contained"} color={"warning"} style={{height: 40, width: "100%", fontWeight: 600}}>Sign in</Button>
                </Box>
            </div>
        </div>
    )
}


export default Login