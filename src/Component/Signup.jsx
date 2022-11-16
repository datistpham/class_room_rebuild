import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../config/config'

const Signup = (props) => {
  return (
    <div className={"lakskaljiejaiwawaw"} style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center", minHeight: "90vh"}}>
        <Box style={{width: "100%", maxWidth: 600}}>
            <div style={{width: "100%", height: 60, display: "flex", justifyContent: 'center', alignItems: "center", background: "orange"}}>
                <p className={"fjlajskjdkjiawaw"} style={{fontWeight: 600, fontSize: 18, color: "#fff", textTransform: "uppercase"}}>QM - ENGLISH</p>
            </div>
            <MainSignup />
        </Box>
    </div>
  )
}

const MainSignup= (props)=> {
    const [account, setAccount]= useState(()=> "")
    const [password, setPassword]= useState(()=> "")
    const navigate= useNavigate()

    const signup= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/signup`,
            method: "post",
            data: {
                account, password
            }
        })
        const result= await res.data
        console.log(result)
        navigate("/login")
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
            <Box style={{width: "100%", background: "#fff"}}>
                <TextField onChange={(e)=> setPassword(e.target.value)} type={"password"} style={{width: "100%", outlineColor: "#2e89ff"}} placeholder={"Confirm password"} />
            </Box>
            <br />
            <div className={'vkdjdkjsklajskfrw'} style={{width: "100%"}}>
                <Box className={"dskakslkaslaks"} style={{width: "100%",}}>
                    <Button onClick={signup} variant={"contained"} color={"warning"} style={{height: 40, width: "100%", fontWeight: 600}}>Sign up</Button>
                </Box>
            </div>
        </div>
    )
}


export default Signup