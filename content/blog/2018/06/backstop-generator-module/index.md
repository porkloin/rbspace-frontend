---
title: "Backstop Generator Module: Easy BackstopJS Configuration Generator for Drupal 8"
date: "2018-06-05T23:00:20.000Z"
description: "Backstop Generator Module: Easy BackstopJS Configuration Generator for Drupal 8"
featuredImage: ../../../images/code.png
---

Visual regression testing is an incredibly helpful tool in any developer's toolbox, making it possible to programmatically check for unexpected CSS changes on a given website.

One of the most time consuming parts of running visual regression tests with BackstopJS, however, is building an exhaustive configuration file that includes enough Backstop "scenarios" for a lot of the content on a site.

In pursuit of simplifying that process, I've created a new Drupal 8 module called ["Backstop Generator"](https://drupal.org/project/backstop_generator). Backstop Generator will help you scaffold out a Backstop configuration file by letting the user select a combination of specific whitelisted pages (i.e. "Homepage", "About us", "Contact"), as well as a predetermined number of random pages to build a representative sample of their site automatically.

For more info on installation and use, [check out the project page on Drupal.org](https://drupal.org/project/backstop_generator).

And for more info on BackstopJS broadly, [check out my recent talk from TexasCamp about BackstopJS, Backstop Generator, and visual regression testing.](/2018/05/texas-camp-visual-regression-talk)