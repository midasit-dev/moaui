
def pilecap(
        origin_node: int,
        cap_nb: int,
        cap_type: str,
        cap_height: float,
        cap_edge_spacing: list[float, float],
        spacing_style: str,
        cap_matl: int,
        cap_sect: int,
        pile_array: list[int, int],
        pile_spacing: list[float, float],
        pile_dia: float,
        direction: str
    ):

    if cap_type == "BEAM":
        # Node Data
        cap_node_data = {
            cap_nb: {
                "X": 0,
                "Y": 0,
                "Z": -cap_height
            }
        }
        # Element Data
        if direction == "+Z":
            elem_node = [cap_nb, origin_node]
        elif direction == "-Z":
            elem_node = [origin_node, cap_nb]
        
        cap_elem_data = {
            cap_nb: {
                "TYPE": "BEAM",
                "MATL": cap_matl,
                "SECT": cap_sect,
                "NODE": elem_node,
                "ANGLE": 0
            }
        }

        # Section Data
        longi_len = 0
        trans_len = 0
        if spacing_style == "D":
            longi_len += pile_spacing[0] * pile_dia * (pile_array[0] - 1)
            trans_len += pile_spacing[1] * pile_dia * (pile_array[1] - 1)
        elif spacing_style == "L":
            longi_len += pile_spacing[0] * (pile_array[0] - 1)
            trans_len += pile_spacing[1] * (pile_array[1] - 1)            

        if spacing_style == "D":
            longi_len += cap_edge_spacing[0] * pile_dia * 2
            trans_len += cap_edge_spacing[1] * pile_dia * 2
        elif spacing_style == "L":
            longi_len += cap_edge_spacing[0] * 2
            trans_len += cap_edge_spacing[1] * 2

        cap_sect_data = {
            cap_sect : {
                "SECT_BEFORE":{
                    "SECT_I": {
                        "vSIZE" :[
                            longi_len,
                            trans_len
                        ]
                    }
                }
            }
        }

    elif cap_type == "PLATE":
        pass

    return cap_node_data, cap_elem_data, cap_sect_data

def group_pile(
        pile_nb: int,
        pile_dia: float,
        pile_length: float,
        pile_array: list[int,int],
        pile_spacing_style: str,
        pile_spacing: list[float, float],
        pile_sect: int,
        pile_matl: int,
        cap_height: float,
        direction: str
    ) :

    # pile top node
    pile_coords = []
    
    unit_length = 1
    top_length = 1 / 2

    div = int((pile_length - top_length) // unit_length)
    mod = (pile_length - top_length) % unit_length

    pile_depth = [0, -top_length]
    for i in range(div):
        pile_depth.append(pile_depth[-1] - unit_length)
    if mod != 0:
        pile_depth.append(pile_depth[-1] - mod)
    else:
        pile_depth.append(pile_depth[-1] - unit_length)
    
    if direction == "+Z":
        pile_depth.reverse()
    else:
        pass

    if pile_spacing_style == "D":
        post_x = (pile_array[0] - 1) / 2 * (pile_dia * pile_spacing[0])
        post_y = (pile_array[1] - 1) / 2 * (pile_dia * pile_spacing[1])
        for i in range(pile_array[0]):
            for j in range(pile_array[1]):
                x = post_x - i * (pile_spacing[0] * pile_dia)
                y = post_y - j * (pile_spacing[1] * pile_dia)
                for k in range(len(pile_depth)):
                    z = -cap_height + pile_depth[k]
                    pile_coords.append([x, y, z])
    elif pile_spacing_style == "L":
        post_x = (pile_array[0] - 1) / 2 * (pile_spacing[0])
        post_y = (pile_array[1] - 1) / 2 * (pile_spacing[1])
        for i in range(pile_array[0]):
            for j in range(pile_array[1]):
                x = post_x - i * (pile_spacing[0])
                y = post_y - j * (pile_spacing[1])
                for k in range(len(pile_depth)):
                    z = -cap_height + pile_depth[k]
                    pile_coords.append([x, y, z])

    pile_node_data = {}
    for i in range(len(pile_coords)):
        pile_node_data[pile_nb+i] = {
            "X": pile_coords[i][0],
            "Y": pile_coords[i][1],
            "Z": pile_coords[i][2]
        }
    
    top_node_nb = []
    total_node_nb = len(pile_node_data)
    pile_number = pile_array[0] * pile_array[1]
    pile_node_nb = total_node_nb / pile_number
    
    if direction == "+Z":
        for i in range(pile_number):
            pile_node = pile_nb + i * pile_node_nb + pile_node_nb-1
            top_node_nb.append(int(pile_node))
    elif direction == "-Z":
        for i in range(pile_number):
            pile_node = pile_nb + i * pile_node_nb
            top_node_nb.append(int(pile_node))

    # Element Data
    pile_elem_data = {}

    nb_all_pile = pile_array[0] * pile_array[1]
    node_nb_pile = int(len(pile_coords)/nb_all_pile)
    k = 0

    for i in range(nb_all_pile):
        for j in range(node_nb_pile-1):
            pile_elem_data[pile_nb + k] = {
                "TYPE": "BEAM",
                "MATL" : pile_matl,
                "SECT" : pile_sect,
                "NODE": [
                    pile_nb + k,
                    pile_nb + k + 1
                ],
                "ANGLE": 0
            }
            k += 1
        k += 1
    
    pile_sect_data = {
        pile_sect : {
            "SECT_BEFORE":{
                "SECT_I": {
                    "vSIZE" :[
                        pile_dia
                    ]
                }
            }
        }
    }
    return pile_node_data, pile_elem_data, pile_sect_data, top_node_nb

def create_structure_group(
        grup_ID,
        cap_modeling,
        cap_node_body,
        cap_elem_body,
        pile_node_body,
        pile_elem_body
    ):
    
    cap_node = cap_node_body.keys()
    cap_elem = cap_elem_body.keys()
    pile_node = pile_node_body.keys()
    pile_elem = pile_elem_body.keys()

    if cap_modeling:
        group_node = list(cap_node) + list(pile_node)
        group_elem = list(cap_elem) + list(pile_elem)
    else :
        group_node = list(pile_node)
        group_elem = list(pile_elem)
    
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
        cap_modeling,
        cap_start_nb,
        select_node,
        top_node_nb
    ):

    if cap_modeling:
        rigd_body = {
            cap_start_nb : {
                "ITEMS":[
                    {
                        "ID": 1,
                        "GROUP_NAME": bngr_name,
                        "DOF": 111111,
                        "S_NODE": top_node_nb
                    }
                ]
            }
        }
    else :
        if res_rigd == None:
            rigd_id = 1
        elif select_node in res_rigd.keys():
            rigd_id = max([item["ID"] for item in res_rigd[select_node]["ITEMS"]]) + 1
        else :
            rigd_id = 1

        rigd_body = {
            select_node : {
                "ITEMS":[
                    {
                        "ID": rigd_id,
                        "GROUP_NAME": bngr_name,
                        "DOF": 111111,
                        "S_NODE": top_node_nb
                    }
                ]
            }
        }

    return rigd_body