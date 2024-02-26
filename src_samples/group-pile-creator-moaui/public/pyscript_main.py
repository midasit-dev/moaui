from pyscript_engineers_web import MidasAPI, Product
from pyscript_engineers_web import VectorCalculation as vc

import pyscript_foundations_modeling as fm
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
def get_data(KEY):
	civil = MidasAPI(Product.CIVIL, "KR")
	res = civil.db_read(KEY)
	return json.dumps(res)

def create_group_pile(
				grup_ID:int,
        bngr_ID:int,
        pile_matl_ID:int,
        pile_sect_ID:int,
        cap_matl_ID:int,
        cap_sect_ID:int,
        pile_start_nb:int,
        cap_start_nb:int,
        pile_array_long:int,
        pile_array_tran:int,
        pile_spacing_long:float,
        pile_spacing_tran:float,
        cap_edge_spacing_long:float,
        cap_edge_spacing_tran:float,
        spacing_style_int:int,
        pile_dia:float,
        pile_length:float,
        cap_height:float,
        cap_modeling:str
    ):
  
    civil = MidasAPI(Product.CIVIL, "KR")

    # -------------------------------------------------------------------
    # Input from UI
    # -------------------------------------------------------------------
    pile_array = [pile_array_long, pile_array_tran]
    pile_spacing = [pile_spacing_long, pile_spacing_tran]
    cap_edge_spacing = [cap_edge_spacing_long, cap_edge_spacing_tran]
    if spacing_style_int == 1:
        spacing_style = "D"
    elif spacing_style_int == 2:
        spacing_style = "L"

    if cap_modeling == "true":
        cap_modeling = True
    elif cap_modeling == "false":
        cap_modeling = False

    # Advanced input
    cap_type = "BEAM" # "BEAM" or "PLATE"
    modeling_x_dir = "-Z" # "+Z" or "-Z"

    # Get selected node list from Civil 
    select_node = civil.view_select_get().get("NODE_LIST")

    if select_node == None or len(select_node) == 0:
        error_message = {"error":"Please select nodes"}
        return json.dumps(error_message)
    
    if len(select_node) != 1:
        error_message = {"error":"Please select more than 2 nodes"}
        return json.dumps(error_message)
    # -------------------------------------------------------------------
    # Data Check
    # -------------------------------------------------------------------
    res_matl = civil.db_read("MATL")
    res_sect = civil.db_read("SECT")

    if not pile_sect_ID in res_sect.keys():
        error_message = {"error":"There is no select section ID for pile, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_sect_ID in res_sect.keys():
        error_message = {"error":"There is no select section ID for pilecap, please click the refresh button"}
        return json.dumps(error_message)

    if not pile_matl_ID in res_matl.keys():
        error_message = {"error":"There is no select material ID for pile, please click the refresh button"}
        return json.dumps(error_message)
    elif not cap_matl_ID in res_matl.keys():
        error_message = {"error":"There is no select material ID for pilecap, please click the refresh button"}
        return json.dumps(error_message)

    # take only SB, SR type
    pile_sect_shape = res_sect[pile_sect_ID]["SECT_BEFORE"]["SHAPE"]
    cap_sect_shape = res_sect[cap_sect_ID]["SECT_BEFORE"]["SHAPE"]

    if not pile_sect_shape == "SR":
        error_message = {"error":"Please check the pile section shape"}
        return json.dumps(error_message)

    if not cap_sect_shape == "SB":
        error_message = {"error":"Please check the pile cap section shape"}
        return json.dumps(error_message)

    # ===================================================================
    # Start Modeling
    # ===================================================================
    # Get Civil data
    select_node = select_node[0]
    skew_info = civil.db_read_item("SKEW", select_node)
    node_info = civil.db_read_item("NODE", select_node)

    # Calculation local normalization vector
    node_normalz_vector = vc.nomarlz_vector_skew_info(skew_info)
    node_origin_coords = [node_info["X"], node_info["Y"], node_info["Z"]]
    node_origin_angle = vc.find_angle_from_vector(node_normalz_vector)

    # Create PileCap Data
    cap_node_body, cap_elem_body, cap_sect_body = fm.pilecap(
        select_node,
        cap_start_nb,
        cap_type,
        cap_height,
        cap_edge_spacing,
        spacing_style,
        cap_matl_ID,
        cap_sect_ID,
        pile_array,
        pile_spacing,
        pile_dia,
        modeling_x_dir
    )

    # Create Pilecap Node
    for key, value in cap_node_body.items():
        cap_node_coords = [value["X"], value["Y"], value["Z"]]
        global_point = vc.convert_to_global_coordinates(node_origin_coords, node_normalz_vector, cap_node_coords)
        cap_node_body[key]["X"] = global_point[0]
        cap_node_body[key]["Y"] = global_point[1]
        cap_node_body[key]["Z"] = global_point[2]    

    # Update Pilecap Node Angle
    cap_angle_body = {
        cap_start_nb: {
            "iMETHOD": 1,
            "ANGLE_X": node_origin_angle[0],
            "ANGLE_Y": node_origin_angle[1],
            "ANGLE_Z": node_origin_angle[2],
        }
    }

    # Calculation Pilecap Vector and Angle
    cap_node_coord = [cap_node_body[cap_start_nb]["X"], cap_node_body[cap_start_nb]["Y"], cap_node_body[cap_start_nb]["Z"]]
    if modeling_x_dir == "+Z":
        cap_elem_vector = vc.local_vector_from_2points(cap_node_coord, node_origin_coords)
    elif modeling_x_dir == "-Z":
        cap_elem_vector = vc.local_vector_from_2points(node_origin_coords, cap_node_coord)
    cap_elem_angle = vc.find_angle_to_fit_vector(modeling_x_dir, cap_elem_vector, node_normalz_vector)
    cap_elem_body[cap_start_nb]["ANGLE"] = cap_elem_angle



    # Create Pile Data
    if cap_modeling == False:
        cap_height = 0

    pile_node_body, pile_elem_body, pile_sect_body, top_node_nb = fm.group_pile(
        pile_start_nb,
        pile_dia,
        pile_length,
        pile_array,
        spacing_style,
        pile_spacing,
        pile_sect_ID,
        pile_matl_ID,
        cap_height,
        modeling_x_dir
    )

    # Create Pile Node
    for key, value in pile_node_body.items():
        pile_node_coords = [value["X"], value["Y"], value["Z"]]
        global_point = vc.convert_to_global_coordinates(node_origin_coords, node_normalz_vector, pile_node_coords)
        pile_node_body[key]["X"] = global_point[0]
        pile_node_body[key]["Y"] = global_point[1]
        pile_node_body[key]["Z"] = global_point[2]

    # Update Pile Node Angle
    pile_anlge_body = {}
    for key, value in pile_node_body.items():
        pile_anlge_body[key] = {
            "iMETHOD": 1,
            "ANGLE_X": node_origin_angle[0],
            "ANGLE_Y": node_origin_angle[1],
            "ANGLE_Z": node_origin_angle[2],
        }

    # Create Pile Elements Angle
    for key in pile_elem_body:
        pile_elem_body[key]['ANGLE'] = cap_elem_angle

    # Check Node and Element Data
    res_node = civil.db_read("NODE")
    res_elem = civil.db_read("ELEM")

    exist_node_list = list(res_node.keys())
    exist_elem_list = list(res_elem.keys())

    if cap_modeling == True:
        new_node_list = list(cap_node_body.keys()) + list(pile_node_body.keys())
        new_elem_list = list(cap_elem_body.keys()) + list(pile_elem_body.keys())
        node_range = str(list(cap_node_body.keys())[0]) + ", " + str(min(list(pile_node_body.keys()))) + " ~ " + str(max(list(pile_node_body.keys())))
        elem_range = str(list(cap_elem_body.keys())[0]) + ", " + str(min(list(pile_elem_body.keys()))) + " ~ " + str(max(list(pile_elem_body.keys())))
    else:
        new_node_list = list(pile_node_body.keys())
        new_elem_list = list(pile_elem_body.keys())
        node_range = str(min(new_node_list)) + " ~ " + str(max(new_node_list))
        elem_range = str(min(new_elem_list)) + " ~ " + str(max(new_elem_list))

    combined_node_list = exist_node_list + new_node_list
    combined_elem_list = exist_elem_list + new_elem_list

    if len(combined_node_list) != len(set(combined_node_list)):
        error_message = {"error":"There are same node number (" + node_range + ")"}
        return json.dumps(error_message)

    if len(combined_elem_list) != len(set(combined_elem_list)):
        error_message = {"error":"There are same element number (" + elem_range + ")"}
        return json.dumps(error_message)

    # Create Pilecap
    if cap_modeling == True:
        civil.db_create("NODE", cap_node_body)
        civil.db_update("SKEW", cap_angle_body)
        civil.db_update("SECT", cap_sect_body)
        civil.db_create("ELEM", cap_elem_body)

    # Create Pile
    civil.db_create("NODE", pile_node_body)
    civil.db_update("SKEW", pile_anlge_body)
    civil.db_update("SECT", pile_sect_body)
    civil.db_create("ELEM", pile_elem_body)

    # Update Structure Group
    if grup_ID != 0:
        grup_body = fm.create_structure_group(grup_ID, cap_modeling, cap_node_body, cap_elem_body, pile_node_body, pile_elem_body)
        civil.db_update("GRUP", grup_body)

    # Boundary Conditions
    res_rigd = civil.db_read("RIGD")
    res_bngr = civil.db_read("BNGR")
    if bngr_ID != 0:
        bngr_name = res_bngr[bngr_ID]["NAME"]
    else:
        bngr_name = ""
    rigd_body = fm.create_boundary_condtions(bngr_name, res_rigd, cap_modeling, cap_start_nb, select_node, top_node_nb)

    civil.db_update("RIGD", rigd_body)

    result_message = {"success":"Group pile modeling is completed"}
    
    return json.dumps(result_message)

# ===================================================================
# TEST FIELD
# ===================================================================
    
# create_modeling = create_group_pile(
#         5, #grup_ID:int,
#         2, #bngr_ID:int
#         3, #pile_matl_ID:int,
#         6, #pile_sect_ID:int,
#         3, #cap_matl_ID:int,
#         5, #cap_sect_ID:int,
#         1000, #pile_start_nb:int,
#         100, #cap_start_nb:int,
#         2, #pile_array_long:int,
#         3, #pile_array_tran:int,
#         2.5, #pile_spacing_long:float,
#         2.5, #pile_spacing_tran:float,
#         1.25, #cap_edge_spacing_long:float,
#         1.25, #cap_edge_spacing_tran:float,
#         1, #spacing_style_int:int,
#         1.2, #pile_dia:float,
#         15.5, #pile_length:float,
#         2, #cap_height:float,
#         "true", #cap_modeling:str,
#     )

# print(create_modeling)