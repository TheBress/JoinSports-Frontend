import { ApolloClient, InMemoryCache,HttpLink,ApolloLink } from "@apollo/client";



const httpLink = new HttpLink({ uri: "http://localhost:1337/graphql" });

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });


  export const client = new ApolloClient({
    link: authMiddleware(localStorage.getItem("token_JoinSports")).concat(httpLink),
    cache: new InMemoryCache(),
  });