import json
from pyscript_engineers_web import requests_json, set_g_values, get_g_values

# Get from VerifyDialog, Set global variables! (important logic, do not delete!)
def set_g_global_variables(g_values):
  set_g_values(g_values)

def get_global_variables():
  return get_g_values()

# ↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓
from pyscript_engineers_web  import MidasAPI, Product

import flared_pier_modeling as fpm
import vector_calculation as vc

def get_grup():
  civil = MidasAPI(Product.CIVIL, "KR")
  res_grup = civil.db_read("GRUP")
  return res_grup

def get_BNGR():
  civil = MidasAPI(Product.CIVIL, "KR")
  res_bngr = civil.db_read("BNGR")
  return res_bngr

def main():
	civil = MidasAPI(Product.CIVIL, "KR")

	# Get selected node list from Civil 
	select_node = civil.view_select_get().get("NODE_LIST")

	if len(select_node) <= 1:
			print("Please select more than 2 nodes.")
			exit()

	# Check selected node has same local axis
	res_skew = civil.db_read("SKEW")

	if res_skew == None:
			same_local_axis = True
	else:
			skew_data = []
			for i in range(len(select_node)):
					if select_node[i] in res_skew.keys():
							skew_data.append(res_skew[select_node[i]])
					else:
							skew_data.append(0)
			same_local_axis = all(element == skew_data[0] for element in skew_data)

	if same_local_axis == False:
			print("Please select nodes that have same local axis.")
			exit()

	# -------------------------------------------------------------------
	# Input from UI
	# -------------------------------------------------------------------
	grup_ID = 1
	bngr_ID = 1

	res_grup = civil.db_read("GRUP")
	res_bngr = civil.db_read("BNGR")

	if not grup_ID in res_grup.keys():
			print("Error: Please check the group ID")
			exit()

	if not bngr_ID in res_bngr.keys():
			print("Error: Please check the boundary ID")
			exit()

	column_sect_ID = 1
	cap_bot_sect_ID = 2
	cap_top_sect_ID = 3

	column_matl_ID = 1
	cap_bot_matl_ID = 1
	cap_top_matl_ID = 1

	res_matl = civil.db_read("MATL")
	res_sect = civil.db_read("SECT")

	if not column_sect_ID in res_sect.keys():
			print("Error: Please check the pile section ID")
			exit()
	elif not cap_bot_sect_ID in res_sect.keys():
			print("Error: Please check the pile section ID")
			exit()
	elif not cap_top_sect_ID in res_sect.keys():
			print("Error: Please check the pile section ID")
			exit()

	if not column_matl_ID in res_matl.keys():
			print("Error: Please check the pile cap material ID")
			exit()
	elif not cap_bot_matl_ID in res_matl.keys():
			print("Error: Please check the pile cap material ID")
			exit()
	elif not cap_top_matl_ID in res_matl.keys():
			print("Error: Please check the pile cap material ID")
			exit()

	start_node_nb = 10000

	column_len = 12.5
	cap_bot_len = 1.2
	cap_top_len = 0.5

	# -------------------------------------------------------------------
	# Create column
	# -------------------------------------------------------------------
	# x, y, z coordinate of selected nodes
	res_node = civil.db_read("NODE")
	mid_x, mid_y, mid_z = fpm.find_center_node(select_node, res_node)

	skew_info = civil.db_read_item("SKEW", select_node[0])
	node_normalz_vector = vc.nomarlz_vector_skew_info(skew_info)
	node_origin_coords = [mid_x, mid_y, mid_z]
	node_origin_angle = vc.find_angle_from_vector(node_normalz_vector)

	# Create Data 
	sect_ID = [column_sect_ID, cap_bot_sect_ID, cap_top_sect_ID]
	matl_ID = [column_matl_ID, cap_bot_matl_ID, cap_top_matl_ID]

	pier_node_body, pier_elem_body = fpm.create_flared_pier_data(start_node_nb, sect_ID, matl_ID, column_len, cap_bot_len, cap_top_len)

	# Create Pier Node
	for key, value in pier_node_body.items():
			pier_node_coords = [value["X"], value["Y"], value["Z"]]
			global_point = vc.convert_to_global_coordinates(node_origin_coords, node_normalz_vector, pier_node_coords)
			pier_node_body[key]["X"] = global_point[0]
			pier_node_body[key]["Y"] = global_point[1]
			pier_node_body[key]["Z"] = global_point[2]

	# Calculate element angle
	units_z = [0, 0, 1]
	node_vector_coords = vc.convert_to_global_coordinates(node_origin_coords, node_normalz_vector, units_z)
	pier_elem_vector = vc.local_vector_from_2points(node_origin_coords, node_vector_coords)
	elem_angle = vc.find_angle_to_fit_vector("+Z", pier_elem_vector, node_normalz_vector)

	# Update Pier Element Angle
	for key, value in pier_elem_body.items():
			pier_elem_body[key]["ANGLE"] = elem_angle

	# Create Pier Node Angle
	pier_anlge_body = {}
	for key, value in pier_node_body.items():
			pier_anlge_body[key] = {
					"iMETHOD": 1,
					"ANGLE_X": node_origin_angle[0],
					"ANGLE_Y": node_origin_angle[1],
					"ANGLE_Z": node_origin_angle[2],
			}

	# Create Group
	grup_body = fpm.create_structure_group(grup_ID, select_node, pier_node_body, pier_elem_body)

	# Create Rigid Link
	res_rigd = civil.db_read("RIGD")
	bngr_name = res_bngr[bngr_ID]["NAME"]
	top_node_nb = max(pier_node_body.keys())
	rigd_body = fpm.create_boundary_condtions(bngr_name, res_rigd, select_node, top_node_nb)

	# Create Pier
	civil.db_create("NODE", pier_node_body)
	civil.db_create("ELEM", pier_elem_body)
	civil.db_update("SKEW", pier_anlge_body)
	civil.db_update("GRUP", grup_body)
	civil.db_update("RIGD", rigd_body)
