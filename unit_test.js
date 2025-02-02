var TESTS = {
	'Dipole.Magnetic Rigidy': {
		'Magnet.Peak field': 174.67e-3,
		'Magnet.Length': 247e-3,
		'Electron.Energy': 130e6,
		'Magnet.Angle': 100e-3,
	}
}


function unit_test(formulas) {
	let tolerance = 0.01;
	let log = [`\nTest Results (Tolerance = ${tolerance}):`];

	for (let formula of formulas) {
		let test = TESTS[formula.full_name];

		if (test === undefined) {
			log.push(`*** ${formula.full_name} test not found`);
			continue;
		}

		let keys = Array.from(Object.keys(test));
		for (let key of formula.functions.keys()) {
			if (!keys.includes(key)) {
				log.push(`*** ${formula.full_name}:${key} test not found`);
			}
		}

		for (let key of Object.keys(test)) {
			formula.properties.values().forEach(p => p.clear());

			for (let set_key of Object.keys(test)) {
				if (set_key !== key) {
					formula.properties.get(set_key).value = test[set_key];
				}
			}

			let result = formula.functions.get(key)(formula.properties);
			if (Math.abs((result - test[key])/test[key]) < tolerance) {
				log.push(`${formula.full_name}:${key} ok`);
			} else {
				log.push(`*** ${formula.full_name}:${key} ${result} != ${test[key]}`);
			}
		}
	}

	return log.join('\n');
}