import React from "react";
import "./login.css";
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    fetch("/api/users/me").then((user) => {
      if (user.status === 200) {
        window.location = "/profile";
      }
    });
  }

  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLoginClick = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      if (res.status === 204) {
        window.location = "/profile";
      }
    });
  };

  onSignupClick = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    window.location = "/";
  };

  render() {
    return (
      <>
        {/* <div className="LoginPage">
          <form>
            <input
              placeholder="email"
              name="email"
              required
              type="email"
              onInput={this.onInput}
              value={this.state.email}
            ></input>
            <input
              placeholder="password"
              name="password"
              required
              type="password"
              onInput={this.onInput}
              value={this.state.password}
            ></input>
            <div>
              <input
                type="submit"
                onClick={this.onLoginClick}
                value="Login"
              ></input>
              <input
                type="submit"
                onClick={this.onSignupClick}
                value="Sign up"
              ></input>
            </div>
          </form>
        </div> */}

        <>
          <div class="signin">
            <a href="index.html">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                alt=""
              />
            </a>

            <div class="signin_box">
              <h1>Sign Up</h1>
              <form>
                <label html="email">E-mail</label>
                <input
                  placeholder="email"
                  name="email"
                  required
                  type="email"
                  onInput={this.onInput}
                  value={this.state.email}
                  id="email"
                ></input>
                <label html="password">Password</label>
                <input
                  id="password"
                  placeholder="password"
                  name="password"
                  required
                  type="password"
                  onInput={this.onInput}
                  value={this.state.password}
                ></input>
                <span>
                  By signing-in you agree to Amazon's Conditions of Use & Sale.
                  Please see our Privacy Notice, our Cookies Notice and our
                  Interest-Based Ads Notice.
                </span>
                <button
                  type="submit"
                  class="signin_createbtn"
                  onClick={this.onSignupClick}
                  value="Sign up"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default SignUpPage;
