import React ,{ChangeEvent, useEffect} from 'react';
import { isTemplateExpression } from 'typescript';
import {UsersStore} from '../Stores/Users';
import {inject,observer} from 'mobx-react';
import './Style.css';
 
type StoreProps = {
  UsersStore:UsersStore;
  };
  
  interface Props extends StoreProps {
    
  }
  

const UserForm:React.FC<Props>= (props)=>{
  const {setFname,setDob,setPlan,fName,dob,selectedPlan, setUsersPlan,error}=props.UsersStore;

  const handleFname=(e:ChangeEvent<HTMLInputElement>)=>{
    setFname(e.target.value);
  }

  const handleDob=(e:ChangeEvent<HTMLInputElement>)=>{
    setDob(e.target?.valueAsDate);
    console.log(e);
  }

  const handlePlan=((event: React.ChangeEvent<HTMLSelectElement>)=>{
     setPlan(event.target.value);
    console.log(event);
    
  })

  const handleValidation=(e:React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
    e.preventDefault();
    if(fName.length<3 || fName.length>15 ){
      props.UsersStore.errorForm("Enter name in proper length")
      return;
    }
    const userFormData={
      fName,dob,selectedPlan
    }
   const getLocalUser= localStorage.getItem("user");
   let parseUserData=getLocalUser ? JSON.parse(getLocalUser):[];
   parseUserData.push(userFormData);
     console.log("getData",getLocalUser);
    console.log("parseData",parseUserData)


    localStorage.setItem("user",JSON.stringify(parseUserData));
    // console.log(userFormData)




  }
  useEffect(()=>{
    setUsersPlan();
  },[])
    return(
        <>
  <form>
   <h1>UserForm</h1> 
   <label htmlFor="fname">First name:</label><br />
   <input type="text" id="fname" name="fname" onChange={handleFname} value={fName} required/><br/><br/>
   <div>{error}</div>
   <label htmlFor="dob">Date of Birth:</label><br />
   <input type="date"  name="date" onChange={handleDob} required/><br/> <br/> 
   <label htmlFor="plan">Plan:</label><br />

   <select onChange={handlePlan} value={selectedPlan}>
     {props.UsersStore.planData.map((item)=>{
     return ( <option key={item}>{item}</option>

        )   })}
   </select><br /><br />
   <input type="submit" value="Submit" onClick={handleValidation}/>
  </form> 
        </>
    )
}


export default inject('UsersStore')(observer(UserForm));

