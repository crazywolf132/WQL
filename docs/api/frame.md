## Frame
The frame API is used for generating basic GUI's. It is a
port of the Java Swing framework.

### How to import
~~~ mani
    load "frame";
~~~

### List of all points
~~~ mani
    window( );
    windowVis( );
    windowButton( );
    buttonVis( );
    keyPressed( );
    windowRepaint( );
    windowPrompt( );
    mouseHover( );
    drawstring( );
    line( );
    oval( );
    foval( );
    rect( );
    frect( );
    clip( );
    color( );
~~~

### Function descriptions

#### window();
> This function has multiple overloaded methods with different arguments.


***Usage `window( titleString );`***<br />
***Usage `window( widthNumber, heightNumber );`***<br />
***Usage `window( titleString, widthNumber, heightNumber );`***<br />
Used to generate a new window with the arguments provided.

> The STDLIB `frame` will only use the first


#### windowVis();
***Usage `windowVis( boolean );`***<br />
Used to toggle if the created window is visible or not.


#### windowButton();
> This function has 2 different overloaded methods with different arguments.


***Usage `windowButton( buttonTextString );`***<br />
***Usage `windowButton( buttonTextString, xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to generate a button on the created window.


#### buttonVis();
***Usage `buttonVis( buttonObject, boolean );`***<br />
Used to toggle visibility for buttonObject on or off based on boolean.

#### keyPressed();
***Usage `keyPressed( );`***<br />
Used to return the last key pressed.


#### windowRepaint();
***Usage `windowRepaint( );`***<br />
Used to repaint the created window, incase changes have been made to it.


#### windowPrompt();
***Usage `windowPrompt( questionString );`***<br />
Used to create a popup with an input field. The provided questionString will be displayed above.


#### mouseHover();
***Usage `mouseHover( );`***<br />
Used to get the x and y coordinates of the current position of the mouse.

> Uses a Map, so you must load the map API


#### drawstring();
***Usage `drawstring("some message", x, y);`***<br />
Used to create a textlabel in the frame at those x and y coordinates


#### line();
***Usage `line( x1Number, x2Number, y1Number, y2Number );`***<br />
Used to create a single line from one position to another.


#### oval();
***Usage `oval( xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to generate an oval in the chosen x and y coordinates, with the given dimensions.


#### foval();
***Usage `foval( xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to genarte a colored oval in the chosen x and y coordinates, with the given dimensions. It will use the last color generated.


#### rect();
***Usage `rect( xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to generate a rectangle in the chosen x and y coordinates, with the given dimensions.


#### frect();
***Usage `frect( xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to genarte a colored rectangle in the chosen x and y coordinates, with the given dimensions. It will use the last color generated.

#### clip();
***Usage `clip( xPosNumber, yPosNumber, widthNumber, heightNumber );`***<br />
Used to generate a clip in the chosen x and y coordinates, with the given dimensions.

#### color();
> This function has 2 different overloaded methods with different arguments.


***Usage `color( colorNumber );`***<br />
***Usage `color( rNumber, gNumber, bNumber );`***<br />
Used to load a color to be used by the next object.