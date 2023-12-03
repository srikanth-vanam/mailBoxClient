import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../sidebar/Sidebar";
import Header from "../header/Header";
const MailViewer = () => {
  const { itemId, mode } = useParams();
  let item = {};
  console.log("itemId in MailView is", itemId);
  //
  const email = useSelector((state) => state.authenticate.emailId);
  const history = useHistory();
  //
  const sentMailItems = useSelector((state) => state.mailData.sentMailItems);
  const receivedMailItems = useSelector(
    (state) => state.mailData.receivedMailItems
  );
  const mailItems =
    mode === "receivedMails" ? receivedMailItems : sentMailItems;
  console.log("mailItems", mailItems);
  // finding item based on id we get from useParams()
  mailItems.forEach((element) => {
    if (element.id === itemId) {
      item = { ...element };
    }
  });
  //
  const deleteMailHandler = (item) => {
    let url;
    if (mode === "receivedMails") {
      url = `https://authentication-react-45852-default-rtdb.firebaseio.com/receivedMails/${email}/${item.from}/${item.id}.json`;
    } else {
      url = `https://authentication-react-45852-default-rtdb.firebaseio.com/sentMails/${email}/${item.to}/${item.id}.json`;
    }
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("error in res.json of deleteMailHandler");
        }
      })
      .then((data) => {
        console.log("deletion handled", data);
        if (mode === "receivedMails") {
          history.replace("/home");
        } else {
          history.replace("/sent");
        }
      })
      .catch((err) => {
        console.log("error in deleting mail", err);
      });
  };
  //
  return (
    <>
      <Header />
      <Container fluid className="d-flex mt-3" style={{ height: "87vh" }}>
        <SideBar />
        <Card className="p-2 text-dark w-75 h-auto mt-1 m-auto" key={item.id}>
          {mode === "receivedMails" && (
            <div>
              <h6>from:</h6>
              <p>{item.from}</p>
            </div>
          )}
          {mode === "sentMails" && (
            <div>
              <h6>to:</h6>
              <p>{item.to}</p>
            </div>
          )}
          <h6>Subject:</h6>
          <p> {item.subject}</p>
          <h6>Body:</h6>
          <p>{item.body}</p>
          <Button
            onClick={() => deleteMailHandler({ ...item })}
            className="w-25"
          >
            Delete Mail
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default MailViewer;
