---
title: "Field Notes: Skip on Value Plugin in Migrate Plus 8.4.x"
date: "2018-01-20T23:00:00.000Z"
description: "Field Notes: Skip on Value Plugin in Migrate Plus 8.4.x"
featuredImage: ../../../images/code.png
---

Here's a common use-case for a Drupal 8 migration:

I want to migrate all of the data from an existing type of content (let's say Blog Posts) from a legacy database, but I want to leave behind any posts with a certain value in the "title" field (let's say Embarrassing Hacky Hacks).

In Drupal 7 we might have implemented something like prepareRow(), where we could step in during the processing of each row and do some manipulation of the source data. That's all well and good, and, in fact, we can still use prepareRow() as a process plugin in Drupal 8, but if all we're looking to do is pass over a row when a certain value exists, it's a tad bit heavy-handed for us to write our own process plugin just for the sake of checking for the existence of a value.

The Migrate Plus module's skip_on_value process plugin (available only on 8.4.x+) does exactly that, and comes as a pre-built process plugin exposed for us to use in any of our migrations. Gone are the days of needing to roll your own process plugin to skip rows!

To implement, simply declare skip_on_value as the plugin for a process field in your migration YML file, as seen below:

```yaml
# Process plugin
process:
  # Node type (bundle)
  type:
    plugin: default_value
    default_value: article
  #...
  title:
    plugin: skip_on_value
    method: row
    equals: true
    value:
      - Embarrassing Hacky Hacks
    source: title
```
Let's walk through what this does. First, this needs to be implemented in the process step of our migration YML file. On our given field ("field_tags:"), we use the following:

plugin: skip_on_value declares that we want to use Migrate Plus' skip on value plugin (duh) 
method: row says that we want to skip the entire row or record (the blog post doesn't get migrated) if we match our given value. This can also take process instead of row, which would mean it only skips the value ("title" field won't get filled with Embarrassing Hacky Hacks), but the blog post does get migrated.
equals: true defines our logic – if any of the values in the value section are met, they get checked for equivalency. This can also be set as not_equals: true to negate the condition.
value: takes an array of values to match against. This has to be structured as an array (indented with new lines led by a "-".
source: title the key of the source of the data that we're handling in this field.
Here's another brief snippet that shows some of the other options in use:

```yaml
process:
  field_author:
    plugin: skip_on_value
    method: process
    value: Lex Luthor
    source: author
```
the example above would still import any articles written by author "Lex Luthor" but without putting his name into the author field.

Note: this new plugin is on the 8.4.x branch only. A default "composer require drupal/migrate_plus" will give you a version constraint of "migrate_plus^2.0", which will select the 8.2.x branch. There are also some major changes to the 8.4.x branch, so upgrading to 8.4.x may break existing migrations. Upgrade at your own risk!