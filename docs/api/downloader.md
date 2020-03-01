## Downloader
The downloader API is used for fetching files and saving them localy.

### How to import
~~~ mani
    load "downloader";
~~~

### List of all points
~~~ mani
    download( );
    urlExists( );
~~~

### Function descriptions

#### download();
> This function has multiple overloaded methods with different arguments. There must be atleast 2 arguments.


***Usage: `download( "download url", "download path" );`***<br />
***Usage: `download( "download url", "download path", callback_function );`***<br />

> An example of the callback function can be found at the bottom of this page.

Used to download a file of any type to the desired path. This is the function used in `MARN`.

#### urlExistss();
***Usage: `urlExists( "string of url" );`***<br />
Used to return a `true` or `false` of if the url exists and is reachable or not.


### Callback function

#### Callback usage
The callback function you provide must take `3` arguments. There are as follows.<br />
`(percent, downloaded_percentage, download_size)`
The function provided will be called every byte that gets downloaded.

#### Example

~~~ mani
    load "downloader";

    fn myCallback( percentage, downloaded, size ) {
        if (downloaded == 100) {
            say "Finished!";
        } else {
            say downloaded;
        }
    }

    download("http://somesite.com/download.zip", "./", myCallback);
~~~


