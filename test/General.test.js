import wql from '../lib/';
// import wql from 'wql-language';

const testData = [
	{
		family: 'Moon',
		birdName: 'barry',
		dogName: 'bohdie',
		catName: 'tom',
		test: 'im a string',
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
		test: 1,
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

describe('Testing fundamentals of WQL', () => {
	it('should be able to return 1 field from each document', () => {
		expect(wql(' { family } ', testData)).toEqual([
			{ family: 'Moon' },
			{ family: 'Rizk' },
		]);
	});

	it('should be able to rename a field to "newName"', () => {
		expect(wql(' { family as newName }', testData)).toEqual([
			{
				newName: 'Moon',
			},
			{
				newName: 'Rizk',
			},
		]);
	});

	it('should be able to get more than 1 field', () => {
		expect(
			wql(
				`
        {
            family,
            catName
        }`,
				testData
			)
		).toEqual([
			{ catName: 'tom', family: 'Moon' },
			{ catName: 'Reeeee', family: 'Rizk' },
		]);
	});

	it('should use a default value if not present', () => {
		expect(
			wql(
				`
            {
                family,
                dogName = "I don't own a dog"
            }`,
				testData
			)
		).toEqual([
			{
				dogName: 'bohdie',
				family: 'Moon',
			},
			{
				dogName: "I don't own a dog",
				family: 'Rizk',
			},
		]);
	});

	it('should be able to type check', () => {
		expect(
			wql(
				`
                {
                    test is STRING
                }
                `,
				testData
			)
		).toEqual([
			{
				test: 'im a string',
			},
			{
				test: null,
			},
		]);
	});

	it('should be able to handle custom list fields', () => {
		expect(
			wql(
				`
        {
            meals : [
                {
                    name
                }
            ]
        }
        `,
				testData
			)
		).toMatchSnapshot();
	});

	it('should be able to limit a list', () => {
		expect(
			wql(
				`
        {
            meals <1> : [
                {
                    name
                }
            ]
        }
        `,
				testData
			)
		).toEqual([
			{
				meals: [{ name: 'breakfast' }],
			},
			{
				meals: [{ name: 'breakfast' }],
			},
		]);
	});

	it('should be able to create variables', () => {
		expect(() =>
			wql(
				`{
            @someVar {
                familyName
            }
        }`,
				testData
			)
		).not.toThrow();
	});

	it('should be able to reference variables', () => {
		expect(
			wql(
				`
        {
            @someVar {
                family
            },
            &someVar
        }
        `,
				testData
			)
		).toEqual([
			{ someVar: { family: 'Moon' } },
			{ someVar: { family: 'Rizk' } },
		]);
	});

	it('should be able to do the OR statement', () => {
		console.log(
			JSON.stringify(
				wql(
					`
				{
					meals: [
						{
							item {
								name
							}
						}
					]
				}
				`,
					testData
				),
				null,
				2
			)
		);
	});
});
