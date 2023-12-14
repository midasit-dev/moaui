from pyscript_engineers_web import MidasAPI, Product
from pyscript_engineers_web import VectorCalculation as vc

import pyscript_foundations_modeling as fm

civil = MidasAPI(Product.CIVIL, "KR")

# Get selected node list from Civil 
select_node = civil.view_select_get().get("SELECT").get("NODE_LIST")

print(select_node)

if len(select_node) == 0:
    print("Error: Please select a node")
    exit()
elif len(select_node) != 1:
    print("Error: Please select only one node")
    exit()

# -------------------------------------------------------------------
# Input from Civil
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

pile_matl_ID = 1
pile_sect_ID = 1

cap_matl_ID = 2
cap_sect_ID = 2

res_matl = civil.db_read("MATL")
res_sect = civil.db_read("SECT")

if not pile_matl_ID in res_matl.keys():
    print("Error: Please check the pile material ID")
    exit()

if not pile_sect_ID in res_sect.keys():
    print("Error: Please check the pile section ID")
    exit()

if not cap_matl_ID in res_matl.keys():
    print("Error: Please check the pile cap material ID")
    exit()

if not cap_sect_ID in res_sect.keys():
    print("Error: Please check the pile cap section ID")
    exit()

# take only SB, SR type
pile_sect_shape = res_sect[pile_sect_ID]["SECT_BEFORE"]["SHAPE"]
cap_sect_shape = res_sect[cap_sect_ID]["SECT_BEFORE"]["SHAPE"]

if not pile_sect_shape == "SR":
    print("Error: Please check the pile section shape")
    exit()

if not cap_sect_shape == "SB":
    print("Error: Please check the pile cap section shape")
    exit()

# -------------------------------------------------------------------
# Input from UI
# -------------------------------------------------------------------
pile_start_nb = 1000
cap_start_nb = 100

pile_array = [3, 4]
pile_spacing = [2.5, 2.5]
cap_edge_spacing = [1.25, 1.25]
spacing_style = "D" # "D" or "L"

pile_dia = 1.5
pile_length = 21.1
cap_height = 3.0

cap_modeling = True

# Advanced input
cap_type = "BEAM" # "BEAM" or "PLATE"
modeling_x_dir = "-Z" # "+Z" or "-Z"

# ===================================================================
# Start Modeling
# ===================================================================
# Get Civil data
select_node = select_node[0]
skew_info = civil.db_read_item("SKEW", select_node)
node_info = civil.db_read_item("NODE", select_node)
sect_info = civil.db_read("SECT")

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

# Create Pilecap
if cap_modeling == True:
    civil.db_create("NODE", cap_node_body)
    civil.db_update("SKEW", cap_angle_body)
    civil.db_update("SECT", cap_sect_body)
    civil.db_create("ELEM", cap_elem_body)

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

# Create Pile
civil.db_create("NODE", pile_node_body)
civil.db_update("SKEW", pile_anlge_body)
civil.db_update("SECT", pile_sect_body)
civil.db_create("ELEM", pile_elem_body)

# Update Structure Group
grup_body = fm.create_structure_group(grup_ID, cap_modeling, cap_node_body, cap_elem_body, pile_node_body, pile_elem_body)
civil.db_update("GRUP", grup_body)

# Boundary Conditions
res_rigd = civil.db_read("RIGD")
bngr_name = res_bngr[bngr_ID]["NAME"]
rigd_body = fm.create_boundary_condtions(bngr_name, res_rigd, cap_modeling, cap_start_nb, select_node, top_node_nb)

civil.db_update("RIGD", rigd_body)