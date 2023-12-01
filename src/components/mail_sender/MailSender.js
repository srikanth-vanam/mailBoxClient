import React, { useRef, useState } from "react";
import { Button, Card, Form, FormControl, FormLabel } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
    <div className="mt-1 m-auto w-50">
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
          />
        </Card>
        <Button className="mt-2 d-block m-auto" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default MailSender;
