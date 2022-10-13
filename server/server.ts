// noinspection ES6PreferShortImport

import express from 'express';
import path from 'path';
import fs from 'fs';

import {createServer as createViteServer} from 'vite';
import {getEmails} from '../shared/emails/scripts/server/EmailController';

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
  });
  // use vite's connect instance as middleware
  app.use(viteServer.middlewares);

  app.get('/getEmails', async (req, res) => {
    res.json(await getEmails(1, 10));
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
      const {render} = await viteServer.ssrLoadModule(
        path.resolve(root, 'client/entry-server.tsx')
      );

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);
      //TODO: Read about server rendering and the difference here between client and server rendering
      /*
            Render a React element to its initial HTML. This should only be used on the server. React will return an HTML
            string. You can use this method to generate HTML on the server and send the markup down on the initial request
            for faster page loads and to allow search engines to crawl your pages for SEO purposes.
            If you call ReactDOM.hydrate() on a node that already has this server-rendered markup, React will preserve it
            and only attach event handlers, allowing you to have a very performant first-load experience.
             */

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace('<!--ssr-outlet-->', appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({'Content-Type': 'text/html'}).end(html);
    } catch (e: any) {
      viteServer.ssrFixStacktrace(e);
      console.log(e.stack);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      viteServer.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT);
  console.log(`Server running at http://localhost:${PORT}`);
}

createServer();
