import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import { AppContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { DetailClassContext } from '../DetailClass';

const News = (props) => {
  const {teacher}= useContext(DetailClassContext)
  const {userId}= useContext(AppContext)
  const [data, setData]= useState(()=> [])
  return (
    <>
      <div className={"dkasajksjkjaskass"} style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 12}}>
        <div className={"dksajskjejwjaiowsa"} style={{width: "100%", maxWidth: 1200}}>
          <div className={"sjksjaksjakwawaws"} style={{width: "100%", padding: 10, borderRadius: 5, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", margin: "10px 0"}}>
            <div className={"shhakjshjakshjakhea"} style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>
              {props.className}
            </div>
            <div className={"djsaklsjkajaksasas"}>
              {props.desc}
            </div>
          </div>
            {
                teacher=== userId && <Post setData={setData} data={data} />
            }
            <ListAssignMent data={data} setData={setData} />
        </div>  
      </div>
    </>
  )
}

const Post= (props)=> {
    const [covert, setConvert]= useState(()=> false)
    const [description, setDescription]= useState(()=> "")

    return (
        <>
            {
                covert=== false &&
                <div onClick={()=> setConvert(()=> true)} className={"sjkjkasjasjasassa"} style={{width: "100%", height: 60, margin: "10px 0", borderRadius: 5, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", alignItems: "center", padding: 10, background: "#fff", gap: 20, cursor: "pointer"}}>
                    <div className={"jjskajkajsasksassa"} style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}}>
                        <AddIcon style={{color: "#3a3b3c"}} />
                    </div>
                    <div className={"daaksaskjkajsksasa"}>
                        Post assignment
                    </div>
                </div>
            }
            {
                covert=== true &&
                <div className={"sjkjkasjasjasassa"} style={{width: "100%", height: "auto", margin: "10px 0", borderRadius: 5, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: 10, background: "#fff", gap: 20}}>
                    <textarea onChange={e=> setDescription(e.target.value)} className={"sdjkskasjkjasassa"} style={{width: "100%", height: 200, resize: "none", fontSize: 16, padding: 10, outlineColor: "#2e89ff"}} placeholder={"Post assignment"} rows={40}></textarea>
                    <UploadExercise setData={props.setData} description={description} setConvert={setConvert} />
                </div>
            }
        </>
    )
}

const UploadExercise= (props)=> {
    const [file, setFile]= useState(()=> undefined)
    const {userId, account }= useContext(AppContext)
    const {classId }= useParams()
    const isChoseFile= file ? true : false
    const getFile= (e)=> {
        setFile(e.target.files[0])
    }

    const post_assignment= async ()=> {
        const formData= new FormData()
        formData.append("data", (JSON.stringify({authorId: userId, classId, description: props.description, authorName: account})))
        formData.append("attach_file", file)
        const res= await axios({
            url: `${SERVER_URL}/post/assignment`,
            method: "post",
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
        const result= await res.data
        if(result.post=== true) {
            props.setData(prev=> ([...prev, result]))
            props.setConvert(()=> false)
        }

    }
    return (
        <div className={"djksjaksjaksjassa "} style={{padding: "10px 0 ", display: "flex",alignItems: "center", width: "100%"}}>
            {
                isChoseFile=== false &&
                <div className={"askkaslakslassa"} style={{width: "100%", display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <div className={"jaksjaksjkasjassa fmdkaskajskassaas"} style={{width: 40, height: 40, display: "flex", justifyContent: 'center', alignItems: "center", borderRadius: "50%", cursor: "pointer", border: "1px solid #e7e7e7", position: "relative"}}>
                        <UploadIcon style={{color: "#3a3b3c"}} />
                        <input onChange={getFile} title={"Choose file"} type={"file"} style={{width: "100%", height: "100%", opacity: 0, cursor: "pointer", top: 0, left: 0, position: "absolute", zIndex: 12}} />
                    </div>
                    <div className={"aksaksjaksjaksssa"} style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                        <Button onClick={()=> props.setConvert(()=> false)} variant={"outlined"} style={{fontWeight: 600}}>Cancel</Button>
                        <Button variant={"contained"} color={"primary"} style={{fontWeight: 600}}>Post</Button>
                    </div>
                </div>
            }
            {
                isChoseFile=== true &&
                <div style={{width: "100%"}}>
                    <div className={"aksjaksjkasjasa"} style={{width: "100%", height:60, padding: 10, border: "1px solid #e7e7e7", borderRadius: "1px solid #e7e7e7", display: "flex", alignItems: "center", justifyContent: 'space-between',}}>
                        <div className={"skaskakassaassss"} style={{fontSize: 20, fontWeight: 600, color: "#3a3b3c"}}>
                            {file.name}
                        </div>
                        <div title={"Delete"} onClick={()=> setFile(()=> undefined)} className={"sjkasjsasajkjksawioaw"}  style={{width: 40, height: 40, display: "flex", justifyContent: 'center', alignItems: "center", borderRadius: "50%", cursor: "pointer", border: "1px solid #e7e7e7", position: "relative"}}>
                            <DeleteIcon style={{color: "#3a3b3c"}} />
                        </div>
                    </div>
                    <br />
                    <div className={"askkaslakslassa"} style={{width: "100%", display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                        <div className={"jaksjaksjkasjassa fmdkaskajskassaas"}>
                         
                        </div>
                        <div className={"aksaksjaksjaksssa"} style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                            <Button onClick={()=> props.setConvert(()=> false)} variant={"outlined"} style={{fontWeight: 600}}>Cancel</Button>
                            <Button onClick={post_assignment} variant={"contained"} color={"primary"} style={{fontWeight: 600}}>Post</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const ListAssignMent= (props)=> {
    const {classId }= useParams()
    useEffect(()=> {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/list/assignment`,
                method: "get",
                params: {
                    classId
                }
            })
            const result= await res.data
            props.setData(()=> result.result)
        })()
    }, [classId])
    return (
        <div className={"aksajskjfjaawasads"} style={{width: "100%", padding: "10px 0"}}> 
            {
                props?.data?.length <= 0 && <div style={{textAlign: "center"}}>Nothing was delivered</div>
            }
            {
                props?.data?.length > 0 && props?.data?.map((item, key)=> <ItemAssignMent key={key} setData={props.setData} data={props.data} {...item} />)
            }
        </div>
    )
}

const ItemAssignMent= (props)=> {
    const {userId }= useContext(AppContext)
    const {classId }= useParams()
    const deleteAssignMent= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/list/assignment/delete`,
            method: "post",
            data: {
                idAssignment: props.idAssignment,
                classId
            }
        })
        const result= await res.data
        props.setData(props.data?.filter(item=> item.idAssignment !== props.idAssignment))
        return console.log(result)
    }

    return (
        <>
            <div className={"djklasjaksjkasjaaaw"} style={{width: "100%", padding: "10px", border: "1px solid #e7e7e7", borderRadius: 5, display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                <div>
                    {
                        <Link to={`/c/${classId}/a/${props.idAssignment}`} style={{textDecoration: "none", color: "unset"}}>
                            <div className={"asjkasjkajdskas"} style={{fontWeight: 600, marginBottom: 12}}>
                                {props.authorName} post a new assignment: {props.description}
                            </div>
                        </Link>
                    }
                    {
                        <div>
                            {moment(props.time_created).format("HH:mm")}
                        </div>
                    }
                </div>
                {
                    props.authorId === userId && <div onClick={deleteAssignMent} title={"Delete assignment"} className={"ajksjakdjsksjskassaas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <DeleteIcon style={{color: "#3a3b3c", cursor: "pointer"}} />
                    </div>
                }
            </div>
            <br />
        </>
    )
}

export default News