'use strict';
if(typeof console === undefined) {
	var log = function() {}
} else {
	var log = console.log;
}

var SETTING = {
	precision: 2,
	show_formulas: false,
	show_all: false,
};


class SuperGroup {
	constructor(ini, cls) {
		this.list = ini.map(i => new Group(i, cls));
		this.map = new Map();

		for (let group of this.list) {
			for (let item of group.list) {
				this.map.set(item.full_name, item);
			}
		}
	}

	clear() {
		this.list.forEach(group => group.clear());
	}

	clear_state() {
		this.map.values().forEach(i => i.clear_state());
	}
}


class Group {
	constructor(ini, cls) {
		this.name = ini.name;
		this.color = ini.color;
		this.list = ini.store.map(i => new cls(i, ini.name));
	}

	visible() {
		return this.list.some(item => item.visible());
	}

	clear() {
		this.list.forEach(item => item.clear());
	}
}


class Item {
	#clear_value;

	constructor(ini, parent_name, clear_value) {
		this.name = ini.name;
		this.full_name = `${parent_name}.${ini.name}`;
		this.#clear_value = clear_value;
		this.value = clear_value;
	}

	clear() {
		this.set(this.#clear_value);
		this.clear_state();
	}

	visible() {
		throw "Abstract";
	}

	clear_state() {
		console.log(this);
		throw "Abstract";
	}
}


class Property extends Item {
	constructor(ini, parent_name) {
		super(ini, parent_name, NaN);
		this.unit = ini.unit;
		this.clear();
	}

	set(value, block) {
		let new_value = this.value !== value;
		this.value = value;
		this.empty = false;

		if (!block) {
			if (Number.isNaN(value)) {
				this.show = ' ' + this.unit;
				this.empty = true;
			} else if (value == 0) {
				if (this.unit) {
					this.show = `0 ${this.unit}`;
				} else {
					this.show = this.unit;
				}
			} else if (this.unit) {
				let cat = Math.floor(Math.log10(Math.abs(value)) / 3);
				let prefix = 'zafpnμm kMGTPEZ'[cat + 7];
				if (prefix === ' ') {
					prefix = '';
				}

				let sv = value / Math.pow(10, 3 * cat);
				this.show = `${sv.toFixed(SETTING.precision)} ${prefix}${this.unit}`;
			} else {
				this.show = this.value.toFixed(SETTING.precision);
			}
		}

		this.changed = true;
		return !this.empty && new_value;
	}

	parse(txt) {
		let block = true;
		if (txt !== undefined) {
			this.show = txt;
			block = false;
		}

		if (this.show === '') {
			this.clear();
			return;
		}

		let [value, unit] = this.show.split(' ');
		if (unit === undefined) {
			unit = '';
		}

		value = parseFloat(value);

		if (unit !== this.unit) {
			let prefix = unit[0];

			if (prefix === 'u') {
				prefix = 'μ';
			}

			let cat = 'zafpnμm kMGTPEZ'.indexOf(prefix) - 7;
			value = value * Math.pow(10, 3 * cat);
		} else {
			unit = ' ' + unit;
		}

		if (Number.isNaN(value) || (unit.substring(1) !== this.unit)) {
			this.valid = false;
		} else {
			this.valid = true;
			this.value = value;
		}

		this.set(this.value, block);
	}

	visible() {
		return !this.empty || this.dependent || this.required;
	}

	clear_state() {
		this.dependent = false;
		this.required = false;
		this.changed = false;
	}

	set_class() {
		this.class = this.empty ? 'empty' : '';

		switch (this.required + this.dependent * 2) {
			case 0:
				this.class = this.class + ' manual';
				break;
			case 1:
				this.class = this.class + ' required';
				break;
			case 2:
				this.class = this.class + ' dependent';
				break;
			case 3:
				this.class = this.class + ' required_dependent';
				break;
			default:
				throw Error;
		}
	}
}


class PropertyMap extends Map {
	value(key) {
		return this.get(key).value;
	}
}


class Formulas extends Item {
	constructor(ini, parent_name) {
		super(ini, parent_name, '');
		this.formula = ini.formula;
		this.functions = new Map(ini.functions.map(p => [p.name, p.function]));
		this.possible_values = ini.functions.map(p => p.name);
		this.possible_values.push('');
	}

	link_properties(properties) {
		this.properties = new PropertyMap(this.functions.keys().map(k => [k, properties.get(k)]));
	}

	calc() {
		if (this.visible()) {
			let result = this.functions.get(this.value)(this.properties);
			return this.properties.get(this.value).set(result, false);
		} else {
			return false;
		}
	}

	set(value) {
		this.value = value;
	}

	visible() {
		return this.value !== '';
	}

	set_property_state() {
		if (this.visible()) {
			this.properties.forEach(p => {
				if (p.full_name === this.value) {
					p.dependent = true;
				} else {
					p.required = true;
				}
			});
		}
	}

	clear_state() {}
}

class Presets extends Item {
	constructor(ini, parent_name) {
		super(ini, parent_name, null);
		this.properties = ini.properties;
		this.formulas = ini.formulas;
	}

	load(properties, formulas) {
		Object.entries(this.properties).forEach(
			i => properties.map.get(i[0]).parse(i[1])
		);
		Object.entries(this.formulas).forEach(i => {
			try {
				formulas.map.get(i[0]).set(i[1])
			} catch (e) {
				console.log(i);
				throw e;
			}
		});
	}
}

class UnitTransFormula {
	constructor(ini, properties) {
		this.source = properties.map.get(ini.source);
		this.target = properties.map.get(ini.target);
		this.function = ini.function;
	}

	calc() {
		if (this.source.changed && !this.source.empty && !this.target.changed) {
			let result = this.function(this.source.value);

			if (result != this.target.value) {
				return this.target.set(result);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}


var app = angular.module('App', []);


app.directive("mathjaxBind", function () {
	return {
	  restrict: "A",
	  controller: [
		"$scope",
		"$element",
		"$attrs",
		function ($scope, $element, $attrs) {
		  $scope.$watch($attrs.mathjaxBind, function (texExpression) {
			$element.html(texExpression);
			try {
				MathJax.typeset([$element[0]]);
			} catch (e) {
				let path ="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
				var script = document.createElement('script');
				script.onload = a => MathJax.typeset([$element[0]]);
				script.src = path;
				document.head.appendChild(script);
			}
		  });
		},
	  ],
	};
});


app.controller('world', function ($scope) {
	window.SCOPE = $scope;

	$scope.properties= new SuperGroup(PROPERTIES, Property);
	$scope.formulas = new SuperGroup(FORMULAS, Formulas);
	$scope.formulas.map.values().forEach(f => f.link_properties($scope.properties.map));
	$scope.unit_trans_formulas = UNIT_TRANS_FORMULAS.map(f => new UnitTransFormula(f, $scope.properties));
	$scope.presets = new SuperGroup(PRESETS, Presets);
	$scope.setting = SETTING;

	$scope.update = function() {
		$scope.formulas.map.values().forEach(f => f.set_property_state());

		let change = true;
		while (change) {
			change = false;
			for (let formula of $scope.formulas.map.values()) {
				change |= formula.calc();
			}

			for (let formula of $scope.unit_trans_formulas) {
				change |= formula.calc();
			}
		}

		$scope.properties.map.values().forEach(p => p.set_class());
		$scope.properties.map.values().forEach(p => p.changed = false);
	}

	$scope.load = function(preset) {
		$scope.clear();
		preset.load($scope.properties, $scope.formulas);
		$scope.update();
	}

	$scope.clear = function() {
		$scope.properties.clear();
		$scope.formulas.clear();
		$scope.update();
		$scope.unit_test_result = '';
	}

	$scope.update_property_show = function() {
		$scope.properties.map.values().forEach(p => p.set(p.value, false));
		$scope.properties.map.values().forEach(p => p.changed = false);
	}

	$scope.unit_test = function() {
		$scope.clear();
		$scope.setting.show_all = false;
		$scope.unit_test_result = unit_test($scope.formulas.map.values());
	}

	$scope.load($scope.presets.map.values().next().value);
	// $scope.unit_test();
});
