/* eslint-disable new-cap */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import cors from 'cors';
import helmet from 'helmet';

import authenticationService from './microservices/authentication';

const app = express();

class DataSource extends RemoteGraphQLDataSource {
	willSendRequest({ request, context }: any) {
		// pass info from the context to underlying services
		// request.http.headers.set('user-token', context.userToken);
	}
}

const PORT = process.env.PORT || 4000;

(async () => {
	// eslint-disable-next-line no-console
	console.log('');

	const microservices = await Promise.all([
		authenticationService(),
	]);
	// eslint-disable-next-line no-console
	console.log('\nAll microservices successfully loaded!');

	const gateway = new ApolloGateway({
		serviceList: microservices,
		buildService: ({ url }) => new DataSource({ url }),
	});

	const server = new ApolloServer({
		gateway,
		subscriptions: false,
		context: (ctx) => {
			return ctx
		},
	});

	app.use(express.json(), helmet())
	server.applyMiddleware({ app, path: '/', cors: false });
})();

app.listen({ port: PORT }, () => {
	console.log(
		`🚀 Federated Microservices ready at http://localhost:${PORT}\n`,
	);
})