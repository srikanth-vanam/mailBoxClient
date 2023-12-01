import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MailList from "./MailList";

const Inbox = () => {
  const email = localStorage.getItem("email");

  const [inputMail,setInputMail]=useState([]);
  useEffect(() => {
    getHandler();
  }, []);
  //
  const inputMailHandler=(itemsArray)=>{
    setInputMail(()=>{
        return itemsArray
    });
  }
  //
  const getHandler = () => {
    fetch(
        `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/Srikanth.json`,
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
        const itemsArray = [];
        if (data) {
          for (const key in data) {
            console.log("key is",data[key]);
            data[key].id = key;

            console.log("key id is ",data[key].id);
            itemsArray.push(data[key]);
          }
        } else {
            console.log("There are no mails");
        }
        inputMailHandler(itemsArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Container fluid>
            {!inputMail && <h5>There are no mails for you</h5>}
            {inputMail && <h5>Your Mails are here</h5>}
            <MailList  items={inputMail} />
      </Container>
    </>
  );
};

export default Inbox;
