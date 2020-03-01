Prism.languages.WQL = {
	string: {
		pattern: /"(?:\\.|[^\\"\r\n])*"/,
		greedy: true
	},
	number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	boolean: /\b(?:true|false)\b/,
	// variable: /\$[a-z_]\w*/i,
	variable: /@[a-z_]\w*/i,
	keyword: /&[a-z_]\w*/i,
	'attr-name': {
		pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
		greedy: true
	},
	operator: /[!=:|]|\.{3}/,
	punctuation: /[!(){}\[\]=,<>]/,
	constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
};
