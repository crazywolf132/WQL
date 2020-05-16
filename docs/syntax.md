## Syntax

### Comments

WQL does NOT currently support any form of comments. This may be changed in a later version.

### Import

Import is used to import other files before running the current file.

```WQL
	# "lists.wql";
```

?> File must end with `.wql` or it will not allow it.

### Reserved Words

This is a set of words and characters that cannot be used as variable names, just like most other languages.

```WQL
	is STRING NUMBER LIST LIST_KEYS
	OBJ @ # & as ->
```

### Identifiers

Identifiers in this language are case sensitive. They are used to define objects such as variables, classes and functions.
An indentifier starts with a letter or an underscore, they can then procceed to use letters, numbers or underscores.

```mani
    t
    A_VALID_EXAMPLE
    _So_am_I
    IH4V3_Numbers
    a2
```
