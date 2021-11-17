import React, { ChangeEvent, useEffect } from "react";
import { UsersStore } from "../Stores/Users";
import { inject, observer } from "mobx-react";
import "./Style.css";
import { Form, Button } from "react-bootstrap";

type StoreProps = {
  UsersStore: UsersStore;
};

interface Props extends StoreProps {}

const UserForm: React.FC<Props> = (props) => {
  const {
    setFname,
    setDob,
    setPlan,
    username,
    dob,
    plan,
    setUsersPlan,
    error,
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
    // console.log(userFormData)
    setFname("");
    // document.getElementById("dateinput")?.value = ""
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
      <form>
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
        {/* <input type="reset" value="Reset" /> */}
        <input type="submit" value="Submit" onClick={handleValidation} />
      </form>

      {/* <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
   */}
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
