---
title: "Proxying BrowserSync in a Lando Local Dev Environment"
date: "2018-02-12T23:00:20.000Z"
description: "Proxying BrowserSync in a Lando Local Dev Environment"
featuredImage: ../../../images/code.png
---

I love Lando – it's one of the easiest to use docker-based local development solutions I've ever tried, and it has an amazing amount of extensibility for front-end tooling. I also love BrowserSync for live reloading and testing sites across various devices. However, Lando didn't have a well-documented way of integrating with BrowserSync.

Below is a sample .lando.yml file that will install all your front-end tooling inside of Lando and then additionally exposes a lando gulp command which will trigger your default gulp task. Lastly, it sets up some port forwarding that bridges your container so that localhost:3000 still returns your BrowserSync proxy:

```yaml
name: mysite
recipe: pantheon
config:
  framework: drupal8
  env: myenv
  site: mysite
  id: somerandomhashthatwillbegenerated
services:
  node:
    type: node:6.10
    build:
      - "cd $LANDO_MOUNT/path/to/your/theme && npm install"
    overrides:
      services:
        ports:
          - 3000:3000
          - 3001:3001
    globals:
      gulp-cli: "latest"
tooling:
  npm:
    service: node
  node:
    service: node
  gulp:
    service: node
```

The services section has the sauce here: first, we define node, with type containing the exact definition of what service we want Lando to build. Then we define a build command, which gets run when the container gets built – in this case, it moves to our theme directory and runs npm install. Then we have overrides, which has a services > ports section, which asks which ports from this container we want to expose. Lastly, we define some tooling, which are basically commands that lando will respond to (lando gulp) and which service container those commands should be routed to. So in this case, our gulp command gets routed to our node service.

And best of all, this configuration is entirely portable, so other members of your team will have access to your tooling once you commit the `.lando.yml` changes to source control :)