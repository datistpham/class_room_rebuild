import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { SERVER_URL } from '../config/config'
import Header from './DetailClassComponent/Header'
import News from './DetailClassComponent/News'
import Marking from './Marking/Marking'
import MemberClass from './MemberClass/MemberClass'
import ScoreMember from './ScoreMember/ScoreMember'
import SummitAssignment from './SummitAssignment/SummitAssignment'

export const DetailClassContext= createContext()
const DetailClass = (props) => {
  const { classId }= useParams()
  const [classData, setClassData]= useState(undefined)
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: `${SERVER_URL}/get/class`,
        method: "post",
        data: {
          classId
        }
      })
      const result= await res.data
      setClassData(()=> result.result)
    })()
  }, [classId])
  return (
    <DetailClassContext.Provider value={{...classData}}>
      <Header className={classData?.className} desc={classData?.description} />
      <Routes>
        <Route path={"/"} element={<News className={classData?.className} desc={classData?.description} />} />
        <Route path={"/members"} element={<MemberClass />} />
        <Route path={"/score"} element={<ScoreMember />} />
        <Route path={"/a/:idAssignment"} element={<SummitAssignment {...classData} />} />
        <Route path={"/score/m/:userId"} element={<Marking />} />
      </Routes>
    </DetailClassContext.Provider>
  )
}

export default DetailClass