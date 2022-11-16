import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { SERVER_URL } from '../../config/config'
import GoogleDocsViewer from "react-google-docs-viewer"
import { Button } from '@mui/material'

const Marking = (props) => {
    const [stats, setStats]= useState()
    const [score, setScore]= useState()
    const {classId, userId }= useParams()
    useEffect(()=> {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/stats`,
                method: "post",
                data: {
                    classId
                }
            })
            const result= await res.data
            setStats(result.result)
        })()
    }, [classId])
    const location= useLocation()

    const marking= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/marking/c/member`,
            method: "post",
            data: {
                classId,
                userId,
                idAssignment: location.state.idAssignment,
                score
            }
        })
        const result= await res.data
        console.log(result)
    }
    if(location) {
        return (
        <div style={{width:" 100%", marginTop: 12}}>
            <div className={"dsskalskalskea"} style={{width: "100%", display: "flex", justifyContent: 'center', }}>
                <div className={"dklkalskaprjasas"} style={{flex: "1 1 0"}}>
                    <GoogleDocsViewer
                        width="100%"
                        height="780px"
                        fileUrl={location.state.urlAttachment}
                    />
                </div>
                <div className={"askasjeaiwjkaskl"} style={{width: 350, padding: 10}}>
                    <div style={{fontWeight: 600, marginBottom: 12}}>Member: {location.state.account}</div>
                    <br />
                    <div className={"kalsklakssaassasa"} style={{display: "flex", alignItems: "center",}}>
                        <div style={{fontSize: 18}}>Score: &nbsp;&nbsp;</div>
                        <input onChange={(e)=> setScore(e.target.value)} type="text" style={{width: 24, height :24, outlineColor: "#2e89ff", appearance: "none"}} />
                        <div>&nbsp;/ 100</div>
                    </div>
                    <br />
                    <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
                        <Button onClick={marking} disabled={parseInt(score) >= 0 ? false : true} variant={"contained"} color={"primary"}>Confirm</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}


export default Marking