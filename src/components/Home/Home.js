import { Container } from "react-bootstrap";
// import MailSender from "../mail_sender/MailSender";
import SideBar from "../sidebar/Sidebar";
import Inbox from "../inbox/Inbox";

const Home = () => {
  return (
    <>
      <h3 className="text-center m-1">Welcome to your mail Box</h3>
      <hr />
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
