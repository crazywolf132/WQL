## Getting started.

### Install

Installing WQL can be very easy.

Simply execute the following commands below to get WQL.

```bash
    git clone https://github.service.anz/GroupPayments/WQL
    cd WQL
    yarn install
    yarn build
```

This will create a folder called `libs`. This is where the compiled WQL parser lives.

### Editors

For your enjoyment, we have created syntaxing for some editors.

- [Atom](https://github.com/Mani-Language/Mani-Atom)
- [VSCode](https://github.com/Mani-Language/Mani-vscode)

### Usage

Here is a dead simple example of using WQL.

```javascript
import wql from './libs';

let query = `
    {
        dogName
    }
`;

let data = {
	dogName: 'phido',
	catName: 'guss'
};

console.log(wql(query, data));
```

It will console log the following...

```json
{
	"dogName": "phido"
}
```
