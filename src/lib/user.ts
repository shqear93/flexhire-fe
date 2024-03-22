import {fetchQuery, graphql} from "relay-runtime";
import createEnvironment from "@/config/relayEnvironment";
import User from "@/interfaces/User";

export function getUserByToken(token: string): Promise<User | null> {
  const graphQuery = graphql`
      query routeDashboardCurrentUserQuery {
          currentUser {
              id
              email
              name
              avatarUrl
          }
      }
  `;

  const environment = createEnvironment(token);
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo: any = await fetchQuery(environment, graphQuery, {}).toPromise();
      resolve(userInfo.currentUser as User);
    } catch (error) {
      reject(error);
    }
  });
}
