import { mToken, baseURL as uri } from "@/constants";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: mToken ? ["Bearer", mToken].join(" ") : "",
    },
  };
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default apolloClient;
