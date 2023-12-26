import numpy as np

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

    local_x = nomalize_vector(line_vector)
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
        local_y = nomalize_vector(local_y)
        local_z = np.cross(local_x, local_y)
        local_z = nomalize_vector(local_z)

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
        
        rotation_matrix_x = rotation_matrix(local_x, rotation_angle)

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
        
        rotation_matrix_x = rotation_matrix(local_x, rotation_angle)

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
    vector_x = nomalize_vector(vector_x)
    vector_y = nomalize_vector(vector_y)
    vector_z = nomalize_vector(vector_z)
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
    vector_x = nomalize_vector(vector_x)
    vector_y = nomalize_vector(vector_y)
    vector_z = nomalize_vector(vector_z)
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
        x_vector, y_vector, z_vector = node_vector_global()
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
            x_vector, y_vector, z_vector = node_vector_angle(rotation_angle, "degrees")
            node_normalz_vector = [x_vector, y_vector, z_vector]

        elif method == 2:
            # Local - 3 Points
            P0 = [skew_info["P0X"], skew_info["P0Y"], skew_info["P0Z"]]
            P1 = [skew_info["P1X"], skew_info["P1Y"], skew_info["P1Z"]]
            P2 = [skew_info["P2X"], skew_info["P2Y"], skew_info["P2Z"]]
            x_vector, y_vector, z_vector = node_vector_3points(P0, P1, P2)
            node_normalz_vector = [x_vector, y_vector, z_vector]

        elif method == 3:
            # Local - Vector
            V1 = [skew_info["V1X"], skew_info["V1Y"], skew_info["V1Z"]]
            V2 = [skew_info["V2X"], skew_info["V2Y"], skew_info["V2Z"]]
            x_vector, y_vector, z_vector = node_vector_vectors(V1, V2)
            node_normalz_vector = [x_vector, y_vector, z_vector]

        elif method == 4:
            # Local - Line Vector
            LV0 = [skew_info["LV0X"], skew_info["LV0Y"], skew_info["LV0Z"]]
            LV1 = [skew_info["LV1X"], skew_info["LV1Y"], skew_info["LV1Z"]]
            LV2 = [skew_info["LV2X"], skew_info["LV2Y"], skew_info["LV2Z"]]
            x_vector, y_vector, z_vector = node_vector_line_vector_direct(LV0, LV1, LV2)
            node_normalz_vector = [x_vector, y_vector, z_vector]
    
    return node_normalz_vector