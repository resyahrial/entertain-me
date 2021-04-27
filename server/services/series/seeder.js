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
    id: 10759,
    name: "Action & Adventure",
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
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

function getData(page) {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?${queries.join("&")}&page=${page}`
  );
}

function seed() {
  client
    .connect()
    .then((_) =>
      client.db("db_entertainme").collection("tvseries").deleteMany({})
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
            title: el.name,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`,
            overview: el.overview,
            popularity: el.popularity,
            tags: el.genre_ids.map(
              (id) => genres.filter((genre) => genre.id === id)[0].name
            ),
          };
        });
      return client
        .db("db_entertainme")
        .collection("tvseries")
        .insertMany(data);
    })
    .then((_) => {
      console.log("seeding done");
      client.close();
    })
    .catch((err) => console.log(err));
}

seed();
