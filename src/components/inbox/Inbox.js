import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MailList from "../mailList/MailList";
import { useDispatch, useSelector } from "react-redux";
import { mailDataActions } from "../ReduxStore/Store";

const Inbox = () => {
  // const email = localStorage.getItem("email");
  const receivedMailItems = useSelector(
    (state) => state.mailData.receivedMailItems
  );
  const email = useSelector((state) => state.authenticate.emailId);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    getHandler();
  }, [email]);
  //
  // const emailer="Srikanth"
  const getHandler = () => {
    fetch(
      `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${email}.json`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot post data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("inside get handler", data);
        let mailItems = [];
        if (data) {
          // data is an object of Objects key is username, value is another object of Objects that contains mail Details
          // value Strucute is --> key is fireBase id, Value is mailObject(to,body subject,from)
          for (const key in data) {
            console.log("key is", key);
            console.log("value is", data[key]);
            const item = data[key]; // item is objectOfObjects
            console.log("item object is", item);
            // code to iterate over keys of objOfObj's
            const innerObjectsArray = Object.keys(item).map(
              (innerObjectKey) => {
                const innerObjectValue = item[innerObjectKey];
                // adding id field to the mailObject and storing the simple mailObject
                innerObjectValue.id = innerObjectKey;
                return innerObjectValue;
              }
            );
            mailItems.push(...innerObjectsArray);
            console.log("innerObjects", innerObjectsArray);
            // inputMailHandler(innerObjectsArray);
          }
        } else {
          console.log("There are no mails");
        }
        dispatch(mailDataActions.setReceivedMailItems(mailItems));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Container className="w-75">
        {receivedMailItems.length === 0 && (
          <h5 className="text-center">There are no mails for you</h5>
        )}
        {receivedMailItems.length > 0 && <h5>Your Mails are here</h5>}
        {receivedMailItems.length > 0 && (
          <MailList items={receivedMailItems} receivedBool={true} />
        )}
      </Container>
    </>
  );
};

export default Inbox;
