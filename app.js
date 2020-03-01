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
				amount: 0.2
			},
			{
				name: 'lunch',
				meal: 'steak',
				amount: 9.0
			},
			{
				name: 'dinner',
				meal: 'wet food',
				amount: 1.14
			}
		]
	},
	{
		family: 'Rizk',
		catName: 'Reeeee',
		meals: [
			{
				name: 'breakfast',
				meal: 'kebble',
				amount: 9.2
			},
			{
				name: 'lunch',
				meal: 'steak',
				amount: 41.0
			},
			{
				name: 'dinner',
				meal: 'wet food',
				amount: 11.14
			}
		]
	}
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

// const data = require('./DATA.json').data[0];

const p = new Parser(redditQuery).parse();
const r = new Reducer(p).result;
// log(p);
// log(r);
const result = traverse(r, new TaggedTemplateVisitor(null, null));
const int = new Interpreter(result, require('./RedditData.json')[1]);
// log();
// log(p.parseQuery());
// log(inspect(p));
log(result);
log(int.result);
// log();
