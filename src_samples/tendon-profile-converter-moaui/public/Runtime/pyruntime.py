import math
import json
import numpy as np
from collections import Counter

"""**************************************************************************************************************
주석의 예제는 예제 MCB파일의 15번 텐던 "B4L"로 하였다.
*************************************************************************************************************"""


"""##################################################################################################################
텐던 프로파일에 적용되어 있는 요소와 노드를 axis_ij에 따라 정리하도록 한다.
##################################################################################################################"""
def sort_node_elem_list(applied_elem, res_elem, axis_ij) :
    """**************************************************************************************************************
    Tendon profile에 적용되는 요소가 가지고 있는 절점을 우선 i,j 순으로 입력한다.
    Example----------------------------------------------------------------------------------------------------------
    applied_elem = [
        1561, 1774, 1850, 2216, 2954, 3199, 3213, 3709, 4022, 4630,
        4960, 6026, 6423, 6803, 7010, 7175, 7423, 7451, 8387, 8461,
        9911
        ]
    node_list = [
        [6486, 2176], [3507, 2191], [7572, 7285], [3648, 3788], [6039, 4317],
        [1446, 9039], [4758, 2926], [4317, 7580], [9039, 7572], [9878, 3648],
        [2176, 6737], [2191, 6039], [5146, 7943], [6737, 3507], [1544, 5146],
        [2926, 1446], [8573, 9877], [7285, 9878], [9877, 1544], [7580, 8573],
        [3788, 6486]
        ]
    **************************************************************************************************************"""
    node_list = [
        [res_elem["ELEM"][str(e)]["NODE"][0], res_elem["ELEM"][str(e)]["NODE"][1]]
        for e in applied_elem
    ]
    # print("applied_elem =", applied_elem)
    # print("node_list =", node_list)
    """**************************************************************************************************************
    텐던 프로파일은 하나의 연결된 요소만 받으므로, 반드시 양 끝의 절점이 존재한다.
    따라서, node_list의 값들 중의 중복되지 않는 2개의 절점, i단, j단이 존재한다.
    이때 axis_ij에 따라 시작점을 정하고 start_node에 입력한다.
    [시작되는 절점번호, 상단배열의 인덱스, 절점배열의 인덱스, 지정 절점이 아닌 인덱스]
    Example----------------------------------------------------------------------------------------------------------
    start_node = [4758, 6, 0, 1]
    **************************************************************************************************************"""
    flattened = [item for sublist in node_list for item in sublist]
    value_counts = Counter(flattened)
    unique_values_with_indices = {}
    for sublist_idx, sublist in enumerate(node_list):
        for item_idx, item in enumerate(sublist):
            if value_counts[item] == 1:
                unique_values_with_indices[item] = (sublist_idx, item_idx)
    for value, indices in unique_values_with_indices.items():
        sublist_idx, item_idx = indices
        if axis_ij == "I-J" and item_idx == 0:
            start_node = [value, sublist_idx, item_idx, item_idx+1]
        elif axis_ij == "J-I" and item_idx == 1:
            start_node = [value, sublist_idx, item_idx, item_idx-1]
    # print("start_node =", start_node)
    """**************************************************************************************************************
    시작점을 기준으로 연결되는 절점을 찾아서 순서대로 나열하는 배열을 만든다.
    Example----------------------------------------------------------------------------------------------------------
    sorted_node_list = [
        4758, 2926, 1446, 9039, 7572, 7285, 9878, 3648, 3788, 6486,
        2176, 6737, 3507, 2191, 6039, 4317, 7580, 8573, 9877, 1544,
        5146, 7943
        ]
    **************************************************************************************************************"""
    _, start_inx, first_inx, scond_inx = start_node
    current_idx = start_inx
    sorted_inx = [start_inx]
    sorted_node_list = []
    while True:
        sorted_node_list.append(node_list[current_idx][first_inx])
        next_value = node_list[current_idx][scond_inx]
        for idx, sublist in enumerate(node_list):
            if sublist[first_inx] == next_value:
                current_idx = idx
                sorted_inx.append(current_idx)
                break
        else:
            break
    sorted_node_list.append(node_list[current_idx][scond_inx])
    # print("sorted_node_list =", sorted_node_list)
    """**************************************************************************************************************
    시작점을 기준으로 연결되는 요소를 찾아서 순서대로 나열하는 배열을 만든다.
    Example----------------------------------------------------------------------------------------------------------
    sorted_elem_list = [
        3213, 7175, 3199, 4022, 1850, 7451, 4630, 2216, 9911, 1561,
        4960, 6803, 1774, 6026, 2954, 3709, 8461, 7423, 8387, 7010,
        6423
        ]
    **************************************************************************************************************"""
    sorted_elem_list = []
    for elem_value in enumerate(sorted_inx) :
        sorted_elem_list.append(applied_elem[elem_value[1]])
    # print("sorted_elem_list =", sorted_elem_list)
    """**************************************************************************************************************
    계산된 sorted_node_list, sorted_elem_list를 반환한다.
    **************************************************************************************************************"""
    return sorted_node_list, sorted_elem_list

"""##################################################################################################################
순서대로 정리된 요소의 각 길이와 중첩길이를 배열로 만들어준다.
##################################################################################################################"""
def calculate_element_lengths(sorted_node_list, res_node, res_elem, insert_point, insert_elem):
    """**************************************************************************************************************
    Tendon Profile의 시작 요소번호/시작 절점단의 정보로 텐던의 시작점(기준점, x = 0)이 되는 절점을 찾는다.
    Example----------------------------------------------------------------------------------------------------------
    start_node = 9878
    **************************************************************************************************************"""
    if insert_point == "END-I" :
        start_node = res_elem["ELEM"][str(insert_elem)]["NODE"][0]
    elif insert_point == "END-J" :
        start_node = res_elem["ELEM"][str(insert_elem)]["NODE"][1]
    # print("start_node =", start_node)
    """**************************************************************************************************************
    function : sort_node_elem_list 에서 정리된 절점번호에 각각 X, Y, Z 좌표를 갖는 배열을 작성한다.
    Example----------------------------------------------------------------------------------------------------------
    coor_list = [
        [36.28590851597856, 9.215445179902591, -24.293671213657905],
        [38.07465061172387, 10.227177348770455, -25.566513171379647],
        [39.89700506594888, 11.162117837466777, -26.85033788417027],
        [41.7514787420698, 12.017214508921935, -28.143784789256408],
        [43.63628742813227, 12.789671304011362, -29.445343003491026],
        [45.54935836172516, 13.477029543149524, -30.75336390451513],
        [47.488360353718384, 14.077227490998997, -32.06608830824562],
        [49.450733033598894, 14.58863622063577, -33.381669888353805],
        [51.433725016857736, 15.010134178416486, -34.69820948852458],
        [53.43445033469662, 15.341107932736296, -36.01379106863276],
        [55.44993929533127, 15.581462984932614, -37.32651547236326],
        [57.47719058574377, 15.731646089601014, -38.63453653677907],
        [59.51323490893672, 15.792592328972479, -39.936094369766366],
        [61.555180143762065, 15.76570506405411, -41.229541329316405],
        [63.60025857958517, 15.652812812955975, -42.51336620549874],
        [65.64586434210452, 15.45609644108766, -43.78620816322047],
        [67.6895820679046, 15.178049455263999, -45.04686959570753],
        [69.72920632655935, 14.821400344753009, -46.294317976277306],
        [71.6837719651204, 13.365162091749184, -47.33926981960884],
        [73.71835230773637, 12.084802195223752, -48.45879531710286],
        [75.82626852059717, 11.005822320110648, -49.652095183743526],
        [77.99586919933995, 10.152150896844052, -50.91499905852944]
        ]
    **************************************************************************************************************"""
    coor_list = []
    for node in sorted_node_list :
        if str(node) in res_node["NODE"] :
            coordinates = res_node["NODE"][str(node)]
            coor_list.append([coordinates["X"],coordinates["Y"],coordinates["Z"]])
    # print("coor_list =", coor_list)
    """**************************************************************************************************************
    coor_list에 입력된 좌표를 이용하여, 각 요소의 길이를 계산하고 배열에 할당한다.
    Example----------------------------------------------------------------------------------------------------------
    elem_lengths = [
        2.41729744052119, 2.4172909149312973, 2.4172852188428307, 2.4172809245881974, 2.417275413225601,
        2.4172736009202542, 2.417271254412724, 2.417269999999996, 2.4172712544127095, 2.4172736009202653,
        2.417275711283771, 2.4172802325568967, 2.4172853170881545, 2.4172912074740363, 2.417297440521184,
        2.4173041836797, 2.4173111439587993, 2.6519579634370456, 2.6518250271707533, 2.651692460121486,
        2.6515746644310108
        ]
    **************************************************************************************************************"""
    elem_lengths = []
    for idx in range(len(coor_list)-1) :
        elem_lengths.append(math.sqrt(
            (coor_list[idx][0]-coor_list[idx+1][0])**2+
            (coor_list[idx][1]-coor_list[idx+1][1])**2+
            (coor_list[idx][2]-coor_list[idx+1][2])**2
        ))
    # print("elem_lengths =", elem_lengths)
    """**************************************************************************************************************
    elem_lengths 에 입력된 길이를 start_node의 위치를 0으로 하여 중첩된 길이를 구해준다.
    Example----------------------------------------------------------------------------------------------------------
    acc_elem_lengths = [
        -14.50370351302937, -12.086406072508181, -9.669115157576883, -7.251829938734053, -4.834549014145855,
        -2.4172736009202542, 0, 2.417271254412724, 4.83454125441272, 7.251812508825429, 9.669086109745695,
        12.086361821029467, 14.503642053586363, 16.92092737067452, 19.338218578148556, 21.75551601866974,
        24.172820202349442, 26.59013134630824, 29.242089309745285, 31.89391433691604, 34.54560679703753,
        37.19718146146854
        ]
    **************************************************************************************************************"""
    acc_elem_lengths = []
    start_index = sorted_node_list.index(start_node)
    for i in range(len(sorted_node_list)) :
        if i < start_index:
            acc_elem_lengths.append(sum(elem_lengths[i:start_index])*-1)
        elif i == start_index:
            acc_elem_lengths.append(0)
        elif i > start_index :
            acc_elem_lengths.append(sum(elem_lengths[start_index:i]))
    # print("acc_elem_lengths =", acc_elem_lengths)
    """**************************************************************************************************************
    계산된 elem_lengths, acc_elem_lengths 반환한다.
    **************************************************************************************************************"""
    return elem_lengths, acc_elem_lengths
# Given coordinates

# Define Interpolation function
def interpolate_linear(x, y, x_target):
#     """
#     Linear interpolation function.
    
#     Parameters:
#     x (list): List of known x values.
#     y (list): List of known y values.
#     x_target (float): Target x value for interpolation.
    
    # Returns:
    # float: Interpolated y value.
    # """
    i = 0
    while i < len(x) and x[i] < x_target:
        i += 1

    if i == 0 or i == len(x):
        return None

    x1, x2 = x[i-1], x[i]
    y1, y2 = y[i-1], y[i]

    return y1 + (y2 - y1) * (x_target - x1) / (x2 - x1)

# Define your tendon_relative_y_z_coordinate function here
def tendon_relative_3D_y_z_coordinate(profile, off_yz, xar_angle, projection, axis_ij):
    x_coords = [item['PT'][0] for item in profile]
    y_coords = [item['PT'][1] for item in profile]
    z_coords = [item['PT'][2] for item in profile]
    off_y = off_yz[0]
    off_z = off_yz[1]
    xar_radians = math.radians(xar_angle)
    
    if axis_ij == "I-J" :
        sign = 1
    elif axis_ij == "J-I" :
        sign = -1
        
    y_re_coords = []
    z_re_coords = []
    for value in enumerate(x_coords) :
        if projection :
            del_y = z_coords[value[0]]/math.cos(xar_radians)*math.sin(xar_radians)*-1
            y_re_coords.append((y_coords[value[0]] + del_y +  off_y)*sign)
            z_re_coords.append(z_coords[value[0]] + off_z)
        else :
            del_angle = math.atan2(z_coords[value[0]], y_coords[value[0]]) + xar_radians
            del_length = math.sqrt(z_coords[value[0]]**2 + y_coords[value[0]]**2)
            y_re_coords.append((del_length * math.cos(del_angle) + off_y)*sign)
            z_re_coords.append(del_length * math.sin(del_angle) + off_z)
    return x_coords, y_re_coords, z_re_coords        
    
    pass

# Define tendon_relative_2D_y_z_coordinates function
# (X,Y) and (X,Z) 2D coordinates can have different x-axis coordinates, so they need to be combined and also need Y and Z-coordinates interpolation.
def tendon_relative_2D_y_z_coordinate(profiley, profilez, off_yz, xar_angle, projection, axis_ij):
    xy_x_coords = [item['PT'][0] for item in profiley]
    xz_x_coords = [item['PT'][0] for item in profilez]

    # Combined X-coordinates here
    combined_list = xy_x_coords + xz_x_coords
    unique_list = list(set(combined_list))
    
    """Example----------------------------------------------------------------------------------------------------------
    print(combined_list)
    [0, 4, 6, 10, 12, 18, 20, 22, 26, 28, 30, 36, 38, 42, 46, 48, 0, 4, 6, 8, 12, 14, 16, 18, 20, 22, 30, 34, 36, 40, 42, 44, 48]
    ----------------------------------------------------------------------------------------------------------"""
    # Remove duplicated x-coordinates components here
    x_coords = sorted(unique_list)
    
    """Example----------------------------------------------------------------------------------------------------------
    # print(x_coords)
    # [0, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 30, 34, 36, 38, 40, 42, 44, 46, 48]
    ----------------------------------------------------------------------------------------------------------"""
    # Import Y and Z coordinates here    
    y_coords = [item['PT'][1] for item in profiley]
    z_coords = [item['PT'][1] for item in profilez]

    """Example----------------------------------------------------------------------------------------------------------
    print(y_coords)
    print(z_coords)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    [-1, -1.53523, -1.772186, -1.961274, -2.197042, -2.244117, -2.25, -2.25, -2.25, -2.25, -1.944484, -1.251675, -0.760567, -0.3, -0.360662, -0.543321, -1.25]
    ----------------------------------------------------------------------------------------------------------"""
        
    # Apply offset and angle conditions here
    off_y = off_yz[0]
    off_z = off_yz[1]
    xar_radians = math.radians(xar_angle)

    # Projection value chagnes depending on direction
    if axis_ij == "I-J" :
        sign = 1
    elif axis_ij == "J-I" :
        sign = -1

    # When Y or Z coordintes doesn't have matched value on each x-coordinate, find a new proper value using linear interpolation here
    y_re_coords = []
    z_re_coords = []

    for value in x_coords:
        if value in xy_x_coords and value in xz_x_coords:
            y_value = y_coords[xy_x_coords.index(value)]
            z_value = z_coords[xz_x_coords.index(value)]
        else:
            y_value = interpolate_linear(xy_x_coords, y_coords, value)
            z_value = interpolate_linear(xz_x_coords, z_coords, value)
        
        if y_value is not None and z_value is not None:
            if projection:
                del_y = z_value / math.cos(xar_radians) * math.sin(xar_radians) * -1
                y_re_coords.append((y_value + del_y + off_y) * sign)
                z_re_coords.append(z_value + off_z)
            else:
                del_angle = math.atan2(z_value, y_value) + xar_radians
                del_length = math.sqrt(z_value**2 + y_value**2)
                y_re_coords.append((del_length * math.cos(del_angle) + off_y) * sign)
                z_re_coords.append(del_length * math.sin(del_angle) + off_z)

    return x_coords, y_re_coords, z_re_coords



"""##################################################################################################################
tendon profile에 입력된 텐던의 x값을 각 해당되는 요소의 상대좌표로 변환한다.
##################################################################################################################"""
def tendon_relative_x_coordinate(acc_elem_length, x_coords) :
    """**************************************************************************************************************
    텐던의 x값을 각 해당되는 요소의 상대좌표로 다시 계산해준다.
    요소를 넘어가는 값(양수/음수방향)에 대해서는 마지막에 있는 요소에 해당되는 값으로 계산해준다.
    또한, 각 텐던의 절점 좌표가 해당되는 요소의 인덱스를 구해준다.
    Example----------------------------------------------------------------------------------------------------------
    x_re_coords = [
        -5.49629648697063, 0.086406072508181, 2.4172736009202542, 2, 1.5827287455872758,
        1.16545874558728, 0.748187491174571, 0.33091389025430473, 2.3309138902543047, 1.9136381789705332,
        1.496357946413637, 1.0790726293254806, 0.661781421851444, 0.24448398133025862, 2.2444839813302586,
        1.8271797976505582, 1.4098686536917597, 0.7579106902547146, 0.1060856630839595, 2.1060856630839595,
        1.4543932029624713, 3.4543932029624713, 5.454393202962471, 6.454393202962471, 8.454393202962471,
        10.454393202962471, 12.454393202962471, 14.454393202962471, 25.45439320296247
        ]
    elem_inx = [
        0, 1, 5, 6, 7, 8, 9, 10, 10, 11,
        12, 13, 14, 15, 15, 16, 17, 18, 19, 19,
        20, 20, 20, 20, 20, 20, 20, 20, 20
        ]
    **************************************************************************************************************"""
    x_re_coords = []
    elem_inx = []
    n = 0
    for i in range(len(x_coords)) :
        if max(acc_elem_length) < x_coords[i] :
            elem_inx.append(len(acc_elem_length)-2)
            x_re_coords.append(x_coords[i] - acc_elem_length[elem_inx[i]])
        elif min(acc_elem_length) > x_coords[i] :
            elem_inx.append(0)
            x_re_coords.append(x_coords[i] - acc_elem_length[elem_inx[i]])
        else :
            while n < len(acc_elem_length) - 1 and x_coords[i] > acc_elem_length[n+1]:
                n += 1
            x_re_coords.append(x_coords[i]-acc_elem_length[n])
            elem_inx.append(n)
    """**************************************************************************************************************
    계산된 x_re_coords, elem_inx 반환한다.
    **************************************************************************************************************"""
    # print("x_re_coords =", x_re_coords)
    # print("elem_inx =", elem_inx)
    return x_re_coords, elem_inx

"""##################################################################################################################
계산된 텐던의 상대좌표를 절대좌표계로 변환해준다.
##################################################################################################################"""
def tendon_absolute_coordinates(res_node, sorted_node_list, elem_inx, x_re_coords, y_re_coords, z_re_coords) :
    """**************************************************************************************************************
    텐던이 가지고 있는 기준 요소로부터의 상대좌표, 그리고 기준 요소의 시작점과 끝점을 이용해 절대좌표를 구한다.
    **************************************************************************************************************"""
    start_point = []
    end_point = []
    local_axes = []
    global_point = []
    for i in range(len(x_re_coords)) :
        start_point.append([
        res_node["NODE"][str(sorted_node_list[elem_inx[i]])]["X"],
        res_node["NODE"][str(sorted_node_list[elem_inx[i]])]["Y"],
        res_node["NODE"][str(sorted_node_list[elem_inx[i]])]["Z"],
        ])
        end_point.append([
        res_node["NODE"][str(sorted_node_list[elem_inx[i]+1])]["X"],
        res_node["NODE"][str(sorted_node_list[elem_inx[i]+1])]["Y"],
        res_node["NODE"][str(sorted_node_list[elem_inx[i]+1])]["Z"],
        ])
        local_axes.append(compute_local_axes(start_point[i], end_point[i]))
        global_point.append(convert_to_global_coordinates(
        start_point[i],
        local_axes[i][0],
        local_axes[i][1],
        local_axes[i][2],
        [x_re_coords[i], y_re_coords[i], z_re_coords[i]]
        ))
    x_global_coords = [item[0] for item in global_point]
    y_global_coords = [item[1] for item in global_point]
    z_global_coords = [item[2] for item in global_point]
    # print("x_global_coords =", x_global_coords)
    # print("y_global_coords =", y_global_coords)
    # print("z_global_coords =", z_global_coords)
    """**************************************************************************************************************
    계산된 x_global_coords, y_global_coords, z_global_coords 반환한다.
    **************************************************************************************************************"""
    return x_global_coords, y_global_coords, z_global_coords

"""##################################################################################################################
벡터 정규화
##################################################################################################################"""
def normalize(vector):
    return vector / np.linalg.norm(vector)

"""##################################################################################################################
시작점과 끝점을 주면 각 방향의 정규벡터를 반환한다.
##################################################################################################################"""
def compute_local_axes(start_point, end_point):
    # Define global axes
    global_x = np.array([1, 0, 0])
    global_y = np.array([0, 1, 0])
    global_z = np.array([0, 0, 1])
    # Convert start and end points to arrays
    start_point = np.array(start_point)
    end_point = np.array(end_point)
    # Compute the line vector
    line_vector = end_point - start_point
    # Compute local x, y, z axis
    local_x = normalize(line_vector)
    local_y = normalize(np.cross(global_z, local_x))
    local_z = normalize(np.cross(local_x, local_y))
    return local_x, local_y, local_z

"""##################################################################################################################
각 방향의 정규벡터와 시작점, 그리고 상대좌표를 입력하면, 절대좌표를 반환한다.
##################################################################################################################"""
def convert_to_global_coordinates(local_origin, local_x, local_y, local_z, local_point):
    # Convert all vectors and the point to arrays
    local_origin = np.array(local_origin)
    local_x = np.array(local_x)
    local_y = np.array(local_y)
    local_z = np.array(local_z)
    local_point = np.array(local_point)
    # Compute the global point coordinates
    global_point = local_origin + local_x * local_point[0] + local_y * local_point[1] + local_z * local_point[2]
    return global_point

"""##################################################################################################################
텐던 프로파일의 경우, x축으로 증감되는 값 밖에 못 받는다. 따라서, x축의 오름차순으로 다시 재정렬한다.
##################################################################################################################"""
def sort_global_coords(x_global_coords, y_global_coords, z_global_coords):
    sorted_coords = sorted(zip(x_global_coords, y_global_coords, z_global_coords))
    x_global_re_coords, y_global_re_coords, z_global_re_coords = zip(*sorted_coords)
    return x_global_re_coords, y_global_re_coords, z_global_re_coords

"""##################################################################################################################"""

"""##################################################################################################################"""
def proc(ap_profile, node, elem):
	ap_profile = json.loads(ap_profile)
	node = json.loads(node)
	elem = json.loads(elem)
	sorted_node_list, sorted_elem_list = sort_node_elem_list(ap_profile["ELEM"], elem, ap_profile["AXIS_IJ"])
	elem_lengths, acc_elem_lengths = calculate_element_lengths(sorted_node_list, node, elem, ap_profile["INS_PT"], ap_profile["INS_ELEM"] )
    
	if ap_profile["INPUT"] == "3D" :
		x_coords, y_re_coords, z_re_coords = tendon_relative_3D_y_z_coordinate(ap_profile["PROF"], ap_profile["OFF_YZ"], ap_profile["XAR_ANGLE"], ap_profile["bPJ"], ap_profile["AXIS_IJ"])

	elif ap_profile["INPUT"] == "2D" :
		x_coords, y_re_coords, z_re_coords = tendon_relative_2D_y_z_coordinate(ap_profile["PROFY"], ap_profile["PROFZ"], ap_profile["OFF_YZ"], ap_profile["XAR_ANGLE"], ap_profile["bPJ"], ap_profile["AXIS_IJ"])

	x_re_coords, elem_inx = tendon_relative_x_coordinate(acc_elem_lengths, x_coords)
	x_global_coords, y_global_coords, z_global_coords = tendon_absolute_coordinates(node,sorted_node_list,elem_inx,x_re_coords,y_re_coords,z_re_coords)
	x_global_re_coords, y_global_re_coords, z_global_re_coords = sort_global_coords(x_global_coords, y_global_coords, z_global_coords)

	# 변환할 텐던 프로파일을 복사
	new_tdna = ap_profile

	# STARIGHT 용으로 데이터를 다시 만든다.
	new_tdna["SHAPE"] = "STRAIGHT"
	del new_tdna["INS_PT"]
	del new_tdna["AXIS_IJ"]
	del new_tdna["XAR_ANGLE"]
	del new_tdna["OFF_YZ"]

	"""기존의 2-D tendon profile들은 (x,y)와 (x,z) 좌표 갯수가 맞지 않을 수 있다. 그렇기에 갯수가 동일한 3D와 달리 2-D tendon profile은 straight 용 데이터의 길이만큼 (x,y), (x,z)의 좌표를 생성한다."""
	N_Profy =[]
	N_Profz =[]
	# 계산된 절대좌표를 입력한다.
	if ap_profile["INPUT"] == "3D" :
		for i in range(len(new_tdna["PROF"])) :
			new_tdna["PROF"][i]["PT"][0] = x_global_re_coords[i]
			new_tdna["PROF"][i]["PT"][1] = y_global_re_coords[i]
			new_tdna["PROF"][i]["PT"][2] = z_global_re_coords[i]

	elif ap_profile["INPUT"] == "2D" :
		for i in range(len(x_global_re_coords)) :
			N_Profy.append({
				"PT" : [x_global_re_coords[i], y_global_re_coords[i]],
				"bFiX" : False,
				"R" : 0,
				"RADIUS" : 0,
				"OPT" : "NONE",
				"bBOTZ" : False
			})
		for i in range(len(x_global_re_coords)) :
			N_Profz.append({
				"PT" : [x_global_re_coords[i], z_global_re_coords[i]],
				"bFiX" : False,
				"R" : 0,
				"RADIUS" : 0,
				"OPT" : "NONE",
				"bBOTZ" : False
			})     

	new_tdna["PROFY"] = N_Profy
	new_tdna["PROFZ"] = N_Profz

	# 새로운 프로파일을 등록한다.
	return json.dumps(new_tdna)