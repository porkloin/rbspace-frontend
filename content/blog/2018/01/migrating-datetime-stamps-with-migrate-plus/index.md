---
title: "Migrating Datetime Stamps with Migrate Plus"
date: "2018-01-30T23:00:20.000Z"
description: "Migrating Datetime Stamps with Migrate Plus"
featuredImage: ../../../images/code.png
---

A quick snippet on migrating other formats of datetime strings into Drupal 8:

```yaml
  created:
    plugin: format_date
    from_format: 'Y-m-d\TH:i:s+'
    to_format: 'U'
    timezone: 'America/Los_Angeles'
    settings:
      validate_format: false
    source: created
  changed:
    plugin: format_date
    from_format: 'Y-m-d\TH:i:s+'
    to_format: 'U'
    timezone: 'America/Los_Angeles'
    settings:
      validate_format: false
    source: updated
```

This will bring in values for node creation and last update (assuming source fields defined as "created" and "updated") using the format_date plugin. The example snippets in Drupal's documentation are based largely around having date fields as the target of migration, which will take a format such as 'Y-m-d\TH:i:s', whereas the created/changed values want a unix epoch string, as denoted with 'U'.