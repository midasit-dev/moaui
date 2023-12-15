
def available_section_type(res_sect):
    id_list = list(res_sect.keys())
    sect_type = [value["SECTTYPE"] for value in res_sect.values()]
    sect_shape = [value["SECT_BEFORE"]["SHAPE"] for value in res_sect.values()]
    
    psc_shape = ["1CEL", "2CEL", "3CEL", "PSCI", "PSCH", "PSCT", "PSCM", "PSCB"]
    compoiste_shape = ["B", "I", "Tub", "GB", "GI", "GT", "CI", "CT", "VALU", "PC"]

    available_id = []
    available_name = []
    for index, value in enumerate(sect_type):
        if value == "PSC":
            if sect_shape[index] in psc_shape:
                available_id.append(id_list[index])
                available_name.append(res_sect[id_list[index]]["SECT_NAME"])
        elif value == "COMPOSITE":
            if sect_shape[index] in compoiste_shape:
                available_id.append(id_list[index])
                available_name.append(res_sect[id_list[index]]["SECT_NAME"])

    if len(available_id) == 0:
        return "No available section"

    return available_id, available_name

def available_material_type(res_matl):
    id_list = list(res_matl.keys())
    matl_type = [value["TYPE"] for value in res_matl.values()]

    available_id = []
    available_name = []
    for index, value in enumerate(matl_type):
        if value == "STEEL" or value == "CONC" or value == "USER":
            available_id.append(id_list[index])
            available_name.append(res_matl[id_list[index]]["NAME"])
    
    if len(available_id) == 0:
        return "No available material"
    
    return available_id, available_name

def get_girder_type(girder_type, girder_shape):
    if girder_type == "PSC":
        return "Concrete"
    elif girder_type == "COMPOSITE":
        steel_shapes = ["B", "I", "Tub", "GB", "GI", "GT"]
        if girder_shape in steel_shapes:
            return "Steel"
        else:
            return "Concrete"
    
def get_material_prop(units, matl):
    steel_type1_list = [
        "KSCE-LSD15(S)",
        "KS10-Civil(S)",
        "KS08-Civil(S)",
        "KS-Civil(S)",
        "KS22(S)",
        "KS18(S)",
        "KS16(S)",
        "KS09(S)",
        "KS08(S)",
        "KS(S)",
        "CSA(S)",
        "JIS(S)",
        "JIS-Civil(S)",
        "GB 50917-13(S)",
        "GB12(S)",
        "GB03(S)",
        "GB(S)",
        "GB50018-02(S)",
        "TB10092-17(S)",
        "JGJ2015(S)",
        "JGJ(S)",
        "JTJ023-85(S)",
        "JTJ(S)",
        "JTG D64-2015(S)",
        "JTG3362-18(S)",
        "JTG04(S)",
        "TB05(S)",
        "BS04(S)",
        "BS(S)",
        "DIN(S)",
        "EN05(S)",
        "EN05-PS(S)",
        "EN05-SW(S)",
        "EN(S)",
        "UNI(S)",
        "GOST-SP(S)",
        "GOST-SNIP(S)",
        "IS(S)",
        "BC1:12-ASTM(S)",
        "BC1:12-BS EN(S)",
        "BC1:12-JIS(S)",
        "BC1:12-GB(S)",
        "BC1:12-Class2(S)",
        "BC1:12-Class3(S)",
    ]
    steel_type2_list = [
        "ASTM09(S)",
        "ASTM(S)",
        "AS/NZS 3678(S)",
        "AS/NZS 3679.1(S)",
        "AS/NZS 4672.1(S)"
    ]

    conc_type1_list = [
        "KSCE-LSD15(RC)",
        "KS01-Civil(RC)",
        "KS-Civil(RC)",
        "KS19(RC)",
        "KS01(RC)",
        "KS(RC)",
        "U.S.C(SI)(RC)",
        "CSA(RC)",
        "JIS(RC)",
        "JIS-Civil(RC)",
        "JTJ023-85(RC)",
        "Q/CR 9300-18(RC)",
        "GB 50917-13(RC)",
        "GB10(RC)",
        "GB(RC)",
        "GB-Civil(RC)",
        "TB10092-17(RC)",
        "JTG3362-18(RC)",
        "JTG04(RC)",
        "TB05(RC)",
        "BS(RC)",
        "EN04(RC)",
        "EN(RC)",
        "NTC08(RC)",
        "NTC12(RC)",
        "NTC18(RC)",
        "UNI(RC)",
        "SS(RC)",
        "GOST-SP(RC)",
        "GOST-SNIP(RC)",
        "IS(RC)",
        "AS17(RC)"
    ]
    conc_type2_list = [
        "ASTM19(RC)",
        "ASTM(RC)",
        "U.S.C(US)(RC)",
        "NMX NTC-2018(RC)"
    ]
    conc_type3_list = [
        "CNS560-18(RC)",
        "CNS560(RC)",
        "CNS(RC)"
    ]

    temp_unit = units[1]["TEMPER"]

    if "THERMAL" in matl["PARAM"][0]:
        thermal = matl["PARAM"][0]["THERMAL"]
    else:
        standard = matl["PARAM"][0]["STANDARD"]
        db = matl["PARAM"][0]["DB"]
        if matl["TYPE"] == "STEEL":
            if standard in steel_type1_list:
                thermal = 0.0000120 if temp_unit == "C" else 0.0000066667
            elif standard in steel_type2_list:
                thermal = 0.0000117 if temp_unit == "C" else 0.0000065000
            elif standard == "Q/CR 9300-18(S)": 
                if db in ["Q235q", "Q345q", "Q370q", "Q420q", "Q500q"]:
                    thermal = 0.0000118 if temp_unit == "C" else 0.0000065556
                else:
                    thermal = 0.0000120 if temp_unit == "C" else 0.0000066667
            elif standard == "CNS06(S)":
                thermal = 0.0000110 if temp_unit == "C" else 0.0000061111
            elif standard == "CNS(S)":
                if db == "SUS304":
                    thermal = 0.0000178 if temp_unit == "C" else 0.0000098889
                else:
                    thermal = 0.0000110 if temp_unit == "C" else 0.0000061111
            else:
                thermal = 0.0000120 if temp_unit == "C" else 0.0000066667
        elif matl["TYPE"] == "CONC":
            if standard in conc_type1_list:
                thermal = 0.000010 if temp_unit == "C" else 0.0000055556
            elif standard in conc_type2_list:
                thermal = 0.000009 if temp_unit == "C" else 0.0000050000
            elif standard in conc_type3_list:
                thermal = 0.000011 if temp_unit == "C" else 0.0000061111
            elif standard in ["IRC(RC)", "TMH7(RC)"]:
                thermal = 0.000012 if temp_unit == "C" else 0.0000066667
            elif standard == "IRS(RC)":
                thermal = 0.0000117 if temp_unit == "C" else 0.0000065000

    elast = matl["PARAM"][0]["ELAST"]
    
    return elast, thermal

def available_beam_elem(elem, res_elem):
    for i in range(len(elem)):
        if res_elem[elem[i]]["TYPE"] != "BEAM":
            return False

def available_btmp_sect(elem, res_elem, section_key):
    for i in range(len(elem)):
        if res_elem[elem[i]]["SECT"] != section_key:
            return False

def create_btmp_input(res_btmp, elem, stld_name_heat, stld_name_cool, inf_point, inf_temp_h, inf_temp_c):
    
    start_id = []
    if res_btmp == None:
        start_id = [1]*len(elem)
    else:
        for index, value in enumerate(elem):
            if value in res_btmp.keys():
                id_list = [item["ID"] for item in res_btmp[value]["ITEMS"]]
                start_id.append(max(id_list) + 1)
            else:
                start_id.append(1)

    btmp_data_heat = {}
    btmp_data_cool = {}
    for index, value in enumerate(elem):

        vSECTTMP_Heat = []
        vSECTTMP_Cool = []
        for j in range(len(inf_point)-1):
            if (inf_temp_h[j] == 0 and inf_temp_h[j+1] == 0) or (inf_point[j] == inf_point[j+1]):
                pass
            else:
                vSECTTMP_Heat.append({
                    "TYPE" : "ELEMENT",
                    "REF": 0,
                    "OPT_B": 0,
                    "OPT_H1": 3,
                    "VAL_H1": abs(inf_point[j]),
                    "OPT_H2": 3,
                    "VAL_H2": abs(inf_point[j+1]),
                    "VAL_T1": inf_temp_h[j],
                    "VAL_T2": inf_temp_h[j+1]
                })
            if (inf_temp_c[j] == 0 and inf_temp_c[j+1] == 0)  or (inf_point[j] == inf_point[j+1]) :
                pass
            else:
                vSECTTMP_Cool.append({
                    "TYPE" : "ELEMENT",
                    "REF": 0,
                    "OPT_B": 0,
                    "OPT_H1": 3,
                    "VAL_H1": abs(inf_point[j]),
                    "OPT_H2": 3,
                    "VAL_H2": abs(inf_point[j+1]),
                    "VAL_T1": inf_temp_c[j],
                    "VAL_T2": inf_temp_c[j+1]
                })

        btmp_data_heat[value] = {
            "ITEMS": [
                {
                    "ID": start_id[index],
                    "LCNAME": stld_name_heat,
                    "DIR": "LZ",
                    "REF": "Top",
                    "NUM": len(vSECTTMP_Heat),
                    "bPSC": True,
                    "vSECTTMP": vSECTTMP_Heat
                }
            ]
        }
        btmp_data_cool[value] = {
            "ITEMS": [
                {
                    "ID": start_id[index]+1,
                    "LCNAME": stld_name_cool,
                    "DIR": "LZ",
                    "REF": "Top",
                    "NUM": len(vSECTTMP_Cool),
                    "bPSC": True,
                    "vSECTTMP": vSECTTMP_Cool
                }
            ]
        }
    
    return btmp_data_heat, btmp_data_cool