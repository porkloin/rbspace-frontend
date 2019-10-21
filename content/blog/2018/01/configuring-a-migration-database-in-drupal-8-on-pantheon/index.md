---
title: 'Configuring a Migration Database in Drupal 8 on Pantheon'
date: '2018-01-31T23:00:20.000Z'
description: 'Configuring a Migration Database in Drupal 8 on Pantheon'
featuredImage: ../../../images/code.png
published: true
---

If you come from a largely bare-metal or shared hosting server environment (like myself) you might get a little aggravated at times with the hoops you need to jump through on managed environments like Pantheon.

Most recently, I needed to throw a migration source data into my Pantheon environments so that I could roll back, modify, and re-run my migrations someplace other than my Lando local. However, there are a few limitations to how Pantheon handles things. In a typical local environment on Lando we might have an additional database defined in our settings.php file as such:

```php
  $databases['migrate']['default'] = array (
    'database' => 'mymigration',
    'username' => 'migrationuser',
    'password' => 'migrationpasswordsupersecure',
    'prefix' => '',
    'host' => 'migration-source.mysitename.lndo.site',
    'port' => '6666', //hail santa
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'driver' => 'mysql',
  );
```

However, in Pantheon we can't create a secondary database, and additionally our database credentials are handled via Pressflow. We can peek at how this works by looking at a snippet from the default settings.pantheon.php that comes with any default Drupal 8 install on Pantheon:

```php
/**
 * Override the $databases variable to pass the correct Database credentials
 * directly from Pantheon to Drupal.
 *
 * Issue: https://github.com/pantheon-systems/drops-8/issues/8
 *
 */
if (isset($_SERVER['PRESSFLOW_SETTINGS'])) {
  $pressflow_settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
  foreach ($pressflow_settings as $key => $value) {
    // One level of depth should be enough for $conf and $database.
    if ($key == 'conf') {
      foreach($value as $conf_key => $conf_value) {
        $conf[$conf_key] = $conf_value;
      }
    }
    elseif ($key == 'databases') {
      // Protect default configuration but allow the specification of
      // additional databases. Also, allows fun things with 'prefix' if they
      // want to try multisite.
      if (!isset($databases) || !is_array($databases)) {
        $databases = array();
      }
      $databases = array_replace_recursive($databases, $value);
    }
    else {
      $$key = $value;
    }
  }
}
```

As you can see, the Pressflow settings come in as a JSON object that gets decoded into the $pressflow_settings variable, which then gets iterated over to create our $conf and \$databases variables.

So how do we interject our own database into the mix?

First, we need to visit our [Pantheon dashboard](http://dashboard.pantheon.io/), and get the database connection information for any given environment (top right, below the "Settings" button):

Snag the line from Database > Command Line, which should look something like

`mysql -u pantheon -areallonghash -h dbserver.environmentname.areallonghashagainbutdifferent.drush.in -P 8904 pantheon`

When entered, you'll be dropped into a MySQL prompt. Create a new database:

```
CREATE DATABASE migrate_source;
exit;
```

Then drop your given database dump into that newly created table:

`mysql -u pantheon -areallonghash -h dbserver.environmentname.areallonghashagainbutdifferent.drush.in -P 8904 migrate_source < mysourcedb.sql`

_NOTE:_ the changes at the end of the line - you must replace "pantheon" with the name of the database you just created!

Lastly, we'll return to our settings.php file to intercept the pressflow settings and add another database:

```php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['PRESSFLOW_SETTINGS'])) {
    $pressflow_settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
    $db = $pressflow_settings['databases']['default']['default'];
    $databases['migrate']['default'] = array (
      'database' => 'migrate_source',
      'username' => $db['username'],
      'password' => $db['password'],
      'prefix' => '',
      'host' => $db['host'],
      'port' => $db['port'],
      'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
      'driver' => 'mysql',
    );
  }
}
else {
  //replace with local info if testing migrations.
  $databases['migrate']['default'] = array (
    'database' => 'migration_source',
    'username' => 'migrationuser',
    'password' => 'migratepasswordsupersecure',
    'prefix' => '',
    'host' => 'migration-source.mysitename.lndo.site',
    'port' => '6666', //hail santa
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'driver' => 'mysql',
  );
}
```

This will first check if we're in a Pantheon environment, then intercept the Pressflow settings for the Pantheon database user, password, host, and port for the given environment's single MySQL instance.

And that's that! Everything should be working appropriately, and you'll have a database with the ['migrate'] key that the migrate module assumes as default, without having to stand up another Pantheon site as a DB host or any nonsense like that.

For another method, [check out Kevin Quillen's blog post here.](http://kevinquillen.com/migration/2014/08/02/drupal-pantheon-migrations)
