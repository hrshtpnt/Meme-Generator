import React, { Component } from "react";
import "./InputText.css";
import Select from "react-select";
import { USERNAME, PASSWORD } from "../../environment_variables"; 
const options = [
  { value: "arial", label: "Arial" },
  { value: "impact", label: "Impact" },
];

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [
        {
          text: "",
          id: 0,
        },
      ],
      fontSelected: "arial",
      fontSize: 50,
    };
  }

  objToQueryParam = (obj) => {
    const param =
      obj && Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return param.join("&");
  };

  ArrayToURL = (array) => {
    var pairs = [];
    for (var key in array)
      if (array.hasOwnProperty(key))
        for (var item in array[key]) {
          pairs.push(
            encodeURIComponent(`boxes[${key}][${item}]`) +
              "=" +
              encodeURIComponent(array[key][item])
          );
        }

    return pairs.join("&");
  };

  async handleCreateMeme(boxes) {
    event.preventDefault();
    const details = {
      template_id: this.props.memeSelected.id,
      username: USERNAME,
      password: PASSWORD,
      font: this.state.fontSelected.value,
      max_font_size: `${this.state.fontSize}px`,
    };
    const params = this.objToQueryParam(details) + "&" + this.ArrayToURL(boxes);
    console.log(params);
    const response = await fetch(
      "https://api.imgflip.com/caption_image?" + params
    );
    const data = await response.json();
    if (data.success) {
      console.log(data.data);
      this.props.memeImageGenerated(data.data.url);
    } else {
      console.log("There is an error in fetch");
    }
  }

  handleChange = (event, index) => {
    event.persist();
    const { boxes } = this.state;
    const itemPresent = boxes.some((el) => el.id === index);
    if (!itemPresent) {
      this.setState(
        (prevState) => {
          return {
            boxes: prevState.boxes.concat({ text: "", id: index }),
          };
        },
        () => {
          this.state.boxes[index].text = event.target.value;
        }
      );
    } else {
      boxes[index].text = event.target.value;
    }
  };

  handleFontChange = (fontSelected) => {
    this.setState({ fontSelected });
  };

  handleFontSize = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      fontSize: value,
    });
  };

  getLayoutTemplate = (index) => {
    return (
      <React.Fragment>
        <div id={index}>
          <input
            key={index}
            className="form-control"
            required
            placeholder={`Enter text ${index}`}
            onChange={(e) => this.handleChange(e, index)}
          />
          <br />
        </div>
      </React.Fragment>
    );
  };
  render() {
    const { box_count } = this.props.memeSelected;
    const { boxes, fontSelected, fontSize } = this.state;
    let elements = [];
    for (var i = 0; i < box_count; i++) {
      elements.push(this.getLayoutTemplate(i));
    }
    return (
      <form>
        <div>{elements}</div>
        <div className="form-group">
          <Select
            value={fontSelected}
            onChange={this.handleFontChange}
            placeholder="Select Font"
            options={options}
          />
        </div>
        <div className="form-group">
          <label>Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={this.handleFontSize}
            min={0}
            max={50}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            placeholder="Select Font"
            onClick={() => this.handleCreateMeme(boxes)}
          >
            Create Meme
          </button>
        </div>
      </form>
    );
  }
}

export default InputText;
