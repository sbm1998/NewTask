import React, { useEffect,ChangeEvent } from "react";
import { inject, observer } from "mobx-react";
import { UsersStore } from "../Stores/Users";
import "./Style.css";

type StoreProps = {
  UsersStore: UsersStore;
};

interface Props extends StoreProps {}

const SearchUsers: React.FC<Props> = (props) => {
  const {setSearchText,searchText,getFilterUsers}=props.UsersStore;
  
  useEffect(() => {
    props.UsersStore.getUserData();
  }, []);

  useEffect(()=>{
    getFilterUsers();
  },[searchText])

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
    <>
    <h1>User Search Form</h1>
      <form>
        SearchBox: <input type="text" id="search" name="search" onChange={handleSearchUser} value={searchText}/><br/>
        {/* <button>Submit</button>  */}
        <br />
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {props.UsersStore.searchResult.map((item) => {
            return (
              <tr>
                <td> {item.username}</td>
                <td>{item.plan}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default inject("UsersStore")(observer(SearchUsers));
