import { gql } from "apollo-server";

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
    name: String
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
    title: String!
    authorId: ID!
    coverImage: String
    ISBN: String
    pages: String
    language: String
    description: String
    avgRating: String
    totalReviews: String
  }
`;

export default typeDefs;