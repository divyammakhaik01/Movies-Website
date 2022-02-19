import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Movie_Info from "./Movie_Info";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favourate: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=b7f6d486de2c687454f11c1c8b85dd6f&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
    this.handleFavourateState();
  }

  // Change movie

  changeMovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=b7f6d486de2c687454f11c1c8b85dd6f&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
    // console.log("res : ", data);
  };

  // Next Page
  handleNextPage = () => {
    let temp_arr = [];
    for (let i = 0; i < this.state.parr.length + 1; i++) {
      temp_arr.push(i + 1);
    }

    this.setState(
      {
        currPage: this.state.currPage + 1,
        parr: [...temp_arr],
      },
      this.changeMovie
    );
  };

  // Prev Page

  handlePrevPage = () => {
    if (this.state.currPage !== 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovie
      );
    }
  };

  // Selected Page

  handlePageSelect = (e) => {
    this.setState(
      {
        currPage: e.target.id,
      },
      this.changeMovie
    );
  };

  // handle favourate state

  handleFavourateState = () => {
    let old_data = JSON.parse(localStorage.getItem("movies-store") || "[]");
    let temp_arr = [];
    for (let value = 0; value < old_data.length; value++) {
      temp_arr.push(old_data[value].id);
    }

    this.setState({
      favourate: [...temp_arr],
    });
  };

  // handle favourate

  handleFavourate = (e) => {
    let old_data = JSON.parse(localStorage.getItem("movies-store") || "[]");

    if (this.state.favourate.includes(e.id)) {
      old_data = old_data.filter((movie) => movie.id != e.id);
    } else {
      old_data.push(e);
    }

    localStorage.setItem("movies-store", JSON.stringify(old_data));
    this.handleFavourateState();
    console.log("new_data :", old_data);
  };

  handleDiscription = (ele) => {
    console.log("enter", ele);
  };

  render() {
    return (
      <>
        {this.state.movies === "" ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">...........</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">Trending</h3>
            <div className="movies-list ">
              {this.state.movies.map((ele) =>
                this.state.favourate.includes(ele.id) ? (
                  <div className="card movies-card " id={ele.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`}
                      className="card-img-top movies-image"
                      alt="..."
                    />
                    <div className="card-body">
                      <h1
                        className="card-title movies-title "
                        onClick={() => this.handleDiscription(ele)}
                      >
                        {ele.original_title || ele.original_name}
                      </h1>

                      {this.state.hover === "" && (
                        <button
                          className="btn btn-danger w-100 bg-danger"
                          onClick={() => this.handleFavourate(ele)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card movies-card " id={ele.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`}
                      className="card-img-top movies-image"
                      alt="..."
                    />
                    <div className="card-body">
                      <h1
                        className="card-title movies-title "
                        onClick={() => this.handleDiscription(ele)}
                      >
                        {ele.original_title || ele.original_name}
                      </h1>
                      {this.state.hover === "" && (
                        <button
                          className="btn btn-info w-100"
                          onClick={() => this.handleFavourate(ele)}
                        >
                          Add To Favourate
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* pagination */}

        <nav className="container my-5 d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={this.handlePrevPage}>
                Previous
              </a>
            </li>
            {this.state.parr.map((ele) => (
              <li className="page-item">
                <a
                  className="page-link"
                  id={ele}
                  onClick={this.handlePageSelect}
                >
                  {ele}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" onClick={this.handleNextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
