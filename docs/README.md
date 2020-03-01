# WQL

## What is it?

WQL is an interpreted language that is simple to learn, and easy to use.

The idea behind WQL, is to take a simple language like GRAPHQL, but modify
it in a way that it does not require a pre-defined data structure, or types.

## What WQL looks like.

```WQL
{
	@test {
		birdName
	},
	@dinner {
		name,
		amount
	},
	data {
		deep {
			down {
				here {
                    id is NUMBER,
					dogName is STRING,
					catName,
					meals <1> : [
						{
							&dinner
						}
					]
				},
                defaultValue = {
                    dinoName
                }
			}
		}
	}
}
```

### Syntax highlighting

|                                                  [**ATOM**](https://github.com/Mani-Language/Mani-Atom)                                                  |                                                  [**VSCODE**](https://github.com/Mani-Language/Mani-vscode)                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/atom/atom.png" width="80">](https://atom.io) | [<img src="https://user-images.githubusercontent.com/14907694/30436929-a3594ef6-996d-11e7-91e0-ae34fdc040fb.png" width="80">](https://code.visualstudio.com) |

## Team

|                                 [**Brayden Moon**](https://github.com/crazywolf132)                                  |
| :------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars3.githubusercontent.com/u/6337115?s=460&v=4" width="80">](https://github.com/crazywolf132) |
|                                                       Founder                                                        |
|           [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/crazywolf132)            |
