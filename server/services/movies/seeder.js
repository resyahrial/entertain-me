require("dotenv").config();
const axios = require("axios");

const { client } = require("./config/mongodb");

const options = {
  api_key: process.env.TMDB_API_KEY,
  language: "en-US",
  sort_by: "popularity.desc",
  include_adult: false,
  include_video: false,
  "release_date.gte": 2010,
  "vote_count.gte": 1000,
};
const queries = Object.keys(options).map((key) => `${key}=${options[key]}`);
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

function getData(page) {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?${queries.join(
      "&"
    )}&page=${page}`
  );
}

function seed() {
  client
    .connect()
    .then((_) =>
      client.db("db_entertainme").collection("movies").deleteMany({})
    )
    .then((_) => {
      return Promise.all([getData(1), getData(2), getData(3)]);
    })
    .then((res) => {
      const data = res
        .map((el) => el.data.results)
        .flat()
        .map((el) => {
          return {
            title: el.title,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`,
            overview: el.overview,
            popularity: el.popularity,
            tags: el.genre_ids.map(
              (id) => genres.filter((genre) => genre.id === id)[0].name
            ),
          };
        });
      return client.db("db_entertainme").collection("movies").insertMany(data);
    })
    .then((_) => {
      console.log("seeding done");
      client.close();
    })
    .catch((err) => console.log(err));
}

seed();
