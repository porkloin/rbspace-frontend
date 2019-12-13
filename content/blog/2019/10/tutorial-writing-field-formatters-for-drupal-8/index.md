---
title: "Tutorial: Writing Field Formatters for Drupal 8"
date: '2019-10-12T23:00:20.000Z'
description: "Tutorial: Writing Field Formatters for Drupal 8"
featuredImage: ../../../images/code.png
published: true
---

While handling user data in Drupal 8 is made significantly better by the inclusion of Twig as a templating engine, sometimes a developer might want to make reproducible modifications to some type of field data in Drupal without needing to re-implement Twig or preprocess hook handling of field data. One option for saving yourself time is writing a Drupal field formatter.

If you've never written a field formatter before, you might actually be overestimating how difficult they are! I recently helped a junior developer put together a field formatter and was really surprised that they expected the process to be daunting, which inspired me to write this short tutorial.

## What is a Field Formatter?

In Drupal 8, Field Formatters are a common type of [annotation-based plugin](https://www.drupal.org/docs/8/api/plugin-api/annotations-based-plugins) that provides the user with the ability to format or transform their field in a reporoducible way across multiple field instances. For example, if a user wanted to be able to convert certain text fields to have all of their letters uppercased, a developer could provide a field formatter plugin to expose an option to sitebuilders that allows them to apply the filter to any fields to type `text` or `text_long`.

## Great, but what's an annotation?

Annotations are special comments in Drupal 8 that are a borrowed concept from Symfony. Annotations serve as a way of registering plugins with Drupal so that it knows how to handle the code you're writing. Annotations are usually very short, and are easily identified by their `@AnnotationName` syntax.

An example of an annotation we can use for a field formatter is as follows:

```php
/**
 * @FieldFormatter(
 *   id = "my_field_formatter_id"
 *   label = @Translation("My Field Formatter"),
 *   field_types = {
 *     "text",
 *   }
 * )
 */
```

## How Do We Write Field Formatters?

Field formatters have to store their code in a module – in fact, one of the simplest Drupal modules you can write is a simple field formatter. In fact, our example module will only have two files total:

- `field_formatter_example/field_formatter_example.info.yml`
- `field_formatter_example/Plugin/Field/FieldFormatter/ReverseStringFormatter.php`

First, we need to register our module with an `info.yml` file.

```yaml
name: Field Formatter Example
description: An Example Field Formatter - For Demo Purposes Only!
package: Custom
type: module
version: 0.1
core: 8.x
```

Next, in the plugins directory we can create our `ReverseStringFormatter.php` file.

```php
// ReverseStringFormatter.php
<?php

// We must set our namespace using the machine name of our module - in this case field_formatter_example.
// Notice how it matches the folder name of our module and the info file name.
namespace Drupal\field_formatter_example\Plugin\Field\FieldFormatter;

// We will be extending the FormatterBase class, and we need to make it accessible to our script.
use Drupal\Core\Field\FormatterBase;
// FieldItemListInterface will provide us with access to the field values provided by the user.
use Drupal\Core\Field\FieldItemListInterface;

// Below is our annotation - anything before the @ is just a comment and isn't strictly necessary.
/**
 * Plugin implementation of the 'field_formatter_example_reverse_string' formatter.
 *
 * @FieldFormatter(
 *   id = "field_formatter_example_reverse_string",
 *   label = @Translation("Reverse String"),
 *   field_types = {
 *     "text",
 *     "text_long",
 *   }
 * )
 */
class ReverseStringFormatter extends FormatterBase {
// Above, we extend the class Formatter base into our own new class - ReverseStringFormatter

  /**
   * The viewElements function is where we're able to make modifications to
   * the FieldItemListInterface variable $items.
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    // Initialize an array to store our processed items.
    $elements = [];

    // In this for loop we'll take the value of each item, and then reverse the string.
    foreach ($items as $delta => $item) {

      $item_value = $item->getValue();
      $reversed = strrev($item_value)
      // The nth item in the array is being set to a simple renderable array - at the simplest
      // our render array only needs a #markup key.
      $element[$delta] = ['#markup' => $reversed];

    }

    // Lastly, we need to return the $elements array so it gets output for rendering.
    return $elements;
  }

}
```

And there it is! It's as simple as two relatively short files, and you're able to build an (addmittedly very simple) field formatter.

However, this is just the beginning of things you can do with Field Formatters. These plugins can become very powerful, exposing additional configuration forms to users, allowing them to make modifications to the behavior of the formatter by setting variables that get exposed to our `viewElements` function and can be used in our logic there.

Happy coding!