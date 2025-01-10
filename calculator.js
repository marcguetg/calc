'use strict';
if(typeof console === undefined) {
	var log = function() {}
} else {
	var log = console.log;
}


class Property {
	constructor(ini, parent_name) {
		this.name = ini.name;
		this.full_name = `${parent_name}.${ini.name}`
		this.unit = ini.unit;
	}

	set(value) {
		let [prefix, show_value] = get_prefix(value);

		this.value = value;
		this.show_value = show_value;
		this.show_unit = prefix + this.unit;
	}

	focus() {
		this.show_value = this.value;
		this.show_unit = this.unit;
	}

	blur() {
		this.set(this.value);
	}

	clear() {
		delete this.value;
		delete this.show_value;
		delete this.show_unit;
	}

	visible() {
		return 'value' in this;
	}
}


class PropertyGroup {
	constructor(name, ini) {
		this.name = name;
		this.store = ini.map(a => new Property(a, name));
	}

	clear() {
		this.store.forEach(p => p.clear());
	}

	visible() {
		return this.store.some(p => p.visible());
	}
}


class PropertyGroups {
	constructor(ini) {
		this.store = ini.map(a => new PropertyGroup(a.name, a.properties));
		this.map = new Map();

		for (let group of this.store) {
			for (let property of group.store) {
				this.map.set(group.name + '.' + property.name, property);
			}
		}
	}

	value(name) {
		return this.map.get(name).value;
	}

	load(ini) {
		Object.entries(ini).forEach(p => this.map.get(p[0]).set(p[1]));
	}

	clear() {
		this.store.forEach(p => p.clear());
	}
}

class FormulaGroup {
	constructor(ini) {
		this.functions = ini.functions;
		this.names = Object.keys(ini.functions);

		this.name = ini.name;
		this.formula = ini.formula;
	}

	clear() {
		delete this.target;
	}

	visible() {
		return 'target' in this;
	}

}


class FormulaGroups {
	constructor(ini) {
		this.store = [];
		this.map = new Map();

		for (let raw_group of ini) {
			let group = new FormulaGroup(raw_group);
			this.store.push(group);
			this.map.set(group.name, group);
		}
	}

	load(ini) {
		Object.entries(ini).forEach(f => this.map.get(f[0]).target = f[1]);
	}

	clear() {
		this.store.forEach(p => p.clear());
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
			MathJax.typeset([$element[0]]);
		  });
		},
	  ],
	};
});


app.controller('world', function ($scope) {
	window.SCOPE = $scope;

	$scope.property_groups = new PropertyGroups(PROPERTY_STORE);
	$scope.formula_groups = new FormulaGroups(FORMULAS);
	$scope.show_all = false;

	$scope.update = function(property) {
		let already_changed_properties = [property.full_name];
		property.value = property.show_value;

		while ($scope.calculate_unit_trans_formulas(already_changed_properties) || $scope.calculate_formulas(already_changed_properties)) {
		}
	}

	$scope.calculate_unit_trans_formulas = function(already_changed_properties) {
		for (let [key, fun] of Object.entries(UNIT_TRANS_FORMULAS)) {
			if (!already_changed_properties.includes(key)) {
				let value = fun($scope.property_groups);
				let prop = $scope.property_groups.map.get(key);

				if (!Number.isNaN(value) && value !== prop.value) {
					prop.set(value);
					already_changed_properties.push(key)
					return true;
				}
			}
		}
	}

	$scope.calculate_formulas = function(already_changed_properties) {
		for (let formula_group of $scope.formula_groups.store) {
			if ('target' in formula_group) {
				for (let changed_property_name of already_changed_properties) {
					if (formula_group.names.includes(changed_property_name)) {
						if (!already_changed_properties.includes(formula_group.target)) {
							let value = formula_group.functions[formula_group.target]($scope.property_groups);
							let prop = $scope.property_groups.map.get(formula_group.target);

							if (!Number.isNaN(value) && value !== prop.value) {
								prop.set(value);
								already_changed_properties.push(prop.full_name)
								return true;
							}
						}
					}
				}
			}
		}
	}

	$scope.load = function(name) {
		$scope.clear();

		let ini = $scope.preset.get(name);
		$scope.formula_groups.load(ini.formulas);

		for (let [key, value] of Object.entries(ini.properties)) {
			let prop = $scope.property_groups.map.get(key);
			prop.show_value = value;
			$scope.update(prop);
			prop.set(value);
		}
	}

	$scope.clear = function() {
		$scope.property_groups.clear();
		$scope.formula_groups.clear();
	}

	$scope.load_names = PRESET.map(p => p.name);
	$scope.preset = new Map(PRESET.map(p => [p.name, p]));
	$scope.load($scope.load_names[0]);
});
