import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SERVER_URL } from '../../config/config'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ScoreMember = (props) => {
  const [stats, setStats]= useState()
  const {classId }= useParams()
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
  return (
    <div className={"kaskalklfsaseawss"} style={{width: "100%"}}>
        <table className={"sakslakslkdlasasa"} cellSpacing={30}>
            <thead>
                <tr>
                    <th>Member</th>
                    <th>File attachment</th>
                    <th>Score (band 100)</th>
                </tr>
            </thead>
            <tbody>
                {
                    stats?.attachment?.map((item, key)=> <tr key={key} style={{borderBottom: "1px solid #e7e7e7"}}>
                    <td style={{textAlign: "center"}}>{item.account}</td>
                    <td style={{textAlign: "center", cursor: "pointer"}}>
                        <a href={item.urlAttachment} download>
                            <AttachFileIcon />
                        </a>
                    </td>
                    <td style={{textAlign: "center"}}>{parseInt(item.score) < 0 ? "Unset" : item.score}</td>
                    <td style={{textAlign: "center"}}>
                        <Link state={{urlAttachment: item.urlAttachment, account: item.account, idAssignment: stats.idAssignment}} style={{textDecoration: "none"}} to={`/c/${classId}/score/m/${item.userId}`}>
                            <Button variant={"contained"} color={"primary"}>Marking</Button>
                        </Link>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ScoreMember