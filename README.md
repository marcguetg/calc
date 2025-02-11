# Bugs

# Functionality

# GUI

# Properties
Beam Dynamics.Missmatch

# Functions


https://journals.aps.org/prab/abstract/10.1103/PhysRevSTAB.10.034801
10.1109/PAC.1995.504603 (M. Xie)


# SuperGroup
 + list = [Group]
 + map = Map[GroupName.ItemName, Item]
 - value('#Group.name.#Item.name') -> Item.value
 - clear()
 - clear_state()
 - all_visible_items() -> [Visible Items]
 - load_item(ItemName, ItemValue)


# Group
+ name = str
+ list = [Items]
+ color = str
- visible() -> bool
- clear()

# Item
+ name = str
+ full_name = str
+ visible() -> bool
- clear()

# Property extends Item
+ unit = str
+ valid = bool
- set(double)
- parse(str)
- state

# Formula extends Item
+ formula = str
+ properties = Map[Properties]
- populate_properties(PropertyGroup)
- calc() -> bool

# Preset extends Item
- load(SuperGroup.Property, SuperGroup.Formula)

# Theme
+ themes = [str]
+ properties = [str]
+ formulas = [str]
- set theme

# PropertyState
- empty - bool
- required - bool
- dependent - bool

