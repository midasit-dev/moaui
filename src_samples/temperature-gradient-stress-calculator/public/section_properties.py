from collections import defaultdict

def section_calculator(outer, inner, slab, mat_girder=None, mat_slab=None) :

    # Find Centroid\
    girder_prop = girder_centroid(outer, inner)
    compst_prop = composite_centroid(outer, inner, slab, mat_girder, mat_slab)
    # Grider moment of inertia
    girder_y_inertia = 0
    girder_z_inertia = 0
    girder_yz_inertia = 0
    for i in range(len(girder_prop["outer"])) :
        if i % 2 == 0 :
            girder_y_inertia += y_inertia_calc(girder_prop["outer"][i], girder_prop["outer"][i+1])
            girder_z_inertia += z_inertia_calc(girder_prop["outer"][i], girder_prop["outer"][i+1])
            girder_yz_inertia += yz_inertia_calc(girder_prop["outer"][i], girder_prop["outer"][i+1])
    for i in range(len(girder_prop["inner"])) :
        if i % 2 == 0 :
            girder_y_inertia += y_inertia_calc(girder_prop["inner"][i], girder_prop["inner"][i+1])
            girder_z_inertia += z_inertia_calc(girder_prop["inner"][i], girder_prop["inner"][i+1])
            girder_yz_inertia += yz_inertia_calc(girder_prop["inner"][i], girder_prop["inner"][i+1])
    # Composite moment of inertia
    compst_y_inertia = 0
    compst_z_inertia = 0
    compst_yz_inertia = 0
    for i in range(len(compst_prop["outer"])) :
        if i % 2 == 0 :
            compst_y_inertia += y_inertia_calc(compst_prop["outer"][i], compst_prop["outer"][i+1])
            compst_z_inertia += z_inertia_calc(compst_prop["outer"][i], compst_prop["outer"][i+1])
            compst_yz_inertia += yz_inertia_calc(compst_prop["outer"][i], compst_prop["outer"][i+1])
    for i in range(len(compst_prop["inner"])) :
        if i % 2 == 0 :
            compst_y_inertia += y_inertia_calc(compst_prop["inner"][i], compst_prop["inner"][i+1])
            compst_z_inertia += z_inertia_calc(compst_prop["inner"][i], compst_prop["inner"][i+1])
            compst_yz_inertia += yz_inertia_calc(compst_prop["inner"][i], compst_prop["inner"][i+1])
    for i in range(len(compst_prop["slab"])) :
        if i % 2 == 0 :
            compst_y_inertia += y_inertia_calc(compst_prop["slab"][i], compst_prop["slab"][i+1])*(mat_slab/mat_girder)
            compst_z_inertia += z_inertia_calc(compst_prop["slab"][i], compst_prop["slab"][i+1])*(mat_slab/mat_girder)
            compst_yz_inertia += yz_inertia_calc(compst_prop["slab"][i], compst_prop["slab"][i+1])*(mat_slab/mat_girder)
    section_properties = {
        "girder_area" : girder_prop["area"],
        "girder_y_cen" : girder_prop["y_cen"],
        "girder_z_cen" : girder_prop["z_cen"],
        "girder_y_inertia" : girder_y_inertia,
        "girder_z_inertia" : girder_z_inertia,
        "girder_yz_inertia" : girder_yz_inertia,
        "composite_area" : compst_prop["area"],
        "composite_y_cen" : compst_prop["y_cen"],
        "composite_z_cen" : compst_prop["z_cen"],
        "composite_y_inertia" : compst_y_inertia,
        "composite_z_inertia" : compst_z_inertia,
        "composite_yz_inertia" : compst_yz_inertia
    }
    return section_properties

def section_dimension(outer, inner, slab) :
    outer_y_max = None
    outer_y_min = None
    outer_z_max = None
    outer_z_min = None
    for key, value in outer.items() :
        if key % 2 != 0:
            if outer_z_max is None or max(value) > outer_z_max :
                outer_z_max = max(value)
            if outer_z_min is None or min(value) < outer_z_min :
                outer_z_min = min(value)
        else :
            if outer_y_max is None or max(value) > outer_y_max :
                outer_y_max = max(value)
            if outer_y_min is None or min(value) < outer_y_min :
                outer_y_min = min(value)
    slab_y_max = None
    slab_y_min = None
    slab_z_max = None
    slab_z_min = None
    for key, value in slab.items() :
        if key % 2 != 0:
            if slab_z_max is None or max(value) > slab_z_max :
                slab_z_max = max(value)
            if slab_z_min is None or min(value) < slab_z_min :
                slab_z_min = min(value)
        else :
            if slab_y_max is None or max(value) > slab_y_max :
                slab_y_max = max(value)
            if slab_y_min is None or min(value) < slab_y_min :
                slab_y_min = min(value)
    if slab == {}:
        total_height = outer_z_max - outer_z_min
        total_width = outer_y_max - outer_y_min
        slab_thick = 0
    else :
        total_height = max(outer_z_max, slab_z_max) - min(outer_z_min, slab_z_min)
        total_width = max(outer_y_max, slab_y_max) - min(outer_y_min, slab_y_min)
        slab_thick = slab_z_max - slab_z_min
    return {
        "height" : total_height,
        "width" : total_width,
        "slab_thick" : slab_thick
    }

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

def girder_centroid(outer, inner) :
    area = []
    y_cen = []
    z_cen = []
    for i in range(int(len(outer)/2)) :
        area.append(area_calc(outer[i*2], outer[i*2+1]))
        y_cen.append(y_cen_calc(outer[i*2], outer[i*2+1]))
        z_cen.append(z_cen_calc(outer[i*2], outer[i*2+1]))
    for i in range(int(len(inner)/2)) :
        area.append(area_calc(inner[i*2], inner[i*2+1]))
        y_cen.append(y_cen_calc(inner[i*2], inner[i*2+1]))
        z_cen.append(z_cen_calc(inner[i*2], inner[i*2+1]))
    area_girder = sum(area)
    y_cen_girder = sum(y * area for y, area in zip(y_cen, area)) / area_girder
    z_cen_girder = sum(z * area for z, area in zip(z_cen, area)) / area_girder
    # Convert to centroid
    outer_converted = defaultdict(list)
    inner_converted = defaultdict(list)
    for i in range(len(outer)) :
        if i % 2 == 0 :
            outer_converted[i] = []
            for j in range(len(outer[i])) :
                outer_converted[i].append(outer[i][j] - y_cen_girder)
        else :
            outer_converted[i] = []
            for j in range(len(outer[i])) :
                outer_converted[i].append(outer[i][j] - z_cen_girder)
    for i in range(len(inner)) :
        if i % 2 == 0 :
            inner_converted[i] = []
            for j in range(len(inner[i])) :
                inner_converted[i].append(inner[i][j] - y_cen_girder)
        else :
            inner_converted[i] = []
            for j in range(len(inner[i])) :
                inner_converted[i].append(inner[i][j] - z_cen_girder)
    convert_properties = {
        "outer" : outer_converted,
        "inner" : inner_converted,
        "area" : area_girder,
        "y_cen" : y_cen_girder,
        "z_cen" : z_cen_girder
    }
    return convert_properties

def composite_centroid(outer, inner, slab, mat_girder, mat_slab) :
    area = []
    y_cen = []
    z_cen = []
    for i in range(int(len(outer)/2)) :
        area.append(area_calc(outer[i*2], outer[i*2+1]))
        y_cen.append(y_cen_calc(outer[i*2], outer[i*2+1]))
        z_cen.append(z_cen_calc(outer[i*2], outer[i*2+1]))
    outer_area = sum(area)
    outer_y_cen = sum(y * area for y, area in zip(y_cen, area)) / outer_area
    outer_z_cen = sum(z * area for z, area in zip(z_cen, area)) / outer_area
    area = []
    y_cen = []
    z_cen = []
    for i in range(int(len(inner)/2)) :
        area.append(area_calc(inner[i*2], inner[i*2+1]))
        y_cen.append(y_cen_calc(inner[i*2], inner[i*2+1]))
        z_cen.append(z_cen_calc(inner[i*2], inner[i*2+1]))
    inner_area = sum(area)
    if inner_area != 0:
        inner_y_cen = sum(y * area for y, area in zip(y_cen, area)) / inner_area
        inner_z_cen = sum(z * area for z, area in zip(z_cen, area)) / inner_area
    else:
        inner_y_cen = 0
        inner_z_cen = 0
    area = []
    y_cen = []
    z_cen = []
    for i in range(int(len(slab)/2)) :
        area.append(area_calc(slab[i*2], slab[i*2+1]))
        y_cen.append(y_cen_calc(slab[i*2], slab[i*2+1]))
        z_cen.append(z_cen_calc(slab[i*2], slab[i*2+1]))
    slab_area = sum(area)
    if slab_area != 0:
        slab_y_cen = sum(y * area for y, area in zip(y_cen, area)) / slab_area
        slab_z_cen = sum(z * area for z, area in zip(z_cen, area)) / slab_area
    else:
        slab_y_cen = 0
        slab_z_cen = 0

    factor = mat_slab / mat_girder
    Total_Area = outer_area + inner_area + slab_area * factor
    Total_y_cen = (outer_y_cen * outer_area + inner_y_cen * inner_area + slab_y_cen * slab_area * factor) / Total_Area
    Total_z_cen = (outer_z_cen * outer_area + inner_z_cen * inner_area + slab_z_cen * slab_area * factor) / Total_Area
    
    outer_converted = defaultdict(list)
    inner_converted = defaultdict(list)
    slab_converted = defaultdict(list)
    for i in range(len(outer)) :
        if i % 2 == 0 :
            outer_converted[i] = []
            for j in range(len(outer[i])) :
                outer_converted[i].append(outer[i][j] - Total_y_cen)
        else :
            outer_converted[i] = []
            for j in range(len(outer[i])) :
                outer_converted[i].append(outer[i][j] - Total_z_cen)
    for i in range(len(inner)) :
        if i % 2 == 0 :
            inner_converted[i] = []
            for j in range(len(inner[i])) :
                inner_converted[i].append(inner[i][j] - Total_y_cen)
        else :
            inner_converted[i] = []
            for j in range(len(inner[i])) :
                inner_converted[i].append(inner[i][j] - Total_z_cen)
    for i in range(len(slab)) :
        if i % 2 == 0 :
            slab_converted[i] = []
            for j in range(len(slab[i])) :
                slab_converted[i].append(slab[i][j] - Total_y_cen)
        else :
            slab_converted[i] = []
            for j in range(len(slab[i])) :
                slab_converted[i].append(slab[i][j] - Total_z_cen)
    convert_properties = {
        "outer" : outer_converted,
        "inner" : inner_converted,
        "slab" : slab_converted,
        "area" : Total_Area,
        "y_cen" : Total_y_cen,
        "z_cen" : Total_z_cen
    }
    return convert_properties