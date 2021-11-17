import React from "react";
import { inject, observer } from "mobx-react";
import { UsersStore } from "../Stores/Users";
import { useHistory } from "react-router-dom";
import "./Style.css";

type StoreProps = {
  UsersStore: UsersStore;
};

interface Props extends StoreProps {}

const RandomData: React.FC<Props> = (props) => {
  let history = useHistory();
  const {
    users,
    getUserData,
    loadingUser,
    changeUserSubscriptionPlan,
    changeAllUsersSubscriptionPlan,
  } = props.UsersStore;

  const getData = () => {
    props.UsersStore.getUserData();
  };

  const changeUserPlan = (id: number) => {
    changeUserSubscriptionPlan(id);
  };
  return (
    <div>
      <div className="designButton">
        <button
          onClick={() => {
            history.push("/form");
          }}
        >
          UserForm
        </button>
        <button
          onClick={() => {
            history.push("/search");
          }}
        >
          Click To Search User
        </button>
        <button className="fetchUser" onClick={getData}>
          Fetch Users
        </button>
        <button
          className="updateplan "
          onClick={changeAllUsersSubscriptionPlan}
        >
          Update subscription plan
        </button>
      </div>

      <div>
        {loadingUser ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Plan</th>
                <th>Change_User_Plan</th>
              </tr>
            </thead>
            <tbody>
              {props.UsersStore.users.map((item) => {
                return (
                  <tr>
                    <td> {item.username}</td>
                    <td>
                      {item.changingPlan ? <div>changing..</div> : item.plan}
                    </td>

                    <button
                      onClick={() => {
                        changeUserPlan(item.id);
                      }}
                    >
                      Change User Plan
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default inject("UsersStore")(observer(RandomData));
