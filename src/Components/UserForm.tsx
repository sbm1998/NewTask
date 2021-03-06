import React, { ChangeEvent, useEffect } from "react";
import { UsersStore } from "../Stores/Users";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import "./Style.css";

type StoreProps = {
  UsersStore: UsersStore;
};

interface Props extends StoreProps {}

const UserForm: React.FC<Props> = (props) => {
  let history = useHistory();
  const {
    setFname,
    setDob,
    setPlan,
    username,
    dob,
    plan,
    setUsersPlan,
    error,
    getUserData,
    changeAllUsersSubscriptionPlan,
  } = props.UsersStore;

  const handleFname = (e: ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
  };

  const handleDob = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDob(e.target?.valueAsDate);
  };

  const handlePlan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(event.target.value);
  };

  const handleValidation = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (username.length < 3 || username.length > 15) {
      props.UsersStore.errorForm("Enter name in proper length");
      return;
    }
    const userFormData = {
      username,
      dob,
      plan,
    };
    const getLocalUser = localStorage.getItem("user");
    let parseUserData = getLocalUser ? JSON.parse(getLocalUser) : [];
    parseUserData.push(userFormData);

    localStorage.setItem("user", JSON.stringify(parseUserData));

    setFname("");
    setDob(null);
    setPlan("");
  };
  const getLocalUser = localStorage.getItem("user");
  let parseUserData = getLocalUser ? JSON.parse(getLocalUser) : [];
  useEffect(() => {
    setUsersPlan();
  }, []);
  return (
    <>
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
        <div className="designForm">
          <h1>UserForm</h1>
          <label htmlFor="fname">First Name:</label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={handleFname}
            value={username}
            required
          />
          <br />
          <br />
          <div>{error}</div>
          <label htmlFor="dob">Date of Birth:</label>
          <br />
          <input
            type="date"
            id="dateinput"
            name="date"
            onChange={handleDob}
            required
          />
          <br /> <br />
          <label htmlFor="plan">Plan:</label>
          <br />
          <select onChange={handlePlan} value={plan}>
            {props.UsersStore.planData.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <br />
          <br />
          <input type="submit" value="Submit" onClick={handleValidation} />
        </div>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {parseUserData.map((item: any) => {
              return (
                <tr>
                  <td> {item.username}</td>

                  <td>{item.plan}</td>

                  <td>{item.dob}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default inject("UsersStore")(observer(UserForm));
