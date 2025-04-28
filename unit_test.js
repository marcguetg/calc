var TESTS = {
	//
	'Dipole.Magnetic Rigidy': {
		'Magnet.Peak field': 174.67e-3,
		'Magnet.Length': 248.3e-3,
		'Electron.Energy': 130e6,
		'Magnet.Angle': 100e-3,
	},
	//
	'Chicane.Compression': {
		'Chicane.R56': -4.31e-3,
		'Magnet.Angle': 99.5e-3,
		'Magnet.Length': 247e-3,
		'Chicane.Distance between Dipoles': 53e-3,
	},
	//
	'Chicane.Displacement': {
		'Chicane.Distance between Dipoles': 0.95,
		'Chicane.Displacement': 207.4e-3,
		'Magnet.Length': 558e-3,
		'Magnet.Angle': 136.7e-3,
	},
	//
	'Undulator.Parameter': {
		'Magnet.Peak field': 1.14,
		'Undulator.K': 7.237,
		'Undulator.Period': 0.068,
	},
	//
	'Undulator.Wavelength': {
		'Undulator.K': 2.4,
		'Electron.Lorentz factor': 27840,
		'Undulator.Period': 0.04,
		'Photon.Wavelength': 1.001e-10,
	},
	//
	'Beam dynamics.Emittance': {
		'Electron.Trans. emittance': Math.sqrt(11),
		'Electron.√(<x²>)': 3,
		"Electron.√(<x'²>)": 2,
		"Electron.<xx'>": 5,
	},
	//
	'Beam dynamics.Emittance normalization': {
		'Electron.Trans. emittance': 2,
		'Electron.Norm. trans. emittance': 6,
		'Electron.Lorentz factor': 3
	},
	//
	'Beam dynamics.Twiss': {
		'Beam dynamics.β': 13,
		'Beam dynamics.ɑ': 5,
		'Beam dynamics.ɣ': 2,
	},
	//
	'Beam dynamics.Beam size': {
		'Electron.√(<x²>)': Math.sqrt(24),
		'Electron.Trans. emittance': 8,
		'Beam dynamics.β': 3,
	},
	//
	'Beam dynamics.Beam power': {
		'Electron.Power': 6,
		'Electron.Peak current': 2,
		'Electron.Energy': 3,
	},
	//
	'FEL.Pierce parameter': {
		'FEL.Pierce parameter': 0.000472,
		'Electron.Peak current': 5983,
		'Undulator.K': 2.4,
		'Electron.Lorentz factor': 27397.26,
		'Electron.√(<x²>)': 38.21e-6,
		'Undulator.Period': 0.04,
	},
	//
	'FEL.Power gain length': {
		'FEL.1D Power gain length': 3.89,
		'FEL.Pierce parameter': 0.000472,
		'Undulator.Period': 0.04,
	},
	//
	'FEL.Saturation power': {
		'FEL.Pierce parameter': 2,
		'Electron.Power': 3,
		'Photon.Power': 6,
	},
	//
	'FEL.Bandwidth': {
		'FEL.Pierce parameter': 2,
		'Photon.Bandwidth': 6,
		'Photon.Wavelength': 3,
	},
	//
	'Photons.Bandwidth conversion': {
		'Photon.bandwidth': 5,
		'Photon.Bandwidth': 1.55e-10,
		'Photon.Energy': 200,
	},
	//
	'Photons.Time Bandwidth Product': {
		'Photon.TBP': 0.84,
		'Photon.Pulse duration': 200e-15,
		'Photon.Bandwidth': 15e-9,
		'Photon.Wavelength': 1035e-9,
	},
}


function unit_test(formulas) {
	let tolerance = 0.001;
	let log = [`\n<u>Test Results (Tolerance = ${tolerance})</u>`];

	for (let formula of formulas) {
		let test = TESTS[formula.full_name];

		log.push(formula.full_name);

		if (test === undefined) {
			log.push(`<b>*** No tests found</b>`);
			continue;
		}

		let keys = Array.from(Object.keys(test));
		for (let key of formula.functions.keys()) {
			if (!keys.includes(key)) {
				log.push(`<b>*** ${key} test not found</b>`);
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
				// log.push(`${formula.full_name}:${key} ok`);
			} else {
				log.push(`<b>*** ${key} ${result} != ${test[key]}</b>`);
			}
		}
	}

	return log.join('<br>');
}