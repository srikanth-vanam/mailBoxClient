import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authenticateActions } from "../ReduxStore/Store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authenticateActions.removeToken());
    history.replace("/");
  };
  return (
    <>
      <Container className="d-flex justify-content-around align-items-center p-2">
        <h3 className="text-center m-1">Welcome to your mail Box</h3>
        <Button onClick={logoutHandler}>Logout</Button>
      </Container>
      <hr className="mt-0"/>
    </>
  );
};

export default Header;
