import { Button, Card, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const SideBar = () => {
  return (
    <>
      <Card className="p-2" style={{ height: "85vh", width: "20%" }}>
        <Navbar bg="light" sticky="left" className="d-flex flex-column h-100">
          <NavLink to="/compose" >
            <Button variant="primary" size="lg" className="mb-2">
              Compose
            </Button>
          </NavLink>
          <NavLink to="/home" className="text-dark text-decoration-none p-2">
            Inbox
          </NavLink>
          <NavLink to="" className="text-dark text-decoration-none p-2">
            Unread
          </NavLink>
          <NavLink to="" className="text-dark text-decoration-none p-2">
            Starred
          </NavLink>
        </Navbar>
      </Card>
    </>
  );
};

export default SideBar;
