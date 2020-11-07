# Deno website em português

https://deno-pt.vercel.app/

## History

This is a rewrite of the Deno website it will combine the code in
https://github.com/denoland/deno/tree/f96aaa802b245c8b3aeb5d57b031f8a55bb07de2/website
and https://github.com/denoland/registry and have faster deployment.

This is written in React / TailwindCSS / Vercel / CloudFlare Workers. Not in
Deno. Ideally this could be ported to Deno at some point but we are in need of a
new website and dogfooding takes too long. We hope to see this code ported to
Deno with minimal developer flow interrupted (in particular, we need the ability
to listen for FS events and reload the web server).

## Image License

These Deno images are distributed under the MIT license (public domain and free
for use).

- [A graphic for the v1 blog post by @hashrock](https://deno.land/v1.jpg)
