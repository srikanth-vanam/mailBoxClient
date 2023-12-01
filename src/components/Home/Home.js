import { Container } from "react-bootstrap";
// import MailSender from "../mail_sender/MailSender";
import SideBar from "../sidebar/Sidebar";
import Inbox from "../inbox/Inbox";

const Home = () => {
  return (
    <>
      <Container fluid>
        <h3 className="text-center m-1">Welcome to your mail Box!</h3>
        <hr />
        <SideBar/>
        <Inbox />
      </Container>
    </>
  );
};

export default Home;
