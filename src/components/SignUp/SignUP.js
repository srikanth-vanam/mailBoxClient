import { useRef, useState } from "react";
import { Card, Form, FormControl, FormLabel, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUP = () => {
  const [isLogin, setIsLogin] = useState(false);
  const history=useHistory();
  //Inputs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //
  const loginHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };
  //
  const submitHandler = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    postUserData(userCredentials);
  };

  const postUserData = (obj) => {
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: obj.email,
        password: obj.password,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in signUP? Already a user try login..");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // dispatch(Authactions.setToken(data.idToken));
        // splitting email and removing '.com' from it
        const email = obj.email.split("@")[0];
        // dispatch(Authactions.setEmailId(email));
        console.log("added token,email to store");
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", email);
        console.log("added token to localStorage");
        console.log(data.idToken);
        console.log("user registered successfully");
        history.replace("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Card className="w-25 mt-5 m-auto p-2">
        <h2 className="m-auto">{isLogin ? "Login" : "SignUP"}</h2>
        <Form onSubmit={submitHandler}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl
            type="email"
            className="w-90%"
            placeholder="Enter Email"
            required
            ref={emailInputRef}
          ></FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Password"
            ref={passwordInputRef}
            required
          ></FormControl>
          {!isLogin ? (
            <>
              <FormLabel htmlFor="c-pswd">Confirm Password</FormLabel>
              <FormControl
                required
                placeholder="Re-type Password"
              ></FormControl>
            </>
          ) : (
            ""
          )}
          <div className="d-flex flex-column">
            <Button className=" m-auto mt-2" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <Button className="text-danger" variant="" >
              forgot Password?
            </Button>
          </div>
        </Form>
        <Button
          className=" d-block m-auto mt-2"
          type="button"
          variant="secondary"
          onClick={loginHandler}
        >
          <p>
            {isLogin
              ? "Don't have an account? SignUP"
              : "Already have an account?Login"}
          </p>
        </Button>
      </Card>
    </>
  );
};

export default SignUP;
