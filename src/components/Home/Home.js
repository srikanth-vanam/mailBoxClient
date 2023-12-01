import { Container } from "react-bootstrap";
import MailSender from "../mail_sender/MailSender";

const Home = () => {
  return (
    <>
      <Container fluid>
        <h3>Welcome to your mail Box!</h3>
        <hr />
        <MailSender />
      </Container>
    </>
  );
};

export default Home;
