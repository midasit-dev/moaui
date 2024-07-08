from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet

import numpy as np
import json

# from moapy.midasapi import MidasAPI
# from moapy.midasutil import Product

def collinear_points(points:list[tuple([float, float, float])]):
    """
    Check if the three points are on the same straight line
    If the external result is a zero vector, determine that it is on the same straight line

    Args:
        points (list): Three-point coordinates
    
    Returns:
        list: Whether three points are on the same straight line
    """
    # 세 점이 동일한 직선에 있는지 확인하는 함수
    # 외적 결과가 영벡터이면 동일한 직선에 있다고 판단
    vector1 = np.array(points[1]) - np.array(points[0])
    vector2 = np.array(points[2]) - np.array(points[1])
    cross = np.cross(vector1, vector2)
    return np.all(cross == 0)

def extract_non_collinear(points:list[tuple([float, float, float])]):
    """
    Extract three points from a set of points that are not on the same straight line

    Args:
        points (list): Node coordinate list of 2D elements
    
    Returns:
        list: 3 point coordinates that are not on the same straight line
    """
    # 동일한 직선에 있지 않은 3개의 점을 추출하는 함수
    non_collinear = []
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            for k in range(j + 1, len(points)):
                if not collinear_points([points[i], points[j], points[k]]):
                    non_collinear.append([points[i], points[j], points[k]])
                    return non_collinear  # 처음으로 동일한 직선에 있는 3개의 점 발견시 중단
    return non_collinear

def calculate_normal_vector(points:list[tuple([float, float, float])]):
    """
    Calculate the normal vector and the opposite vector of the plane formed by the given three points

    Args:
        points (list): 3 point coordinates
    
    Returns:
        list: Normal vectors in the plane and opposite vector
    """
    # 주어진 세 점이 이루는 평면의 법선 벡터를 계산하는 함수
    vector1 = np.array(points[1]) - np.array(points[0])
    vector2 = np.array(points[2]) - np.array(points[0])
    normal_vector = np.cross(vector1, vector2)
    opposite_normal_vector = -normal_vector
    return [normal_vector.tolist(), opposite_normal_vector.tolist()]

def calculate_center_point(points:list[tuple([float, float, float])]):
    """
    Find the center point of the points

    Args:
        points (list): Node coordinate list of 2D elements
    
    Returns:
        list: The coordinates of the center of the points
    """
    # 주어진 점들의 중심점을 계산하는 함수
    center_point = np.mean(points, axis=0)
    return center_point

def calculate_vector_from_center(center_point:list[tuple([float, float, float])], new_point:tuple([float, float, float])):
    """
    Calculate two points of vector

    Args:
        points (list): Coordinates of two points
    
    Returns:
        list: The vector of two points
    """
    # 중심점으로부터 새로운 좌표까지의 벡터를 계산하는 함수
    vector_from_center = np.array(new_point) - center_point
    return vector_from_center

def calculate_angle(vector1:list, vector2:list):
    """
    Calculate the angle between two vectors

    Args:
        points (list): Two vectors
    
    Returns:
        list: Angle between two vectors
    """
    # 두 벡터 간의 각도를 계산하는 함수 (라디안 단위)
    unit_vector1 = vector1 / np.linalg.norm(vector1)
    unit_vector2 = vector2 / np.linalg.norm(vector2)
    dot_product = np.dot(unit_vector1, unit_vector2)
    angle = np.arccos(np.clip(dot_product, -1.0, 1.0))
    return angle

def choose_smaller_angle(normal_vector:list,  vector_from_center:list):
    """
    Calculate the angle between the two vectors (the normal vector and the opposite vector) and the vector (centre to reference point) and select a vector with a smaller angle

    Args:
        Two vectors consisting of a list (the normal vector and the opposite vector) and the vector (centre to reference point)
    
    Returns:
        list: One of the smaller angular vectors of the two vectors (the normal vector and the opposite vector)
    """
    # 두 법선 벡터와 새로운 벡터 간의 각도를 계산하여 작은 각도를 가지는 벡터를 선택하는 함수
    angle_with_normal = calculate_angle(normal_vector[0], vector_from_center)
    angle_with_opposite = calculate_angle(normal_vector[1], vector_from_center)
    if angle_with_normal < angle_with_opposite:
        return normal_vector[0]
    else:
        return normal_vector[1]

def get_civil_node():

    #Civil Node 정보를 Get
    # response = requests.get("https://moa-engineers.midasit.com:443/civil/db/NODE", headers=api_hearder, json=[])
    # get_json=response.json()
    # return get_json
    
    civil = MidasAPI(Product.CIVIL, "KR")
    data = json.loads(json.dumps({ 'NODE': civil.db_read("NODE") }))
    return data

def get_civil_element():

    #Civil Element 정보를 Get
    # response = requests.get("https://moa-engineers.midasit.com:443/civil/db/ELEM", headers=api_hearder, json=[])
    # get_json=response.json()
    
    civil = MidasAPI(Product.CIVIL, "KR")
    data = json.loads(json.dumps({ 'ELEM': civil.db_read("ELEM") }))
    
    for key in data:
        if key == "error":
            exit()
            
    return data

def put_civil_element(result_json:str):

    #Civil Element 수정
    # response = requests.put("https://moa-engineers.midasit.com:443/civil/db/ELEM", headers=api_hearder, json=result_json)
    civil = MidasAPI(Product.CIVIL, "KR")
    civil.db_update("ELEM", result_json)
 
'''   
def get_current_selected_elem():
    selecteds = MidasAPI.view_select_get()
    return selecteds["ELEM_LIST"]
'''

def get_element_node_coordinate(data_civil_node, node_list:list):

    #Element를 이루는 Node 좌표 Get
    points = []
    for node_list in node_list:
        if node_list != 0 :
            points.append([data_civil_node["NODE"][str(node_list)]["X"],data_civil_node["NODE"][str(node_list)]["Y"],data_civil_node["NODE"][str(node_list)]["Z"]])
        
    return points

def reserve_local_axis(data_civil_element, node_num:str):

    data_civil_element[node_num]["NODE"][0],data_civil_element[node_num]["NODE"][1]=data_civil_element[node_num]["NODE"][1],data_civil_element[node_num]["NODE"][0]

    if data_civil_element[node_num]["NODE"][3] != 0 :
        data_civil_element[node_num]["NODE"][2],data_civil_element[node_num]["NODE"][3]=data_civil_element[node_num]["NODE"][3],data_civil_element[node_num]["NODE"][2]

    return data_civil_element

# def element_align_local_axis(ref_point: tuple[float, float, float] = (0, 0, 0), sel_element_keys: list = []):
def element_align_local_axis(ref_node: str = '0,0,0', sel_element_keys: list = []):
    ref_point = tuple(map(float, ref_node.split(',')))

    data_civil_element=get_civil_element()
    data_civil_element2=data_civil_element["ELEM"]
	
    sel_element_keys = list(map(str, sel_element_keys.split(',')))
    sel_element_data = {key: data_civil_element2[key] for key in sel_element_keys}

    data_civil_node=get_civil_node()

    result_json = dict()

    for node_num in sel_element_data:

        points = get_element_node_coordinate(data_civil_node, sel_element_data[node_num]["NODE"]) # Element의 Node 좌표 추출
        result_3point = extract_non_collinear(points) # 동일 직선에 있지 않은 3개의 점 추출
        result_normal_vector = calculate_normal_vector(result_3point[0]) # 평면의 법선 벡터 계산
        result_center_point = calculate_center_point(result_3point[0]) # 주어진 점들의 중심점 계산
        result_vector_from_center = calculate_vector_from_center(result_center_point, ref_point) # 중심점으로부터 새로운 좌표까지의 벡터 계산
        result_selected_vector1 = choose_smaller_angle(result_normal_vector, result_vector_from_center) # 두 법선 벡터와 새로운 벡터 중 작은 각도를 가지는 벡터 선택

        if result_selected_vector1 == result_normal_vector[1] :
            sel_element_data  = reserve_local_axis(sel_element_data,node_num)

    result_json["Assign"] = sel_element_data
    put_civil_element(result_json)

# ref_point = (0,0,0)

# civil = MidasAPI(Product.CIVIL, "KR")
# sel_elems = []
# selecteds = civil.view_select_get()
# if 'ELEM_LIST' in selecteds:
#   sel_elems = selecteds['ELEM_LIST']

# element_align_local_axis(ref_point, sel_elems)