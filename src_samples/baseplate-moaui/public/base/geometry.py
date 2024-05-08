
import numpy as np
from itertools import combinations

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
            area = GeometryCalculation.rea_calc(yc, zc)
            return sum/(6*area)

    def z_cen_calc(yc, zc) :
        sum = 0
        if not yc or not zc:
            return 0.0
        else:
            for i in range(len(yc)-1):
                sum += (zc[i+1] + zc[i]) * (yc[i] * zc[i+1] - yc[i+1] * zc[i])
            area = GeometryCalculation.area_calc(yc, zc)
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
