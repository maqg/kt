export interface Account {
	name: string;
	phone: string;
	role: number;
	hello?: (word: string) => void;
}

export interface ReturnAccount extends Account {
	say: string
}

export class Hello implements Account {
	name: string;
	phone: string;
	role: number;

	constructor(name: string) {
		this.name = name;
	}

	init() {
		console.log(this.name + 'hello');
	}

	toJson(): ReturnAccount {
		return {
			name: this.name,
			say: this.name,
			role: this.role,
			phone: this.phone
		}
	}
}

function test() {
	let hello = new Hello('aaron');
	hello.init();
	let word = {...hello, xyz: '123'};
	JSON.stringify(hello);
}