---
title: 'gatsby-source-drupal7 - A Gatsby Source Plugin for Drupal 7'
date: '2019-01-22T23:00:20.000Z'
description: 'Gatsby Source Drupal 7'
featuredImage: ../../../images/code.png
published: true
---

[Gatsby](https://www.gatsbyjs.org) has rapidly become one of the most popular ways to build a decoupled Drupal 8 website. And for good reason, too! Gatsby's performance-first mindset, amazing developer experience, and simple hosting solutions are enough to make any battle-hardened Drupal developer salivate a bit.

Of course, there are a whole host of use cases for serving a Drupal site using Gatsby, but one of the less widely discussed cases is that the CMS your website is hosted on is about to go to end-of-life (EOL) status, meaning it will no longer receive security updates.

When site managers or product owners in the space of Drupal 7 are faced with the looming deadline of D7's EOL, the prospect of a migration to Drupal 8 looms large in their minds. These migrations are notoriously complicated and expensive – largely due to the major changes in Drupal's underlying architecture as they've moved to an Object-Oriented codebase, grafted large parts of the Symfony codebase into Drupal, and all in all vastly rewired the entire CMS.

However, until recently the only supported [Gatsby source plugin](https://www.gatsbyjs.org/plugins/?=source) for Drupal has been [gatsby-source-drupal](https://www.gatsbyjs.org/packages/gatsby-source-drupal/). While the source plugin is great for Drupal 8 users, it doesn't provide any support for Drupal 7 users.

With that in mind, I went ahead and created a fork of `gatsby-source-drupal` and modified it to work with Drupal 7!

The result is distributed as a new Gatsby source plugin called [gatsby-source-drupal7](https://www.gatsbyjs.org/packages/gatsby-source-drupal7/).



##From the readme:

A source plugin for Gatsby that pulls data from Drupal 7.

This source plugin has been forked from gatsby-source-drupal to extend functionality to Drupal 7.

### Requirements:
Drupal 7 site with the following modules installed and enabled:

- [restws](https://www.drupal.org/project/restws)
- [restws\_resource\_discovery](https://www.drupal.org/project/restws_resource_discovery)
- [uuid](https://www.drupal.org/project/uuid)


### Install:
npm install --save gatsby-source-drupal7

### Configuration:
```
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-drupal7`,
      options: {
        baseUrl: `https://live-mydrupal7site.pantheonsite.io/`,
        apiBase: `restws_resource.json`, // optional, defaults to `restws_resource.json`
      },
    },
  ],
}
```
### Auth:
```
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-drupal7`,
      options: {
        baseUrl: `https://live-mydrupal7site.pantheonsite.io/`,
        apiBase: `restws_resource.json`, // optional, defaults to `restws_resource.json`
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
      },
    },
  ],
}
```
### Querying:
```
{
  allNode {
    edges {
      node {
        data {
          title
          created
          body {
            value
          }
        }
      }
    }
  }
}
```

