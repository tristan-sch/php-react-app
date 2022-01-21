import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    text: "",
  };
  handleAdd = async (e) => {
    await this.setState({
      text: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text);
    let formData = new FormData();
    formData.append("text", this.state.text);
    const url = "http://localhost:8080/index.php";
    axios
      .post(url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="App-header">
        <input
          onChange={this.handleAdd}
          type="text"
          id="text"
          placeholder="enter some text"
        ></input>
        <br />
        <button onClick={this.handleSubmit} id="submit">
          Save
        </button>
      </div>
    );
  }
}

export default App;
