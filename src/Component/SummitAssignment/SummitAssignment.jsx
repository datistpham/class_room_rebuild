import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { SERVER_URL } from '../../config/config'
import { useParams } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { AppContext } from '../../App';
import { Button } from '@mui/material';


const SummitAssignment = (props) => {
    const [assignment, setAssignment]= useState()
    const {idAssignment}= useParams()
    useEffect(()=> {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/a`,
                method: "get", 
                params: {
                    idAssignment
                }
            })
            const result= await res.data    
            setAssignment(()=> result.result)
        })()
    }, [idAssignment])
  return (
    <div className={"saksjdkjfkjaaksasa"} style={{width: "100%", marginTop: 12, display: "flex", justifyContent: 'center', alignItems: 'center',}}>
        <div className={"sjdkjaskjdfkjasassaw"} style={{width: "100%", maxWidth: 960}}>
            <Title title={props.className} />
            <AuthorName authorName={props.account} time_created={props.time_created} />
            <AttachMent uri={assignment?.urlAttachment} {...assignment  } />
            <UserSubmitAssignment />
        </div>
    </div>
  )
}

const Title= (props)=> {
    return (
        <div className={"skkjfowajsjoaswawa"} style={{fontSize: 24, fontWeight: 600, marginBottom: 12}}>
            {props.title}
        </div>
    )
}

const AuthorName= (props)=> {
    return (
        <div className={"sajksjfkjdkjsaskaew"} style={{display: "flex", alignItems: 'center', padding: "5px 0"}}>
            <div>{props.authorName}</div>&nbsp;-&nbsp; 
            <div>{moment(props.time_created).format("DD/MM/YYYY HH:mm:ss")}</div>
        </div>
    )
}

const AttachMent= (props)=> {
    if(props.uri) {
        return (
            <div className={"kakslfdkfsjkssakwwa"} style={{width: "100%", padding: "20px 0", borderTop: "1px solid #e7e7e7", borderBottom: "1px solid #e7e7e7", display: "flex", alignItems: "center", gap: 30}} >
                <div>{props.description}</div>
                <div style={{display: "flex", justifyContent: 'center', alignItems: "center", gap: 10}}>
                    <div>{props.nameAssignment}</div>
                    <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} title={"Download file"}>
                        <a href={props.urlAttachment} >
                            <DownloadIcon style={{color: "#3a3b3c"}} />
                        </a>
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

export default SummitAssignment

const UserSubmitAssignment= (props)=> {
    const [file, setFile]= useState(()=> undefined)
    const {userId, account }= useContext(AppContext)
    const {classId, idAssignment }= useParams()
    const isChoseFile= file ? true : false
    const getFile= (e)=> {
        setFile(e.target.files[0])
    }

    const submit_assignment= async ()=> {
        const formData= new FormData()
        formData.append("data", (JSON.stringify({userId: userId, classId, description: props.description, account: account, idAssignment})))
        formData.append("attach_file", file)
        const res= await axios({
            url: `${SERVER_URL}/submit/assignment`,
            method: "post",
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
        const result= await res.data
        console.log(result)
    }
    return (
        <>
            <div className={"dkasakskaskasassda"} style={{width: "100%", marginTop: 12, padding: 10, position: "relative"}}>
                <UploadIcon /> {isChoseFile=== true ? file.name : "Chose file to submit assignment"}
                <input onChange={getFile} title={"Choose file"} type={"file"} style={{width: "100%", height: "100%", opacity: 0, cursor: "pointer", top: 0, left: 0, position: "absolute", zIndex: 12}} />
            </div>
            <br />
            {
                isChoseFile=== true && 
                <div className={"skasklsklaawaw"} style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                    <Button onClick={()=> setFile(()=> undefined)} variant={"outlined"}>Cancel</Button>
                    <Button onClick={submit_assignment} variant={"contained"} color={"primary"}>Submit</Button>
                </div>
            }
        </>
    )
}