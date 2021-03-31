
export const resolvers = {
	Query: {
		user: (_: any, args: any, ctx: any) => {
			// console.log('args', test)
			// console.log('_', _)
			console.log('---------------------')
			console.log('---------------------')
			console.log('---------------------')
			console.log('---------------------')
			console.log('---------------------')
			console.log('ctx', ctx.res)
			const cookie = ctx.req.res.cookie('test','testing', {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 31,
				sameSite: 'lax'
			});

			console.log('COOKIE', cookie)

			return {
				id: '123456'
			}
		}
	}
};
