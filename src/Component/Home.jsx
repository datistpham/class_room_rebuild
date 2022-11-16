import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OutsideClickHandler from 'react-outside-click-handler';
import { NavLink } from 'react-router-dom';
import ItemClass from './ComponentHome/ItemClass';
import Cookies from 'js-cookie';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../config/config';
import { AppContext } from '../App';

const Home = (props) => {
  return (
    <div className={"fjjdaksjaksjaeaww"} style={{width: "100%"}}>
        <Header user={props.user} />
        <ListClass user={props.user} />
    </div>
  )
}

const Header= (props)=> {
    const {user}= useContext(AppContext)

    return (
        <>
            <div className={"dkjakwjaijioaweeaw"} style={{width: "100%", height: 60, padding: 10, display: "flex", justifyContent: 'space-between', alignItems: "center", position: "fixed", top: 0, left: 0, zIndex: 999, borderBottom: "1px solid #e7e7e7"}}>
                <Logo />
                <User user={user} />
            </div>
            {/* do not something */}
            <div className={"fjdjsjaskjldseawwa"} style={{width: "100%", height: 60}}>

            </div>
        </>
    )
}

const Logo= (props)=> {
    return (
        <div className={"kjakjsakwjawjawaw"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <NavLink to={"/"} className={({isActive})=> isActive ? "fsdjksassaasasfs" : "djakshjakshjkfhjaw"} style={{textDecoration: "none", color: "#3a3b3c"}}>
                <div className={"dklsaksjdksjasasas"} style={{fontSize: 18, fontWeight: 600, textTransform: "uppercase"}}>
                    QM - English
                </div>
            </NavLink>
        </div>
    )
}

const User= (props)=> {
    
    return (
        <div className={"dkjakjjeawjawkaawk"} style={{display: "flex", justifyContent: 'center', alignItems: "center", gap: 16}}>
            <AddClassRoom user={props.user} />
            <ProfileUser user={props.user} />
        </div>
    )
}

const AddClassRoom= (props)=> {
    const [open, setOpen]= useState(()=> false)

    return (
        <OutsideClickHandler onOutsideClick={()=> setOpen(()=> false)}>
            <div title={"Create or join a class room"} className={"fmdkaskajskassaas"} style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", position: "relative"}}>
                <div onClick={()=> setOpen(prev=> !prev)} className={"djasjaksjakdwaa"} style={{width: "100%", height: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
                    <AddIcon style={{color: "#3a3b3c", cursor: "pointer"}} />
                </div>
                {
                    open=== true && <OptionAddClassRoom user={props.user} />
                }
            </div>
        </OutsideClickHandler>
    )
}

export const ProfileUser= (props)=> {
    const [open, setOpen]= useState(()=> false)
    const {user}= useContext(AppContext)

    return (
        <OutsideClickHandler onOutsideClick={()=> setOpen(()=> false)}>
            <div className={"fmdkaskajskassaas"} style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", position: "relative"}}>
                <div onClick={()=> setOpen(prev=> !prev)} className={"djasjaksjakdwaa"} style={{width: "100%", height: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
                    <AccountCircleIcon style={{color: "#3a3b3c", cursor: "pointer"}} />
                </div>
                {
                    open=== true && <OptionProfileUser user={user} />
                }
            </div>
        </OutsideClickHandler>
    )
}

const OptionAddClassRoom= (props)=> {
    const [open, setOpen]= useState(()=> false)
    const createClass= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/create/class`,
            method: "post", 
            data: {
                className, description, userId: props.user.userId, account: props.user.account
            }
        })
        const result= await res.data
        if(result.class_create=== true) {
            window.location.href= window.location.origin+ "/c/"+result.classId
        }
    }
    const [className, setClassName]= useState(()=> "")
    const [description, setDescription]= useState(()=> "")

    return (
        <div className={"jsdjakjskajeawwaaww"} style={{padding: 10, borderRadius: 8, position: "absolute", right: 0, top: 0, marginTop: 40, width: "max-content", background: "#fff", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Join a class</div>
            <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>
                <div onClick={()=> setOpen(prev=> !prev)} className={"ajskajskjssaas"} style={{height: "100%", display: "flex", alignItems: 'center'}}>Create a class</div>
                {
                    open=== true &&
                    <div style={{position: "fixed", width: "100%", height: "100%", top: 0, left: 0, background: "rgba(0,0,0,0.3", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <OutsideClickHandler onOutsideClick={()=> setOpen(()=> false)}>
                            <div style={{width: 600, padding: 10, background: "#fff"}}>
                                <DialogTitle>Create class room</DialogTitle>
                                <Box>
                                    <div style={{width: "100%"}}>
                                        <TextField onChange={e=> setClassName(e.target.value)} style={{width: "100%"}} placeholder={"Class name (required)"} />
                                    </div>
                                    <br />
                                    <div style={{width: "100%"}}>
                                        <TextField onChange={e=> setDescription(e.target.value)} style={{width: "100%"}} placeholder={"Description"} />
                                    </div>
                                    <br />
                                    <div className={"akskaslasklsasaas"} style={{display: "flex", justifyContent: "end", width: "100%", alignItems: "center", gap: 16}}>
                                        <Button onClick={()=> setOpen(()=> false)} variant={"outlined"} style={{fontWeight: 600, fontSize: 14}}>Cancel</Button>
                                        <Button onClick={createClass} variant={"contained"} color={"primary"} style={{fontWeight: 600, fontSize: 14}}>Create</Button>
                                    </div>
                                </Box>
                            </div>
                        </OutsideClickHandler>
                    </div>
                }
            </div>
        </div>
    )
}

export const OptionProfileUser= (props)=> {
    const logout= ()=> {
        Cookies.remove("uid")
        window.location.reload()
    }
    return (
        <div className={"jsdjakjskajeawwaaww"} style={{padding: 10, borderRadius: 8, position: "absolute", right: 0, top: 0, marginTop: 40, width: "max-content", background: "#fff", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>{props.user.account}</div>
            <div onClick={logout} className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Đăng xuất</div>
        </div>
    )
}

const ListClass= (props)=> {
    const [classUser, setClassUser]= useState(()=> [1])
    const {userId }= useContext(AppContext)
    useEffect(()=> {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/class/user`,
                method: "get", 
                params: {
                    userId
                }
            })
            const result= await res.data
            setClassUser(()=> result.result)
        })()
    }, [userId])
    return (
        <div className={"djsajsjaklsjasas"} style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: 16}}>
            {
                classUser.length <= 0 && <div style={{textAlign: "center", width: "100%"}}>You've not joined any class yet.</div>
            }
            {
                classUser.length > 0 && <>
                    {
                        classUser?.map((item, key)=> <ItemClass classUser={classUser} setClassUser={setClassUser} key={key} classId={item.classId} teacherId={item.teacher} width={"25%"} className={item.className} desc={item.description} authorName={item?.account} linkJoin={item.linkJoin} />)
                    }
                </>
            }
        </div>
    )
}

export default Home