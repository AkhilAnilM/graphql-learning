import nodefetch from "node-fetch";
import { ApolloError } from "apollo-server";

export const getData = async (url: any, context: any) => {
  if (context.user) {
    try {
      const response = await nodefetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new ApolloError("Unauthorized user");
  }
};

export const setData = async (url: any, data: any, context: any) => {
  if (context.user) {
    try {
      const response = await nodefetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new ApolloError("Unauthorized user");
  }
};
