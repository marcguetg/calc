'use strict';

var PRESET = [
	{
		name: 'SASE 1/2',
		properties: {
			'Electron.Energy': 14e9,
			'Undulator.K': 2.399,
			'Undulator.Period': 0.04,
		},
		formulas: {
			'Undulator': 'Magnet.Peak field',
			'FEL': 'Photon.Wavelength',
			'Magnetic Rigidy': 'Magnet.Angle',
		}
	}, {
		name: 'SASE3',
		properties: {
			'Electron.Energy': 14e9,
			'Undulator.K': 7.26,
			'Undulator.Period': 0.068,
		},
		formulas: {
			'Undulator': 'Magnet.Peak field',
			'FEL': 'Photon.Wavelength',
			'Magnetic Rigidy': 'Magnet.Angle',
		}
	}, {
		name: 'LH',
		properties: {
			'Electron.Energy': 130e6,
			'Magnet.angle': 5.7,
			'Magnet.Length': 0.247,
			'Chicane.Distance between Dipoles': 0.3 - 0.247,
		},
		formulas: {
			'Chicane': 'Chicane.R56',
			'Chicane Displacement': 'Chicane.Displacement',
			'Magnetic Rigidy': 'Magnet.Peak field',
		}
	}, {
		name: 'BC0',
		properties: {
			'Electron.Energy': 130e6,
			'Magnet.angle': 7.83,
			'Magnet.Length': 558e-3,
			'Chicane.Distance between Dipoles': 1.508 - 558e-3,
		},
		formulas: {
			'Chicane': 'Chicane.R56',
			'Chicane Displacement': 'Chicane.Displacement',
			'Magnetic Rigidy': 'Magnet.Peak field',
		}
	}, {
		name: 'BC1',
		properties: {
			'Electron.Energy': 700e6,
			'Magnet.angle': 3.05,
			'Magnet.Length': 558e-3,
			'Chicane.Distance between Dipoles': 9.007 - 558e-3,
		},
		formulas: {
			'Chicane': 'Chicane.R56',
			'Chicane Displacement': 'Chicane.Displacement',
			'Magnetic Rigidy': 'Magnet.Peak field',
		}
	}, {
		name: 'BC2',
		properties: {
			'Electron.Energy': 2.4e9,
			'Magnet.angle': 2.36,
			'Magnet.Length': 558e-3,
			'Chicane.Distance between Dipoles': 9.007 - 558e-3,
		},
		formulas: {
			'Chicane': 'Chicane.R56',
			'Chicane Displacement': 'Chicane.Displacement',
			'Magnetic Rigidy': 'Magnet.Peak field',
		}
	}, {
		name: 'Single Pulse',
		properties: {
			'Photon.Energy': 18e3,
			'Photon.Pulse duration': 37e-18,
			'Photon.Bandwidth': 0.0015e-10,
		},
		formulas: {
			'Time Bandwidth Product': 'Photon.TBP',
			'Photon Bandwidth Conversion': 'Photon.bandwidth',
		}
	}
];


var PROPERTY_STORE = [
	{
		name: 'Magnet',
		properties: [
			{
				name: 'Peak field',
				unit: 'T'
			}, {
				name: 'Length',
				unit: 'm'
			}, {
				name: 'Angle',
				unit: 'rad'
			}, {
				name: 'angle',
				unit: 'degree'
			}
		]
	}, {
		name: 'Chicane',
		properties: [
			{
				name: 'Distance between Dipoles',
				unit: 'm',
			}, {
				name: 'Displacement',
				unit: 'm',
			}, {
				name: 'R56',
				unit: 'm',
			}, {
				name: 'Delay',
				unit: 's',
			}
		]
	}, {
		name: 'Undulator',
		properties: [
			{
				name: 'Period',
				unit: 'm',
			}, {
				name: 'K',
				unit: '',
			}
		]
	}, {
		name: 'Electron',
		properties: [
			{
				name: 'Energy',
				unit: 'eV',
			}, {
				name: 'Lorentz Factor',
				unit: '',
			}
		]
	}, {
		name: 'Photon',
		properties: [
			{
				name: 'Energy',
				unit: 'eV',
			}, {
				name: 'Wavelength',
				unit: 'm',
			}, {
				name: 'Frequency',
				unit: 'Hz',
			}, {
				name: 'Pulse duration',
				unit: 's',
			}, {
				name: 'TBP',
				unit: '',
			}, {
				name: 'Bandwidth',
				unit: 'm',
			}, {
				name: 'bandwidth',
				unit: 'eV',
			}
		]
	}
];


class Const {
	static ElectronRestMassIneV = 0.511e6;
	static ElectronMass = 9.11e-31;
	static c = 3e8;
	static ElementaryCharge = 1.602e-19;
	static undulator_const = Const.ElementaryCharge/ (2 * Math.PI * Const.ElectronMass * Const.c);
	static k_photon = 1240e-9;
	static rigidy = 3336e-12;
}


var UNIT_TRANS_FORMULAS = {
	'Photon.Energy': a => a.value('Photon.Frequency') * Const.k_photon / Const.c,
	'Photon.Wavelength': a =>  Const.k_photon / a.value('Photon.Energy'),
	'Photon.Frequency': a => Const.c / a.value('Photon.Wavelength'),
	'Magnet.Angle': a => Math.PI / 180 * a.value('Magnet.angle'),
	'Magnet.angle': a => 180 / Math.PI * a.value('Magnet.Angle'),
	'Electron.Energy': a => Const.ElectronRestMassIneV * a.value('Electron.Lorentz Factor'),
	'Electron.Lorentz Factor': a => a.value('Electron.Energy') / Const.ElectronRestMassIneV,
	'Magnet.Length': a => a.value('Undulator.Period') / 2,
	'Undulator.Period': a => a.value('Magnet.Length') * 2,
	'Chicane.Delay': a => a.value('Chicane.R56') / (2 * Const.c),
	'Chicane.R56': a => a.value('Chicane.Delay') * 2 * Const.c,
}


var FORMULAS = [
	{
		name: 'Magnetic Rigidy',
		formula: '$\\alpha \\approx \\frac{Bl}{3336 E}\$',
		functions: {
			'Magnet.Angle': a => {
				let b = a.value('Magnet.Peak field');
				let l = a.value('Magnet.Length');
				let e = a.value('Electron.Energy');

				return b * l / (e * Const.rigidy);
			},
			'Magnet.Peak field': a => {
				let alpha = a.value('Magnet.Angle');
				let l = a.value('Magnet.Length');
				let e = a.value('Electron.Energy');

				return alpha * Const.rigidy * e / l;
			},
			'Magnet.Length': a => {
				let alpha = a.value('Deflection angle');
				let b = a.value('Magnet.Peak field');
				let e = a.value('Electron.Energy');

				return alpha * Const.rigidy * e / b;
			},
			'Electron.Energy': a => {
				let alpha = a.value('Magnet.Angle');
				let b = a.value('Magnet.Peak field');
				let l = a.value('Magnet.Length');

				return b * l / (Const.rigidy * alpha);
			},
		}
	}, {
		name: 'Chicane',
		formula: '$R_{56} \\approx -2\\alpha^2(l_{12} + \\frac{2}{3}l_d)\$',
		functions: {
			'Chicane.R56': a => {
				let alpha = a.value('Magnet.Angle');
				let ld = a.value('Magnet.Length');
				let l12 = a.value('Chicane.Distance between Dipoles');

				return -2 * alpha * alpha * (l12 + 2/3 * ld);
			},
			'Magnet.Angle': a => {
				let r56 = a.value('Chicane.R56');
				let ld = a.value('Magnet.Length');
				let l12 = a.value('Chicane.Distance between Dipoles');

				return Math.sqrt(-r56 / (2 * l12 + 4/3 * ld));
			},
			'Magnet.Length': a => {
				let alpha = a.value('Magnet.Angle');
				let r56 = a.value('Chicane.R56');
				let l12 = a.value('Chicane.Distance between Dipoles');

				return (r56 / (-2 * alpha * alpha) - l12) * 3/2;
			},
			'Chicane.Distance between Dipoles': a => {
				let alpha = a.value('Magnet.Angle');
				let r56 = a.value('Chicane.R56');
				let ld = a.value('Magnet.Length');

				return r56 / (-2 * alpha * alpha) - 2/3 * ld;
			},
		},
	}, {
		name: 'Chicane Displacement',
		formula: '$h = l_{12} \\tan(\\alpha)\$',
		functions: {
			'Chicane.Distance between Dipoles': a => {
				let h = a.value('Chicane.Displacement');
				let alpha = a.value('Magnet.Angle');
				let ld = a.value('Magnet.Length');

				return h / Math.tan(alpha) - ld;
			},
			'Chicane.Displacement': a => {
				let l = a.value('Chicane.Distance between Dipoles');
				let alpha = a.value('Magnet.Angle');
				let ld = a.value('Magnet.Length');

				return (l + ld) * Math.tan(alpha);
			},
			'Magnet.Length': a => {
				let l = a.value('Chicane.Distance between Dipoles');
				let alpha = a.value('Magnet.Angle');
				let h = a.value('Chicane.Displacement');

				return h / Math.tan(alpha) - l;
			},
			'Magnet.Angle': a => {
				let h = a.value('Chicane.Displacement');
				let l = a.value('Chicane.Distance between Dipoles');
				let ld = a.value('Magnet.Length');

				return Math.atan(h / (l + ld));
			}
		}
	}, {
		name: 'Undulator',
		formula: '$K = \\frac{eB\\lambda_u}{2\\pi m_ec}\$',
		functions: {
			'Magnet.Peak field': a => {
				let k = a.value('Undulator.K');
				let l_u = a.value('Undulator.Period');
				return k / (l_u * Const.undulator_const);
			},
			'Undulator.K': a => {
				let l_u = a.value('Undulator.Period');
				let b = a.value('Magnet.Peak field');
				return l_u * b * Const.undulator_const;
			},
			'Undulator.Period': a => {
				let k = a.value('Undulator.K');
				let b = a.value('Manget.Peak field')
				return k / (b * Const.undulator_const);
			},
		}
	}, {
		name: 'FEL',
		formula: '$\\lambda_\\gamma = \\frac{\\lambda_u}{2\\gamma^2}(1 + \\frac{K^2}{2})\$',
		functions: {
			'Photon.Wavelength': a => {
				let l_u = a.value('Undulator.Period');
				let g = a.value('Electron.Lorentz Factor');
				let k = a.value('Undulator.K');

				return l_u / (2 * g ** 2) * (1 + k ** 2 / 2);
			},
			'Electron.Lorentz Factor': a => {
				let l_u = a.value('Undulator.Period');
				let l_g = a.value('Photon.Wavelength');
				let k = a.value('Undulator.K');

				return (l_u / (2 * l_g) * (1 + k ** 2 / 2)) ** 0.5;
			},
			'Undulator.Period': a => {
				let g = a.value('Electron.Lorentz Factor');
				let l_g = a.value('Photon.Wavelength');
				let k = a.value('Undulator.K');

				return l_g * (2 * g ** 2) / (1 + k ** 2 / 2);
			},
			'Undulator.K': a => {
				let g = a.value('Electron.Lorentz Factor');
				let l_g = a.value('Photon.Wavelength');
				let l_u = a.value('Undulator.Period');

				return ((l_g / l_u * (2 * g ** 2) - 1) * 2) ** 0.5;
			},
		}
	}, {
		name: 'Time Bandwidth Product',
		formula: '$TBP = c\\frac{\\tau \\delta \\lambda}{\\lambda}\$',
		functions: {
			'Photon.Wavelength': a=> {
				let tbp = a.value('Photon.TBP');
				let dlambda = a.value('Photon.Bandwidth');
				let t = a.value('Photon.Pulse duration');

				return Math.sqrt(Const.c * t * dlambda / tbp);
			},
			'Photon.Bandwidth': a => {
				let tbp = a.value('Photon.TBP');
				let lambda = a.value('Photon.Wavelength');
				let t = a.value('Photon.Pulse duration');

				return tbp * lambda * lambda / (Const.c * t);
			},
			'Photon.Pulse duration': a => {
				let tbp = a.value('Photon.TBP');
				let lambda = a.value('Photon.Wavelength');
				let dlambda = a.value('Photon.Bandwidth');

				return tbp * lambda * lambda / (Const.c * dlambda);
			},
			'Photon.TBP': a => {
				let lambda = a.value('Photon.Wavelength');
				let dlambda = a.value('Photon.Bandwidth');
				let t = a.value('Photon.Pulse duration');

				return t * Const.c * dlambda / (lambda * lambda);
			}
		}
	}, {
		name: 'Photon Bandwidth Conversion',
		formula: '$\\delta \\lambda = \\frac{c}{E^2} \\delta \\lambda\$',
		functions: {
			'Photon.bandwidth': a => {
				let lambda = a.value('Photon.Wavelength');
				let dlambda = a.value('Photon.Bandwidth');
				return dlambda / (lambda * lambda) * Const.k_photon;
			},
			'Photon.Bandwidth': a => {
				let lambda = a.value('Photon.Energy');
				let dlambda = a.value('Photon.bandwidth');
				return Const.k_photon * dlambda / (lambda * lambda);
			},
			'Photon.Energy': a => {
				let dlambda = a.value('Photon.bandwidth');
				let dLambda = a.value('Photon.Bandwidth');

				return Math.sqrt(Const.k_photon * dlambda / dLambda);
			},
		}
	}
]


function get_prefix(value) {
	if (value == 0) {
		return [' ', 0]
	}

	let cat = Math.floor(Math.log10(Math.abs(value)) / 3);
	let prefix = 'zafpnμm kMGTPEZ'[cat + 7];

	return [prefix, value / Math.pow(10, 3 * cat)];
}
