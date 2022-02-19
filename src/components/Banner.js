import axios from "axios";
import React, { Component } from "react";

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      currPage: 1,
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=b7f6d486de2c687454f11c1c8b85dd6f&page=${1}`
    );
    let data = res.data;
    this.setState({
      movie: [...data.results],
    });
  }

  render() {
    let x = this.state.movie;
    return (
      <>
        {this.state.movie.length === 0 ? (
          <div class="spinner-border" role="status"></div>
        ) : (
          <div className="card banner-card container-fluid">
            <img
              src={`https://image.tmdb.org/t/p/original/${this.state.movie[0].backdrop_path}`}
              className="card-img-top banner-image"
              alt="..."
            />
            <div className="card-body">
              <h1 className="">
                {this.state.movie[0].original_title ||
                  this.state.movie[0].original_name}
              </h1>
            </div>
          </div>
        )}
      </>
    );
  }
}
