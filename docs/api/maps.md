## Maps
The maps API is used by the Maps STDLIB. This is how we get that extra functionality on all the maps.

### How to import
~~~ mani
    load "maps";
~~~

### List of all points
~~~ mani
    newMap();
    mapGetValue();
    mapAddItem();
    mapRemoveItem();
    mapUpdateItem();
    mapGetKeys();
    arraysToMap();
    mapKeyExists();
    mapGetValues();
    mapFind();
~~~

### List of all extensions
~~~ mani
    .count();
    .has();
    .add();
    .del();
    .at();
~~~

> These extensions are used in the regular map Object too.

### Function descriptions

#### newMap();
***Usage: `newMap( );`***<br />
Used to create a new map object. This can also be achieved with `{}`.

#### mapGetValue();
***Usage: `mapGetValue( mapObject, key );`***<br />
Used to collect a specific value, from a key inside of the map.

#### mapAddItem();
***Usage: `mapAddItem( mapObject, key, value );`***<br />
Used to add a key-value pair to a map object.

#### mapRemoveItem();
***Usage: `mapRemoveItem( mapObject, key );`***<br />
Used to remove the specified key-value pair from the map object.

#### mapUpdateItem();
***Usage: `mapUpdateItem(  mapObject, key, newValue );`***<br />
Used to update an existing key-value pair from the list.
> This can also be achieved with `mapAddItem()` as only one of each key can exist.

#### mapGetKeys();
***Usage: `mapGetKeys( mapObject );`***<br />
> Returns a list of all the keys in the map.
Used to return a list of all the keys in the map.

#### arraysToMap();
***Usage: `arraysToMap( listObject, listObject );`***<br />
This is used to combined two lists together into a map object. The first being the keys list, and the second being the values list.
> For best results, please make sure both are the same size.

#### mapKeyExists();
***Usage: `mapKeyExists( mapObject, key );`***<br />
This is used to return a boolean value of if the key exists in the presented map or not.

#### mapGetValues();
***Usage: `mapGetValues( mapObject );`***<br />
> Returns a list of all the values.
Used to return a list of all the values present in the map.

#### mapFind();
***Usage: `mapFind( mapObject, key, value );`***<br />
Used to find the map that contains the key-value pair.
> Must be a map with submaps.


### Extension descriptions

#### .count();
***Usage: `mapObject.count( );`***<br />
Used to return the amount of objects (keys) in the map.

#### .has();
***Usage: `mapObject.has( object );`***<br />
Used to return a boolean value of if the mapObject contains the provided object (key).

#### .add();
***Usage: `mapObject.add( key, value )`***<br />
Used to add a key-value pair to the given map.

#### .del();
***Usage: `mapObject.del( key );`***<br />
Used to delete a key-value pair from the given map.

#### .at();
***Usage: `mapObject.at( key );`***<br />
Used to return the value of the provided key.

