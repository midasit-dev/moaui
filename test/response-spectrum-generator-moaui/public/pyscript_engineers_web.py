# default Setting
g_MAPI_key = ""
g_base_uri = "moa-engineers.midasit.com"
g_base_port = "443"

# from web FE, Set & Get
def set_g_values(g_values):
	_g_values = json.loads(g_values)
	global g_MAPI_key
	global g_base_uri
	global g_base_port
	g_MAPI_key = _g_values['g_mapi_key']
	g_base_uri = _g_values['g_base_uri']
	g_base_port = _g_values['g_base_port']
  
def get_g_values():
  return json.dumps({
		'g_mapi_key': g_MAPI_key,
		'g_base_uri': g_base_uri,
		'g_base_port': g_base_port
	})
  
# from javascript import globalThis
# fetch = globalThis.fetch
# JSON = globalThis.JSON
from js import fetch, JSON, XMLHttpRequest
import json

import numpy as np

class requests_json:
    @staticmethod
    def post(url, headers, jsonObj):
        xhr = XMLHttpRequest.new()
        xhr.open("POST", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send(json.dumps(jsonObj))
        return json.loads(xhr.responseText)

    def get(url, headers):
        xhr = XMLHttpRequest.new()
        xhr.open("GET", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send()
        return json.loads(xhr.responseText)
    
    def put(url, headers, jsonObj):
        xhr = XMLHttpRequest.new()
        xhr.open("PUT", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send(json.dumps(jsonObj))
        return json.loads(xhr.responseText)
    
    def delete(url, headers):
        xhr = XMLHttpRequest.new()
        xhr.open("DELETE", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send()
        return json.loads(xhr.responseText)

class Product:
    CIVIL = 1,
    GEN = 2,

def get_base_url(product, country="KR"):
    country_code = country.upper()
    base_url = ""
    if(product == Product.CIVIL):
        base_uri = g_base_uri
        base_port = g_base_port
        base_url = f"https://{base_uri}:{base_port}/civil"
    elif(product == Product.GEN):
        base_uri = g_base_uri
        base_port = g_base_port
        base_url = f"https://{base_uri}:{base_port}/gen"
    else:
        print(f"Error: Unable to find the registry key or value for {product}")
    return base_url

def get_MAPI_Key(product, country="KR"):
    country_code = country.upper()
    mapikey = ""
    if(product == Product.CIVIL):
        mapikey = g_MAPI_key
    elif(product == Product.GEN):
        mapikey = g_MAPI_key
    else:
        print(f"Error: Unable to find the registry key or value for {product}")
    return mapikey

class MidasAPI:
    def __init__(self, product, country="KR") -> None:
        self.product = product
        self.base_url = get_base_url(product, country)
        self.headers = {
            'MAPI-Key': get_MAPI_Key(product, country),
            'Content-Type': 'application/json'
        }
    
    # def __init__(self, product, base_url, mapikey) -> None:
    #     self.product = product
    #     self.base_url = base_url
    #     self.headers = {
    #         'MAPI-Key': mapikey,
    #         'Content-Type': 'application/json'
    #     }
    
    ## doc #############################################################################################################
    def doc_open(self, file_path):
        url = f'{self.base_url}/doc/open'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': file_path})
    
    def doc_anal(self):
        url = f'{self.base_url}/doc/anal'
        return requests_json.post(url, headers=self.headers, jsonObj={})
    
    ## db #############################################################################################################
    def db_create(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        return requests_json.post(url, headers=self.headers, jsonObj={'Assign': items})
    
    def db_create_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.post(url, headers=self.headers, jsonObj={'Assign': item})
    
    def db_read(self, item_name):
        url = f'{self.base_url}/db/{item_name}'
        responseJson = requests_json.get(url, headers=self.headers)
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            error_message = {"error": f"Error: Unable to find the registry key or value for {item_name}"}
            return error_message
        keyVals = responseJson[item_name]
        return { int(k): v for k, v in keyVals.items() }
    
    def db_read_item(self, item_name, item_id):
        item_id_str = str(item_id)
        url = f'{self.base_url}/db/{item_name}/{item_id_str}'
        responseJson = requests_json.get(url, headers=self.headers)
        # check responseJson[item_name] is Exist
        if item_name not in responseJson:
            error_message = {"error": f"Error: Unable to find the registry key or value for {item_name}"}
            return error_message
        if item_id_str not in responseJson[item_name]:
            error_message = {"error": f"Error: Unable to find the registry key or value for {item_id}"}
            return error_message
        return responseJson[item_name][item_id_str]
    
    def db_update(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        return requests_json.put(url, headers=self.headers, jsonObj={'Assign': items})
    
    def db_update_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.put(url, headers=self.headers, jsonObj={'Assign': item})
    
    def db_delete(self, item_name, item_id):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.delete(url, headers=self.headers)
    
    def db_get_next_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 1
        next_id = max(map(int, res_all.keys()))
        return next_id + 1
    
    def db_get_max_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 0
        return max(map(int, res_all.keys()))
    
    def db_get_min_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 1
        return min(map(int, res_all.keys()))
    
    ## view ############################################################################################################
    def view_select_get(self):
        url = f'{self.base_url}/view/select'
        response = requests_json.get(url, headers=self.headers)
        return response['SELECT']
    
    ## Steel Code Check (Gen Only) ########################################################################################################
    def post_steelcodecheck(self):
        url = f'{self.base_url}/post/steelcodecheck'
        return requests_json.post(url, headers=self.headers, jsonObj={})

# function ##########################################################################################################

def select_by_subkey(value, dict, *subkey):
    ret = []
    if(len(subkey) == 1):
        ret = [key for key in dict.keys() if dict[key][subkey[0]] == value]
    if(len(subkey) == 2):
        ret =  [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]] == value]
    if(len(subkey) == 3):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]] == value]
    if(len(subkey) == 4):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]] == value]
    if(len(subkey) == 5):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]][subkey[4]] == value]

    if(len(subkey) > 5):
        print("Error: Please check the subkey length")
        return None
    if(len(ret) == 0):
        print("Error: Please check the subkey value")
        return None
    return ret[0]

def get_subitem_next_id(subitem_list):
    if 'ITEMS' not in subitem_list:
        return 1
    return max(map(lambda x: x['ID'], subitem_list['ITEMS'])) + 1

# Vector Calculations ##########################################################################################################
class VectorCalculation:

    def convert_to_global_coordinates(
            origin: list[float, float, float],
            normalz_vector: list[float, float, float],
            local_point: list[float, float, float]
        ):
        # origin = cooridinate of node
        # normalz_vector = node vector
        # local_point = local coordinate of point
        # Convert all vectors and the point to arrays
        origin = np.array(origin)
        normalz_vector = np.array(normalz_vector)
        local_point = np.array(local_point)
        # Compute the global point coordinates
        global_point = origin + normalz_vector[0] * local_point[0] + normalz_vector[1] * local_point[1] + normalz_vector[2] * local_point[2]
        return global_point

    def nomalize_vector(
            vector: list[float, float, float]
        ):
        normalz_vector = np.array(vector)
        if np.linalg.norm(normalz_vector) == 0:
            return normalz_vector
        else:
            normalz_vector = normalz_vector / np.linalg.norm(normalz_vector)
        return normalz_vector

    def local_vector_from_2points(
            start_point: list[float, float, float],
            end_point: list[float, float, float]
        ):

        start_point = np.array(start_point)
        end_point = np.array(end_point)

        line_vector = end_point - start_point

        local_x = VectorCalculation.nomalize_vector(line_vector)
        if np.allclose(local_x, np.array([0,0,1]), atol=1e-6):
            local_y = np.array([0,-1,0])
            local_z = np.array([1,0,0])
        elif np.allclose(local_x, np.array([0,0,-1]), atol=1e-6):
            local_y = np.array([0,1,0])
            local_z = np.array([1,0,0])
        elif np.allclose(local_x, np.array([0,1,0]), atol=1e-6):
            local_y = np.array([-1,0,0])
            local_z = np.array([0,0,1])
        elif np.allclose(local_x, np.array([0,-1,0]), atol=1e-6):
            local_y = np.array([1,0,0])
            local_z = np.array([0,0,1])
        elif np.allclose(local_x, np.array([1,0,0]), atol=1e-6):
            local_y = np.array([0,1,0])
            local_z = np.array([0,0,1])
        elif np.allclose(local_x, np.array([-1,0,0]), atol=1e-6):
            local_y = np.array([0,-1,0])
            local_z = np.array([0,0,1])
        else:
            local_y = np.cross(np.array([0,0,1]), local_x)
            local_y = VectorCalculation.nomalize_vector(local_y)
            local_z = np.cross(local_x, local_y)
            local_z = VectorCalculation.nomalize_vector(local_z)

        return local_x, local_y, local_z

    def find_angle_to_fit_vector(
            direction: str,
            normalz_vector: list[float, float, float],
            target_vector: list[float, float, float]
        ):
        
        local_x, local_y, local_z = normalz_vector
        target_x, target_y, target_z = target_vector

        if direction == "+Z":
            arcos_target_x = np.dot(local_z, target_x) / (np.linalg.norm(local_z) * np.linalg.norm(target_x))
            arcos_target_x = max(-1, min(1, arcos_target_x))
            
            rotation_angle = np.arccos(arcos_target_x)
            
            rotation_matrix_x = VectorCalculation.rotation_matrix(local_x, rotation_angle)

            rotated_local_y = np.dot(rotation_matrix_x, local_y)
            rotated_local_z = np.dot(rotation_matrix_x, local_z)

            if np.allclose(rotated_local_z, target_x, atol=1e-6) and np.allclose(rotated_local_y, target_y*-1, atol=1e-6):
                rotation_angle = np.degrees(rotation_angle)
            else:
                rotation_angle = -np.degrees(rotation_angle)

        elif direction == "-Z":
            arcos_target_x = np.dot(local_z, target_x) / (np.linalg.norm(local_z) * np.linalg.norm(target_x))
            arcos_target_x = max(-1, min(1, arcos_target_x))
            
            rotation_angle = np.arccos(arcos_target_x)
            
            rotation_matrix_x = VectorCalculation.rotation_matrix(local_x, rotation_angle)

            rotated_local_y = np.dot(rotation_matrix_x, local_y)
            rotated_local_z = np.dot(rotation_matrix_x, local_z)

            if np.allclose(rotated_local_z, target_x, atol=1e-6) and np.allclose(rotated_local_y, target_y, atol=1e-6):
                rotation_angle = np.degrees(rotation_angle)
            else:
                rotation_angle = -np.degrees(rotation_angle)

        return rotation_angle

    def rotation_matrix(axis, angle):
        axis = axis / np.linalg.norm(axis)
        a = np.cos(angle / 2.0)
        b, c, d = -axis * np.sin(angle / 2.0)
        aa, bb, cc, dd = a * a, b * b, c * c, d * d
        bc, ad, ac, ab, bd, cd = b * c, a * d, a * c, a * b, b * d, c * d
        return np.array([[aa + bb - cc - dd, 2 * (bc + ad), 2 * (bd - ac)],
                        [2 * (bc - ad), aa + cc - bb - dd, 2 * (cd + ab)],
                        [2 * (bd + ac), 2 * (cd - ab), aa + dd - bb - cc]])

    def find_angle_from_vector(
            normalz_vector: list[float, float, float],
        ):

        local_x = normalz_vector[0]
        local_y = normalz_vector[1]
        local_z = normalz_vector[2]

        global_x = np.array([1,0,0])
        global_y = np.array([0,1,0])
        global_z = np.array([0,0,1])

        local_basis = np.column_stack((local_x, local_y, local_z))
        global_basis = np.column_stack((global_x, global_y, global_z))

        dcm = np.dot(local_basis, global_basis.T)

        angle_x = np.arctan2(dcm[2, 1], dcm[2, 2])
        angle_y = np.arctan2(-dcm[2, 0], np.sqrt(dcm[2, 1]**2 + dcm[2, 2]**2))
        angle_z = np.arctan2(dcm[1, 0], dcm[0, 0])

        angle_x_deg = np.degrees(angle_x)
        angle_y_deg = np.degrees(angle_y)
        angle_z_deg = np.degrees(angle_z)

        return angle_x_deg, angle_y_deg, angle_z_deg

    def node_vector_global():
        vector_x = np.array([1,0,0])
        vector_y = np.array([0,1,0])
        vector_z = np.array([0,0,1])
        return vector_x, vector_y, vector_z

    def node_vector_angle(
            rotation_angle: list[float, float, float],
            angle_units: str = "radians"
        ):
        # rotation_angle = [x, y, z] rotation angle
        # angle_units = "degrees" or "radians"
        node_angle = np.array(rotation_angle)
        if angle_units == "degrees":
            node_angle_rad = np.radians(node_angle)
        elif angle_units == "radians":
            pass
        else:
            return False
        # X, Y, Z craete rotation matrix
        Rx = np.array([[1, 0, 0],
                [0, np.cos(node_angle_rad[0]), -np.sin(node_angle_rad[0])],
                [0, np.sin(node_angle_rad[0]), np.cos(node_angle_rad[0])]])

        Ry = np.array([[np.cos(node_angle_rad[1]), 0, np.sin(node_angle_rad[1])],
                    [0, 1, 0],
                    [-np.sin(node_angle_rad[1]), 0, np.cos(node_angle_rad[1])]])

        Rz = np.array([[np.cos(node_angle_rad[2]), -np.sin(node_angle_rad[2]), 0],
                    [np.sin(node_angle_rad[2]), np.cos(node_angle_rad[2]), 0],
                    [0, 0, 1]])
        # Calculate new node vector
        vector_x = np.dot(Rz, np.dot(Ry, np.dot(Rx, [1,0,0])))
        vector_y = np.dot(Rz, np.dot(Ry, np.dot(Rx, [0,1,0])))
        vector_z = np.dot(Rz, np.dot(Ry, np.dot(Rx, [0,0,1])))

        return vector_x, vector_y, vector_z

    def node_vector_3points(
            P0: list[float, float, float],
            P1: list[float, float, float],
            P2: list[float, float, float]
        ):

        P0 = np.array(P0)
        P1 = np.array(P1)
        P2 = np.array(P2)

        vector_x = P1 - P0
        vector_y = P2 - P0
        vector_z = np.cross(vector_x, vector_y)
        vector_y = np.cross(vector_z, vector_x)
        
        # Calculate new node vector
        vector_x = VectorCalculation.nomalize_vector(vector_x)
        vector_y = VectorCalculation.nomalize_vector(vector_y)
        vector_z = VectorCalculation.nomalize_vector(vector_z)
        return vector_x, vector_y, vector_z

    def node_vector_vectors(
            V1: list[float, float, float],
            V2: list[float, float, float]
        ):
        V1 = np.array(V1)
        V2 = np.array(V2)

        vector_x = V1
        vector_y = V2
        vector_z = np.cross(vector_x, vector_y)
        vector_y = np.cross(vector_z, vector_x)
        
        # Calculate new node vector
        vector_x = VectorCalculation.nomalize_vector(vector_x)
        vector_y = VectorCalculation.nomalize_vector(vector_y)
        vector_z = VectorCalculation.nomalize_vector(vector_z)
        return vector_x, vector_y, vector_z

    def node_vector_line_vector(
            origin: list[float, float, float],
            P0: list[float, float, float],
            P1: list[float, float, float],
            REFTYPE: int,
            G_DIR: int,
            L_DIR: int
        ):
        # Reference line Vector
        P0 = np.array(P0)

        if REFTYPE == 1:
            P1 = np.array(P1) 

        elif REFTYPE == 2:
            if G_DIR == 0:
                P1 = P0 + np.array([1,0,0])
            elif G_DIR == 1:
                P1 = P0 + np.array([0,1,0])
            elif G_DIR == 2:
                P1 = P0 + np.array([0,0,1])

        line_vector = P1 - P0
        seed_vector = np.array(origin) - P0

        seed_prall_vector = np.dot(seed_vector, line_vector)/np.dot(line_vector, line_vector) * line_vector
        per_vector = (seed_vector - seed_prall_vector) * -1

        if L_DIR == 0 :
            vector_x = per_vector / np.linalg.norm(per_vector)
            vector_y = np.cross(np.array([0,0,1]), vector_x)
            vector_y /= np.linalg.norm(vector_y)
            vector_z = np.cross(vector_x, vector_y)
            vector_z /= np.linalg.norm(vector_z)
        elif L_DIR == 1 :
            vector_y = per_vector / np.linalg.norm(per_vector)
            vector_x = np.cross(vector_y, np.array([0,0,1]))
            vector_x /= np.linalg.norm(vector_x)
            vector_z = np.cross(vector_x, vector_y)
            vector_z /= np.linalg.norm(vector_z)
        elif L_DIR == 2 :
            vector_z = per_vector / np.linalg.norm(per_vector)
            vector_y = np.cross(np.array([1,0,0]), vector_z)
            vector_y /= np.linalg.norm(vector_y)
            vector_x = np.cross(vector_y, vector_z)
            vector_x /= np.linalg.norm(vector_x)

        return vector_x, vector_y, vector_z

    def node_vector_line_vector_direct(
            LV0: list[float, float, float],
            LV1: list[float, float, float],
            LV2: list[float, float, float]
        ) :

        vector_x = np.array(LV0)
        vector_y = np.array(LV1)
        vector_z = np.array(LV2)
        
        return vector_x, vector_y, vector_z

    def nomarlz_vector_skew_info(skew_info):
        
        if skew_info == None:
        # Global
            x_vector, y_vector, z_vector = VectorCalculation.node_vector_global()
            node_normalz_vector = [x_vector, y_vector, z_vector]

        else:
            method = skew_info.get("iMETHOD")
            if method == 1:
                # Local - Angle
                rotation_angle = [
                    skew_info["ANGLE_X"],
                    skew_info["ANGLE_Y"],
                    skew_info["ANGLE_Z"]
                ]
                x_vector, y_vector, z_vector = VectorCalculation.node_vector_angle(rotation_angle, "degrees")
                node_normalz_vector = [x_vector, y_vector, z_vector]

            elif method == 2:
                # Local - 3 Points
                P0 = [skew_info["P0X"], skew_info["P0Y"], skew_info["P0Z"]]
                P1 = [skew_info["P1X"], skew_info["P1Y"], skew_info["P1Z"]]
                P2 = [skew_info["P2X"], skew_info["P2Y"], skew_info["P2Z"]]
                x_vector, y_vector, z_vector = VectorCalculation.node_vector_3points(P0, P1, P2)
                node_normalz_vector = [x_vector, y_vector, z_vector]

            elif method == 3:
                # Local - Vector
                V1 = [skew_info["V1X"], skew_info["V1Y"], skew_info["V1Z"]]
                V2 = [skew_info["V2X"], skew_info["V2Y"], skew_info["V2Z"]]
                x_vector, y_vector, z_vector = VectorCalculation.node_vector_vectors(V1, V2)
                node_normalz_vector = [x_vector, y_vector, z_vector]

            elif method == 4:
                # Local - Line Vector
                LV0 = [skew_info["LV0X"], skew_info["LV0Y"], skew_info["LV0Z"]]
                LV1 = [skew_info["LV1X"], skew_info["LV1Y"], skew_info["LV1Z"]]
                LV2 = [skew_info["LV2X"], skew_info["LV2Y"], skew_info["LV2Z"]]
                x_vector, y_vector, z_vector = VectorCalculation.node_vector_line_vector_direct(LV0, LV1, LV2)
                node_normalz_vector = [x_vector, y_vector, z_vector]
        
        return node_normalz_vector
    
    def check_coplanar(lines):
        # Vector for line
        def direction_vector(line):
            return np.array(line[1]) - np.array(line[0])

        # Calculating the normal vector with the first line as the reference
        def normal_vector(line1, line2):
            return np.cross(direction_vector(line1), direction_vector(line2))

        # Normal vector calculation with the first line as the reference
        base_line = lines[0]
        for other_line in lines[1:]:
            if not np.allclose(normal_vector(base_line, other_line), [0, 0, 0]):
                normal_vector = normal_vector(base_line, other_line)
                break
        else:
            # if all lines are parallel
            return False

        # Nomalize normal vector
        normal_vector /= np.linalg.norm(normal_vector)

        # Check all lines
        threshold = 1e-6
        for line in lines:
            if abs(np.dot(normal_vector, direction_vector(line))) > threshold:
                return False

        return True, normal_vector

    def find_xyz_vector(basePoint, xpoint, local_z_vector):
        
        local_x_vector = np.array(xpoint) - np.array(basePoint)
        local_y_vector = np.cross(local_z_vector, local_x_vector)
        
        local_y_vector = local_y_vector / np.linalg.norm(local_y_vector)
        local_x_vector = np.cross(local_y_vector, local_z_vector)
        local_x_vector = local_x_vector / np.linalg.norm(local_x_vector)

        return local_x_vector, local_y_vector, local_z_vector

class GeometryCalculation:

    def get_closed_plan(
            node_list: list[list[float, float]],
            elem_list: list[float]
        ):
        """
        find closed plane
        :param node_list: Node list [[1,2],[2,3],[3,4]]
        :param elem_list: Element List [1,2,3]
        :return: possible_planes_resort, plane_node_list_new
        """
        # Node list conditions check - all nodes are used twice
        def check_condition(lst):
            flattened_list = [item for sublist in lst for item in sublist]
            for num in flattened_list:
                if flattened_list.count(num) != 2:
                    return False
            return True
        
        # Find other indices
        def find_other_indices(my_list, target_value):
            for i, sublist in enumerate(my_list):
                for j, value in enumerate(sublist):
                    if value == my_list[target_value[0]][target_value[1]] and (i, j) != (target_value[0], target_value[1]):
                        return [int(i), int(j)]
        
        def has_duplicate(lst):
            seen = set()
            for num in lst:
                if num in seen:
                    return False
                seen.add(num)
            return True
        
        # Create Possible Planes List (elements list)
        possible_planes = []
        for i in range(len(elem_list)-2):
            possible_planes += list(combinations(elem_list, i + 3))

        # Create Possible Planes List (nodes list)
        possible_plane_node_list = []
        for plane in possible_planes:
            temp = []
            for elem in plane:
                index = elem_list.index(elem)
                temp.append(node_list[index])
            possible_plane_node_list.append(temp)

        # Check Node List Conditions
        del_index = []
        for index, plane in enumerate(possible_plane_node_list):
            check_node_condition = check_condition(plane)
            if check_node_condition == False:
                del_index.append(index)

        for index in sorted(del_index, reverse=True):
            del possible_planes[index]
            del possible_plane_node_list[index]

        # Find Closed Planes And Resort Node list
        true_planes = [True]*len(possible_plane_node_list)
        resort_plane_node_list = []
        
        index_list_new = []
        for index, nodes in enumerate(possible_plane_node_list):
            sub_index_list = [0]
            resort_nodes = [nodes[0]]
            for i in range(len(nodes)):
                if i == 0:
                    ij = find_other_indices(nodes, [0,1])
                    tempii = ij[0]
                    if ij[1] == 0:
                        tempjj = 1
                    else:
                        tempjj = 0
                    resort_nodes.append([nodes[tempii][ij[1]], nodes[tempii][tempjj]])
                    sub_index_list.append(ij[0])
                elif i == len(nodes)-1:
                    if nodes[tempii][tempjj] == nodes[0][0]:
                        pass
                    else:
                        true_planes[index] = False
                else:
                    ij = find_other_indices(nodes, [tempii, tempjj])
                    tempii = ij[0]
                    if ij[1] == 0:
                        tempjj = 1
                    else:
                        tempjj = 0
                    resort_nodes.append([nodes[tempii][ij[1]], nodes[tempii][tempjj]])
                    sub_index_list.append(ij[0])
            index_list_new.append(sub_index_list)
            resort_plane_node_list.append(resort_nodes)

        # Delete False Planes
        possible_planes_new = []
        plane_node_list_new = []

        for index, truePlane in enumerate(true_planes):
            if truePlane :
                possible_planes_new.append(possible_planes[index])
                plane_node_list_new.append(resort_plane_node_list[index])

        # Resort Possible Planes
        possible_planes_resort = []
        for index, new_planes in enumerate(possible_planes_new):
            possible_planes_resort.append([new_planes[i] for i in index_list_new[index]])

        del_index = []
        for index, plane in enumerate(possible_planes_resort):
            check_elem_condition = has_duplicate(plane)
            if check_elem_condition == False:
                del_index.append(index)

        for index in sorted(del_index, reverse=True):
            del possible_planes_resort[index]
            del plane_node_list_new[index]

        return possible_planes_resort, plane_node_list_new

    def rotate_3d_point(
            point: list[float, float, float],
            angles: list[float, float, float],
            order: str = "xyz"
        ):
        """
        Rotate a point in 3D space around each axis by the given angles
        :param point: Initial coordinates [x, y, z]
        :param angles: Rotation angles [θx, θy, θz] (Degrees)
        :return: Rotated coordinates [x', y', z']
        """
        x, y, z = point
        if order == "xyz":
            theta_x, theta_y, theta_z = np.radians(angles)
        elif order == "zyx":
            theta_x, theta_y, theta_z = np.radians(angles)*-1

        # x axis rotation
        rotation_x = np.array([[1, 0, 0],
                            [0, np.cos(theta_x), -np.sin(theta_x)],
                            [0, np.sin(theta_x), np.cos(theta_x)]])

        # y axis rotation
        rotation_y = np.array([[np.cos(theta_y), 0, np.sin(theta_y)],
                            [0, 1, 0],
                            [-np.sin(theta_y), 0, np.cos(theta_y)]])

        # z axis rotation
        rotation_z = np.array([[np.cos(theta_z), -np.sin(theta_z), 0],
                            [np.sin(theta_z), np.cos(theta_z), 0],
                            [0, 0, 1]])

        # rotation
        if order == "xyz":
            rotated_point = rotation_z @ rotation_y @ rotation_x @ np.array([x, y, z])
        elif order == "zyx":
            rotated_point = rotation_x @ rotation_y @ rotation_z @ np.array([x, y, z])

        return rotated_point
    
    def area_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1):
                sum += yc[i] * zc[i+1] - yc[i+1] * zc[i]
            return sum/2

    def y_cen_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1):
                sum += (yc[i+1] + yc[i]) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            area = area_calc(yc, zc)
            return sum/(6*area)

    def z_cen_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1):
                sum += (zc[i+1] + zc[i]) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            area = area_calc(yc, zc)
            return sum/(6*area)

    def z_inertia_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1) :
                sum += (yc[i]**2 + yc[i] * yc[i+1] + yc[i+1]**2) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            return sum/12

    def y_inertia_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1) :
                sum += (zc[i]**2 + zc[i] * zc[i+1] + zc[i+1]**2) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            return sum/12

    def yz_inertia_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1) :
                sum += (yc[i] * zc[i+1] + 2 * yc[i] * zc[i] + 2 * yc[i+1] * zc[i+1] + yc[i+1] * zc[i]) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            return sum/24