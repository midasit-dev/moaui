# if you want to use other python files, import here and functions export your javascript code.
import json
from pyscript_engineers_web import set_g_values, get_g_values
from pyscript_engineers_web import MidasAPI, Product

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

# ↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓
import section_vertices as sv
import section_properties as sp
import eqv_stress as eqv
import nonlinear_aashto as aashto
import data_check as dc
import json

import table_print as result
import pprint as pprint

import numpy as np

def default_encoder(obj):
    if isinstance(obj, float):
        return format(obj, '.15g')  # 부동 소수점 값을 문자열로 변환
    if isinstance(obj, np.integer):
        return int(obj)  # numpy.int32를 Python 내장 정수형으로 변환
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


def unit_notation():
    civil = MidasAPI(Product.CIVIL, "KR")
    res_unit = civil.db_read("UNIT")[1]
    notation = f'Units: {res_unit["FORCE"]}, {res_unit["DIST"].lower()}, °{res_unit["TEMPER"]}'
    return notation

def import_section():
    civil = MidasAPI(Product.CIVIL, "KR")
    
    # Read seciton data
    res_sect = civil.db_read("SECT")
    if res_sect == None or "error" in res_sect.keys():
        error_message = {"error":"There is no section data"}
        return json.dumps(error_message)
    
    sect_available_name = []
    sect_available_id = []

    # Available section
    for key in res_sect.keys():
        sect_name = res_sect[key]["SECT_NAME"]
        sect_type = res_sect[key]["SECTTYPE"]
        sect_shape = res_sect[key]["SECT_BEFORE"]["SHAPE"]
        if sect_type in ["PSC", "COMPOSITE"]:
            if sect_shape in ["1CEL", "2CEL", "3CEL", "PSCI", "PSCT", "PSCH", "PSCM", "PSCB", "VALU", "B", "I", "Tub", "GB", "GI", "GT", "PC", "CI", "CT"]:
                sect_available_name.append(sect_name)
                sect_available_id.append(key)

    sect_available_data = {
        "name": sect_available_name,
        "id": sect_available_id
    }
    return json.dumps(sect_available_data)

def girder_type(
        section_key: int
    ):
    civil = MidasAPI(Product.CIVIL, "KR")

    # Read section data
    res_sect = civil.db_read("SECT")

    #Type_of_Girder
    if res_sect == None or "error" in res_sect.keys():
        error_message = {"error":"There is no section data"}
        return json.dumps(error_message)
    sect_type = res_sect[section_key]["SECTTYPE"]
    sect_shape = res_sect[section_key]["SECT_BEFORE"]["SHAPE"]
    type_of_girder = dc.get_girder_type(sect_type, sect_shape) # "Steel : 2" or "Concrete : 1"
    
    return type_of_girder

def stress_calculation(
        section_key: int,
        material_key: int,
        zone_of_temp: int,
        surface_type: int,
        apply_T3: str,
        T3_heating: float,
        T3_cooling: float,
) :
    civil = MidasAPI(Product.CIVIL, "KR")

    # Input from Javascript
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

    if surface_type == 1:
        surface_type = "PLAIN"
    elif surface_type == 2:
        surface_type = "ASPHALT"

    # =============================================================================
    # Read units data
    res_unit = civil.db_read("UNIT")

    # Read section data
    res_sect = civil.db_read("SECT")
    if res_sect == None:
        error_message = {"error":"There is no section data"}
        return json.dumps(error_message)
    
    # Check available section
    available_sect = dc.available_section_type(res_sect)
    if type(available_sect) == str:
        error_message = {"error":available_sect}
        return json.dumps(error_message)

    # Read material data
    res_matl = civil.db_read("MATL")
    if res_matl == None:
        error_message = {"error":"There is no material data"}
        return json.dumps(error_message)
        
    # Check available material
    available_matl = dc.available_material_type(res_matl)
    if type(available_matl) == str:
        error_message = {"error":available_matl}
        return json.dumps(error_message)

    #Type_of_Girder
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
    # table_material_components = [
    #     ["Girder-Elastic Modulus; Eg", "Girder-Thermal Coeff.; ag", "Slab-Elastic Modulus; Es", "Slab-Thermal Coeff.; as"],
    #     [g_elastic, g_thermal, s_elastic, s_thermal]
    # ]
    # result.table_print(table_material_components, tabletitle='Material', pricision = 7)

    # Stress Summary Table
    # table_stress_summary = [
    #     ["Girder Top Stress", "Girder Bottom Stress", "Slab Top Stress", "Slab Bottom Stress"],
    #     stress_heating,
    #     stress_cooling
    # ]
    # result.table_print(table_stress_summary, tabletitle='Stress Summary', pricision = 4)
    # result.plot_temp_stress(sec_dimension["height"], inf_point, inf_temp_h, inf_temp_c, self_eq_stress)
    # Diagram

    x_g, y_g, x_h_temp, x_c_temp, y_temp, x_outer_h, y_outer_h, x_outer_c, y_outer_c = dc.create_chart_data(sec_dimension["height"], inf_point, inf_temp_h, inf_temp_c, self_eq_stress)

    # chart comman girder data
    chart_girder = []
    for i in range(len(x_g)):
        chart_girder.append({
            "x":x_g[i],
            "y":y_g[i]
        })

    # chart temp gradient
    chart_temp_h = []
    for i in range(len(y_temp)):
        chart_temp_h.append({
						"x":x_h_temp[i],
						"y":y_temp[i]
				})
        
    chart_temp_c = []
    for i in range(len(y_temp)):
        chart_temp_c.append({
						"x":x_c_temp[i],
						"y":y_temp[i]
				})

    # chart self eq stresses
    chart_heating = []
    for i in range(len(x_outer_h)):
        chart_heating.append({
            "x":x_outer_h[i],
            "y":y_outer_h[i]
        })
    
    chart_cooling = []
    for i in range(len(x_outer_c)):
        chart_cooling.append({
            "x":x_outer_c[i],
            "y":y_outer_c[i]
        })

    if len(stress_heating)==2:
        stress_heating = [stress_heating[0], stress_heating[1], "-", "-"]
        stress_cooling = [stress_cooling[0], stress_cooling[1], "-", "-"]

    # Return Value
    # g_elastic, g_thermal, s_elastic, s_thermal, stress_heating, stress_cooling, chart_girder, chart_heating, chart_cooling => UI에 적용되는 데이터
    # assign_load_input => "ADD" 버튼시 동작하는 assign_load 함수에서 적용되는 데이터

    returnValue = {
		  "g_elastic": g_elastic,
		  "g_thermal": g_thermal,
		  "s_elastic": s_elastic,
		  "s_thermal": s_thermal,
		  "stress_heating": stress_heating,
		  "stress_cooling": stress_cooling,
		  "chart_girder": chart_girder,
		  "chart_heating": chart_heating,
		"chart_cooling": chart_cooling,
      "chart_temp_h": chart_temp_h,
      "chart_temp_c": chart_temp_c,
      "assign_load_input": [inf_point, inf_temp_h, inf_temp_c]
	  }
    
    # int32 오류 떄문에 dumps가 불가능해서 부동소수점 처리용 encoder 추가
    return json.dumps(returnValue, default=default_encoder)

def assign_load(objStr: str):
    _dict = json.loads(objStr)
    heating_assign = _dict["heating_assign"] # boolean
    cooling_assign = _dict["cooling_assign"] # boolean
    select_stld_key_heat = _dict["select_stld_key_heat"] # int
    select_stld_key_cool = _dict["select_stld_key_cool"] # int
    result_data = _dict["result_data"] # str
  
    civil = MidasAPI(Product.CIVIL, "KR")  
  
    # Input from Javascript
    # if heating_assign == "true":
    #     heating_assign = True
    # else:
    #     heating_assign = False

    # if cooling_assign == "true":
    #     cooling_assign = True
    # else:
    #     cooling_assign = False
    
    result_data = json.loads(result_data)
    #==============================================================================
    # Assign Loads
    #==============================================================================
    assign_load = "BOTH" # "HEATING", "COOLING", or "BOTH"

    # Get selected elem list from Civil 
    select_elem = civil.view_select_get().get("SELECT").get("ELEM_LIST")
    
    if select_elem == None or len(select_elem) == 0:
        error_message = {"error":"Please select elements"}
        return json.dumps(error_message)

    # Check selected element in available section
    section = import_section()
    section_id = json.loads(section).get("id")
    
    res_elem = civil.db_read("ELEM")

    for _, element in enumerate(select_elem):
        if not res_elem[element]["TYPE"] == "BEAM":
            error_message = {"error":"Please select beam elements"}
            return json.dumps(error_message)
        if not res_elem[element]["SECT"] in section_id:
            error_message = {"error":"Please select elements with available section"}
            return json.dumps(error_message)

    # Get Load Data
    res_btmp = civil.db_read("BTMP")
    res_stld = civil.db_read("STLD")
    res_elem = civil.db_read("ELEM")

    if heating_assign:
        stld_name_heat = res_stld[select_stld_key_heat]["NAME"]
    else:
        stld_name_heat = "NONE"

    if cooling_assign:
        stld_name_cool = res_stld[select_stld_key_cool]["NAME"]
    else:
        stld_name_cool = "NONE"

    # Available_elememnt_check
    # Create BTMP Input
    btmp_data_heat, btmp_data_cool = dc.create_btmp_input(res_btmp, select_elem, stld_name_heat, stld_name_cool, result_data[0], result_data[1], result_data[2])

    if heating_assign and cooling_assign:
        civil.db_update("BTMP", btmp_data_heat)
        civil.db_update("BTMP", btmp_data_cool)
    elif heating_assign and not cooling_assign:
        civil.db_update("BTMP", btmp_data_heat)
    elif not heating_assign and cooling_assign:
        civil.db_update("BTMP", btmp_data_cool)
    
    result_message = {"success":"Assign Load Success"}
    return json.dumps(result_message)

# =============================================================================
# TEST FIELD        
# =============================================================================
# sect_available_data = import_section()
# print("available section data = ", sect_available_data)

# type_of_girder = girder_type(101)
# print("type_of_girder = ", type_of_girder)

# stress_result = stress_calculation(101, 101, 3, 1, "false", 0, 0)
# print("stress_result = ", stress_result)
# stress_result = json.loads(stress_result)
# result_data = stress_result.get("assign_load_input")

# add_load = assign_load("true", "true", 3, 4, json.dumps(result_data))
# print("add_load = ", add_load)