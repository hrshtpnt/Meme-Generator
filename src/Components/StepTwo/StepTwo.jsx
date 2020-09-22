import React, { Component } from "react";
import InputText from "../InputText/InputText";

class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeSelected: {},
      memeImage: "",
    };
  }

  memeImageGenerated = (data) => {
    this.setState({
      memeImage: data,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      const selectedMeme = localStorage.getItem("selectedMeme");
      this.setState({
        memeSelected: JSON.parse(selectedMeme),
      });
      console.log(this.state.memeSelected);
    }, 100);
  }

  render() {
    const { memeSelected } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <h3>{memeSelected.name}</h3>
            {this.state.memeImage === "" && (
              <img src={memeSelected.url} alt="image_selected" />
            )}
            {this.state.memeImage !== "" && (
              <img
                src={this.state.memeImage}
                height="500"
                width="500"
                alt="image_selected"
              />
            )}
          </div>
          <div className="col-sm">
            <InputText
              memeSelected={memeSelected}
              memeImageGenerated={this.memeImageGenerated}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StepTwo;
