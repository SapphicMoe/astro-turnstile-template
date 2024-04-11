# Astro + Turnstile Template
This is a template for integrating [Astro][astro] with [Cloudflare Turnstile][tailwindcss].

# Prerequisites

## Filling out values
Rename the `.env.example` file to `.env` and fill out these two fields:

```
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_TOKEN=
```

You can get the site key and secret token values by adding your site to Cloudflare's [Turnstile page](https://dash.cloudflare.com/sign-up?to=/:account/turnstile).

## SSR
POST requests are not available for a static site, and thus, the `/verify` API route in the `src/pages/api/` folder is not prefetched and requires you to have an SSR adapter.

Only the API route requires SSR - the rest of the pages are prefetched using Astro's hybrid rendering feature!

In this case, the SSR adapter used here is the Vercel adapter. If you want to use this template in a Node.js, Cloudflare, or other environment, check Astro's [SSR adapters page](https://docs.astro.build/en/guides/server-side-rendering/). 

# Usage
## Commands

```bash
# install dependencies
npm install 

# create a local environment
npm run dev

# build site
npm run build
```

## Turnstile

We add Cloudflare's Turnstile API script in order to interact with their service.
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer is:inline />
```

The `is:inline` directive is used to tell Astro not to process or optimize the contents. Read more in Astro's [template directives references page](https://docs.astro.build/en/reference/directives-reference/#isinline).

The HTML is then scanned for elements that have a `cf-turnstile` class name.
```jsx
<div class="cf-turnstile" data-sitekey={import.meta.env.TURNSTILE_SITE_KEY}></div>
```
If you want to configure the Turnstile widget, check the Cloudflare Turnstile [Configurations](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) page.

## Form
Modify the form inputs used in [src/pages/index.astro](/src/pages/index.astro) and [src/pages/api/verify.ts](/src/pages/api/verify.ts) files as needed.

# License
This repository is licensed under the [MIT][license] license.

© 2024 Chloe Arciniega.

[astro]: https://astro.build
[tailwindcss]: https://tailwindcss.com
[pnpm-workspaces]: https://pnpm.io/workspaces

[license]: /LICENSE