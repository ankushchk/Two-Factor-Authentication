import React, { Component } from "react";
import firebase from "./firebase";
import "./App.css";
export class App extends Component {
  handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    var number = "+917428457580";
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        var code = prompt(
          "Enter the OTP which you recieve on you mobile phone",
          ""
        );

        if (code === null) return;

        e.confirm(code)
          .then(function (result) {
            console.log(result.user);

            document.querySelector("label").textContent +=
              result.user.phoneNumber + "Number verified";
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        <label></label>

        <div id="recaptcha"></div>

        <button
          type="button"
          className="btn btn-warning"
          onClick={this.handleClick}
        >
          Click Me !
        </button>
      </div>
    );
  }
}

export default App;
