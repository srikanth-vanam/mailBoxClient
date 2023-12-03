import { Container } from "react-bootstrap";
// import MailSender from "../mail_sender/MailSender";
import SideBar from "../sidebar/Sidebar";
import Inbox from "../inbox/Inbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authenticateActions } from "../ReduxStore/Store";
import Header from "../header/Header";

const Home = () => {
  //
  // const email=useSelector((state)=>state.authenticate.emailId);
  const dispatch=useDispatch();
  useEffect(()=>{
    const localEmail=localStorage.getItem('email');
    if(localEmail){
      dispatch(authenticateActions.setEmailId(localEmail));
      console.log("Home useEffect email",localEmail);
    }
  },[])
  //
  return (
    <>
      <Header />
      <Container fluid className="d-flex mt-3" style={{ height: "87vh" }}>
        <SideBar />
        <Inbox
          className="mt-1 m-auto w-75"
        />
      </Container>
    </>
  );
};

export default Home;
