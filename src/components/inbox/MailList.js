import { Card } from "react-bootstrap";
import { NavLink,useHistory  } from "react-router-dom/cjs/react-router-dom";
import MailViewer from "./MailView";
const MailList = (props) => {
  //
  const history = useHistory();

  const handleItemClick = (item) => {
    // Navigate to the MailView route and pass the item in the state
    history.push({
      pathname: `/mailView/${item.id}`,
      state: { item: item },
    });
  };
  //
  return (
    <>
      <Card
        className="p-2 "
        style={{
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <ul className="list-unstyled">
          {props.items.map((item) => (
            <li
              key={item.id}
              className="text-dark m-1 bg-light"
              style={{
                height: "54px",
                border: "2px solid black",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick(item)}
            >
              <NavLink to={`/mailView/${item.id}`}>
                <div
                  className="d-flex justify-content-between align-items-center w-50 p-4 bg-light"
                  size="lg"
                  style={{
                    height: "50px",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "10px",
                      backgroundColor: "blue",
                    }}
                  ></div>
                  <p>{item.from}</p>
                  <p> {item.subject}</p>
                  {/* <MailViewer
                    id={item.id}
                    subject={item.subject}
                    body={item.body}
                    to={item.to}
                    from={item.from}
                  /> */}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default MailList;
