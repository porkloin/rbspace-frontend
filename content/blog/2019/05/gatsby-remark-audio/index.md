---
title: 'Gatsby Plugin: gatsby-remark-audio'
date: '2019-05-22T23:00:20.000Z'
description: 'Gatsby Plugin: gatsby-remark-audio'
featuredImage: ../../../images/code.png
published: true
---

In the process of building a new website for my weekly [Chiptune radio show - Power Glove](https://www.powerglove.cool/), I immediately knew that with the kind of cadence of content release (weekly) and the limited budget (both in cash and time) I had for maintaining and hosting my site, it was obvious that I would use Gatsby to develop the new site.

Unlike other sites I've built with Gatsby in the past, however, I decided that this time I wouldn't leverage a CMS at all for the content in the website, instead opting to manage all of the content in markdown files.

This was great until I realized that there was a huge flaw in my plan – there was no Gatsby remark plugin for the HTML5 `<audio>` element!

As any good developer would, I set out to build a solution for my problem. I ultimately ended up forking the [`gatsby-remark-video`](https://www.gatsbyjs.org/packages/gatsby-remark-video/) plugin and repurposing it to handle audio files.

## From the README:

Forked from gatsby-remark-video
This is a Gatsby remark plugin that creates HTML5 audio tags from local or remote audio sources.

### Installation
npm install gatsby-remark-audio

###Usage

In your markdown:
```
`audio: /static/test.mp3`
```
```
`audio: https://www.mytestaudiosource.com/test.mp3`
```

###Configuration
Add the following in your gatsby-config.js (must be included under the plugins key on gatsby-transformer-remark)
```
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: 'gatsby-remark-audio',
        options: {
          preload: 'auto',
          loop: false,
          controls: true,
          muted: false,
          autoplay: false
        }
      },
    ...skipped lines
    ]
  }
}
```

