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

## Team

|                                 [**Brayden Moon**](https://github.com/crazywolf132)                                  |
| :------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars3.githubusercontent.com/u/6337115?s=460&v=4" width="80">](https://github.com/crazywolf132) |
|                                                       Founder                                                        |
|           [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/crazywolf132)            |
