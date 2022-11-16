import React, { useContext, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutsideClickHandler from 'react-outside-click-handler';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import CopyToClipboard from 'react-copy-to-clipboard';

const ItemClass = (props) => {
  return (
    <div className={"dksakslklkawwa"} style={{width: props.width, padding: "10px 8px", borderRadius: 5}}>
        <div className={'jdkjaksjkasdasa'} style={{width: "100%", display: "flex", justifyContent: "space-between", padding: 20, border: "1px solid #d7d7d7", borderRadius: 5}}>
            <div className={"dkasjakjsakjawaww"}>
                <Link to={`/c/${props.classId}/`} style={{color: "#3a3b3c", textDecoration: "none"}}>
                    <ClassName className={props.className } />
                </Link>
                <CLassDesc desc={props.desc} />
                <br />
                <ClassTeacher authorName={props.authorName} />
            </div>
            <Options classUser={props.classUser} setClassUser={props.setClassUser} teacherId={props.teacherId} classId={props.classId} linkJoin={props.linkJoin} />
        </div>
    </div>
  )
}

const ClassName= (props)=> {
    return (
        <div title={props.className} className={"djaksjasjawjakwwa"} style={{fontSize: 18, fontWeight: 600, marginBottom: 12, width: "100%", overflow: 'hidden', textOverflow: "ellipsis", cursor: "pointer"}}>
            {props.className}
        </div>
    )
}

const CLassDesc= (props)=> {
    return (
        <div title={props.desc} className={"fjksajkahsawhwahwaaw"} style={{cursor: "context-menu"}}>
            {props.desc}
        </div>
    )
}

const ClassTeacher= (props)=> {
    return (
        <div title={props.authorName} className={"daksjajasjrwaw"}>
            Teacher: {props.authorName}
        </div>
    )
}

const Options= (props)=> {
    const [open, setOpen]= useState(()=> false)
    const {userId }= useContext(AppContext)

    return (
        <OutsideClickHandler onOutsideClick={()=> setOpen(()=> false)}>
            <div className={"saksakdjkakwjwa"} style={{display: 'flex', justifyContent: "center", alignItems: "center", width: 40, height: 40, position: "relative"}}>
                <div onClick={()=> setOpen(prev=> !prev)} className={"sjkdjksajsksasasa"} style={{width: "100%", height: "100%", display: "flex", justifyContent:" center", alignItems: "center", cursor: "pointer", borderRadius: "50%"}}>
                    <MoreVertIcon style={{color: "#3a3b3c"}} />
                </div>
                {
                    open=== true && 
                    <>
                        {
                            props.teacherId === userId && <OptionAuthor {...props} />
                        }  
                        {
                            props.teacherId !== userId && <OptionMember linkJoin={props.linkJoin} />
                        }
                    </>
                }
            </div>
        </OutsideClickHandler>
    )
}

const OptionAuthor= (props)=> {
    const delete_class= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/edit/class/delete`,
            method: "post", 
            data: {
                classId: props.classId
            }
        })
        const result= await res.data
        console.log(result)
        return props.setClassUser(props.classUser?.filter(item=> item.classId !== props.classId))
    }
    return (
        <div className={"jsdjakjskajeawwaaww"} style={{padding: 10, borderRadius: 8, position: "absolute", right: 0, top: 0, marginTop: 40, width: "max-content", background: "#fff", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Edit</div>
            <CopyToClipboard text={window.location.origin+"/j/" +props.linkJoin}>
                <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Copy link invite</div>
            </CopyToClipboard>
            <div onClick={delete_class} className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Delete class</div>
        </div>
    )
}

const OptionMember= (props)=> {
    return (
        <div className={"jsdjakjskajeawwaaww"} style={{padding: 10, borderRadius: 8, position: "absolute", right: 0, top: 0, marginTop: 40, width: "max-content", background: "#fff", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <CopyToClipboard text={window.location.origin+"/j/" +props.linkJoin}>
                <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Copy link invite</div>
            </CopyToClipboard>
            <div className={"djasjkjkjekwawwaaw fmdkaskajskassaas"} style={{height: 48, cursor: "pointer", display: "flex", alignItems: "center", padding: 5}}>Out class</div>
        </div>
    )
}

export default ItemClass