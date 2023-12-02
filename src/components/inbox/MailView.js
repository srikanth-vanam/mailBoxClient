import { Card } from "react-bootstrap";
const MailViewer = (props) => {
    // const item=props.item;
  return (
    <>
      <Card className="p-2 text-dark" key={props.id}>
        <h6>from:</h6>
        <p>{props.from}</p>
        <h6>Subject:</h6>
        <p> {props.subject}</p>
        <h6>Body:</h6>
        <p>{props.body}</p>
      </Card>
    </>
  );
};

export default MailViewer;
