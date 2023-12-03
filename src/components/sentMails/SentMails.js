import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import { useEffect } from "react";
import { mailDataActions } from "../ReduxStore/Store";
import MailList from "../mailList/MailList";
import { Container, Card } from "react-bootstrap";

const SentMails = () => {
  const email = useSelector((state) => state.authenticate.emailId);
  const sentMailItems = useSelector((state) => state.mailData.sentMailItems);
  const dispatch = useDispatch();

  useEffect(() => {
    getHandler();
  }, [email]);

  const getHandler = () => {
    fetch(
      `https://authentication-react-45852-default-rtdb.firebaseio.com/sentMails/${email}.json`,
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
        console.log("inside get handler of sentMails", data);
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
            console.log("innerObjects", innerObjectsArray);
            dispatch(mailDataActions.setSentMailItems(innerObjectsArray));
            // inputMailHandler(innerObjectsArray);
          }
        } else {
          console.log("There are no mails");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <Header />
      <Container fluid className=" d-flex mt-3" style={{ height: "87vh" }}>
        <SideBar />
        <Card className="mt-1 m-auto w-75 p-2">
          {sentMailItems.length === 0 && (
            <h5 className="text-center">There are no sent mails</h5>
          )}
          {sentMailItems.length > 0 && <h5>Your Sent Mails are here</h5>}
          {sentMailItems.length > 0 && (
            <MailList receivedBool={false} items={sentMailItems} />
          )}
        </Card>
      </Container>
    </>
  );
};

export default SentMails;
