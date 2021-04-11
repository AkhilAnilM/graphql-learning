const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");
const ULID = require("ulid");
const url = "http://localhost:8000/";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: Author
    coverImage: String
    ISBN: String
    pages: String
    language: String
    description: String
    avgRating: String
    totalReviews: String
  }

  type Author {
    id: ID!
    first_name: String
    profilePicture: String
    totalFollowers: String
    description: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    addBook(bookInput: BookInput): Book
  }

  input BookInput {
    title: String
    authorId: String
    coverImage: String
    ISBN: String
    pages: String
    language: String
    description: String
    avgRating: String
    totalReviews: String
  }
`;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const setData = async (url, data) => {
  try {
    console.log("data", data);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    console.log("setDataJson", json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

const resolvers = {
  Query: {
    books: async () => {
      const data = await getData(url + "books");
      return data;
    },
    authors: async () => {
      const data = await getData(url + "authors");
      return data;
    },
    book: async (_, { id }) => {
      const data = await getData(url + "books/" + id);
      return data;
    },
    author: async (_, { id }) => {
      const data = await getData(url + "authors/" + id);
      return data;
    },
  },
  Mutation: {
    addBook(parent, { bookInput }) {
      const book = { id: ULID.ulid(), ...bookInput };
      return setData(url + "books", book);
    },
  },
  Book: {
    async author(parent) {
      const data = await getData(url + "authors/" + parent.authorId);
      return data;
    },
  },
  Author: {
    async books(parent) {
      const data = await getData(url + "books?authorId=" + parent.id);
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
