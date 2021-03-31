import { importSchema } from 'graphql-import';
import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { resolvers } from './resolvers/resolvers';

const NAME = 'authentication';
const PORT = 4001;

const microservice = async () => {
	const typeDefs = await importSchema(`${__dirname}/auth.graphql`, {});

	const server = new ApolloServer({
		schema: buildFederatedSchema([
			{
				typeDefs: gql(typeDefs),
				resolvers,
			},
		]),
		context: ({ req, res }: any) => {
			return { req, res };
		},
		playground: false,
	});

	const { url } = await server.listen({ port: PORT });

	// eslint-disable-next-line no-console
	console.log(`🚀  Microservice "${NAME}" ready at ${url}`);

	return { name: NAME, url };
};

export default microservice;
