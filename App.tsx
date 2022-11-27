import { TailwindProvider } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import utilities from "./tailwind.json";
import RootNavigator from "./src/navigator/RootNavigator";

const client = new ApolloClient({
  uri: "http://localhost:5001/api/dusty-gopher/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - Tailwind provider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
