// noinspection ES6PreferShortImport

import express from 'express';
import path from 'path';
import fs from 'fs';

import {createServer as createViteServer} from 'vite';
import {getEmails} from '../shared/emails/scripts/server/EmailController';
import {ImapDataModel} from '@/shared/emails/models/ImapDataModel';

const PORT = process.env.PORT || 5000;

//https://www.peterweightman.com/posts/2021-05-16-vite-express-server/
//https://vitejs.dev/guide/ssr.html
//https://github.dev/jonluca/vite-typescript-ssr-react

async function createServer(root = process.cwd()) {
	const app = express();

	const viteServer = await createViteServer({
		root,
		logLevel: 'info',
		server: {
			middlewareMode: true,
			watch: {
				// During tests we edit the files too fast and sometimes chokidar
				// misses change events, so enforce polling for consistency
				usePolling: true,
				interval: 100,
			},
		},
		appType: 'custom',
	});
	// use vite's connect instance as middleware
	app.use(viteServer.middlewares);

	app.post('/getEmails', express.json(), async (req, res) => {
		const {startIndex, stopIndex, imapData}: {startIndex: number; stopIndex: number; imapData: ImapDataModel} =
			req.body;
		const emails = await getEmails({from: startIndex, to: stopIndex}, imapData);
		res.json(emails);
	});

	app.get('/api/v1', (req, res) => {
		res.send({message: 'Hello from server!'});
	});

	app.use('/*', async (req, res, next) => {
		const url = req.originalUrl;

		try {
			// 1. Read index.html
			let template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8');

			// 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
			//    also applies HTML transforms from Vite plugins, e.g. global preambles
			//    from @vitejs/plugin-react
			template = await viteServer.transformIndexHtml(url, template);

			// 3. Load the server entry. vite.ssrLoadModule automatically transforms
			//    your ESM source code to be usable in Node.js! There is no bundling
			//    required, and provides efficient invalidation similar to HMR.
			const render = (await viteServer.ssrLoadModule(path.resolve(root, 'client/entry-server.tsx'))).render;

			// 4. render the app HTML. This assumes entry-server.js's exported `render`
			//    function calls appropriate framework SSR APIs,
			//    e.g. ReactDOMServer.renderToString()
			const appHtml = render();

			// 5. Inject the app-rendered HTML into the template.
			let html = template.replace(`<!--ssr-body-->`, appHtml.body);
			html = html.replace(`<!--ssr-head-->`, appHtml.head);

			// 6. Send the rendered HTML back.
			res.status(200).set({'Content-Type': 'text/html'}).end(html);
		} catch (e: any) {
			console.log(e.stack);
			// If an error is caught, let Vite fix the stack trace so it maps back to
			// your actual source code.
			viteServer.ssrFixStacktrace(e);
			next(e);
		}
	});

	return {app};
}

createServer().then(({app}) => {
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
});
