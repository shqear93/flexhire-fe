import {ObservableFromValue} from "relay-runtime/lib/network/RelayObservable";
import {GraphQLResponse, UploadableMap} from "relay-runtime/lib/network/RelayNetworkTypes";
import {RequestParameters, Variables} from "relay-runtime";

export type CustomFetchFunction = (
  request: RequestParameters,
  variables: Variables,
  token?: string,
) => ObservableFromValue<GraphQLResponse>;
