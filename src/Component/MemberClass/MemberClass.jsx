import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL } from '../../config/config'

const MemberClass = (props) => {
  const [member, setMember]= useState(()=> [])
  const {classId }= useParams()
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/class/member`,
            method: "get",
            params: {
                classId
            }
        })
        const result= await res.data
        setMember(result.result)
    })()
  }, [classId])
  return (
    <div className={"aksakslkalskafs"} style={{width: "100%", marginTop: 12, display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div className={"askaskldfklaawaws"} style={{width: "100%", maxWidth: 960}}>
            <Title title={"Teacher"} />
            <ItemMember userName={member?.account} />
            <br />
            <Title title={"Student"} />
            {
                member?.detailMember?.map((item, key)=> <ItemMember userName={item?.account} />)
            }
        </div>  
    </div>
  )
}


const Title= (props)=> {
    return (
        <div className={"saaskasklaskasas"} style={{width: "100%", padding: "20px 10px", fontSize: 24, fontWeight :600, borderBottom: "1px solid #e7e7e7"}}>
            {props.title}
        </div>
    )
}

const ItemMember= (props)=> {
    return (
        <div className={"akskaslkalassassa"} style={{width: "100%", padding: "20px 10px", borderBottom: "1px solid #e7e7e7"}}>
            {props.userName}
        </div>
    )
}

export default MemberClass