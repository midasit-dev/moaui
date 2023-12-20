# if you want to use other python files, import here and functions export your javascript code.
import json
from pyscript_engineers_web import set_g_values, get_g_values

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

# ↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓
from pyscript_engineers_web import MidasAPI, Product

import section_vertices as sv
import section_properties as sp
import eqv_stress as eqv
import nonlinear_aashto as aashto
import data_check as dc

# import table_print as result
import pprint as pprint

def main_calculation(
		section_key,
		material_key,
		zone_of_temp,
		surface_type,
		apply_T3,
		T3_heating,
		T3_cooling,
		res_unit_json,
		res_sect_json,
		res_matl_json
	):
	
	if apply_T3 == "true":
		apply_T3 = True
	else:
		apply_T3 = False

	if zone_of_temp == 1:
		zone_of_temp = "ZONE1"
	elif zone_of_temp == 2:
		zone_of_temp = "ZONE2"
	elif zone_of_temp == 3:
		zone_of_temp = "ZONE3"
	elif zone_of_temp == 4:
		zone_of_temp = "ZONE4"
	else:
		print("Error: Please select zone of temperature from 1 to 4")
		exit()

	if surface_type == 1:
		surface_type = "PLAIN"
	elif surface_type == 2:
		surface_type = "ASPHALT"

	assign_load = "BOTH" # "HEATING", "COOLING", or "BOTH"

	res_unit_json = json.loads(res_unit_json)
	res_sect_json = json.loads(res_sect_json)
	res_matl_json = json.loads(res_matl_json)

	res_unit = {int(key): value for key, value in res_unit_json.items()}
	res_sect = {int(key): value for key, value in res_sect_json.items()}
	res_matl = {int(key): value for key, value in res_matl_json.items()}
	# Read units data

	# Read section data
	
	if res_sect == None:
		print("No section data")
		exit()
	
	# Check available section
	available_sect = dc.available_section_type(res_sect)
	if type(available_sect) == str:
		print(available_sect)
		exit()
	
	# Read material data
	
	if res_matl == None:
		print("No material data")
		exit()

	# Check available material
	available_matl = dc.available_material_type(res_matl)
	if type(available_matl) == str:
		print(available_matl)
		exit()

	sect_type = res_sect[section_key]["SECTTYPE"]
	sect_shape = res_sect[section_key]["SECT_BEFORE"]["SHAPE"]
	type_of_girder = dc.get_girder_type(sect_type, sect_shape) # "Steel" or "Concrete"


	# =============================================================================
	# Calculations start
	# =============================================================================
	#Coordinates
	sec_info = sv.available_section_information(res_sect)
	sec_info_index = sec_info["key"].index(section_key)
	# Slab material properties
	g_elastic, g_thermal = dc.get_material_prop(res_unit, res_matl[material_key])
	if not sec_info["elast"][sec_info_index]:
		s_elastic = g_elastic
		s_thermal = g_thermal
	else:
		s_elastic = g_elastic / sec_info["elast"][sec_info_index]
		s_thermal = g_thermal / sec_info["thermal"][sec_info_index]

	# Get Section Coordinates
	
	outer, inner, slab = sv.section_coordinates(
		sec_info["size"][sec_info_index],
		sec_info["slab"][sec_info_index],
		sec_info["joint"][sec_info_index],
		sec_info["type"][sec_info_index],
		sec_info["shape"][sec_info_index],
		sec_info["opt1"][sec_info_index],
		sec_info["opt2"][sec_info_index],
		sec_info["ref"][sec_info_index])
	
	# Calculate Section Properties and Dimensions
	sec_properties = sp.section_calculator(outer, inner, slab, g_elastic, s_elastic)
	sec_dimension = sp.section_dimension(outer, inner, slab)

	# Calculate Temperature Gradient
	inf_point, inf_temp_h, inf_temp_c = aashto.nonlieaner_temperature(res_unit, sec_dimension["height"], sec_dimension["slab_thick"], type_of_girder, zone_of_temp, surface_type, apply_T3, T3_heating, T3_cooling)
	
	# Calculate self_equilibrating Stress
	self_eq_stress = eqv.self_equilibrating_stress(outer, inner, slab, g_thermal, s_thermal, g_elastic, s_elastic, sec_properties, sec_dimension, inf_point, inf_temp_h, inf_temp_c)
	stress_heating, stress_cooling = eqv.find_max_min_stress(self_eq_stress)

	#==============================================================================
	# OutPut
	#==============================================================================
	returnValue = {
		"g_elastic": g_elastic,
		"g_thermal": g_thermal,
		"s_elastic": s_elastic,
		"s_thermal": s_thermal,
		"stress_heating": stress_heating,
		"stress_cooling": stress_cooling,
		"height": sec_dimension["height"],
		"inf_point": inf_point,
		"inf_temp_h": inf_temp_h,
		"inf_temp_c": inf_temp_c,
		"self_eq_stress": self_eq_stress,
	}

	return json.dumps(returnValue)

