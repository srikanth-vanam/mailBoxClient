import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormLabel,
  FormText,
} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailSender = () => {
  const [editorState, setEditorState] = useState(null);
  const toInputRef = useRef();
  const subjectInputRef = useRef();
  const handleEditorStateChange = (newEditorState) => {
    // Handle changes to the editor state here
    setEditorState(newEditorState);
  };
  //
  const submitHandler = (e) => {
    e.preventDefault();
    const mailTo = toInputRef.current.value.split("@")[0];
    const mailObj = {
      to: mailTo,
      subject: subjectInputRef.current.value,
      body: editorState ? editorState.getCurrentContent().getPlainText() : "", // Extract plain text from the editor state
    };
    console.log(mailObj);
    const sender=localStorage.getItem("email");
    fetch(
        // `https://expense-tracker-fea86-default-rtdb.firebaseio.com/sentMails/${mailTo}.json`,
      `https://authentication-react-45852-default-rtdb.firebaseio.com/sentMails/${sender}/${mailTo}.json`,
      {
        method: "POST",
        body: JSON.stringify(mailObj),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot post/update data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        // getHandler();
        // dispatch(expenseActions.setEditId(null));
        // dispatch(expenseActions.setUpdateBool(false));
        toInputRef.current.value="";
        subjectInputRef.current.value="";
        setEditorState(null);
        fetch(
            // `https://expense-tracker-fea86-default-rtdb.firebaseio.com/sentMails/${mailTo}.json`,
          `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${mailTo}/${sender}.json`,
          {
            method: "POST",
            body: JSON.stringify(mailObj),
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("cannot post/update data to database");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
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
