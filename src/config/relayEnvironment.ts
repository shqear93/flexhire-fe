import {
  Environment,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import {CustomFetchFunction} from "@/types/CustomFetchFunction";

const HTTP_ENDPOINT = "https://flexhire.com/api/v2";

const fetchFn: CustomFetchFunction = async (request, variables, token) => {

  const headers: { [key: string]: string } = {
    "Accept": "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["FLEXHIRE-API-KEY"] = token;
  }

  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  })

  return await resp.json();
};

function createRelayEnvironment(token: string) {
  return new Environment({
    network: Network.create((request, variables) => fetchFn(request, variables, token)),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment: Environment | undefined;

const initRelayEnvironment = (token: string) => {
  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return createRelayEnvironment(token);
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = createRelayEnvironment(token);
  }

  return relayEnvironment;
}

export default initRelayEnvironment;
