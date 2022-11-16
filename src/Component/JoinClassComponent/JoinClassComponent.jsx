import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../App'
import { SERVER_URL } from '../../config/config'

const JoinClassComponent = (props) => {
  const {idJoin}= useParams()
  const [join, setJoin]= useState(undefined)
  const {userId, account}= useContext(AppContext)
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/join`,
            method: "post",
            data: {
                idJoin, userId, account
            }
        })
        const result= await res.data
        if(result.join=== true) {
            window.location.href= window.location.origin+ "/c/"+ result.classId+ "/"
        }
        else {
            setJoin(()=> false)
        }
    })()
  })
  return (
    <div className={"jjaksjkfjieojasass"} style={{width: "100%", height: "100%"}}>
        {
            join=== false && <div>Code join is invalid.</div>
        }
    </div>
  )
}

export default JoinClassComponent