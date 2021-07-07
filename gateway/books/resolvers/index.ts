import { getData, setData } from "../services";
import { ulid } from "ulid";
const url = "http://localhost:8000/";

const resolvers = {
  Query: {
    books: async (root: any, args: any, context: any) => {
      const data = await getData(url + "books", context);
      return data;
    },
    authors: async (root: any, args: any, context: any) => {
      if (context.user) {
        const data = await getData(url + "authors", context);
        return data;
      }
      return null;
    },
    book: async (root: any, args: any, context: any) => {
      if (context.user) {
        const data = await getData(url + "books/" + args.id, context);
        return data;
      }
      return null;
    },
    author: async (root: any, args: any, context: any) => {
      if (context.user) {
        const data = await getData(url + "authors/" + args.id, context);
        return data;
      }
      return null;
    },
  },
  Mutation: {
    addBook(root: any, args: any, context: any) {
      const book = { id: ulid(), ...args.bookInput };
      return setData(url + "books", book, context);
    },
  },
  Book: {
    async author(root: any, args: any, context: any) {
      const data = await getData(url + "authors/" + root.authorId, context);
      return data;
    },
  },
  Author: {
    async books(root: any, args: any, context: any) {
      const data = await getData(url + "books?authorId=" + root.id, context);
      return data;
    },
  },
};

export default resolvers;
