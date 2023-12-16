# if you want to use other python files, import here and functions export your javascript code.
import json
from pyscript_engineers_web import set_g_values, get_g_values

# ↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓
from pyscript_engineers_web import MidasAPI, Product

import section_vertices as sv
import section_properties as sp
import eqv_stress as eqv
import nonlinear_aashto as aashto
import data_check as dc

# import table_print as result
import pprint as pprint

######################################
# python - javascript 간 Sample Code #
######################################

# js에서 set("from js string")을 실행하면 value에 "from js string"이 대입되고 출력 할 수 있습니다.
def set(v):
	# "from js string"을 value에 대입 합니다. 이 때, value는 string이 됩니다.
	value = v
	# value를 다시 return 할 수도 있습니다.
	return value

# js에서 get을 호출하면 "from python string"을 받을 수 있습니다.
def get():
	return "from python string"

# jsonString = '\"jsString\": \{
# 	\"key1\": 1,
#		\"key2\": \"value\"
# \}'
# 위와 같은 형태의 문자열을 매개변수로 받습니다.
def setJsonString(jsonString):
	# jsonString을 parsing하여 dictionary형태로 변환 합니다.
	_dict = json.loads(jsonString)
	# dict에서 key1과 key2의 value를 찾아 대입 합니다.
	value1 = _dict["key1"]
	value2 = _dict["key2"]
	# 출력 해봅니다.
	print("key1: ", value1, " key2: ", value2)
	# 다시 dictionary를 업데이트해서 return 합니다.
	return json.dumps({
		"description": "from python",
		"key1": value1,
		"key2": value2
	})

def getJsonString():
	# dictionary를 선언 합니다.
	_dict = {
		"key1": 1,
		"key2": "value"
	}
	# dictionary를 json 형태의 string으로 변환 합니다.
	jsonString = json.dumps(_dict)
	# json 형태의 string을 return 합니다.
	return jsonString

######################################
######################################
######################################

def getDB(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

def main():
	civil = MidasAPI(Product.CIVIL, "KR")

	# Read units data
	res_unit = civil.db_read("UNIT")

	# Read section data
	res_sect = civil.db_read("SECT")
	if res_sect == None:
			print("No section data")
			exit()

	# Check available section
	available_sect = dc.available_section_type(res_sect)
	if type(available_sect) == str:
			print(available_sect)
			exit()

	# Read material data
	res_matl = civil.db_read("MATL")
	if res_matl == None:
			print("No material data")
			exit()

	# Check available material
	available_matl = dc.available_material_type(res_matl)
	if type(available_matl) == str:
			print(available_matl)
			exit()

	#Input
	section_key = available_sect[0][28] # Section ID = 29
	material_key = available_matl[0][1] # Material ID = 2

	print('??')
	sect_type = res_sect[section_key]["SECTTYPE"]
	sect_shape = res_sect[section_key]["SECT_BEFORE"]["SHAPE"]
	type_of_girder = dc.get_girder_type(sect_type, sect_shape) # "Steel" or "Concrete"

	zone_of_temp = "ZONE3" # 1, 2, 3, or 4
	surface_type = "ASPHALT" # "PLAIN" or "ASPHALT"
	apply_T3 = True # True or False
	T3_heating = 3.0 # 3.0 or 5.0 limited to True
	T3_cooling = -3.0 # 3.0 or 5.0 limited to True

	assign_load = "BOTH" # "HEATING", "COOLING", or "BOTH"

	# =============================================================================
	# Calculations start
	# =============================================================================
	#Coordinates
	sec_info = sv.available_section_information(res_sect)

	# Slab material properties
	g_elastic, g_thermal = dc.get_material_prop(res_unit, res_matl[material_key])
	if not sec_info["elast"][section_key]:
			s_elastic = g_elastic
			s_thermal = g_thermal
	else:
			s_elastic = g_elastic / sec_info["elast"][section_key]
			s_thermal = g_thermal / sec_info["thermal"][section_key]

	# Get Section Coordinates
	sec_info_index = sec_info["key"].index(section_key)
	outer, inner, slab = sv.section_coordinates(
			sec_info["size"][sec_info_index],
			sec_info["slab"][sec_info_index],
			sec_info["joint"][sec_info_index],
			sec_info["type"][sec_info_index],
			sec_info["shape"][sec_info_index],
			sec_info["opt1"][sec_info_index],
			sec_info["opt2"][sec_info_index],
			sec_info["ref"][sec_info_index])
	# result.table_print(outer, inner, slab, tabletitle='Section Coordiantes', pricision = 3)

	# Calculate Section Properties and Dimensions
	sec_properties = sp.section_calculator(outer, inner, slab, g_elastic, s_elastic)
	sec_dimension = sp.section_dimension(outer, inner, slab)

	# sec_properties_key = list(sec_properties.keys())
	# sec_properties_value = [value for value in sec_properties.values()]
	# result.table_print([sec_properties_key, sec_properties_value], tabletitle='properties', pricision = 3)

	# Calculate Temperature Gradient
	inf_point, inf_temp_h, inf_temp_c = aashto.nonlieaner_temperature(res_unit, sec_dimension["height"], sec_dimension["slab_thick"], type_of_girder, zone_of_temp, surface_type, apply_T3, T3_heating, T3_cooling)
	# result.table_print([inf_point, inf_temp_h, inf_temp_c], tabletitle='Temperature', pricision = 3)

	# Calculate self_equilibrating Stress
	self_eq_stress = eqv.self_equilibrating_stress(outer, inner, slab, g_thermal, s_thermal, g_elastic, s_elastic, sec_properties, sec_dimension, inf_point, inf_temp_h, inf_temp_c)
	stress_heating, stress_cooling = eqv.find_max_min_stress(self_eq_stress)
	# result.table_print(self_eq_stress, tabletitle='Self Equilibrating Stress', pricision = 3)
	# result.stress_result(self_eq_stress)

	#==============================================================================
	# OutPut
	#==============================================================================
	# Material Table
	table_material_components = [
			["Girder-Elastic Modulus; Eg", "Girder-Thermal Coeff.; ag", "Slab-Elastic Modulus; Es", "Slab-Thermal Coeff.; as"],
			[g_elastic, g_thermal, s_elastic, s_thermal]
	]
	# result.table_print(table_material_components, tabletitle='Material', pricision = 7)

	# Stress Summary Table
	table_stress_summary = [
			["Girder Top Stress", "Girder Bottom Stress", "Slab Top Stress", "Slab Bottom Stress"],
			stress_heating,
			stress_cooling
	]
	# result.table_print(table_stress_summary, tabletitle='Stress Summary', pricision = 4)

	# Diagram
	# result.plot_temp_stress(sec_dimension["height"], inf_point, inf_temp_h, inf_temp_c, self_eq_stress)

	#==============================================================================
	# Assign Loads
	#==============================================================================
	# while True:
	# 		Input_load = input("Do you want to add loads? (y/n): ")
	# 		if Input_load.lower() == 'y':
	# 				add_load = True
	# 				break
	# 		elif Input_load.lower() == 'n':
	# 				add_load = False
	# 				exit()
	# 		else:
	# 				print("Invalid input. Please enter 'y' or 'n'.")

	# Get selected elem list from Civil 
	select_elem = civil.view_select_get().get("ELEM_LIST")
	select_stld_key_heat = 3
	select_stld_key_cool = 4

	print('test!!')

	# if type(select_elem) == None or len(select_elem) == 0:
	# 		print("Error: Please select elements")
	# 		exit()

	# # Get Load Data
	# res_btmp = civil.db_read("BTMP")
	# res_stld = civil.db_read("STLD")
	# res_elem = civil.db_read("ELEM")

	# stld_name_heat = res_stld[select_stld_key_heat]["NAME"]
	# stld_name_cool = res_stld[select_stld_key_cool]["NAME"]

	# # Available_elememnt_check
	# elem_check = dc.available_beam_elem(select_elem, res_elem)
	# if elem_check == False:
	# 		print("Error: Please select beam elements")
	# 		exit()

	# elem_check2 = dc.available_btmp_sect(select_elem, res_elem, section_key)

	# if elem_check2 == False:
	# 		print("Error: Please select elements with the same section")
	# 		exit()

	# # Create BTMP Input
	# btmp_data_heat, btmp_data_cool = dc.create_btmp_input(res_btmp, select_elem, stld_name_heat, stld_name_cool, inf_point, inf_temp_h, inf_temp_c)

	# if assign_load == "BOTH":
	# 		civil.db_update("BTMP", btmp_data_heat)
	# 		civil.db_update("BTMP", btmp_data_cool)
	# elif assign_load == "HEATING":
	# 		civil.db_update("BTMP", btmp_data_heat)
	# elif assign_load == "COOLING":
	# 		civil.db_update("BTMP", btmp_data_cool)
