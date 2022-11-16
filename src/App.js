import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import DetailClass from './Component/DetailClass'
import Home from './Component/Home'
import Login from './Component/Login'
import Signup from './Component/Signup'
import { SERVER_URL } from './config/config'
import Cookies from 'js-cookie'
import JoinClassComponent from './Component/JoinClassComponent/JoinClassComponent'

export const AppContext= createContext()
const App = () => {
  const [user, setUser]= useState()
  const [login, setLogin]= useState(undefined)
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: `${SERVER_URL}/`,
        data: {
          userId: Cookies.get("uid")
        },
        method: "post"
      })
      const result= await res.data
      setUser(result.result)
      if(result.result  ) {
        setLogin(()=> true)
      }
      else {
        setLogin(()=> false)
      }
    })()
  }, [])
  return (
    <AppContext.Provider value={{...user, user}}>
      <Router>
        <Routes>
          {
            login=== true && 
            <>
              <Route path={"/"} element={<Home user={user} />} />
              <Route path={"/c/:classId/*"} element={<DetailClass />} />
              <Route path={"/login"} element={<Navigate to={"/"} />} />
              <Route path={"/signup"} element={<Navigate to={"/"} />} />
              <Route path={"/j/:idJoin"} element={<JoinClassComponent />} />
            </>
          }
          {
            login=== false && 
            <>
              <Route path={"/"} element={<Navigate to={"/login"} />} />
              <Route path={"/c/:classId/*"} element={<Navigate to={"/login"} />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/j/:idJoin"} element={<Navigate to={"/login"} />} />
            </>
          }
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App