import createEnvironment from '@/config/relayEnvironment'; // Adjust the import path as necessary
import {fetchQuery, graphql} from 'relay-runtime';

export async function GET() {
    const graphQuery = graphql`
        query routeJobsQuery {
            currentUser {
                id
                email
                name
                avatarUrl
            }
        }
    `;

    const environment = createEnvironment();

    const data = await fetchQuery(environment, graphQuery, {}).toPromise();

    return Response.json(data);
}