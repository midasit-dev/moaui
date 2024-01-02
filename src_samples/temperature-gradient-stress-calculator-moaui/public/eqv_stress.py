from collections import defaultdict
import numpy as np
import matplotlib.pyplot as plt

def self_equilibrating_stress(outer, inner, slab, acg, acs, ecg, ecs, section_properties, section_dimension, inf_point, inf_temp_h, inf_temp_c):
    # print("girder thermal exapnsion coefficient =", acg)
    # print("girder elastic modulus =", ecg)
    # print("slab thermal exapnsion coefficient =", acs)
    # print("slab elastic modulus =", ecs)
    # print("section properties =", section_properties)
    # print("section dimension =", section_dimension)
    cog_z = section_properties["composite_z_cen"]
    cog_y = section_properties["composite_y_cen"]
    area = section_properties["composite_area"]
    iyy = section_properties["composite_y_inertia"]
    izz = section_properties["composite_z_inertia"]
    iyz = section_properties["composite_yz_inertia"]
    height_section = section_dimension["height"]
    e_ratio = ecs/ecg
    
    # y, z coordinates convert
    ymax, _, zmax, _ = maxmin_coordinates(outer, inner, slab)
    convert_z_cog = zmax - cog_z
    convert_y_cog = ymax - cog_y

    # Convert Y, Z
    outer_convert = defaultdict(list)
    inner_convert = defaultdict(list)
    slab_convert = defaultdict(list)

    if outer:
        for key, values in outer.items():
            if key % 2 == 0:
                outer_convert[key] = [i - ymax for i in values]
            else:
                outer_convert[key] = [i - zmax for i in values]
    if inner:
        for key, values in inner.items():
            if key % 2 == 0:
                inner_convert[key] = [i - ymax for i in values]
            else:
                inner_convert[key] = [i - zmax for i in values]
    if slab:
        for key, values in slab.items():
            if key % 2 == 0:
                slab_convert[key] = [i - ymax for i in values]
            else:
                slab_convert[key] = [i - zmax for i in values]

    # Add convert cog
    if outer :
        for i in range(int(len(outer)/2)):
            y_values = outer_convert[i*2]
            z_values = outer_convert[i*2+1]            
            new_y_values = []
            new_z_values = []

            for j in range(len(y_values)-1):
                if z_values[j] < -convert_z_cog < z_values[j + 1] or z_values[j] > -convert_z_cog > z_values[j + 1]:
                    y_value = (-convert_z_cog - z_values[j])*(y_values[j + 1] - y_values[j])/(z_values[j + 1]-z_values[j]) + y_values[j]
                    new_y_values.extend([y_values[j], y_value])
                    new_z_values.extend([z_values[j], -convert_z_cog])
                else:
                    new_y_values.append(y_values[j])
                    new_z_values.append(z_values[j])
            new_y_values.append(y_values[-1])
            new_z_values.append(z_values[-1])
            
            outer_convert[i*2] = new_y_values
            outer_convert[i*2+1] = new_z_values
    if inner :
        for i in range(int(len(inner)/2)):
            y_values = inner_convert[i*2]
            z_values = inner_convert[i*2+1]            
            new_y_values = []
            new_z_values = []

            for j in range(len(y_values)-1):
                if z_values[j] < -convert_z_cog < z_values[j + 1] or z_values[j] > -convert_z_cog > z_values[j + 1]:
                    y_value = (-convert_z_cog - z_values[j])*(y_values[j + 1] - y_values[j])/(z_values[j + 1]-z_values[j]) + y_values[j]
                    new_y_values.extend([y_values[j], y_value])
                    new_z_values.extend([z_values[j], -convert_z_cog])
                else:
                    new_y_values.append(y_values[j])
                    new_z_values.append(z_values[j])
            new_y_values.append(y_values[-1])
            new_z_values.append(z_values[-1])

            inner_convert[i*2] = new_y_values
            inner_convert[i*2+1] = new_z_values
    if slab :
        for i in range(int(len(slab)/2)):
            y_values = slab_convert[i*2]
            z_values = slab_convert[i*2+1]
            new_y_values = []
            new_z_values = []

            for j in range(len(y_values)-1):
                if z_values[j] < -convert_z_cog < z_values[j + 1] or z_values[j] > -convert_z_cog > z_values[j + 1]:
                    y_value = (-convert_z_cog - z_values[j])*(y_values[j + 1] - y_values[j])/(z_values[j + 1]-z_values[j]) + y_values[j]
                    new_y_values.extend([y_values[j], y_value])
                    new_z_values.extend([z_values[j], -convert_z_cog])
                else:
                    new_y_values.append(y_values[j])
                    new_z_values.append(z_values[j])
            new_y_values.append(y_values[-1])
            new_z_values.append(z_values[-1])

            slab_convert[i*2] = new_y_values
            slab_convert[i*2+1] = new_z_values

    # result.table_print(outer, outer_convert, tabletitle='Outer', pricision = 3)
    # result.table_print(inner, inner_convert, tabletitle='Inner', pricision = 3)
    # result.table_print(slab, slab_convert, tabletitle='Slab', pricision = 3)

    # Equivalent Force
    equ_force_H = []
    equ_force_C = []
    outer_heating = defaultdict(list)
    outer_cooling = defaultdict(list)
    inner_heating = defaultdict(list)
    inner_cooling = defaultdict(list)
    slab_heating = defaultdict(list)
    slab_cooling = defaultdict(list)

    if outer:
        for i in range(int(len(outer_convert)/2)):
            #Heating Cases
            merged_y = merge_yc(outer_convert[i*2], outer_convert[i*2+1], inf_point)
            merged_z = merge_zc(outer_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_h)
            equ_force_H += equivalent_force(merged_y, merged_z, merged_t, acg, ecg, convert_z_cog)
            outer_heating[i] = [merged_y, merged_z, merged_t]
            #Cooling Cases
            merged_y = merge_yc(outer_convert[i*2], outer_convert[i*2+1], inf_point)
            merged_z = merge_zc(outer_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_c)
            equ_force_C += equivalent_force(merged_y, merged_z, merged_t, acg, ecg, convert_z_cog)
            outer_cooling[i] = [merged_y, merged_z, merged_t]
    if inner:
        for i in range(int(len(inner_convert)/2)):
            #Heating Cases
            merged_y = merge_yc(inner_convert[i*2], inner_convert[i*2+1], inf_point)
            merged_z = merge_zc(inner_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_h)
            equ_force_H += equivalent_force(merged_y, merged_z, merged_t, acg, ecg, convert_z_cog)
            inner_heating[i] = [merged_y, merged_z, merged_t]
            #Cooling Cases
            merged_y = merge_yc(inner_convert[i*2], inner_convert[i*2+1], inf_point)
            merged_z = merge_zc(inner_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_c)
            equ_force_C += equivalent_force(merged_y, merged_z, merged_t, acg, ecg, convert_z_cog)
            inner_cooling[i] = [merged_y, merged_z, merged_t]
    if slab:
        for i in range(int(len(slab_convert)/2)):
            #Heating Cases
            merged_y = merge_yc(slab_convert[i*2], slab_convert[i*2+1], inf_point)
            merged_z = merge_zc(slab_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_h)
            equ_force_H += equivalent_force(merged_y, merged_z, merged_t, acs, ecs, convert_z_cog)
            slab_heating[i] = [merged_y, merged_z, merged_t]
            #Cooling Cases
            merged_y = merge_yc(slab_convert[i*2], slab_convert[i*2+1], inf_point)
            merged_z = merge_zc(slab_convert[i*2+1], inf_point)
            merged_t = merge_tc(merged_z, inf_point, inf_temp_c)
            equ_force_C += equivalent_force(merged_y, merged_z, merged_t, acs, ecs, convert_z_cog)
            slab_cooling[i] = [merged_y, merged_z, merged_t]

    #Equivalent Forces
    sum_normal_h = 0
    sum_moment_h = 0
    for i in range(int(len(equ_force_H)/2)) :
        sum_normal_h += equ_force_H[i*2]
        sum_moment_h += equ_force_H[i*2+1]
    sum_normal_c = 0
    sum_moment_c = 0
    for i in range(int(len(equ_force_C)/2)) :
        sum_normal_c += equ_force_C[i*2]
        sum_moment_c += equ_force_C[i*2+1]

    # Equivalent Stress
    sigma_outer_heating = []
    sigma_outer_cooling = []
    sigma_inner_heating = []
    sigma_inner_cooling = []
    sigma_slab_heating = []
    sigma_slab_cooling = []

    for i in range(len(outer_heating)):
        eq_stress = equivalent_stress(
                sum_normal_h,
                sum_moment_h,
                outer_heating[i][1],
                outer_heating[i][2],
                acg,
                ecg,
                convert_z_cog,
                area,
                iyy
            )
        sigma_outer_heating.append({
            "y" : outer_heating[i][0],
            "z" : outer_heating[i][1],
            "t" : outer_heating[i][2],
            "s" : eq_stress
        })
    
    for i in range(len(outer_cooling)):
        eq_stress = equivalent_stress(
                sum_normal_c,
                sum_moment_c,
                outer_cooling[i][1],
                outer_cooling[i][2],
                acg,
                ecg,
                convert_z_cog,
                area,
                iyy
            )
        sigma_outer_cooling.append({
            "y" : outer_cooling[i][0],
            "z" : outer_cooling[i][1],
            "t" : outer_cooling[i][2],
            "s" : eq_stress
        })

    for i in range(len(inner_heating)):
        eq_stress = equivalent_stress(
                sum_normal_h,
                sum_moment_h,
                inner_heating[i][1],
                inner_heating[i][2],
                acg,
                ecg,
                convert_z_cog,
                area,
                iyy
            )
        sigma_inner_heating.append({
            "y" : inner_heating[i][0],
            "z" : inner_heating[i][1],
            "t" : inner_heating[i][2],
            "s" : eq_stress
        })

    for i in range(len(inner_cooling)):
        eq_stress = equivalent_stress(
                sum_normal_c,
                sum_moment_c,
                inner_cooling[i][1],
                inner_cooling[i][2],
                acg,
                ecg,
                convert_z_cog,
                area,
                iyy
            )
        sigma_inner_cooling.append({
            "y" : inner_cooling[i][0],
            "z" : inner_cooling[i][1],
            "t" : inner_cooling[i][2],
            "s" : eq_stress
        })

    for i in range(len(slab_heating)):
        eq_stress = equivalent_stress(
                sum_normal_h,
                sum_moment_h,
                slab_heating[i][1],
                slab_heating[i][2],
                acs,
                ecs,
                convert_z_cog,
                area,
                iyy,
                e_ratio
            )
        sigma_slab_heating.append({
            "y" : slab_heating[i][0],
            "z" : slab_heating[i][1],
            "t" : slab_heating[i][2],
            "s" : eq_stress
        })

    for i in range(len(slab_cooling)):
        eq_stress = equivalent_stress(
                sum_normal_c,
                sum_moment_c,
                slab_cooling[i][1],
                slab_cooling[i][2],
                acs,
                ecs,
                convert_z_cog,
                area,
                iyy,
                e_ratio
            )
        sigma_slab_cooling.append({
            "y" : slab_cooling[i][0],
            "z" : slab_cooling[i][1],
            "t" : slab_cooling[i][2],
            "s" : eq_stress
        })

    return sigma_outer_heating, sigma_outer_cooling, sigma_inner_heating, sigma_inner_cooling, sigma_slab_heating, sigma_slab_cooling

def equivalent_stress(Nx, My, zc, dt, ac, ec, cog, area, iyy, e_ratio=1) :
    sigma_t = []
    sigma_r = []
    sigma_s = []
    sigma_n = []
    sigma_m = []
    for i in range(len(zc)) :
        sigma_n.append(Nx/area*e_ratio)
        sigma_m.append(My*(cog-abs(zc[i]))/iyy*e_ratio)
        sigma_t.append(dt[i]*ac*ec*-1)
        sigma_r.append(Nx/area*e_ratio + My*(cog-abs(zc[i]))/iyy*e_ratio)
        sigma_s.append(sigma_t[i]+sigma_r[i])
    return sigma_s

def equivalent_stress_advanced(Nx, My, yc, zc, dt, ac, ec, cog_y, cog_z, area, iyy, izz, ixy, e_ratio=1) :
    sigma_t = []
    sigma_r = []
    sigma_s = []
    sigma_n = []
    sigma_mz = []
    sigma_my = []
    for i in range(len(zc)) :
        sigma_n.append(Nx/area*e_ratio)
        sigma_mz.append((My*ixy)*(cog_y-abs(yc[i]))/(iyy*izz-ixy**2))
        sigma_my.append((My*izz)*(cog_z-abs(zc[i]))/(iyy*izz-ixy**2))
        sigma_t.append(dt[i]*ac*ec*-1)
        sigma_r.append(Nx/area*e_ratio + ((My*ixy)*(cog_y-abs(yc[i]))+(My*izz)*(cog_z-abs(zc[i])))/(iyy*izz-ixy**2))
        sigma_s.append(sigma_t[i]+sigma_r[i])
    return sigma_t, sigma_r, sigma_s

def equivalent_force(yc, zc, dt, ac, ec, cog, e_ratio=1) :
    sum_normal = 0
    sum_moment = 0
    b1 = 0
    b2 = 0
    d1 = 0
    d2 = 0
    t1 = 0
    t2 = 0
    for i in range(len(yc)-1) :
        if zc[i+1] == zc[i] :
            b1 = 0
            b2 = 0
            d1 = 0
            d2 = 0
            t1 = 0
            t2 = 0
        else :
            b1 = abs(yc[i])
            b2 = abs(yc[i+1])
            d1 = abs(zc[i])
            d2 = abs(zc[i+1])
            t1 = dt[i]
            t2 = dt[i+1]
        sum_normal += ac*ec*-(d1-d2)*((2*b1+b2)*t1+(b1+2*b2)*t2)/6*e_ratio
        sum_moment += ac*ec*(d1**2*((3*b1+b2)*t1+(b1+b2)*t2)-2*d1*(d2*(b1*t1-b2*t2)+cog*((2*b1+b2)*t1+(b1+2*b2)*t2))-d2*(d2*((b1+b2)*t1+(b1+3*b2)*t2)-2*cog*((2*b1+b2)*t1+(b1+2*b2)*t2)))/12*e_ratio
    return sum_normal, sum_moment

def merge_yc(yc, zc, zt):
    added_vertex = 0
    db = 0.0
    merge_yc = yc.copy()

    for i in range(len(zc) - 1):
        if zc[i] > zc[i + 1]:
            for j in range(len(zt)):
                if max(zc[i], zc[i + 1]) > zt[j] and min(zc[i], zc[i + 1]) < zt[j]:
                    db = (zt[j] - zc[i]) * (yc[i + 1] - yc[i]) / (zc[i + 1] - zc[i]) + yc[i]
                    merge_yc.insert(i + 1 + added_vertex, db)
                    added_vertex += 1
        elif zc[i] < zc[i + 1]:
            for j in range(len(zt) - 1, -1, -1):
                if max(zc[i], zc[i + 1]) > zt[j] and min(zc[i], zc[i + 1]) < zt[j]:
                    db = (zt[j] - zc[i]) * (yc[i + 1] - yc[i]) / (zc[i + 1] - zc[i]) + yc[i]
                    merge_yc.insert(i + 1 + added_vertex, db)
                    added_vertex += 1

    return merge_yc

def merge_zc(zc, zt):
    added_vertex = 0
    merge_zc = zc.copy()

    for i in range(len(zc) - 1):
        if zc[i] > zc[i + 1]:
            for j in range(len(zt)):
                if max(zc[i], zc[i + 1]) > zt[j] and min(zc[i], zc[i + 1]) < zt[j]:
                    merge_zc.insert(i + 1 + added_vertex, zt[j])
                    added_vertex += 1
        elif zc[i] < zc[i + 1]:
            for j in range(len(zt) - 1, -1, -1):
                if max(zc[i], zc[i + 1]) > zt[j] and min(zc[i], zc[i + 1]) < zt[j]:
                    merge_zc.insert(i + 1 + added_vertex, zt[j])
                    added_vertex += 1

    return merge_zc

def merge_tc(zc, zt, dt):
    ycdt = np.zeros(len(zc), dtype=float)

    for i in range(len(zc)):
        for j in range(len(zt) - 1):
            if zt[j] >= zc[i] >= zt[j + 1]:
                if dt[j] == dt[j + 1]:
                    ycdt[i] = dt[j]
                else:
                    ycdt[i] = (dt[j + 1] - dt[j]) / (zt[j + 1] - zt[j]) * (zc[i] - zt[j]) + dt[j]

    return ycdt.tolist()

def maxmin_coordinates(outer, inner, slab) :
    # Find max and min y, z coordinates
    ymax = float('-inf')
    ymin = float('inf')
    zmax = float('-inf')
    zmin = float('inf')
    if outer:
        for key, values in outer.items():
            if key % 2 == 0:
                outer_ymax = max(values, default=float('-inf'))
                outer_ymin = min(values, default=float('inf'))
            else:
                outer_zmax = max(values, default=float('-inf'))
                outer_zmin = min(values, default=float('inf'))
        ymax = max(ymax, outer_ymax)
        ymin = min(ymin, outer_ymin)
        zmax = max(zmax, outer_zmax)
        zmin = min(zmin, outer_zmin)
    if inner:
        for key, values in inner.items():
            if key % 2 == 0:
                inner_ymax = max(values, default=float('-inf'))
                inner_ymin = min(values, default=float('inf'))
            else:
                inner_zmax = max(values, default=float('-inf'))
                inner_zmin = min(values, default=float('inf'))
        ymax = max(ymax, inner_ymax)
        ymin = min(ymin, inner_ymin)
        zmax = max(zmax, inner_zmax)
        zmin = min(zmin, inner_zmin)
    if slab:
        for key, values in slab.items():
            if key % 2 == 0:
                slab_ymax = max(values, default=float('-inf'))
                slab_ymin = min(values, default=float('inf'))
            else:
                slab_zmax = max(values, default=float('-inf'))
                slab_zmin = min(values, default=float('inf'))
        ymax = max(ymax, slab_ymax)
        ymin = min(ymin, slab_ymin)
        zmax = max(zmax, slab_zmax)
        zmin = min(zmin, slab_zmin)
    return ymax, ymin, zmax, zmin

def find_max_min_stress(self_eq_stress):
    # Outer Heating
    outer_heating_top_z = []
    outer_heating_top_s = []
    outer_heating_bot_z = []
    outer_heating_bot_s = []
    for i in range(len(self_eq_stress[0])):
        z = self_eq_stress[0][i]["z"]
        s = self_eq_stress[0][i]["s"]
        max_z = max(z)
        max_z_index = z.index(max_z)
        outer_heating_top_z.append(max_z)
        outer_heating_top_s.append(s[max_z_index])
        min_z = min(z)
        min_z_index = z.index(min_z)
        outer_heating_bot_z.append(min_z)
        outer_heating_bot_s.append(s[min_z_index])
    
    # Outer Cooling
    outer_cooling_top_z = []
    outer_cooling_top_s = []
    outer_cooling_bot_z = []
    outer_cooling_bot_s = []
    for i in range(len(self_eq_stress[1])):
        z = self_eq_stress[1][i]["z"]
        s = self_eq_stress[1][i]["s"]
        max_z = max(z)
        max_z_index = z.index(max_z)
        outer_cooling_top_z.append(max_z)
        outer_cooling_top_s.append(s[max_z_index])
        min_z = min(z)
        min_z_index = z.index(min_z)
        outer_cooling_bot_z.append(min_z)
        outer_cooling_bot_s.append(s[min_z_index])

    # Slab Heating
    slab_heating_top_z = []
    slab_heating_top_s = []
    slab_heating_bot_z = []
    slab_heating_bot_s = []
    for i in range(len(self_eq_stress[4])):
        z = self_eq_stress[4][i]["z"]
        s = self_eq_stress[4][i]["s"]
        max_z = max(z)
        max_z_index = z.index(max_z)
        slab_heating_top_z.append(max_z)
        slab_heating_top_s.append(s[max_z_index])
        min_z = min(z)
        min_z_index = z.index(min_z)
        slab_heating_bot_z.append(min_z)
        slab_heating_bot_s.append(s[min_z_index])

    # Slab Cooling
    slab_cooling_top_z = []
    slab_cooling_top_s = []
    slab_cooling_bot_z = []
    slab_cooling_bot_s = []
    for i in range(len(self_eq_stress[5])):
        z = self_eq_stress[5][i]["z"]
        s = self_eq_stress[5][i]["s"]
        max_z = max(z)
        max_z_index = z.index(max_z)
        slab_cooling_top_z.append(max_z)
        slab_cooling_top_s.append(s[max_z_index])
        min_z = min(z)
        min_z_index = z.index(min_z)
        slab_cooling_bot_z.append(min_z)
        slab_cooling_bot_s.append(s[min_z_index])
    
    # Results
    stress_heating = []
    stress_cooling = []
    if len(self_eq_stress[0]) > 0 :
        stress_heating.append(outer_heating_top_s[outer_heating_top_z.index(max(outer_heating_top_z))])
        stress_heating.append(outer_heating_bot_s[outer_heating_bot_z.index(min(outer_heating_bot_z))])
    if len(self_eq_stress[1]) > 0 :
        stress_cooling.append(outer_cooling_top_s[outer_cooling_top_z.index(max(outer_cooling_top_z))])
        stress_cooling.append(outer_cooling_bot_s[outer_cooling_bot_z.index(min(outer_cooling_bot_z))])
    if len(self_eq_stress[4]) > 0 :
        stress_heating.append(slab_heating_top_s[slab_heating_top_z.index(max(slab_heating_top_z))])
        stress_heating.append(slab_heating_bot_s[slab_heating_bot_z.index(min(slab_heating_bot_z))])
    if len(self_eq_stress[5]) > 0 :
        stress_cooling.append(slab_cooling_top_s[slab_cooling_top_z.index(max(slab_cooling_top_z))])
        stress_cooling.append(slab_cooling_bot_s[slab_cooling_bot_z.index(min(slab_cooling_bot_z))])

    return stress_heating, stress_cooling