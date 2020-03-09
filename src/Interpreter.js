import _ from 'lodash';
import { log } from './utils';

export default class Interpreter {
	constructor(ast, data) {
		this.ast = ast;
		this.data = data;

		this.result = !Array.isArray(this.data)
			? this.compile(this.ast, this.data)
			: this.data.map(d => this.compile(this.ast, d));
	}

	compile(ast, data) {
		let obj = {};
		Object.keys(ast).forEach(key => {
			if (!ast[key].isVar) {
				// We can actually add this to our object...
				if (this.hasKey(ast[key], 'isList')) {
					// log('key ::: ', key);
					obj[ast[key].alias || key] = this.listType(data[key], ast[key]);
				} else if (this.hasKey(ast[key], 'fields')) {
					obj[ast[key].alias || key] = this.compile(ast[key], data);
				} else if (this.hasKey(ast[key], 'RequiredType')) {
					obj[ast[key].alias || key] = this.requiredType(data[key], ast[key]);
				} else if (key === 'fields') {
					// We need to go into this object, and get its objects...
					obj = this.compile(ast[key], data);
				} else if (this.hasKey(ast[key], 'ifelse')) {
					// performing the ifstatement our self.
					obj[key] =
						data[key] === ast[key].ifelse._check
							? data[ast[key].ifelse._if]
							: data[ast[key].ifelse._else];
				} else {
					obj[ast[key].alias || key] = this.basicField(data[key], ast[key]);
				}
			}
		});

		return obj;
	}

	requiredType(data, field) {
		return typeof data === field.RequiredType.toLowerCase() ? data : null;
	}

	listType(data, field) {
		return Array.isArray(data)
			? this.cleanList(
					data.map((d, index) => {
						if (index + 1 <= (field.sizeLimit || data.length))
							return this.compile(field.fields, d);
						else return null;
					})
			  )
			: this.compile(field.fields, data || {});
	}

	basicField(data, field) {
		return data ? data : field.defaultValue ? field.defaultValue : undefined;
	}

	hasKey(obj, keyName) {
		return obj.hasOwnProperty(keyName);
	}

	cleanList(data) {
		return _.compact(data);
	}
}
