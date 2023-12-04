import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import MailList from "../mailList/MailList";
import { useDispatch, useSelector } from "react-redux";
import { mailDataActions } from "../ReduxStore/Store";
import useFetch from "../customHooks/useFetch";

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
    // Set up interval to fetch data every 2 seconds
    const intervalId = setInterval(getHandler, 2000);
    // // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [email]);
  //
  // const emailer="Srikanth"
  const getHandler = () => {
    const url = `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${email}.json`;
    const options = {
      method: "GET",
    };
    try {
      const { data, error } = useFetch(url, options);

      console.log("inside get handler", data);
      let mailItems = [];
      let inboxMailsCount = 0;
      if (data) {
        // data is an object of Objects key is username, value is another object of Objects that contains mail Details
        // value Strucute is --> key is fireBase id, Value is mailObject(to,body subject,from)
        for (const key in data) {
          console.log("key is", key);
          console.log("value is", data[key]);
          const item = data[key]; // item is objectOfObjects
          console.log("item object is", item);
          // code to iterate over keys of objOfObj's
          const innerObjectsArray = Object.keys(item).map((innerObjectKey) => {
            const innerObjectValue = item[innerObjectKey];
            // adding id field to the mailObject and storing the simple mailObject
            innerObjectValue.id = innerObjectKey;
            // reading the mrkAsRead field
            if (innerObjectValue.markAsRead === false) {
              inboxMailsCount += 1;
            }
            return innerObjectValue;
          });
          mailItems.push(...innerObjectsArray);
          console.log("innerObjects", innerObjectsArray);
          // inputMailHandler(innerObjectsArray);
        }
      } else {
        console.log("There are no mails");
      }
      dispatch(mailDataActions.setReceivedMailItems(mailItems));
      console.log("mails count", inboxMailsCount);
      dispatch(mailDataActions.setUnreadMailsCount(inboxMailsCount));
    } catch (error) {
      // alert(error.message);
      throw  error;
    }
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

export default React.memo(Inbox);
