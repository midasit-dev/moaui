def find_center_node(select_node, res_node):
    
    node_x_list = []
    node_y_list = []
    node_z_list = []

    for i in range(len(select_node)):
        node_x_list.append(res_node[select_node[i]]["X"])
        node_y_list.append(res_node[select_node[i]]["Y"])
        node_z_list.append(res_node[select_node[i]]["Z"])

    mid_x = sum(node_x_list) / len(node_x_list)
    mid_y = sum(node_y_list) / len(node_y_list)
    mid_z = sum(node_z_list) / len(node_z_list)

    return mid_x, mid_y, mid_z

def create_flared_pier_data(
        start_node_nb,
        sect_ID,
        matl_ID,
        column_len,
        cap_bot_len,
        cap_top_len
    ):

    # Pier_Coordinations
    total_length = column_len + cap_bot_len + cap_top_len
    unit_length = 1

    div = int(column_len  // unit_length)
    mod = column_len % unit_length

    pier_depth = [-total_length]
    for i in range(div):
        pier_depth.append(pier_depth[-1] + unit_length)
    
    if mod != 0:
        pier_depth.append(pier_depth[-1] + mod)
    else:
        pass
    
    pier_depth.append(pier_depth[-1] + cap_bot_len)
    pier_depth.append(pier_depth[-1] + cap_top_len)
    
    pier_node_data = {}
    for i in range(len(pier_depth)):
        pier_node_data[start_node_nb+i] = {
            "X": 0,
            "Y": 0,
            "Z": pier_depth[i]
        }

    pier_elem_data = {}
    for i in range(len(pier_depth)-1):
        if i == len(pier_depth)-3:
            pier_elem_data[start_node_nb+i] = {
                "TYPE": "BEAM",
                "MATL": matl_ID[1],
                "SECT": sect_ID[1],
                "NODE": [
                    start_node_nb+i,
                    start_node_nb+i+1
                ],
                "ANGLE": 0
            }
        elif i == len(pier_depth)-2:
            pier_elem_data[start_node_nb+i] = {
                "TYPE": "BEAM",
                "MATL": matl_ID[2],
                "SECT": sect_ID[2],
                "NODE": [
                    start_node_nb+i,
                    start_node_nb+i+1
                ],
                "ANGLE": 0
            }
        else:
            pier_elem_data[start_node_nb+i] = {
                "TYPE": "BEAM",
                "MATL": matl_ID[0],
                "SECT": sect_ID[0],
                "NODE": [
                    start_node_nb+i,
                    start_node_nb+i+1
                ],
                "ANGLE": 0
            }

    return pier_node_data, pier_elem_data

def create_structure_group(
        grup_ID,
        select_node,
        pile_node_body,
        pier_elem_body
    ):
    
    pier_node = pile_node_body.keys()
    pier_elem = pier_elem_body.keys()

    group_node = list(pier_node) + list(select_node)
    group_elem = list(pier_elem)
    
    grup_body = {
        grup_ID : {
            "N_LIST": group_node,
            "E_LIST": group_elem
        }
    }

    return grup_body

def create_boundary_condtions(
        bngr_name,
        res_rigd,
        select_node,
        top_node_nb
    ):

    if res_rigd == None:
        rigd_id = 1
    elif top_node_nb in res_rigd.keys():
        rigd_id = max([item["ID"] for item in res_rigd[top_node_nb]["ITEMS"]]) + 1
    else :
        rigd_id = 1
    
    rigd_body = {
        top_node_nb : {
            "ITEMS":[
                {
                    "ID": rigd_id,
                    "GROUP_NAME": bngr_name,
                    "DOF": 111111,
                    "S_NODE": select_node
                }
            ]
        }
    }

    return rigd_body