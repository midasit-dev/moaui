aashto_tempgradient = {
    "C" :{
        "ZONE1" : {
            "HT1" : 30.00,
            "HT2" : 7.80,
            "CT1_PLAIN" : -9.00,
            "CT2_PLAIN" : -2.34,
            "CT1_ASPHALT" : -6.00,
            "CT2_ASPHALT" : -1.56,
        },
        "ZONE2" : {
            "HT1" : 25.00,
            "HT2" : 6.70,
            "CT1_PLAIN" : -7.50,
            "CT2_PLAIN" : -2.01,
            "CT1_ASPHALT" : -5.00,
            "CT2_ASPHALT" : -1.34,
        },
        "ZONE3" : {
            "HT1" : 23.00,
            "HT2" : 6.00,
            "CT1_PLAIN" : -6.90,
            "CT2_PLAIN" : -1.80,
            "CT1_ASPHALT" : -4.60,
            "CT2_ASPHALT" : -1.20,
        },
        "ZONE4" : {
            "HT1" : 21.00,
            "HT2" : 5.00,
            "CT1_PLAIN" : -6.30,
            "CT2_PLAIN" : -1.50,
            "CT1_ASPHALT" : -4.20,
            "CT2_ASPHALT" : -1.00,
        }
    },
    "F" : {
        "ZONE1" : {
            "HT1" : 54.0,
            "HT2" : 14.0,
            "CT1_PLAIN" : -16.20,
            "CT2_PLAIN" : -4.20,
            "CT1_ASPHALT" : -10.80,
            "CT2_ASPHALT" : -2.80,
            },
        "ZONE2" : {
            "HT1" : 46.0,
            "HT2" : 12.0,
            "CT1_PLAIN" : -13.80,
            "CT2_PLAIN" : -3.60,
            "CT1_ASPHALT" : -9.20,
            "CT2_ASPHALT" : -2.40,
        },
        "ZONE3" : {
            "HT1" : 41.0,
            "HT2" : 11.0,
            "CT1_PLAIN" : -12.30,
            "CT2_PLAIN" : -3.30,
            "CT1_ASPHALT" : -8.20,
            "CT2_ASPHALT" : -2.20,
        },
        "ZONE4" : {
            "HT1" : 38.0,
            "HT2" : 9.00,
            "CT1_PLAIN" : -11.40,
            "CT2_PLAIN" : -2.70,
            "CT1_ASPHALT" : -7.60,
            "CT2_ASPHALT" : -1.80,
        }
    }
}

def nonlieaner_temperature(units, height, slab_thick, type, zone, surface, apply_T3, T3_heating, T3_cooling):
    dist = units[1]["DIST"]
    temp = units[1]["TEMPER"]

    ## Temperature Inflection Point
    Th1 = aashto_tempgradient[temp][zone]["HT1"]
    Th2 = aashto_tempgradient[temp][zone]["HT2"]
    Th3 = T3_heating
    Tc1 = aashto_tempgradient[temp][zone]["CT1_" + surface]
    Tc2 = aashto_tempgradient[temp][zone]["CT2_" + surface]
    Tc3 = T3_cooling

    inf_point_base = [0]
    inf_temp_base_h = [Th1]
    inf_temp_base_c = [Tc1]

    ## Find Inflection Point
    if dist in ["MM", "CM", "M"] :
        ## Convert dimension
        if dist == "MM" :
            dist_factor = 1
        elif dist == "CM" :
            dist_factor = 1 / 10
        elif dist == "M" :
            dist_factor = 1 / 1000
        else :
            return "Invalid Unit"
        ## depth_A
        depth_top = 100 * dist_factor
        if apply_T3 :
            depth_bot = 200 * dist_factor
        else :
            depth_bot = 0
        if height <= 400 * dist_factor :
            depth_A = height - 100 * dist_factor
        else :
            depth_A = 300 * dist_factor
        ## height check for T3
        if apply_T3 and height < (depth_top + depth_bot + depth_A) :
            return "height is too small to apply T3"
        ## Temperature Inflection Point_Top
        if height <= 100 * dist_factor :
            inf_point_base.append(-height * dist_factor)
            inf_point_base.append(-height * dist_factor)
        else :
            inf_point_base.append(-100*dist_factor)
            inf_point_base.append(-100*dist_factor-depth_A)
        ## Temperature Inflection Point_Bottom
        if height >= 600 * dist_factor and apply_T3 :
            inf_point_base.append(200*dist_factor-height)
            inf_point_base.append(-height)
        else :
            inf_point_base.append(0)
            inf_point_base.append(0)
        ## Temperature Inflection Point_Concrete_Heating
        inf_temp_base_h.append((Th2 - Th1)/(-100*dist_factor-inf_point_base[0])*(inf_point_base[1]-inf_point_base[0])+Th1)
        inf_temp_base_h.append(0)
        inf_temp_base_h.append(0)
        if height >= 600*dist_factor and apply_T3 :
            inf_temp_base_h.append(Th3)
        else :
            inf_temp_base_h.append(0)
        ## Temperature Inflection Point_Concrete_Cooling
        inf_temp_base_c.append((Tc2 - Tc1)/(-100*dist_factor-inf_point_base[0])*(inf_point_base[1]-inf_point_base[0])+Tc1)
        inf_temp_base_c.append(0)
        inf_temp_base_c.append(0)
        if height >= 600*dist_factor and apply_T3 :
            inf_temp_base_c.append(Tc3)
        else :
            inf_temp_base_c.append(0)

    elif dist in ["FT", "IN"] :
        ## Convert dimension
        if dist == "IN" :
            dist_factor = 1
        elif dist == "FT" :
            dist_factor = 1 / 12
        else :
            return "Invalid Unit"
        ## depth_A
        depth_top = 4 * dist_factor
        if apply_T3 :
            depth_bot = 8 * dist_factor
        else :
            depth_bot = 0
        if height <= 16 * dist_factor :
            depth_A = height - 4 * dist_factor
        else :
            depth_A = 12 * dist_factor
        ## height check for T3
        if apply_T3 and height < (depth_top + depth_bot + depth_A) :
            return "height is too small to apply T3"
        ## Temperature Inflection Point_Top
        if height <= 4 * dist_factor :
            inf_point_base.append(-height * dist_factor)
            inf_point_base.append(-height * dist_factor)
        else :
            inf_point_base.append(-4*dist_factor)
            inf_point_base.append(-4*dist_factor-depth_A)
        ## Temperature Inflection Point_Bottom
        if height >= 24 * dist_factor and apply_T3 :
            inf_point_base.append(8*dist_factor-height)
            inf_point_base.append(-height)
        else :
            inf_point_base.append(0)
            inf_point_base.append(0)
        ## Temperature Inflection Point_Heating
        inf_temp_base_h.append((Th2 - Th1)/(-4*dist_factor-inf_point_base[0])*(inf_point_base[1]-inf_point_base[0])+Th1)
        inf_temp_base_h.append(0)
        inf_temp_base_h.append(0)
        if height >= 24*dist_factor and apply_T3 :
            inf_temp_base_h.append(Th3)
        else :
            inf_temp_base_h.append(0)
        ## Temperature Inflection Point_Cooling
        inf_temp_base_c.append((Tc2 - Tc1)/(-4*dist_factor-inf_point_base[0])*(inf_point_base[1]-inf_point_base[0])+Tc1)
        inf_temp_base_c.append(0)
        inf_temp_base_c.append(0)
        if height >= 24*dist_factor and apply_T3 :
            inf_temp_base_c.append(Tc3)
        else :
            inf_temp_base_c.append(0)
    
    ## Temperature Inflection Point_Composite
    ## Slab
    t_h = -slab_thick
    if t_h < inf_point_base[0] and t_h >= inf_point_base[1] :
        t_th = (inf_temp_base_h[1]-inf_temp_base_h[0])/(inf_point_base[1]-inf_point_base[0])*(t_h-inf_point_base[0])+inf_temp_base_h[0]
        t_tc = (inf_temp_base_c[1]-inf_temp_base_c[0])/(inf_point_base[1]-inf_point_base[0])*(t_h-inf_point_base[0])+inf_temp_base_c[0]
    elif t_h < inf_point_base[1] and t_h >= inf_point_base[2] :
        t_th = (inf_temp_base_h[2]-inf_temp_base_h[1])/(inf_point_base[2]-inf_point_base[1])*(t_h-inf_point_base[1])+inf_temp_base_h[1]
        t_tc = (inf_temp_base_c[2]-inf_temp_base_c[1])/(inf_point_base[2]-inf_point_base[1])*(t_h-inf_point_base[1])+inf_temp_base_c[1]
    else :
        t_th = 0
        t_tc = 0
    ## Inflection Point
    inf_point_comp = [0]
    if t_h <= inf_point_base[2] :
        inf_point_comp.append(inf_point_base[1])
        inf_point_comp.append(inf_point_base[2])
        inf_point_comp.append(inf_point_comp[-1])
        inf_point_comp.append(-height)
    elif t_h <= inf_point_base[1] and t_h > inf_point_base[2] :
        inf_point_comp.append(inf_point_base[1])
        inf_point_comp.append(t_h)
        inf_point_comp.append(inf_point_comp[-1])
        inf_point_comp.append(-height)
    elif t_h <= inf_point_base[0] and t_h > inf_point_base[1] :
        inf_point_comp.append(t_h)
        inf_point_comp.append(t_h)
        inf_point_comp.append(inf_point_comp[-1])
        inf_point_comp.append(-height)
    ## Inflection Temperature_Heating
    inf_temp_comp_h = [inf_temp_base_h[0]]
    inf_temp_comp_c = [inf_temp_base_c[0]]
    if t_h <= inf_point_base[2] :
        inf_temp_comp_h.append(inf_temp_base_h[1])
        inf_temp_comp_h.append(inf_temp_base_h[2])
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_c.append(inf_temp_base_c[1])
        inf_temp_comp_c.append(inf_temp_base_c[2])
        inf_temp_comp_c.append(inf_temp_comp_c[-1])
        inf_temp_comp_c.append(inf_temp_comp_c[-1])
    elif t_h <= inf_point_base[1] and t_h > inf_point_base[2] :
        inf_temp_comp_h.append(inf_temp_base_h[1])
        inf_temp_comp_h.append(t_th)
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_c.append(inf_temp_base_c[1])
        inf_temp_comp_c.append(t_tc)
        inf_temp_comp_c.append(inf_temp_comp_c[-1])
        inf_temp_comp_c.append(inf_temp_comp_c[-1])
    elif t_h <= inf_point_base[0] and t_h > inf_point_base[1] :
        inf_temp_comp_h.append(t_th)
        inf_temp_comp_h.append(t_th)
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_h.append(inf_temp_comp_h[-1])
        inf_temp_comp_c.append(t_tc)
        inf_temp_comp_c.append(t_tc)
        inf_temp_comp_c.append(inf_temp_comp_c[-1])
        inf_temp_comp_c.append(inf_temp_comp_c[-1])

    inf_point = [0]
    inf_temp_h = []
    inf_temp_c = []
    if dist in ["MM", "CM", "M"] :
        ## Convert dimension
        if dist == "MM" :
            dist_factor = 1
        elif dist == "CM" :
            dist_factor = 1 / 10
        elif dist == "M" :
            dist_factor = 1 / 1000
        else :
            return "Invalid Unit"
        ## Final
        if type == "Concrete" :
            inf_point.append(inf_point_base[1])
            inf_temp_h.append(inf_temp_base_h[0])
            inf_temp_h.append(inf_temp_base_h[1])
            inf_temp_c.append(inf_temp_base_c[0])
            inf_temp_c.append(inf_temp_base_c[1])
            if height > 100 * dist_factor :
                inf_point.append(inf_point_base[2])
                inf_temp_h.append(inf_temp_base_h[2])
                inf_temp_c.append(inf_temp_base_c[2])
            if height >= 600 * dist_factor and apply_T3 :
                inf_point.append(inf_point_base[3])
                inf_point.append(inf_point_base[4])
                inf_temp_h.append(inf_temp_base_h[3])
                inf_temp_h.append(inf_temp_base_h[4])
                inf_temp_c.append(inf_temp_base_c[3])
                inf_temp_c.append(inf_temp_base_c[4])
        elif type == "Steel" :
            inf_point.append(inf_point_comp[1])
            inf_point.append(inf_point_comp[2])
            inf_point.append(inf_point_comp[3])
            inf_point.append(inf_point_comp[4])
            inf_temp_h.append(inf_temp_comp_h[0])
            inf_temp_h.append(inf_temp_comp_h[1])
            inf_temp_h.append(inf_temp_comp_h[2])
            inf_temp_h.append(inf_temp_comp_h[3])
            inf_temp_h.append(inf_temp_comp_h[4])
            inf_temp_c.append(inf_temp_comp_c[0])
            inf_temp_c.append(inf_temp_comp_c[1])
            inf_temp_c.append(inf_temp_comp_c[2])
            inf_temp_c.append(inf_temp_comp_c[3])
            inf_temp_c.append(inf_temp_comp_c[4])

    elif dist in ["FT", "IN"] :
        ## Convert dimension
        if dist == "IN" :
            dist_factor = 1
        elif dist == "FT" :
            dist_factor = 1 / 12
        else :
            return "Invalid Unit"
        ## Final
        if type == "Concrete" :
            inf_point.append(inf_point_base[1])
            inf_temp_h.append(inf_temp_base_h[0])
            inf_temp_h.append(inf_temp_base_h[1])
            inf_temp_c.append(inf_temp_base_c[0])
            inf_temp_c.append(inf_temp_base_c[1])
            if height > 4 * dist_factor :
                inf_point.append(inf_point_base[2])
                inf_temp_h.append(inf_temp_base_h[2])
                inf_temp_c.append(inf_temp_base_c[2])
            if height >= 24 * dist_factor and apply_T3 :
                inf_point.append(inf_point_base[3])
                inf_point.append(inf_point_base[4])
                inf_temp_h.append(inf_temp_base_h[3])
                inf_temp_h.append(inf_temp_base_h[4])
                inf_temp_c.append(inf_temp_base_c[3])
                inf_temp_c.append(inf_temp_base_c[4])
        elif type == "Steel" :
            inf_point.append(inf_point_comp[1])
            inf_point.append(inf_point_comp[2])
            inf_point.append(inf_point_comp[3])
            inf_point.append(inf_point_comp[4])
            inf_temp_h.append(inf_temp_comp_h[0])
            inf_temp_h.append(inf_temp_comp_h[1])
            inf_temp_h.append(inf_temp_comp_h[2])
            inf_temp_h.append(inf_temp_comp_h[3])
            inf_temp_h.append(inf_temp_comp_h[4])
            inf_temp_c.append(inf_temp_comp_c[0])
            inf_temp_c.append(inf_temp_comp_c[1])
            inf_temp_c.append(inf_temp_comp_c[2])
            inf_temp_c.append(inf_temp_comp_c[3])
            inf_temp_c.append(inf_temp_comp_c[4])

    return inf_point, inf_temp_h, inf_temp_c