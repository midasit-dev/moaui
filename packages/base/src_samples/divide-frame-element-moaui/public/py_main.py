from py_base import MidasAPI, Product, set_g_values, get_g_values

def change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f):
    """
    :param between_floor: 층 사이 바닥면 또는 지붕면에 존재하는 Node와 Element 리스트(ex. 3층과 4층 사이, 4층 바닥면에 존재하는 Node & Element)
    :param floor: 층에 존재하는 Node와 Element 리스트(ex. 7층에 존재하는 Node & Element)
    :param nodes_coordinate: 각 Node 번호에 해당하는 (X, Y, Z) 좌표 리스트
    :param elem_coord: 각 Element 번호에 해당하는 Element 정보
    :param z_cri: 전체 건물 층(floor) 정보
    :param b_f: 층 전환 하려는 층(from)
    :param t_f: 층 전환 당하는 층(to)
    :return: 층 전환이 이루어진 Civil Modeling
    """
    ### 아랫면.... 벨트월과 기준층
    coord2_node_b = {}
    coord2_node_t = {}
    for n in between_floor[f"{b_f - 1}_{b_f}"]['n']:
        x = nodes_coordinate[n]['X']
        y = nodes_coordinate[n]['Y']
        coord2_node_b[(x, y)] = n

    for n in between_floor[f"{t_f - 1}_{t_f}"]['n']:
        x = nodes_coordinate[n]['X']
        y = nodes_coordinate[n]['Y']
        coord2_node_t[(x, y)] = n
    t2b = {}
    b2t = {}
    for k in coord2_node_t:
        if k in coord2_node_b:
            b2t[coord2_node_b[k]] = coord2_node_t[k]
            t2b[coord2_node_t[k]] = coord2_node_b[k]
    cnt1 = 0
    for e in floor[f'{b_f - 1}']['e']:
        for j in range(len(elem_coord[e]['NODE'])):
            if elem_coord[e]['NODE'][j] in b2t:
                elem_coord[e]['NODE'][j] = b2t[elem_coord[e]['NODE'][j]]
                cnt1 += 1
    cnt2 = 0
    for e in floor[f'{t_f - 1}']['e']:
        for j in range(len(elem_coord[e]['NODE'])):
            if elem_coord[e]['NODE'][j] in t2b:
                elem_coord[e]['NODE'][j] = t2b[elem_coord[e]['NODE'][j]]
                cnt2 += 1

    ### 윗면 ... 벨트월과 기준층
    coord2_node_b = {}
    coord2_node_t = {}
    for n in between_floor[f"{b_f}_{b_f + 1}"]['n']:  ### 벨트층의 윗 경계에 있는 노드들 다 뽑아주기
        x = nodes_coordinate[n]['X']
        y = nodes_coordinate[n]['Y']
        coord2_node_b[(x, y)] = n

    for n in between_floor[f"{t_f}_{t_f + 1}"]['n']:
        x = nodes_coordinate[n]['X']
        y = nodes_coordinate[n]['Y']
        coord2_node_t[(x, y)] = n

    t2b = {}
    b2t = {}
    for k in coord2_node_t:  ### 벨트층의 윗경계에 아랫경계에 있는 노드들을 비교하여 X,Y 좌표가 같은 점들을 쌍으로 이어줌
        if k in coord2_node_b:
            b2t[coord2_node_b[k]] = coord2_node_t[k]
            t2b[coord2_node_t[k]] = coord2_node_b[k]

    cnt1 = 0
    for e in floor[f'{b_f + 1}']['e']:
        for j in range(len(elem_coord[e]['NODE'])):
            if elem_coord[e]['NODE'][j] in b2t:
                elem_coord[e]['NODE'][j] = b2t[elem_coord[e]['NODE'][j]]
                cnt1 += 1

    cnt2 = 0
    for e in floor[f'{t_f + 1}']['e']:
        for j in range(len(elem_coord[e]['NODE'])):
            if elem_coord[e]['NODE'][j] in t2b:
                elem_coord[e]['NODE'][j] = t2b[elem_coord[e]['NODE'][j]]
                cnt2 += 1

    if b_f > t_f:
        cri_trans = z_cri[t_f-1] - z_cri[b_f-1]
        cri_trans_t = z_cri[t_f] - z_cri[b_f]
        cri_trans_s = (z_cri[b_f] - z_cri[b_f - 1]) - (z_cri[t_f] - z_cri[t_f - 1])
    elif b_f < t_f:
        cri_trans = z_cri[t_f] - z_cri[b_f]
        cri_trans_t = z_cri[t_f - 1] - z_cri[b_f - 1]
        cri_trans_s = (z_cri[b_f] - z_cri[b_f - 1]) - (z_cri[t_f] - z_cri[t_f - 1])
    change_coord_b = [f'{b_f - 1}_{b_f}', f'{b_f}', f'{b_f}_{b_f + 1}']
    change_coord_t = [f'{t_f - 1}_{t_f}', f'{t_f}', f'{t_f}_{t_f + 1}']

    for i in change_coord_b:
        if i in between_floor:
            for n in between_floor[i]['n']:
                nodes_coordinate[n]['Z'] += cri_trans
        elif i in floor:
            for n in floor[i]['n']:
                nodes_coordinate[n]['Z'] += cri_trans

    for i in change_coord_t:
        if i in between_floor:
            for n in between_floor[i]['n']:
                nodes_coordinate[n]['Z'] -= cri_trans_t
        elif i in floor:
            for n in floor[i]['n']:
                nodes_coordinate[n]['Z'] -= cri_trans_t

    print(b_f, t_f)
    if b_f > t_f:
        for i in range(t_f + 1, b_f):
            for n in floor[str(i)]['n']:
                nodes_coordinate[n]['Z'] += cri_trans_s

        for i in range(t_f + 1, b_f - 1):
            t_str = f"{i}_{i + 1}"
            for n in between_floor[t_str]['n']:
                nodes_coordinate[n]['Z'] += cri_trans_s
    elif b_f < t_f:
        for i in range(b_f + 1, t_f):
            for n in floor[str(i)]['n']:
                nodes_coordinate[n]['Z'] -= cri_trans_s

        for i in range(b_f + 1, t_f - 1):
            t_str = f"{i}_{i + 1}"
            for n in between_floor[t_str]['n']:
                nodes_coordinate[n]['Z'] -= cri_trans_s
                
    civil = MidasAPI(Product.CIVIL, 'KR')
    civil.db_update('NODE', nodes_coordinate)
    civil.db_update('ELEM', elem_coord)

def belt_wall_model(b_f, t_f):
    """
    :param b_f: 층 전환 하려는 층(from)
    :param t_f: 층 전환 당하는 층(to)
    :return: 층이 서로 전환된 새로운 Civil 모델링.
    """
    civil = MidasAPI(Product.CIVIL, 'KR')
    nodes_coordinate = civil.db_read("NODE")
    elem_coord = civil.db_read("ELEM")

    ### 1. Make Data Structure
    if len(civil.view_select_get().get("NODE_LIST")) > 0:
        select_node = civil.view_select_get().get("NODE_LIST")[0]
        cri_x = nodes_coordinate[select_node]['X']
        cri_y = nodes_coordinate[select_node]['Y']
        z_list = []
        z_cri = []
        for n in nodes_coordinate:
            if nodes_coordinate[n]['X'] == cri_x and nodes_coordinate[n]['Y'] == cri_y:
                z_list.append([n,nodes_coordinate[n]['Z']])
                z_cri.append(nodes_coordinate[n]['Z'])

        z_list = sorted(z_list, key = lambda x: x[1])
        z_cri = sorted(z_cri)
        floor = {}
        between_floor = {}
        for i in range(len(z_cri)):
            between_floor[f"{i}_{i+1}"] = {'n':[], 'e':[]}
            floor[f"{i}"] = {'n':[], 'e':[]}

        node2floor = {}
        for n in nodes_coordinate:
            t_z = nodes_coordinate[n]['Z']
            for i in range(len(z_cri)):
                if t_z <= z_cri[i]:
                    if t_z == z_cri[i]:
                        between_floor[f"{i}_{i+1}"]['n'].append(n)
                        node2floor[n] = f"{i}_{i+1}"
                    elif t_z < z_cri[i]:
                        floor[f"{i}"]['n'].append(n)
                        node2floor[n] = f"{i}"
                    break

        for e in elem_coord:
            t = set()
            for n in elem_coord[e]['NODE']:
                if n!=0:
                    t.add(node2floor[n])
            t = sorted(t)
            if len(t) ==1:
                if '_' in t[0]:
                    between_floor[t[0]]['e'].append(e)
                else:
                    floor[t[0]]['e'].append(e)
            elif len(t) == 2:
                if len(t[0].split('_')) == len(t[1].split('_')):
                    if '_' in t[0]:
                        correct_floor = str(min(int(t[0].split('_')[1]), int(t[1].split('_')[1])))
                    else:
                        correct_floor = str(t[0])
                    floor[correct_floor]['e'].append(e)
                else:
                    cri = sorted([[len(t[0]), t[0]],[len(t[1]), t[1]]])
                    floor[cri[0][1]]['e'].append(e)

        if abs(b_f-t_f) == 1:
            ori_t_f = t_f
            if b_f > t_f:
                if b_f-3 >= 0:
                    t_f = b_f-3
                    change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f)
                    b_f = t_f
                    t_f = ori_t_f
                    belt_wall_model(b_f, t_f)
                elif b_f +2 < len(z_cri):
                    t_f = b_f +2
                    change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f)
                    b_f = t_f
                    t_f = ori_t_f
                    belt_wall_model(b_f, t_f)
                else:
                    print("Change Impossible")
            elif b_f < t_f:
                if b_f +3 < len(z_cri):
                    t_f = b_f+3
                    change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f)
                    b_f = t_f
                    t_f = ori_t_f
                    belt_wall_model(b_f, t_f)
                elif b_f-2 >= 0:
                    t_f = b_f-2
                    change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f)
                    b_f = t_f
                    t_f = ori_t_f
                    belt_wall_model(b_f, t_f)
                else:
                    print("Change Impossible")
        else:
            change_floor(between_floor, floor, nodes_coordinate, elem_coord, z_cri, b_f, t_f)
    else:
        print("층 기준을 얻을 Node를 선택해 주세요")
        return False
