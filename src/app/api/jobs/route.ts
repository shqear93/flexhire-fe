import createEnvironment from '@/config/relayEnvironment'; // Adjust the import path as necessary
import {fetchQuery, graphql} from 'relay-runtime';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import _ from "lodash";

export async function GET() {


    const session = await getServerSession(options);

    if (_.isEmpty(session)) return Response.json({
        error: "You must be signed in to view the protected content on this page.",
    });

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


    let token = 'here we need to retrieve the token from the session object.'

    const environment = createEnvironment(token);

    const data = await fetchQuery(environment, graphQuery, {}).toPromise();

    return Response.json(data);
}