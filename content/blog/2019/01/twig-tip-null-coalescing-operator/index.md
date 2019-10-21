---
title: 'Twig Tip: Null Coalescing Operator'
date: '2019-01-22T23:00:20.000Z'
description: 'Twig Tip: Null Coalescing Operator'
featuredImage: ../../../images/code.png
published: false
---

Twig folks, be honest: how many times have you written a snippet of Twig code that looks like this?

```twig
{% if node.field_party is not null %}
  {{ node.field_party }}
{% elseif node.field_gathering is not null %}
  {{ node.field_gathering }}
{% endif %}
```

This is a very common piece of conditional logic we might write if we want to display the first field that is filled, but only one field out of the list.

One cool lesser-known trick in Twig, however, is the null coalescing operator. The same example above can be written in a single line using this operator:

```twig
{{ node.field_party ?? node.field_gathering }}
```

Or, put another way in the Twig docs:

The null coalescing operator, basically says: "Give me the first operand in this expression, from left to right, that is both defined and not null. And, if all of the operands are undefined or null, just return null." – Michael Rog, from the QQ plugin docs

As such, we can stack a lot of possible values into a null coalescing operator and save a ton of lines of useless if/elseif/elseif/else clutter:

```twig
{{ node.field_party ?? node.field_gathering ?? node.field_get_together ?? node.field_assembly ?? node.field_meeting_of_minds ?? null }}
```
