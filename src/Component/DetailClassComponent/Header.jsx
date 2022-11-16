import { NavLink, useParams } from "react-router-dom"
import { ProfileUser } from "../Home"

const Header= (props)=> {
    const {classId }= useParams()
    return (
      <>
        <div className={"dksjaksjjawawassas"} style={{width: "100%", height: 60, position: "fixed", left: 0, top: 0, display: "flex", justifyContent: 'space-between', padding: "0 10px", background: "#fff"}}>
          <div className={"askjskajskasjasa"} style={{padding: "10px 0"}}>
            <div className={"djksjaksjakassaas"} style={{fontWeight: 600}}>
              {props.className}
            </div>
            <div className={"djkasjaksjkjasas"} style={{fontSize: 14}}>
              {props.desc}
            </div>
          </div>
          {/*  */}
          <div className={"ajsajsjkasjkasasas"}>
            <div className={"sjdjksjaksjasasassa"} style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
              <LinkItem link={`/c/${classId}/`} text={"News"} />
              <LinkItem link={`/c/${classId}/members`} text={"Members"} />
              <LinkItem link={`/c/${classId}/score`} text={"Score"} />
            </div>
          </div>
          {/*  */}
          <div className={"sjdkjkasjkassaas"} style={{display: "flex", justifyContent: 'center', alignItems: "center", padding: "0 10px"}}>
           <ProfileUser />
          </div>
        </div>
        <div className={"Jkajskjaskajsasa"} style={{width: '100%', height: 60}}></div>
      </>
    )
  }
  
  export default Header
  
  const LinkItem= (props)=> {
    return (
      <div className={"dsjlsajksjaksasasa"} style={{height: "100%"}}>
        <NavLink to={props.link} className={({isActive})=> isActive ? "djkasjaksjasasasa" : "dasjsjaksjaksas"} style={{ textDecoration: "none", fontWeight: 600, color: "#000", height: "100%"}}>
          <div className={"dklsjaksjaksjkasas"} style={{height: 60, display: "flex", justifyContent: 'center', alignItems: "center", padding: "0 16px", borderBottom: "4px solid transparent", fontSize: 18}}>
            {props.text}
          </div>
        </NavLink>
      </div>
    )
  }
  
  