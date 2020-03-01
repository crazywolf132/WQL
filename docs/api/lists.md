## Arrays
The arrays API is used by the List STDLIB. This is how we get that extra functionality on all the lists.

### How to import
~~~ mani
    load "arrays";
~~~

### List of all points
~~~ mani
    array_replace( );
    arrayReverse( );
~~~

### List of all extensions
~~~ mani
    .at( );
    .add( );
    .del( );
    .has( );
    .snip( );
    .count( );
    .clear( );
    .posOf( );
~~~

> These extensions are used in the regular list Object too.

### Function descriptions

#### array_replace();
***Usage: `array_replace( listObject, position, newObject );`***<br />
Used to replace an object at a specific location with a new object.

#### arrayReverse();
***Usage: `arrayReverse( listObject );`***<br />
Used to reverse the order of all items in array.

### Extension descriptions

#### .at();
***Usage: `listObject.at( number );`***<br />
Used to return item at provided index in list.

#### .add();
***Usage: `listObject.add( object );`***<br />
Used to append another object onto the end of the listObject.

#### .del();
***Usage: `listObject.del( object );`***<br />
Used to delete an object from the listObject.

#### .has();
***Usage: `listObject.has( object );`***<br />
Used to return a boolean value of if the provided object exists in the listObject.

#### .snip();
***Usage: `listObject.snip( number );`***<br />
Used to shorten the list to the size specified. It works from the beginning of the list.

#### .count();
***Usage: `listObject.count( );`***<br />
Used to return the amount of items in the listObject.

#### .clear();
***Usage: `listObject.clear( );`***<br />
Used to reset the listObject, to a blank list.

#### .posOf();
***Usage: `listObject.posOf( object );`***<br />
Used to return the position of the element provided, in the listObject.

