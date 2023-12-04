import { Button, Card, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const SideBar = () => {
  const unreadMails = useSelector((state) => state.mailData.unreadMailsCount);
  return (
    <>
      <Card className="p-2" style={{ width: "20%" }}>
        <Navbar bg="light" sticky="left" className="d-flex flex-column h-100">
          <NavLink to="/compose">
            <Button variant="primary" size="lg" className="mb-2">
              Compose
            </Button>
          </NavLink>
          <NavLink to="/home" className="text-dark text-decoration-none p-2">
            <div className="d-flex">
              <p>Inbox </p>
              {unreadMails !== 0 ? <p>{-unreadMails} unread</p> : ""}
            </div>
          </NavLink>
          <NavLink to="/sent" className="text-dark text-decoration-none p-2">
            Sent
          </NavLink>
          <NavLink to="" className="text-dark text-decoration-none p-2">
            Starred
          </NavLink>
          <NavLink to="" className="text-dark text-decoration-none p-2">
            Unread
          </NavLink>
        </Navbar>
      </Card>
    </>
  );
};

export default SideBar;
