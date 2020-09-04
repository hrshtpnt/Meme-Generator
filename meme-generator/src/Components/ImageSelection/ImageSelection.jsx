import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./ImageSelection.css";

class ImageSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allMemes: [],
      imageSelected: false,
      activeLink: null,
    };
  }

  getThumbnailImg = (meme) => {
    if (meme.url.endsWith(".png")) {
      meme.url = meme.url.replace(".png", ".jpg");
    }
    let urlSplit = meme.url.split(".com");
    return urlSplit[0] + ".com/2" + urlSplit[1];
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            this.setState({
              isLoaded: true,
              allMemes: result.data.memes.map((meme) => ({
                ...meme,
                isActive: true,
                thumbnailImg: this.getThumbnailImg(meme),
              })),
            });
          } else {
            console.log(`Success ${result.success} while fetching the memes`);
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  imageSelected(selectedMeme) {
    this.setState({
      activeLink: selectedMeme.id,
      imageSelected: true,
    });
    localStorage.setItem("selectedMeme", JSON.stringify(selectedMeme));
  }

  getImagesCards = () => {
    const { allMemes } = this.state;
    return allMemes.map((meme, index) => {
      return (
        <React.Fragment key={index}>
          <div className="card-layout">
            <a className="card-name-link" href={meme.url} target="_blank">
              {meme.name}
            </a>
            <img
              className={`image-small  ${
                meme.id === this.state.activeLink ? "active" : ""
              }`}
              src={meme.thumbnailImg}
              alt="meme_img"
              onClick={() => this.imageSelected(meme)}
            />
          </div>
        </React.Fragment>
      );
    });
  };

  render() {
    const { imageSelected } = this.state;
    return (
      <React.Fragment>
        {imageSelected && (
          <Redirect
            to={{
              pathname: "/stepTwo",
            }}
          />
        )}
        <div className="image-selection-div">{this.getImagesCards()}</div>
      </React.Fragment>
    );
  }
}

export default ImageSelection;
