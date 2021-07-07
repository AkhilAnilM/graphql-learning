import { ApolloServer, gql, ApolloError } from "apollo-server";
import depthLimit from "graphql-depth-limit";
import { logger } from "./utils/logger";
const url = "http://localhost:8000/";
import BooksModule from "./books";
import { getUser } from "./utils/helpers";

const server = new ApolloServer({
  modules: [BooksModule],
  context: ({ req, connection }: any) => {
    if (connection) return connection.context;
    const token: any = req.headers.authorization;
    const user = getUser(token);

    if (!token) throw new ApolloError("token missing");

    if (req.body && req.body.operationName === "IntrospectionQuery") return;
    if (req.body) {
      logger.info("Received request", {
        request_body: req.body,
      });
    }

    return {
      user,
    };
  },
  validationRules: [depthLimit(10)],
});

server.listen().then(({ url }: any) => {
  console.log(`Server running on ${url}`);
});
