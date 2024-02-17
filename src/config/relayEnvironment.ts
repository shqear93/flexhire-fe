// @ts-ignore
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const HTTP_ENDPOINT = "https://flexhire.com/api/v2";

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      "FLEXHIRE-API-KEY": "nft1v4xbv6miyzjm",
    },
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  })
    // .then((response) => response.json());

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment: Environment | undefined;

const initRelayEnvironment = () => {
  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return createRelayEnvironment();
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = createRelayEnvironment();
  }

  return relayEnvironment;
}

export default initRelayEnvironment;
