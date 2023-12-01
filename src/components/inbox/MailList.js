import { Card } from "react-bootstrap";
const MailList = (props) => {
  return (
    <>
      <Card className="p-2">
        {props.items.map((item) => (
          <li key={item.id} className=" text-dark">
            <Card className="p-2">
              <h6>from:</h6>
              <p>{item.from}</p>
              <h6>Subject:</h6>
              <p> {item.subject}</p>
              <h6>Body:</h6>
              <p>{item.body}</p>
            </Card>
          </li>
        ))}
      </Card>
    </>
  );
};

export default MailList;
