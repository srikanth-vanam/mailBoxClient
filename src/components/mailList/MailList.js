import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import { mailDataActions } from "../ReduxStore/Store";
import React from "react";
// import MailViewer from "./MailView";
const MailList = (props) => {
  //
  const history = useHistory();
  const email = useSelector((state) => state.authenticate.emailId);
  // const mailItems = useSelector((state) => state.mailData.mailItems);
  // const dispatch = useDispatch();
  //
  const mode = props.receivedBool ? "receivedMails" : "sentMails";
  const handleItemClick = (item) => {
    // Navigate to the MailView route and pass the item in the state
    history.push({
      pathname: `/mailView/${item.id}/${mode}`,
      // state: { item: item },
    });
    // need to work on mailReader, we must have it for each item
    if (props.receivedBool) {
      markAsReadUpdateHandler(item);
    }
  };
  //
  const markAsReadUpdateHandler = (item) => {
    const mailObj = {
      ...item,
      markAsRead: true,
    };
    // mode==="receivedMails"?
    let url;
    if (props.receivedBool) {
      url = `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${email}/${item.from}/${item.id}.json`;
    }
    // else {
    //   url = `https://authentication-react-45852-default-rtdb.firebaseio.com/sentMails/${email}/${item.to}/${item.id}.json`;
    // }
    fetch(url, {
      method: "PATCH", // Use PATCH method for updating existing resources
      body: JSON.stringify(mailObj), // Provide the updated data in the request body
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("error in updating the data");
        }
      })
      .then((data) => {
        console.log("updated successfully", data);
      })
      .catch((err) => {
        console.error("error in updating MarkAsRead", err);
      });
  };
  //
  return (
    <>
      <Card
        className="p-2 "
        style={{
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <ul className="list-unstyled">
          {props.items.map((item) => (
            <li
              key={item.id}
              className="text-dark m-1 bg-light"
              style={{
                height: "54px",
                border: "2px solid black",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick({ ...item })}
            >
              <div
                className="d-flex justify-content-between align-items-center w-50 p-4 bg-light"
                size="lg"
                style={{
                  height: "50px",
                }}
              >
                {props.receivedBool ? (
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "10px",
                      backgroundColor: item.markAsRead ? "white" : "blue",
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "10px",
                      // backgroundColor: item.markAsRead ? "white" : "blue",
                    }}
                  ></div>
                )}
                {props.receivedBool && <p>from:{item.from}</p>}
                {!props.receivedBool && <p>to:{item.to}</p>}
                <p> {item.subject}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default React.memo(MailList);
