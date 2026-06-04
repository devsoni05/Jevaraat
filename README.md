# Jevaraat
Jevaraat is a jewellery e-commerce and gold services platform, with proper roles based access.

## Render SPA routing

Both React frontends use browser-based client routing. On Render, each static site needs a rewrite rule so refreshing routes such as `/Cart` or `/Inventory` serves the app shell instead of returning Render's 404 page.

The root `render.yaml` defines this for both static sites:

- Source: `/*`
- Destination: `/index.html`
- Type: `Rewrite`

If the sites were created manually in Render instead of from the blueprint, add the same rule in each service under **Redirects/Rewrites**.
