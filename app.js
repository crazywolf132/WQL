import wql, { generateTree } from './lib';

import Parser from './src/Parser.js';
import Interpreter from './src/Interpreter';
import TaggedTemplateVisitor, { traverse } from './src/Visitor';
import Reducer from './src/Reducer';
import { log } from './src/utils';
const test = `
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
					dogName = "Doesn't have one",
					catName = "Doesn't have one",
					meals <2> : [
						{
							&dinner
						}
					]
				}
			}
		}
	}
}`;

const testData = [
	{
		family: 'Moon',
		birdName: 'barry',
		dogName: 'bohdie',
		catName: 'tom',
		meals: [
			{
				name: 'breakfast',
				meal: 'kebble',
				amount: 0.2,
			},
			{
				name: 'lunch',
				meal: 'steak',
				amount: 9.0,
			},
			{
				name: 'dinner',
				meal: 'wet food',
				amount: 1.14,
			},
		],
	},
	{
		family: 'Rizk',
		catName: 'Reeeee',
		meals: [
			{
				name: 'breakfast',
				meal: 'kebble',
				amount: 9.2,
			},
			{
				name: 'lunch',
				meal: 'steak',
				amount: 41.0,
			},
			{
				name: 'dinner',
				meal: 'wet food',
				amount: 11.14,
			},
		],
	},
];

const camQuery = `
	{
		mops as DATA <1> : [
			{
				name,
				description,
				type = "mop",
				children : [
					{
						name = "Accounting",
						type = "process",
						children : [
							{
								name = "CIMMediationSerice",
								type = "mediation"
							}
						]
					}
				]

			}
		]
	}
`;

const redditQuery = `
# "./test/test.wql"
{
	message {
		subreddit_id,
		id,
		link_id as linkID,
		parent_id as parentID,
		body as message,
		&tester
	},
	other {
		&subreddit_id
	}
}
`;
// log(inspect(wql(test, testData)));
const ifStatement = `
{
    @drink {
      strDrink as name,
      strDrinkThumb as img,
      strAlcoholic as alcoholic
    },
    @strAlcoholic ~* "Non" ? { &drink } : null,
    &strAlcoholic as item
}
`;

const searchStatement = `
{
	item (strDrink * "AT") {
		strDrink as name,
		strDrinkThumb as img,
		strAlcoholic as alcoholic
	}
}
`;

const cocktails = [
	{
		idDrink: '17222',
		strDrink: 'A1',
		strDrinkAlternate: null,
		strDrinkES: null,
		strDrinkDE: null,
		strDrinkFR: null,
		'strDrinkZH-HANS': null,
		'strDrinkZH-HANT': null,
		strTags: null,
		strVideo: null,
		strCategory: 'Cocktail',
		strIBA: null,
		strAlcoholic: 'Alcoholic',
		strGlass: 'Cocktail glass',
		strInstructions:
			'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
		strInstructionsES: null,
		strInstructionsDE:
			'Alle Zutaten in einen Cocktailshaker geben, mischen und über Eis in ein gekühltes Glas servieren.',
		strInstructionsFR: null,
		'strInstructionsZH-HANS': null,
		'strInstructionsZH-HANT': null,
		strDrinkThumb:
			'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
		strIngredient1: 'Gin',
		strIngredient2: 'Grand Marnier',
		strIngredient3: 'Lemon Juice',
		strIngredient4: 'Grenadine',
		strIngredient5: null,
		strIngredient6: null,
		strIngredient7: null,
		strIngredient8: null,
		strIngredient9: null,
		strIngredient10: null,
		strIngredient11: null,
		strIngredient12: null,
		strIngredient13: null,
		strIngredient14: null,
		strIngredient15: null,
		strMeasure1: '1 3/4 shot ',
		strMeasure2: '1 Shot ',
		strMeasure3: '1/4 Shot',
		strMeasure4: '1/8 Shot',
		strMeasure5: null,
		strMeasure6: null,
		strMeasure7: null,
		strMeasure8: null,
		strMeasure9: null,
		strMeasure10: null,
		strMeasure11: null,
		strMeasure12: null,
		strMeasure13: null,
		strMeasure14: null,
		strMeasure15: null,
		strCreativeCommonsConfirmed: 'No',
		dateModified: '2017-09-07 21:42:09',
	},
	{
		idDrink: '13501',
		strDrink: 'ABC',
		strDrinkAlternate: null,
		strDrinkES: null,
		strDrinkDE: null,
		strDrinkFR: null,
		'strDrinkZH-HANS': null,
		'strDrinkZH-HANT': null,
		strTags: null,
		strVideo: null,
		strCategory: 'Shot',
		strIBA: null,
		strAlcoholic: 'Alcoholic',
		strGlass: 'Shot glass',
		strInstructions: 'Layered in a shot glass.',
		strInstructionsES: null,
		strInstructionsDE: 'Schichtaufbau in einem Schnapsglas.',
		strInstructionsFR: null,
		'strInstructionsZH-HANS': null,
		'strInstructionsZH-HANT': null,
		strDrinkThumb:
			'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
		strIngredient1: 'Amaretto',
		strIngredient2: 'Baileys irish cream',
		strIngredient3: 'Cognac',
		strIngredient4: null,
		strIngredient5: null,
		strIngredient6: null,
		strIngredient7: null,
		strIngredient8: null,
		strIngredient9: null,
		strIngredient10: null,
		strIngredient11: null,
		strIngredient12: null,
		strIngredient13: null,
		strIngredient14: null,
		strIngredient15: null,
		strMeasure1: '1/3 ',
		strMeasure2: '1/3 ',
		strMeasure3: '1/3 ',
		strMeasure4: null,
		strMeasure5: null,
		strMeasure6: null,
		strMeasure7: null,
		strMeasure8: null,
		strMeasure9: null,
		strMeasure10: null,
		strMeasure11: null,
		strMeasure12: null,
		strMeasure13: null,
		strMeasure14: null,
		strMeasure15: null,
		strCreativeCommonsConfirmed: 'No',
		dateModified: '2016-08-31 19:32:08',
	},
];

// const data = require('./DATA.json').data[0];

const p = new Parser(searchStatement).parse();
const r = new Reducer(p).result;
// log(p);
// log(r);
const result = traverse(r, new TaggedTemplateVisitor(null, null));
const int = new Interpreter(result, cocktails);
// log();
// log(p.parseQuery());
// log(inspect(p));
// log(result);
log(int.result);
// log();
