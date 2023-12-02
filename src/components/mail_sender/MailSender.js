import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SideBar from "../sidebar/Sidebar";

const MailSender = () => {
  const [editorState, setEditorState] = useState(null);
  const toInputRef = useRef();
  const subjectInputRef = useRef();
  //
  const handleEditorStateChange = (newEditorState) => {
    // Handle changes to the editor state here
    setEditorState(newEditorState);
  };
  //
  const mailFunction = async (category, senderMail, receiverMail, mailObj) => {
    try {
      let res = await fetch(
        `https://authentication-react-45852-default-rtdb.firebaseio.com/${category}/${senderMail}/${receiverMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailObj),
        }
      );
      if (!res.ok) {
        throw new Error("cannot post data to database");
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  };
  //
  const submitHandler = async (e) => {
    e.preventDefault();

    const receiver = toInputRef.current.value.split("@")[0];
    const sender = localStorage.getItem("email");

    const mailObj = {
      from: sender,
      to: receiver,
      subject: subjectInputRef.current.value,
      body: editorState ? editorState.getCurrentContent().getPlainText() : "", // Extract plain text from the editor state
    };
    console.log(mailObj);

    try {
      await Promise.all([
        mailFunction("sentMails", sender, receiver, mailObj),
        mailFunction("receivedMails", receiver, sender, mailObj),
      ]);
    } catch (error) {
      console.error("error in submitting mail", error);
    }
    // clearing mail-form fields
    toInputRef.current.value = "";
    subjectInputRef.current.value = "";
    setEditorState(null);
  };

  return (
    <>
      <h3 className="text-center m-1">Welcome to your mail Box</h3>
      <hr />
      <Container fluid className="d-flex mt-3" style={{ height: "87vh" }}>
        <SideBar />
        <div className="mt-1 m-auto w-75 h-100">
          <h2 className="text-center">Compose Mail</h2>
          <Form onSubmit={submitHandler}>
            <FormLabel>To</FormLabel>
            <FormControl
              placeholder="Sender e-mail Id"
              ref={toInputRef}
            ></FormControl>
            <FormLabel>Subject</FormLabel>
            <FormControl
              placeholder="Enter subject"
              ref={subjectInputRef}
            ></FormControl>
            <FormLabel>Body</FormLabel>
            <Card className="p-2">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditorStateChange}
                style={{
                  height: "300px", // Set the desired height
                  overflowY: "auto", // Enable vertical scrolling
                }}
              />
            </Card>
            <Button className="mt-2 d-block m-auto" type="submit">
              Send
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default MailSender;
