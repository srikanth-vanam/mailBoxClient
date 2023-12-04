import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { mailDataActions } from "../ReduxStore/Store";
import React from "react";
// import MailViewer from "./MailView";
const MailList = (props) => {
  //
  const history = useHistory();
  const mailIsRead = useSelector((state) => state.mailData.mailIsRead);
  // const mailItems = useSelector((state) => state.mailData.mailItems);
  const dispatch = useDispatch();
  //
  const mode = props.receivedBool ? "receivedMails" : "sentMails";
  const handleItemClick = (id) => {
    // Navigate to the MailView route and pass the item in the state
    history.push({
      pathname: `/mailView/${id}/${mode}`,
      // state: { item: item },
    });
    // need to work on mailReader, we must have it for each item
    // dispatch(mailDataActions.mailReader(true));
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
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className="d-flex justify-content-between align-items-center w-50 p-4 bg-light"
                size="lg"
                style={{
                  height: "50px",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "10px",
                    backgroundColor: mailIsRead ? "white" : "blue",
                  }}
                ></div>
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
