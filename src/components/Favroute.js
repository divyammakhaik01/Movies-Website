import React, { Component } from "react";
import { movies } from "./GetMovies";
import axios from "axios";

export default class Favroute extends Component {
  constructor() {
    super();
    this.state = {
      genre: [],
      current_genra: "All Generes",
      movie: [],
      currPage: 0,
      search: "",
      sort_order_popularity: "",
      sort_order_rating: "",
      limit: 5,
    };
  }

  async componentDidMount() {
    // const res = await axios.get(
    //   `https://api.themoviedb.org/3/trending/all/day?api_key=b7f6d486de2c687454f11c1c8b85dd6f`
    // );
    // let data = res.data;
    let data = JSON.parse(localStorage.getItem("movies-store") || "[]");

    this.setState({
      movie: [...data],
    });
  }

  handle_genra_select = (ele) => {
    this.setState({
      current_genra: ele.target.value,
    });
    this.render();
  };

  handle_popularity = (e) => {
    this.setState({
      sort_order_popularity: e,
      sort_order_rating: "",
    });
  };

  handle_rating = (e) => {
    this.setState({
      sort_order_rating: e,
      sort_order_popularity: "",
    });
  };

  handle_next_page = () => {
    this.setState({
      currPage: this.state.currPage + 1,
    });
    this.render();
  };

  handle_prev_page = () => {
    this.setState({
      currPage: this.state.currPage - 1,
    });
    this.render();
  };

  handle_page_no = (val) => {
    this.setState({
      currPage: val - 1,
    });
    this.render();
  };

  handle_limit = (e) => {
    this.setState({
      limit: e,
    });
  };

  handle_delete = (ele) => {
    console.log("-", ele.id);
    let newarr = [];
    newarr = this.state.movie.filter((e) => e.id !== ele.id);

    this.setState({
      movie: [...newarr],
    });
    localStorage.setItem("movies-store", JSON.stringify(newarr));

    // this.render();
  };

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
      10759: "Drama",
      10765: "Drama",
    };
    let temp_movie_after_search = [];
    let temp_genras = [];
    let temp_movie = [];
    let index_array = [];

    this.state.movie.forEach((ele) => {
      temp_movie.push(ele);
    });

    // limit setting
    if (Number(this.state.limit) <= 0) {
      temp_movie = [];
    }
    if (Number(this.state.limit >= this.state.movie.length)) {
      temp_movie = this.state.movie;
    } else {
      let total = Math.ceil(temp_movie.length / Number(this.state.limit));

      // let temp = total;
      let x = temp_movie.filter(
        (ele) => genreids[ele.genre_ids[0]] === this.state.current_genra
      );
      if (this.state.current_genra === "All Generes") {
        for (let i = 0; i < total; i++) {
          index_array[i] = i + 1;
        }
      } else {
        let total1 = Math.ceil(x.length / Number(this.state.limit));

        for (let i = 0; i < total1; i++) {
          index_array[i] = i + 1;
        }
      }

      let start_index = Number(
        Number(this.state.currPage) * Number(this.state.limit)
      );

      let end_index = Number(Number(start_index) + Number(this.state.limit));

      temp_movie = temp_movie.slice(start_index, end_index);
    }

    // Sorting
    if (this.state.sort_order_popularity === "DOWN") {
      temp_movie.sort((a, b) => Number(a.popularity) - Number(b.popularity));
    } else if (this.state.sort_order_popularity === "UP") {
      temp_movie.sort((a, b) => Number(b.popularity) - Number(a.popularity));
    } else if (this.state.sort_order_rating === "DOWN") {
      temp_movie.sort(
        (a, b) => Number(a.vote_average) - Number(b.vote_average)
      );
    } else if (this.state.sort_order_rating === "UP") {
      temp_movie.sort(
        (a, b) => Number(b.vote_average) - Number(a.vote_average)
      );
    }
    // searching
    if (this.state.search !== "") {
      this.state.movie.forEach((e) => {
        if (
          e.original_title !== undefined &&
          (this.state.current_genra === genreids[e.genre_ids[0]] ||
            this.state.current_genra === "All Generes")
        ) {
          if (
            e.original_title
              .toLowerCase()
              .includes(this.state.search.toLowerCase())
          ) {
            temp_movie_after_search.push(e);
          }
        }
      });
    }
    // set genras
    temp_genras.push("All Generes");
    this.state.movie.forEach((obj) => {
      if (!temp_genras.includes(genreids[obj.genre_ids[0]])) {
        if (genreids[obj.genre_ids[0]] !== undefined)
          temp_genras.push(genreids[obj.genre_ids[0]]);
      }
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    return (
      <>
        <div className="main">
          <div className="row mx-1">
            <div className="col-3 ">
              <ul class="list-group favroute-genres">
                {temp_genras.map((obj) =>
                  obj === this.state.current_genra ? (
                    <button
                      className="list-group-item shadow-sm "
                      style={{
                        backgroundColor: "#2422c6",
                        color: "white",
                      }}
                      value={obj}
                      onClick={this.handle_genra_select}
                    >
                      {obj}
                    </button>
                  ) : (
                    <button
                      className="list-group-item shadow-sm "
                      value={obj}
                      onClick={this.handle_genra_select}
                      style={{
                        backgroundColor: "white",
                        color: "#2422c6",
                        fontWeight: "bold",
                      }}
                    >
                      {obj}
                    </button>
                  )
                )}
              </ul>
            </div>
            {/* Movies display  */}
            <div className="col-9">
              {/* input */}
              <div className="row mx-1">
                <input
                  className="col"
                  type="text"
                  placeholder="Search here"
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
                <input
                  className="col"
                  type="number"
                  placeholder="Select number of items"
                  value={
                    (Number(this.state.limit) <= 0 && "") ||
                    (Number(this.state.limit > this.state.movie.length) &&
                      this.state.movie.length) ||
                    this.state.limit
                  }
                  onChange={(e) => this.handle_limit(e.target.value)}
                />
              </div>
              {/* table */}
              <div className="row mx-1">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          class="btn fas fa-sort-up "
                          onClick={() => this.handle_popularity("UP")}
                        />
                        Popularity
                        <i
                          class="btn fas fa-sort-down"
                          value="DOWN"
                          onClick={() => this.handle_popularity("DOWN")}
                        />
                      </th>
                      <th scope="col">
                        <i
                          class="btn fas fa-sort-up "
                          onClick={() => this.handle_rating("UP")}
                        />
                        Rating
                        <i
                          class="btn fas fa-sort-down"
                          value="DOWN"
                          onClick={() => this.handle_rating("DOWN")}
                        />
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {temp_movie.length >= 1 &&
                      temp_movie.map((ele) =>
                        (genreids[ele.genre_ids[0]] ===
                          this.state.current_genra ||
                          this.state.current_genra === "All Generes") &&
                        (temp_movie_after_search.includes(ele) ||
                          this.state.search === "") ? (
                          <tr>
                            <th>
                              <img
                                src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`}
                                width="100rem"
                                alt=""
                                srcset=""
                              />
                            </th>
                            <th scope="row">
                              {/* {console.log(" -> ", ele)} */}
                              {ele.original_title || ele.original_name}
                            </th>
                            <td>{genreids[ele.genre_ids[0]]}</td>
                            <td>{ele.popularity}</td>
                            <td>{ele.vote_average}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger bg-danger"
                                onClick={() => this.handle_delete(ele)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ) : (
                          <div></div>
                        )
                      )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handle_prev_page}>
                      Previous
                    </a>
                  </li>
                  {index_array.map((value) => (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => this.handle_page_no(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handle_next_page}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
