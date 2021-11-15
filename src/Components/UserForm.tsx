import React ,{ChangeEvent} from 'react';
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
  const {setFname,setDob,setPlan,fName,dob,selectedPlan,planData}=props.UsersStore;

  const handleFname=(e:ChangeEvent<HTMLInputElement>)=>{
    setFname(e.target.value);
  }

  const handleDob=(e:ChangeEvent<HTMLInputElement>)=>{
    // setDob(e.target.value);
  }

  const handlePlan=(e:ChangeEvent<HTMLInputElement>)=>{
    setPlan(e.target.value);
  }

  const handleValidation=()=>{
    if(fName.length<3 || fName.length>15 ){
      return props.UsersStore.errorForm("Enter name in proper length")
    }
  }

    return(
        <>
  <form>
   <h1>UserForm</h1> 
   <label htmlFor="fname">First name:</label><br />
   <input type="text" id="fname" name="fname" onChange={handleFname} value={fName} required/><br/><br/>
   <label htmlFor="dob">Date of Birth:</label><br />
   <input type="date"  name="date" onChange={handleDob} required/><br/> <br/> 
   <label htmlFor="plan">Plan:</label><br />
   <select>
     {props.UsersStore.planData.map((item)=>{
       <option key={item}>{item}</option>
     })}
  {/* <option value="volvo">Volvo</option>
  <option value="saab">Saab</option> */}
   </select><br /><br />
   <input type="submit" value="Submit" onClick={handleValidation}/>
  </form> 
        </>
    )
}


export default inject('UsersStore')(observer(UserForm));

