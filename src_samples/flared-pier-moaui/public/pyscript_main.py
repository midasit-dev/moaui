from pyscript_engineers_web import MidasAPI, Product
from pyscript_engineers_web import VectorCalculation as vc

import json
from pyscript_engineers_web import set_g_values, get_g_values, requests_json

# Basic CRUD Sample
def py_db_create(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_create(item_name, json.loads(items)))

def py_db_create_item(item_name, item_id, item):
  civil = MidasAPI(Product.CIVIL, "KR")
  return json.dumps(civil.db_create_item(item_name, item_id, json.loads(item)))

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

def py_db_read_item(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read_item(item_name, item_id))

def py_db_update(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update(item_name, json.loads(items)))

def py_db_update_item(item_name, item_id, item):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update_item(item_name, item_id, json.loads(item)))

def py_db_delete(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_delete(item_name, item_id))

def py_select_node_list():
	civil = MidasAPI(Product.CIVIL, "KR")
	select = civil.view_select_get()
	if select == None:
		error_message = {"error":"Unkown Error, Get selected node list from Civil"}
		return json.dumps(error_message)
	nodes = select.get("NODE_LIST")
	if nodes == None:
		error_message = {"error":"Please select nodes"}
		return json.dumps(error_message)
	return json.dumps(nodes)

def unit_notation():
    civil = MidasAPI(Product.CIVIL, "KR")
    res_unit = civil.db_read("UNIT")[1]
    notation = f'Units: {res_unit["DIST"].lower()}'
    return notation

'''
                            __                         __                                
                     __    /\ \__                     /\ \                               
 __  __  __   _ __  /\_\   \ \ ,_\     __             \ \ \___       __    _ __     __   
/\ \/\ \/\ \ /\`'__\\/\ \   \ \ \/   /'__`\            \ \  _ `\   /'__`\ /\`'__\ /'__`\ 
\ \ \_/ \_/ \\ \ \/  \ \ \   \ \ \_ /\  __/             \ \ \ \ \ /\  __/ \ \ \/ /\  __/ 
 \ \___x___/' \ \_\   \ \_\   \ \__\\ \____\             \ \_\ \_\\ \____\ \ \_\ \ \____\
  \/__//__/    \/_/    \/_/    \/__/ \/____/  _______     \/_/\/_/ \/____/  \/_/  \/____/
                                             /\______\                                   
                                             \/______/                                   
'''
# ↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓

import flared_pier_modeling as fpm

def create_pier(
        grup_ID:int,
        bngr_ID:int,
        start_node_nb:int,
        
        column_sect_ID:int,
        cap_bot_sect_ID:int,
        cap_top_sect_ID:int,
        
        column_matl_ID:int,
        cap_bot_matl_ID:int, 
        cap_top_matl_ID:int,
        
        column_len:float,
        cap_bot_len:float,
        cap_top_len:float,
):
    civil = MidasAPI(Product.CIVIL, "KR")

    # Get selected node list from Civil 
    select = civil.view_select_get()
    if select == None:
        error_message = {"error":"Unkown Error, Get selected node list from Civil"}
        return json.dumps(error_message)
      
    select_node = select.get("NODE_LIST")

    if select_node == None or len(select_node) == 0:
        error_message = {"error":"Please select nodes"}
        return json.dumps(error_message)
    
    if len(select_node) <= 1:
        error_message = {"error":"Please select more than 2 nodes"}
        return json.dumps(error_message)

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
        error_message = {"error":"Please select nodes that have same local axis"}
        return json.dumps(error_message)

    # -------------------------------------------------------------------
    # Input from UI
    # -------------------------------------------------------------------
    res_grup = civil.db_read("GRUP")
    res_bngr = civil.db_read("BNGR")

    res_matl = civil.db_read("MATL")
    res_sect = civil.db_read("SECT")

    if not column_sect_ID in res_sect.keys():
        error_message = {"error":"There is no select section ID for column, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_bot_sect_ID in res_sect.keys():
        error_message = {"error":"There is no select section ID for cap bot, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_top_sect_ID in res_sect.keys():
        error_message = {"error":"There is no select section ID for cap top, please click the refresh button"}
        return json.dumps(error_message)

    if not column_matl_ID in res_matl.keys():
        error_message = {"error":"There is no select material ID for column, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_bot_matl_ID in res_matl.keys():
        error_message = {"error":"There is no select material ID for cap bot, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_top_matl_ID in res_matl.keys():
        error_message = {"error":"There is no select material ID for cap top, please click the refresh button"}
        return json.dumps(error_message)

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
    
    # Check Node and Element Data
    res_node = civil.db_read("NODE")
    res_elem = civil.db_read("ELEM")

    exist_node_list = list(res_node.keys())
    exist_elem_list = list(res_elem.keys())

    new_node_list = list(pier_node_body.keys())
    new_elem_list = list(pier_elem_body.keys())

    combined_node_list = exist_node_list + new_node_list
    combined_elem_list = exist_elem_list + new_elem_list

    node_range = str(min(new_node_list)) + " ~ " + str(max(new_node_list))
    elem_range = str(min(new_elem_list)) + " ~ " + str(max(new_elem_list))
    
    if len(combined_node_list) != len(set(combined_node_list)):        
        error_message = {"error":"There are same node number (" + node_range + ")"}
        return json.dumps(error_message)

    if len(combined_elem_list) != len(set(combined_elem_list)):
        error_message = {"error":"There are same element number (" + elem_range + ")"}
        return json.dumps(error_message)

    # Create Pier
    civil.db_create("NODE", pier_node_body)
    civil.db_create("ELEM", pier_elem_body)
    civil.db_update("SKEW", pier_anlge_body)

    # Update Structure Group
    if grup_ID != 0:
        grup_body = fpm.create_structure_group(grup_ID, select_node, pier_node_body, pier_elem_body)
        civil.db_update("GRUP", grup_body)

    # Create Rigid Link
    res_rigd = civil.db_read("RIGD")
    if bngr_ID != 0:
        bngr_name = res_bngr[bngr_ID]["NAME"]
    else:
        bngr_name = ""
    top_node_nb = max(pier_node_body.keys())
    rigd_body = fpm.create_boundary_condtions(bngr_name, res_rigd, select_node, top_node_nb)

    civil.db_update("RIGD", rigd_body)

    result_message = {"success":"Flared pier modeling is completed"}
    return json.dumps(result_message)

# ===================================================================
# TEST FIELD
# ===================================================================
    
# create_modeling = create_pier(
#         4, #grup_ID:int,
#         1, #bngr_ID:int,
#         10000, #start_node_nb:int,
#         2, #column_sect_ID:int,
#         4, #cap_bot_sect_ID:int,
#         3, #cap_top_sect_ID:int,
#         2, #column_matl_ID:int,
#         2, #cap_bot_matl_ID:int, 
#         2, #cap_top_matl_ID:int,
#         12, #column_len:float,
#         1.2, #cap_bot_len:float,
#         0.5, #cap_top_len:float,
        
#     )

# print(create_modeling)