import React, { Component } from "react";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: {},
    };
  }
  render() {
    return (
      <div>
        <button className="btn btn-primary">UPLOAD</button>
      </div>
    );
  }
}

export default ImageUpload;
