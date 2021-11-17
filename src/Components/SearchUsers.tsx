import React, { useEffect, ChangeEvent } from "react";
import { inject, observer } from "mobx-react";
import { UsersStore } from "../Stores/Users";
import { useHistory } from "react-router-dom";
import "./Style.css";

type StoreProps = {
  UsersStore: UsersStore;
};

interface Props extends StoreProps {}

const SearchUsers: React.FC<Props> = (props) => {
  let history = useHistory();
  const { setSearchText, searchText, getFilterUsers } = props.UsersStore;

  useEffect(() => {
    props.UsersStore.getUserData();
  }, []);

  useEffect(() => {
    getFilterUsers();
  }, [searchText]);

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <h1>User Search Form</h1>
      <div className="designButton">
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </button>
      </div>
      <form>
        SearchBox:{" "}
        <input
          type="text"
          id="search"
          name="search"
          onChange={handleSearchUser}
          value={searchText}
        />
        <br />
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
