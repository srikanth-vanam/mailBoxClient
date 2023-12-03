import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../sidebar/Sidebar";
const MailViewer = () => {
  const { itemId } = useParams();
  let item = {};
  console.log("itemId in MailView is", itemId);
  //
  const email = useSelector((state) => state.authenticate.emailId);
  const history=useHistory();
  //
  const mailItems = useSelector((state) => state.mailData.mailItems);
  console.log("mailItems", mailItems);
  mailItems.forEach((element) => {
    if (element.id === itemId) {
      item = { ...element };
    }
  });
  //
  const deleteMailHandler = (item) => {
    fetch(
      `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${email}/${item.from}/${item.id}.json`, // no receiver details
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("error in res.json of deleteMailHandler");
        }
      })
      .then((data) => {
        console.log("deletion handled", data);
        history.replace('/home');
      })
      .catch((err) => {
        console.log("error in deleting mail", err);
      });
  };
  //
  return (
    <>
      <h3 className="text-center m-1">Welcome to your mail Box</h3>
      <hr />
      <Container fluid className="d-flex mt-3" style={{ height: "87vh" }}>
        <SideBar />
        <Card className="p-2 text-dark w-75 h-auto mt-1 m-auto" key={item.id}>
          <h6>from:</h6>
          <p>{item.from}</p>
          <h6>Subject:</h6>
          <p> {item.subject}</p>
          <h6>Body:</h6>
          <p>{item.body}</p>
          <Button onClick={() => deleteMailHandler({...item})} className="w-25">Delete Mail</Button>
        </Card>
      </Container>
    </>
  );
};

export default MailViewer;
