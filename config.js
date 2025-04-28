'use strict';

var PRESETS = [
	{
		name: 'Undulators',
		store: [
			{
				name: 'SASE 1/2',
				properties: {
					'Electron.Energy': '14 GeV',
					'Electron.Peak current': '6 kA',
					'Undulator.K': '2.399',
					'Undulator.Period': '40 mm',
					'Electron.Norm. trans. emittance': '1 um',
					'Beam dynamics.β': '40 m',
				},
				formulas: {
					'Undulator.Parameter': 'Magnet.Peak field',
					'Undulator.Wavelength': 'Photon.Wavelength',
					'Dipole.Magnetic Rigidy': 'Magnet.Angle',
					'FEL.Pierce parameter': 'FEL.Pierce parameter',
					'FEL.Power gain length': 'FEL.1D Power gain length',
					'FEL.Saturation power': 'Photon.Power',
					'FEL.Bandwidth': 'Photon.Bandwidth',
					'Beam dynamics.Beam power': 'Electron.Power',
					'Beam dynamics.Beam size': 'Electron.√(<x²>)',
					'Beam dynamics.Emittance normalization': 'Electron.Trans. emittance',
					'Photons.Bandwidth conversion': 'Photon.bandwidth',
				}
			}, {
				name: 'SASE3',
				properties: {
					'Electron.Energy': '14 GeV',
					'Undulator.K': '7.26',
					'Electron.Peak current': '6 kA',
					'Undulator.Period': '68 mm',
					'Electron.Norm. trans. emittance': '1 um',
					'Beam dynamics.β': '40 m',
				},
				formulas: {
					'Undulator.Parameter': 'Magnet.Peak field',
					'Undulator.Wavelength': 'Photon.Wavelength',
					'Dipole.Magnetic Rigidy': 'Magnet.Angle',
					'FEL.Pierce parameter': 'FEL.Pierce parameter',
					'FEL.Power gain length': 'FEL.1D Power gain length',
					'FEL.Saturation power': 'Photon.Power',
					'FEL.Bandwidth': 'Photon.Bandwidth',
					'Beam dynamics.Beam power': 'Electron.Power',
					'Beam dynamics.Beam size': 'Electron.√(<x²>)',
					'Beam dynamics.Emittance normalization': 'Electron.Trans. emittance',
					'Photons.Bandwidth conversion': 'Photon.bandwidth',
				}
			}
		]
	}, {
		name: 'Chicanes',
		store: [
			{
				name: 'LH',
				properties: {
					'Electron.Energy': '130 MeV',
					'Magnet.angle': '5.7 degree',
					'Magnet.Length': '247 mm',
					'Chicane.Distance between Dipoles': '53 mm',
				},
				formulas: {
					'Chicane.Compression': 'Chicane.R56',
					'Chicane.Displacement': 'Chicane.Displacement',
					'Dipole.Magnetic Rigidy': 'Magnet.Peak field',
				}
			}, {
				name: 'BC0',
				properties: {
					'Electron.Energy': '130 MeV',
					'Magnet.angle': '7.83 degree',
					'Magnet.Length': '558 mm',
					'Chicane.Distance between Dipoles': '950 mm',
				},
				formulas: {
					'Chicane.Compression': 'Chicane.R56',
					'Chicane.Displacement': 'Chicane.Displacement',
					'Dipole.Magnetic Rigidy': 'Magnet.Peak field',
				}
			}, {
				name: 'BC1',
				properties: {
					'Electron.Energy': '700 MeV',
					'Magnet.angle': '3.05 degree',
					'Magnet.Length': '558 mm',
					'Chicane.Distance between Dipoles': '8.45 m',
				},
				formulas: {
					'Chicane.Compression': 'Chicane.R56',
					'Chicane.Displacement': 'Chicane.Displacement',
					'Dipole.Magnetic Rigidy': 'Magnet.Peak field',
				}
			}, {
				name: 'BC2',
				properties: {
					'Electron.Energy': '2.4 GeV',
					'Magnet.angle': '2.36 degree',
					'Magnet.Length': '558 mm',
					'Chicane.Distance between Dipoles': '8.45 m',
				},
				formulas: {
					'Chicane.Compression': 'Chicane.R56',
					'Chicane.Displacement': 'Chicane.Displacement',
					'Dipole.Magnetic Rigidy': 'Magnet.Peak field',
				}
			},
		]
	}, {
		name: 'Photons',
		store: [
			{
				name: 'Single Pulse',
				properties: {
					'Photon.Energy': '18 keV',
					'Photon.Pulse duration': '37 as',
					'Photon.Bandwidth': '150 fm',
				},
				formulas: {
					'Photons.Time Bandwidth Product': 'Photon.TBP',
					'Photons.Bandwidth conversion': 'Photon.bandwidth',
				}
			}
		]
	}
];


var PROPERTIES = [
	{
		name: 'Magnet',
		store: [
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
		store: [
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
		store: [
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
		store: [
			{
				name: 'Energy',
				unit: 'eV',
			}, {
				name: 'Lorentz factor',
				unit: '',
			}, {
				name: 'Trans. emittance',
				unit: 'm',
			}, {
				name: 'Norm. trans. emittance',
				unit: 'm',
			}, {
				name: '√(<x²>)',
				unit: "m",
			}, {
				name: "√(<x'²>)",
				unit: '',
			}, {
				name: "<xx'>",
				unit: 'm',
			}, {
				name: 'Peak current',
				unit: 'A',
			}, {
				name: 'Power',
				unit: 'W',
			}
		]
	}, {
		name: 'Beam dynamics',
		store: [
			{
				name: 'β',
				unit: 'm',
			}, {
				name: 'ɑ',
				unit: '',
			}, {
				name: 'ɣ',
				unit: '',
			}
		]
	}, {
		name: 'FEL',
		store: [
			{
				name: 'Pierce parameter',
				unit: '',
			}, {
				name: '1D Power gain length',
				unit: 'm',
			}
		]
	}, {
		name: 'Photon',
		store: [
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
			}, {
				name: 'Power',
				unit: 'W',
			}
		]
	}
];


class Const {
	static ElectronRestMassIneV = 511e3;
	static ElectronMass = 9.11e-31;
	static c = 299792458;
	static ElementaryCharge = 1.602e-19;
	static undulator_const = Const.ElementaryCharge/ (2 * Math.PI * Const.ElectronMass * Const.c);
	static k_photon = 1240e-9;
	static rigidy = 3336e-12;
}


var UNIT_TRANS_FORMULAS = [
	{
		target: 'Photon.Energy',
		source: 'Photon.Frequency',
		function: a => a * Const.k_photon / Const.c,
	}, {
		target: 'Photon.Wavelength',
		source: 'Photon.Energy',
		function: a =>  Const.k_photon / a,
	}, {
		target: 'Photon.Frequency',
		source: 'Photon.Wavelength',
		function: a => Const.c / a,
	}, {
		target: 'Magnet.Angle',
		source: 'Magnet.angle',
		function: a => Math.PI / 180 * a,
	}, {
		target: 'Magnet.angle',
		source: 'Magnet.Angle',
		function: a => 180 / Math.PI * a,
	}, {
		target: 'Electron.Energy',
		source: 'Electron.Lorentz factor',
		function: a => Const.ElectronRestMassIneV * a,
	}, {
		target: 'Electron.Lorentz factor',
		source: 'Electron.Energy',
		function: a => a / Const.ElectronRestMassIneV,
	}, {
		target: 'Magnet.Length',
		source: 'Undulator.Period',
		function: a => a / 2,
	}, {
		target: 'Undulator.Period',
		source: 'Magnet.Length',
		function: a => a * 2,
	}, {
		target: 'Chicane.Delay',
		source: 'Chicane.R56',
		function: a => a / (2 * Const.c),
	}, {
		target: 'Chicane.R56',
		source: 'Chicane.Delay',
		function: a => a * 2 * Const.c,
	}
]


var FORMULAS = [
	{
		name: 'Dipole',
		store: [
			{
				name: 'Magnetic Rigidy',
				formula: '$\\alpha \\approx \\frac{Bl}{3336 E}\$',
				functions: [
					{
						name: 'Magnet.Angle',
						function: a => {
							let b = a.value('Magnet.Peak field');
							let l = a.value('Magnet.Length');
							let e = a.value('Electron.Energy');

							return b * l / (e * Const.rigidy);
						}
					}, {
						name: 'Magnet.Peak field',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let l = a.value('Magnet.Length');
							let e = a.value('Electron.Energy');

							return alpha * Const.rigidy * e / l;
						}
					}, {
						name: 'Magnet.Length',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let b = a.value('Magnet.Peak field');
							let e = a.value('Electron.Energy');

							return alpha * Const.rigidy * e / b;
						}
					}, {
						name: 'Electron.Energy',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let b = a.value('Magnet.Peak field');
							let l = a.value('Magnet.Length');

							return b * l / (Const.rigidy * alpha);
						}
					}
				]
			}
		]
	}, {
		name: 'Chicane',
		store: [
			{
				name: 'Compression',
				formula: '$R_{56} \\approx -2\\alpha^2(l_{12} + \\frac{2}{3}l_d)\$',
				functions: [
					{
						name: 'Chicane.R56',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let ld = a.value('Magnet.Length');
							let l12 = a.value('Chicane.Distance between Dipoles');

							return -2 * alpha * alpha * (l12 + 2/3 * ld);
						}
					}, {
						name: 'Magnet.Angle',
						function: a => {
							let r56 = a.value('Chicane.R56');
							let ld = a.value('Magnet.Length');
							let l12 = a.value('Chicane.Distance between Dipoles');

							return Math.sqrt(-r56 / (2 * l12 + 4/3 * ld));
						},
					}, {
						name: 'Magnet.Length',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let r56 = a.value('Chicane.R56');
							let l12 = a.value('Chicane.Distance between Dipoles');

							return (r56 / (-2 * alpha * alpha) - l12) * 3/2;
						},
					}, {
						name: 'Chicane.Distance between Dipoles',
						function: a => {
							let alpha = a.value('Magnet.Angle');
							let r56 = a.value('Chicane.R56');
							let ld = a.value('Magnet.Length');

							return r56 / (-2 * alpha * alpha) - 2/3 * ld;
						},
					}
				],
			}, {
				name: 'Displacement',
				formula: '$h = l_{12} \\tan(\\alpha)\$',
				functions: [
					{
						name: 'Chicane.Distance between Dipoles',
						function: a => {
							let h = a.value('Chicane.Displacement');
							let alpha = a.value('Magnet.Angle');
							let ld = a.value('Magnet.Length');

							return h / Math.tan(alpha) - ld;
						},
					}, {
						name: 'Chicane.Displacement',
						function: a => {
							let l = a.value('Chicane.Distance between Dipoles');
							let alpha = a.value('Magnet.Angle');
							let ld = a.value('Magnet.Length');

							return (l + ld) * Math.tan(alpha);
						},
					}, {
						name: 'Magnet.Length',
						function: a => {
							let l = a.value('Chicane.Distance between Dipoles');
							let alpha = a.value('Magnet.Angle');
							let h = a.value('Chicane.Displacement');

							return h / Math.tan(alpha) - l;
						},
					}, {
						name: 'Magnet.Angle',
						function: a => {
							let h = a.value('Chicane.Displacement');
							let l = a.value('Chicane.Distance between Dipoles');
							let ld = a.value('Magnet.Length');

							return Math.atan(h / (l + ld));
						}
					}
				]
			}
		]
	}, {
		name: 'Undulator',
		store: [
			{
				name: 'Parameter',
				formula: '$K = \\frac{eB\\lambda_u}{2\\pi m_ec}\$',
				functions: [
					{
						name: 'Magnet.Peak field',
						function: a => {
							let k = a.value('Undulator.K');
							let l_u = a.value('Undulator.Period');
							return k / (l_u * Const.undulator_const);
						},
					}, {
						name: 'Undulator.K',
						function: a => {
							let l_u = a.value('Undulator.Period');
							let b = a.value('Magnet.Peak field');
							return l_u * b * Const.undulator_const;
						},
					}, {
						name: 'Undulator.Period',
						function: a => {
							let k = a.value('Undulator.K');
							let b = a.value('Magnet.Peak field')
							return k / (b * Const.undulator_const);
						},
					}
				]
			}, {
				name: 'Wavelength',
				formula: '$\\lambda_\\gamma = \\frac{\\lambda_u}{2\\gamma^2}(1 + \\frac{K^2}{2})\$',
				functions: [
					{
						name: 'Photon.Wavelength',
						function: a => {
							let l_u = a.value('Undulator.Period');
							let g = a.value('Electron.Lorentz factor');
							let k = a.value('Undulator.K');

							return l_u / (2 * g ** 2) * (1 + k ** 2 / 2);
						},
					}, {
						name: 'Electron.Lorentz factor',
						function: a => {
							let l_u = a.value('Undulator.Period');
							let l_g = a.value('Photon.Wavelength');
							let k = a.value('Undulator.K');

							return (l_u / (2 * l_g) * (1 + k ** 2 / 2)) ** 0.5;
						},
					}, {
						name: 'Undulator.Period',
						function: a => {
							let g = a.value('Electron.Lorentz factor');
							let l_g = a.value('Photon.Wavelength');
							let k = a.value('Undulator.K');

							return l_g * (2 * g ** 2) / (1 + k ** 2 / 2);
						},
					}, {
						name: 'Undulator.K',
						function: a => {
							let g = a.value('Electron.Lorentz factor');
							let l_g = a.value('Photon.Wavelength');
							let l_u = a.value('Undulator.Period');

							return ((l_g / l_u * (2 * g ** 2) - 1) * 2) ** 0.5;
						},
					}
				]
			}
		]
	}, {
		name: 'Beam dynamics',
		store: [
			{
				name: 'Emittance',
				formula: "$\\epsilon = \\sqrt{<x^2><x'^2> - <xx'>^2}\$",
				functions: [
					{
						name: 'Electron.Trans. emittance',
						function: a => {
							let x = a.value('Electron.√(<x²>)');
							let xp = a.value("Electron.√(<x'²>)");
							let xxp = a.value("Electron.<xx'>");
							return Math.sqrt(x*x*xp*xp - xxp*xxp);
						}
					}, {
						name: 'Electron.√(<x²>)',
						function: a => {
							let xp = a.value("Electron.√(<x'²>)");
							let xxp = a.value("Electron.<xx'>");
							let e = a.value('Electron.Trans. emittance');
							return Math.sqrt((e*e + xxp*xxp) / (xp*xp));
						}
					}, {
						name: "Electron.√(<x'²>)",
						function: a => {
							let x = a.value('Electron.√(<x²>)');
							let xxp = a.value("Electron.<xx'>");
							let e = a.value('Electron.Trans. emittance');
							return Math.sqrt((e*e + xxp*xxp) / (x*x));
						}
					}, {
						name: "Electron.<xx'>",
						function: a => {
							let x = a.value('Electron.√(<x²>)');
							let xp = a.value("Electron.√(<x'²>)");
							let e = a.value('Electron.Trans. emittance');
							return Math.sqrt(Math.abs(e*e - x*x*xp*xp));
						}
					}
				]
			}, {
				name: 'Emittance normalization',
				formula: '$\\epsilon = \\frac{\\epsilon}{\gamma}\$',
				functions: [
					{
						name: 'Electron.Trans. emittance',
						function: a => {
							let e = a.value('Electron.Norm. trans. emittance');
							let gamma = a.value('Electron.Lorentz factor');
							return e / gamma;
						}
					}, {
						name: 'Electron.Norm. trans. emittance',
						function: a => {
							let e = a.value('Electron.Trans. emittance');
							let gamma = a.value('Electron.Lorentz factor');
							return e * gamma;
						}
					}, {
						name: 'Electron.Lorentz factor',
						function: a => {
							let e = a.value('Electron.Trans. emittance');
							let en = a.value('Electron.Norm. trans. emittance');
							return en / e;
						}
					}
				]
			}, {
				name: 'Twiss',
				formula: '$\\beta\\gamma - \\alpha^2 = 1\$',
				functions: [
					{
						name: 'Beam dynamics.β',
						function: a => {
							let alpha = a.value('Beam dynamics.ɑ');
							let gamma = a.value('Beam dynamics.ɣ');
							return (alpha * alpha + 1) / gamma;
						}
					}, {
						name: 'Beam dynamics.ɣ',
						function: a => {
							let alpha = a.value('Beam dynamics.ɑ');
							let beta = a.value('Beam dynamics.β');
							return (alpha * alpha + 1) / beta;
						}
					}, {
						name: 'Beam dynamics.ɑ',
						function: a => {
							let gamma = a.value('Beam dynamics.ɣ');
							let beta = a.value('Beam dynamics.β');
							return Math.sqrt(beta * gamma - 1);
						}
					}
				]
			}, {
				name: 'Beam size',
				formula: '$\\beta\\epsilon = \\langle x^2 \\rangle \$',
				functions: [
					{
						name: 'Beam dynamics.β',
						function: a => {
							let x2 = a.value('Electron.√(<x²>)');
							let e = a.value('Electron.Trans. emittance');
							return x2 * x2  / e;
						}
					}, {
						name: 'Electron.√(<x²>)',
						function: a => {
							let beta = a.value('Beam dynamics.β');
							let e = a.value('Electron.Trans. emittance');
							return Math.sqrt(beta * e);
						}
					}, {
						name: 'Electron.Trans. emittance',
						function: a => {
							let x2 = a.value('Electron.√(<x²>)');
							let beta = a.value('Beam dynamics.β');
							return x2 * x2 / beta;
						}
					}
				]
			}, {
				name: 'Beam power',
				formula: '$P_{beam} = E * I\$',
				functions: [
					{
						name: 'Electron.Power',
						function: a => {
							let I = a.value('Electron.Peak current');
							let e = a.value('Electron.Energy');
							return I * e;
						}
					}, {
						name: 'Electron.Peak current',
						function: a => {
							let p = a.value('Electron.Power');
							let e = a.value('Electron.Energy');
							return p / e;
						}
					}, {
						name: 'Electron.Energy',
						function: a => {
							let I = a.value('Electron.Peak current');
							let p = a.value('Electron.Power');
							return p / I;
						}
					}
				]
			}
		]
	}, {
		name: 'FEL',
		store: [
			{
				name: 'Pierce parameter',
				formula: '$\\rho = \\sqrt[3]{\\frac{I_eK^2[JJ]^2}{16I_A\\gamma^3 \\langle x^2 \\rangle}}\$',
				functions: [
					{
						name: 'FEL.Pierce parameter',
						function: a => {
							let I = a.value('Electron.Peak current');
							let K = a.value('Undulator.K');
							let gamma = a.value('Electron.Lorentz factor');
							let x2 = a.value('Electron.√(<x²>)');
							let ku = 2 * Math.PI / a.value('Undulator.Period');
							let p = [-2.67080511e-04,  6.21669646e-03, -4.78703279e-02,  8.12777979e-01, 1.29867795e-01];
							let kj = polyval(p, K);

							let rho3 = 1 / 16 * I / 17e3 * kj * kj / (gamma * gamma * gamma * x2 * x2 * ku * ku);
							return Math.cbrt(rho3);
						}
					}, {
						name: 'Electron.Peak current',
						function: a => {
							let K = a.value('Undulator.K');
							let gamma = a.value('Electron.Lorentz factor');
							let x2 = a.value('Electron.√(<x²>)');
							let ku = 2 * Math.PI / a.value('Undulator.Period');
							let p = [-2.67080511e-04,  6.21669646e-03, -4.78703279e-02,  8.12777979e-01, 1.29867795e-01];
							let kj = polyval(p, K);
							let rho = a.value('FEL.Pierce parameter');

							return rho * rho * rho * (gamma * gamma * gamma * x2 * x2 * ku * ku) * 17e3 * 16 / (kj * kj);
						}
					}, {
						name: 'Undulator.K',
						function: a => {
							let I = a.value('Electron.Peak current');
							let gamma = a.value('Electron.Lorentz factor');
							let x2 = a.value('Electron.√(<x²>)');
							let ku = 2 * Math.PI / a.value('Undulator.Period');
							let rho = a.value('FEL.Pierce parameter');

							let kj = Math.sqrt((rho * rho * rho * x2 * x2 * gamma * gamma * gamma * ku * ku * 17e3 * 16) / I);
							let p = [ 0.00181715, -0.03036422, 0.17004101, 1.11685716, -0.12410276];
							return polyval(p, kj);
						}
					}, {
						name: 'Electron.Lorentz factor',
						function: a => {
							let K = a.value('Undulator.K');
							let I = a.value('Electron.Peak current');
							let x2 = a.value('Electron.√(<x²>)');
							let ku = 2 * Math.PI / a.value('Undulator.Period');
							let p = [-2.67080511e-04,  6.21669646e-03, -4.78703279e-02,  8.12777979e-01, 1.29867795e-01];
							let kj = polyval(p, K);
							let rho = a.value('FEL.Pierce parameter');

							return Math.cbrt((kj * kj * I) / (rho * rho * rho * x2 * x2 * ku * ku * 17e3 * 16));
						}
					}, {
						name: 'Electron.√(<x²>)',
						function: a => {
							let K = a.value('Undulator.K');
							let I = a.value('Electron.Peak current');
							let ku = 2 * Math.PI / a.value('Undulator.Period');
							let p = [-2.67080511e-04,  6.21669646e-03, -4.78703279e-02,  8.12777979e-01, 1.29867795e-01];
							let kj = polyval(p, K);
							let rho = a.value('FEL.Pierce parameter');
							let gamma = a.value('Electron.Lorentz factor');

							return Math.sqrt((kj * kj * I) / (rho * rho * rho * gamma * gamma * gamma * ku * ku * 17e3 * 16));
						}
					}, {
						name: 'Undulator.Period',
						function: a => {
							let K = a.value('Undulator.K');
							let I = a.value('Electron.Peak current');
							let x2 = a.value('Electron.√(<x²>)');
							let p = [-2.67080511e-04,  6.21669646e-03, -4.78703279e-02,  8.12777979e-01, 1.29867795e-01];
							let kj = polyval(p, K);
							let rho = a.value('FEL.Pierce parameter');
							let gamma = a.value('Electron.Lorentz factor');

							let ku = Math.sqrt((kj * kj * I) / (rho * rho * rho * gamma * gamma * gamma * x2 * x2 * 17e3 * 16));
							return 2 * Math.PI / ku;
						}

					}
				]
			}, {
				name: 'Power gain length',
				formula: '$L_{G0} = \\frac{\\lambda_u}{4\\pi\\sqrt(3)\\rho}\$',
				functions: [
					{
						name: 'FEL.1D Power gain length',
						function: a => {
							let lu = a.value('Undulator.Period');
							let rho = a.value('FEL.Pierce parameter');
							let c = 4 * Math.sqrt(3) * Math.PI;

							return lu / (c * rho);
						}
					}, {
						name: 'FEL.Pierce parameter',
						function: a => {
							let lu = a.value('Undulator.Period');
							let l1d = a.value('FEL.1D Power gain length');
							let c = 4 * Math.sqrt(3) * Math.PI;

							return lu / (c * l1d);
						}
					}, {
						name: 'Undulator.Period',
						function: a => {
							let l1d = a.value('FEL.1D Power gain length');
							let rho = a.value('FEL.Pierce parameter');
							let c = 4 * Math.sqrt(3) * Math.PI;

							return c * rho * l1d;
						}
					}
				]
			}, {
				name: 'Saturation power',
				formula: '$P_{Sat} = \\rho P_{Electron}\$',
				functions: [
					{
						name: 'Photon.Power',
						function: a => {
							let e = a.value('Electron.Power');
							let rho = a.value('FEL.Pierce parameter');
							return e * rho;
						}
					}, {
						name: 'Electron.Power',
						function: a => {
							let e = a.value('Photon.Power');
							let rho = a.value('FEL.Pierce parameter');
							return e / rho;
						}
					}, {
						name: 'FEL.Pierce parameter',
						function: a => {
							let p = a.value('Photon.Power');
							let e = a.value('Electron.Power');
							return p / e;
						}
					}
				]
			}, {
				name: 'Bandwidth',
				formula: '$\\delta_\\lambda = \\rho \\lambda\$',
				functions: [
					{
						name: 'Photon.Bandwidth',
						function: a => {
							let rho = a.value('FEL.Pierce parameter');
							let lambda = a.value('Photon.Wavelength');
							return rho * lambda;
						}
					}, {
						name: 'Photon.Wavelength',
						function: a => {
							let rho = a.value('FEL.Pierce parameter');
							let dlambda = a.value('Photon.Bandwidth');
							return dlambda / rho;
						}
					}, {
						name: 'FEL.Pierce parameter',
						function: a => {
							let dlambda = a.value('Photon.Bandwidth');
							let lambda = a.value('Photon.Wavelength');
							return dlambda / lambda;
						}
					}
				]
			}
		]
	}, {
		name: 'Photons',
		store: [
			{
				name: 'Bandwidth conversion',
				formula: '$\\delta \\lambda = \\frac{c}{E^2} \\delta \\lambda\$',
				functions: [
					{
						name: 'Photon.bandwidth',
						function: a => {
							let energy = a.value('Photon.Energy');
							let lambda = Const.k_photon / energy;
							let dlambda = a.value('Photon.Bandwidth');
							return dlambda / (lambda * lambda) * Const.k_photon;
						},
					}, {
						name: 'Photon.Bandwidth',
						function: a => {
							let lambda = a.value('Photon.Energy');
							let dlambda = a.value('Photon.bandwidth');
							return Const.k_photon * dlambda / (lambda * lambda);
						},
					}, {
						name: 'Photon.Energy',
						function: a => {
							let dlambda = a.value('Photon.bandwidth');
							let dLambda = a.value('Photon.Bandwidth');

							return Math.sqrt(Const.k_photon * dlambda / dLambda);
						},
					}
				]
			}, {
				name: 'Time Bandwidth Product',
				formula: '$TBP = c\\frac{\\tau \\delta \\lambda}{\\lambda}\$',
				functions: [
					{
						name: 'Photon.Wavelength',
						function: a => {
							let tbp = a.value('Photon.TBP');
							let dlambda = a.value('Photon.Bandwidth');
							let t = a.value('Photon.Pulse duration');

							return Math.sqrt(Const.c * t * dlambda / tbp);
						},
					}, {
						name: 'Photon.Bandwidth',
						function: a => {
							let tbp = a.value('Photon.TBP');
							let lambda = a.value('Photon.Wavelength');
							let t = a.value('Photon.Pulse duration');

							return tbp * lambda * lambda / (Const.c * t);
						},
					}, {
						name: 'Photon.Pulse duration',
						function: a => {
							let tbp = a.value('Photon.TBP');
							let lambda = a.value('Photon.Wavelength');
							let dlambda = a.value('Photon.Bandwidth');

							return tbp * lambda * lambda / (Const.c * dlambda);
						},
					}, {
						name: 'Photon.TBP',
						function: a => {
							let lambda = a.value('Photon.Wavelength');
							let dlambda = a.value('Photon.Bandwidth');
							let t = a.value('Photon.Pulse duration');

							return t * Const.c * dlambda / (lambda * lambda);
						}
					}
				]
			}
		]
	}
]


function polyval(p, x) {
	return p[4] + p[3] * x + p[2] * x * x + p[1] * x * x * x + p[0] * x * x * x * x;
}
