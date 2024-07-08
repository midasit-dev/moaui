from collections import defaultdict
import math

def available_section_information(res_sect) :
    res_sect_key = list(res_sect.keys())
    sec_key = []
    sec_name = []
    sec_type = []
    sec_shape = []
    sec_size = []
    sec_joint = []
    sec_opt1 = []
    sec_opt2 = []
    sec_slab = []
    sec_ref =[]
    sec_elast =[]
    sec_thermal = []
    for i in range(len(res_sect_key)) :
        temp_sec_info = res_sect[res_sect_key[i]]
        if  temp_sec_info["SECTTYPE"] == "PSC" or temp_sec_info["SECTTYPE"] == "COMPOSITE":
            sec_key.append(res_sect_key[i])
            sec_name.append(temp_sec_info.get("SECT_NAME", None))
            sec_type.append(temp_sec_info.get("SECTTYPE", None))
            sec_shape.append(temp_sec_info["SECT_BEFORE"].get("SHAPE", None))
            sec_size.append(temp_sec_info["SECT_BEFORE"].get("SECT_I", None))
            sec_joint.append(temp_sec_info["SECT_BEFORE"].get("JOINT", None))
            sec_opt1.append(temp_sec_info["SECT_BEFORE"].get("PSC_OPT1", None))
            sec_opt2.append(temp_sec_info["SECT_BEFORE"].get("PSC_OPT2", None))
            sec_elast.append(temp_sec_info["SECT_BEFORE"].get("MATL_ELAST", None))
            sec_thermal.append(temp_sec_info["SECT_BEFORE"].get("MATL_THERMAL", None))
            if temp_sec_info["SECTTYPE"] == "COMPOSITE" and (temp_sec_info["SECT_BEFORE"]["SHAPE"] in ["B", "I", "Tub", "CI", "CT"]) :
                sec_slab.append(temp_sec_info["SECT_AFTER"]["SLAB"])
                sec_ref.append(None)
            elif temp_sec_info["SECTTYPE"] == "COMPOSITE" and (temp_sec_info["SECT_BEFORE"]["SHAPE"] in ["GB", "GI", "GT"]) :
                sec_slab.append(temp_sec_info["SECT_AFTER"]["SLAB"])
                sec_ref.append(temp_sec_info["SECT_AFTER"]["SECT_I"]["vSIZE"])
            elif temp_sec_info["SECTTYPE"] == "COMPOSITE" and (temp_sec_info["SECT_BEFORE"]["SHAPE"] == "PC") :
                sec_slab.append(temp_sec_info["SECT_AFTER"]["SECT_J"]["vSIZE"])
                sec_ref.append(None)
            else :
                sec_slab.append(None)
                sec_ref.append(None)
    # Return
    sec_info = defaultdict(list)
    sec_info["key"] = sec_key
    sec_info["name"] = sec_name
    sec_info["type"] = sec_type
    sec_info["shape"] = sec_shape
    sec_info["size"] = sec_size
    sec_info["joint"] = sec_joint
    sec_info["opt1"] = sec_opt1
    sec_info["opt2"] = sec_opt2
    sec_info["slab"] = sec_slab
    sec_info["ref"] = sec_ref
    sec_info["elast"] = sec_elast
    sec_info["thermal"] = sec_thermal
    return sec_info

def section_coordinates(size, slab, joint, type, shape, opt1, opt2, refSize) :
    # Size
    if type == "PSC" and (shape in ["1CEL", "2CEL", "3CEL", "PSCI", "PSCT", "PSCH", "PSCM", "PSCB"]):
        vSizeA = size["vSIZE_PSC_A"]
        vSizeB = size["vSIZE_PSC_B"]
        vSizeC = size["vSIZE_PSC_C"]
        vSizeD = size["vSIZE_PSC_D"]
    elif (type == "PSC" and shape == "VALU") or (type == "COMPOSITE" and shape == "PC") :
        outer_polygon = size["OUTER_POLYGON"]
        if "INNER_POLYGON" in size :
            inner_polygon = size["INNER_POLYGON"]
        else :
            inner_polygon = None
    elif type == "COMPOSITE" and (shape in ["B", "I", "Tub", "GB", "GI", "GT"]) :
        vSize = size["vSIZE"]
    elif type == "COMPOSITE" and (shape in ["CI", "CT"]) :
        vSizeA = size["vSIZE_PSC_A"]
        vSizeB = size["vSIZE_PSC_B"]
        vSizeC = size["vSIZE_PSC_C"]
        vSizeD = size["vSIZE_PSC_D"]
    # Cacluations Coordinates
    if shape == "1CEL":
        result = psc1cell(vSizeA, vSizeB, vSizeC, vSizeD, joint)
    elif shape == "2CEL":
        result = psc2cell(vSizeA, vSizeB, vSizeC, vSizeD, joint)
    elif shape == "3CEL":
        result = psc3cell(vSizeA, vSizeB, vSizeC, vSizeD, joint)
    elif shape == "PSCI":
        result = pscI(vSizeA, vSizeB, vSizeC, vSizeD, joint)
    elif shape == "PSCT":
        result = pscTee(vSizeA, vSizeB, vSizeC, vSizeD, joint)
    elif shape == "PSCH":
        result = pscHalf(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2)
    elif shape == "PSCM":
        result = pscMid(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2)
    elif shape == "PSCB":
        result = pscPlat(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2)
    elif shape == "VALU" :
        result = pscValu(outer_polygon, inner_polygon)
    elif shape == "B":
        result = compositeSteelBox(vSize, slab)
    elif shape == "I":
        result = compositeSteelI(vSize, slab)
    elif shape == "Tub":
        result = compositeSteelTub(vSize, slab)
    elif shape == "GB":
        result = compositeSteelGBox(vSize, slab, refSize)
    elif shape == "GI":
        result = compositeSteelGI(vSize, slab, refSize)
    elif shape == "GT":
        result = compositeSteelGTub(vSize, slab, refSize)
    elif shape == "CI":
        result = compositeI(vSizeA, vSizeB, vSizeC, vSizeD, joint, slab)
    elif shape == "CT":
        result = compositeTee(vSizeA, vSizeB, vSizeC, vSizeD, joint, slab)
    elif shape == "PC" :
        result = compositePC(outer_polygon, inner_polygon, slab)
    else:
        print("Please Select PSC or Compoiste")
    return result 

def psc1cell(vSizeA, vSizeB, vSizeC, vSizeD, joint):
    # Variable Initialization
    HO10, HO20, HO21, HO22, HO30, HO31 = vSizeA
    BO10, BO11, BO12, BO20, BO21, BO30 = vSizeB
    HI10, HI20, HI21, HI22, HI30, HI31, HI40, HI41, HI42, HI50 = vSizeC
    BI10, BI11, BI12, BI21, BI30, BI31, BI32, _ = vSizeD
    JO1, JO2, JO3, JI1, JI2, JI3, JI4, JI5 = joint
    # Height Calculation
    heightO = HO10 + HO20 + HO30
    heightI = HI10 + HI20 + HI30 + HI40 + HI50
    heightM = max(heightO, heightI)
    # Outer Cell_Left Side
    ycol = [0]
    zcol = [heightI - heightM]
    ycol.append(-(BO10 + BO20 + BO30))
    zcol.append(heightO - heightM)
    ycol.append(ycol[1])
    zcol.append(zcol[1] - HO10)
    ycol.append(ycol[2] + BO10)
    zcol.append(zcol[2] - HO20)
    ycol.append(ycol[3] + BO20)
    zcol.append(zcol[3] - HO30)
    ycol.append(ycol[4] + BO30)
    zcol.append(zcol[4])
    # Added Vertex
    addedVertex = 0
    # Outer joint 1
    if JO1:
        ycol.insert(3, ycol[2] + BO11)
        zcol.insert(3, zcol[2] - HO21)
        addedVertex += 1
    # Outer joint 2
    if JO2:
        ycol.insert(3 + addedVertex, ycol[2] + BO12)
        zcol.insert(3 + addedVertex, zcol[2] - HO22)
        addedVertex += 1
    # Outer joint 3
    if JO3:
        ycol.insert(4 + addedVertex, ycol[4 + addedVertex] - BO21)
        zcol.insert(4 + addedVertex, zcol[4 + addedVertex] + HO31)
        addedVertex += 1
    # Inner Cell
    ycil = [ycol[0], ycol[0] - BI10, ycol[-1] - BI30, ycol[-1]]
    zcil = [zcol[0] - HI10, zcol[0] - HI10 - HI20,  zcol[0] - HI10 - HI20 - HI30, zcol[0] - HI10 - HI20 - HI30 - HI40]
    # Added Vertex
    addedVertex = 0
    # Inner joint 1
    if JI1:
        ycil.insert(1, ycil[0] - BI11)
        zcil.insert(1, zcil[0] - HI21)
        addedVertex += 1
    # Inner joint 2
    if JI2:
        ycil.insert(1 + addedVertex, ycil[0] - BI12)
        zcil.insert(1 + addedVertex, zcil[0] - HI22)
        addedVertex += 1
    # Inner joint 3
    if JI3:
        ycil.insert(2 + addedVertex, ycil[3 + addedVertex] - BI21)
        zcil.insert(2 + addedVertex, zcil[1 + addedVertex] - HI31)
        addedVertex += 1
    # Inner joint 4
    if JI4:
        ycil.insert(3 + addedVertex, ycil[-1] - BI32)
        zcil.insert(3 + addedVertex, zcil[-1] + HI42)
        addedVertex += 1
    # Inner joint 5
    if JI5:
        ycil.insert(3 + addedVertex, ycil[-1] - BI31)
        zcil.insert(3 + addedVertex, zcil[-1] + HI41)
        addedVertex += 1
    # Outer Cell_Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Inner Cell_Right Side
    ycir = [-x for x in ycil]
    zcir = zcil.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    ycil.reverse()
    zcil.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    ycil.pop(0)
    zcil.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    yciAll = ycir + ycil
    zciAll = zcir + zcil
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    inner[0] = yciAll
    inner[1] = zciAll
    return outer, inner, comp

def psc2cell(vSizeA, vSizeB, vSizeC, vSizeD, joint):
    # Variable Initialization
    HO10, HO20, HO21, HO22, HO30, HO31 = vSizeA
    BO10, BO11, BO12, BO20, BO21, BO30 = vSizeB
    HI10, HI20, HI21, HI22, HI30, HI31, HI40, HI41, HI42, HI50 = vSizeC
    BI10, BI11, BI12, BI21, BI30, BI31, BI32, BI40 = vSizeD
    JO1, JO2, JO3, JI1, JI2, JI3, JI4, JI5 = joint
    # Height Calculation
    heightO = HO10 + HO20 + HO30
    heightI = HI10 + HI20 + HI30 + HI40 + HI50
    heightM = max(heightO, heightI)
    # Outer Cell_Left Side
    ycol = [0]
    zcol = [heightI - heightM]
    ycol.append(-(BO10 + BO20 + BO30))
    zcol.append(heightO - heightM)
    ycol.append(ycol[1])
    zcol.append(zcol[1] - HO10)
    ycol.append(ycol[2] + BO10)
    zcol.append(zcol[2] - HO20)
    ycol.append(ycol[3] + BO20)
    zcol.append(zcol[3] - HO30)
    ycol.append(ycol[4] + BO30)
    zcol.append(zcol[4])
    # Added Vertex
    addedVertex = 0
    # Outer joint 1
    if JO1:
        ycol.insert(3, ycol[2] + BO11)
        zcol.insert(3, zcol[2] - HO21)
        addedVertex += 1
    # Outer joint 2
    if JO2:
        ycol.insert(3 + addedVertex, ycol[2] + BO12)
        zcol.insert(3 + addedVertex, zcol[2] - HO22)
        addedVertex += 1
    # Outer joint 3
    if JO3:
        ycol.insert(4 + addedVertex, ycol[4 + addedVertex] - BO21)
        zcol.insert(4 + addedVertex, zcol[4 + addedVertex] + HO31)
        addedVertex += 1
    # Inner Cell
    ycill = [ycol[0] - BI40, ycol[0] - BI10, ycol[-1] - BI30, ycol[-1] - BI40]
    zcill = [zcol[0] - HI10, zcol[0] - HI10 - HI20, zcol[0] - HI10 - HI20 - HI30, zcol[-1] + HI50]
    # Added Vertex
    addedVertex = 0
    # Inner joint 1
    if JI1:
        ycill.insert(1, ycol[0] - BI11)
        zcill.insert(1, zcill[0] - HI21)
        addedVertex += 1
    # Inner joint 2
    if JI2:
        ycill.insert(1 + addedVertex, ycol[0] - BI12)
        zcill.insert(1 + addedVertex, zcill[0] - HI22)
        addedVertex += 1
    # Inner joint 3
    if JI3:
        ycill.insert(2 + addedVertex, ycol[0] - BI21)
        zcill.insert(2 + addedVertex, zcill[1 + addedVertex] - HI31)
        addedVertex += 1
    # Inner joint 4
    if JI4:
        ycill.insert(3 + addedVertex, ycol[0] - BI32)
        zcill.insert(3 + addedVertex, zcill[-1] + HI42)
        addedVertex += 1
    # Inner joint 5
    if JI5:
        ycill.insert(3 + addedVertex, ycol[0] - BI31)
        zcill.insert(3 + addedVertex, zcill[-1] + HI41)
        addedVertex += 1
    # Left Inner Cell_Right Side
    ycilr = [ycill[0], ycill[-1]]
    zcilr = [zcill[0], zcill[-1]]
    # Outer Cell_Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Right Inner Cell_Left Side
    ycirl = [-x for x in ycilr]
    zcirl = zcilr.copy()
    # Right Inner Cell_Right Side
    ycirr = [-x for x in ycill]
    zcirr = zcill.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    ycill.reverse()
    zcill.reverse()
    ycirl.reverse()
    zcirl.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    ycill.pop(0)
    zcill.pop(0)
    ycirl.pop(0)
    zcirl.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    ycilAll = ycilr + ycill
    zcilAll = zcilr + zcill
    ycirAll = ycirr + ycirl
    zcirAll = zcirr + zcirl
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    inner[0] = ycilAll
    inner[1] = zcilAll
    inner[2] = ycirAll
    inner[3] = zcirAll
    return outer, inner, comp

def psc3cell(vSizeA, vSizeB, vSizeC, vSizeD, joint) :
    # Variable Initialization
    HI10, HI20, HI30, HI40, HI50, HI60, HI70, HI80, HI90, HI100 = vSizeA
    BI10, BI20, BI30, BI40, BI50, BI60, BI70, HO10, HO20, BO10, BO20, BO30 = vSizeB
    HO21, HO22, HI21, HI22, HI42, HI41, HI61, HI62, HI63, HI91, HI92, HI81, HI82 = vSizeC
    BO21, BO22, BI11, BI12, BI41, BI42, BI31, BI32, BI33, BI71, BI72, BI61, BI62 = vSizeD
    JI1, JI2, JI3, JI4, JI5, JI6, JI7, JI8, JI9, JI10, JI11, JO1, JO2 = joint
    # Height Calculation
    heightO = HO10 + HO20
    heightI = HI10 + HI20 + HI30 + HI40 + HI50
    heightM = max(heightO, heightI)
    # Outer Cell_Left Side
    ycol = [0]
    zcol = [heightI - heightM]
    ycol.append(-(BO10 + BO20) + BO30)
    zcol.append(heightO - heightM)
    ycol.append(ycol[1] - BO30)
    zcol.append(zcol[1] - HO10)
    ycol.append(ycol[2] + BO20)
    zcol.append(zcol[2] - HO20)
    ycol.append(ycol[3] + BO10)
    zcol.append(zcol[3])
    # Added Vertex
    addedVertex = 0
    # Outer joint 1
    if JO1:
        ycol.insert(3, ycol[3] - BO21)
        zcol.insert(3, zcol[3] + HO21)
        addedVertex += 1
    # Outer joint 2
    if JO2:
        ycol.insert(3 + addedVertex, ycol[3 + addedVertex] - BO22)
        zcol.insert(3 + addedVertex, zcol[3 + addedVertex] + HO22)
        addedVertex += 1
    # Left Inner Cell_Left Side
    ycill = [-(BI10 + BI20 + BI30), -(BI40 + BI50 + BI60 + BI70), -(BI40 + BI50 + BI60)]
    zcill = [(HI60 + HI70 + HI80) - heightM, (HI90 + HI100) - heightM, HI100 - heightM]
    # Added Vertex
    addedVertex = 0
    # Inner joint 8
    if JI8:
        ycill.insert(2, ycill[2] - BI71)
        zcill.insert(2, zcill[2] + HI91)
        addedVertex += 1
    # Inner joint 9
    if JI9:
        ycill.insert(2 + addedVertex, ycill[2 + addedVertex] - BI72)
        zcill.insert(2 + addedVertex, zcill[2 + addedVertex] + HI92)
        addedVertex += 1
    # Left Inner Cell_Right Side
    ycilr = [-(BI10 + BI20 + BI30), -(BI10 + BI20), -(BI40 + BI50), -(BI40 + BI50 + BI60)]
    zcilr = [(HI60 + HI70 + HI80) - heightM, (HI70 + HI80) - heightM, HI80 - heightM, HI100 - heightM]
    # Added Vertex
    addedVertex = 0
    # Inner joint 7
    if JI7:
        ycilr.insert(1, ycilr[1] - BI33)
        zcilr.insert(1, zcilr[1] + HI63)
        addedVertex += 1
    # Inner joint 6
    if JI6:
        ycilr.insert(1 + addedVertex, ycilr[1 + addedVertex] - BI32)
        zcilr.insert(1 + addedVertex, zcilr[1 + addedVertex] + HI62)
        addedVertex += 1
    # Inner joint 5
    if JI5:
        ycilr.insert(1 + addedVertex, ycilr[1 + addedVertex] - BI31)
        zcilr.insert(1 + addedVertex, zcilr[1 + addedVertex] + HI61)
        addedVertex += 1
    # Added Vertex
    addedVertex2 = 0
    # Inner joint 11
    if JI11:
        ycilr.insert(3 + addedVertex, ycilr[2 + addedVertex] - BI62)
        zcilr.insert(3 + addedVertex, zcilr[2 + addedVertex] - HI82)
        addedVertex2 += 1
    # Inner joint 10
    if JI10:
        ycilr.insert(3 + addedVertex + addedVertex2, ycilr[2 + addedVertex] - BI61)
        zcilr.insert(3 + addedVertex + addedVertex2, zcilr[2 + addedVertex] - HI81)
        addedVertex2 += 1
    # Middle Inner Cell_Left Side
    yciml = [0, -BI10, -BI40, 0]
    zciml = [(HI20 + HI30 + HI40 + HI50) - heightM, (HI30 + HI40 + HI50) - heightM, (HI40 + HI50) - heightM, HI50 - heightM]
    # Added Vertex
    addedVertex = 0
    # Inner joint 1
    if JI1:
        yciml.insert(1, yciml[0] - BI11)
        zciml.insert(1, zciml[0] - HI21)
        addedVertex += 1
    # Inner joint 2
    if JI2:
        yciml.insert(1 + addedVertex, yciml[0] - BI12)
        zciml.insert(1 + addedVertex, zciml[0] - HI22)
        addedVertex += 1
    # Added Vertex
    addedVertex2 = 0
    # Inner joint 3
    if JI3:
        yciml.insert(3 + addedVertex, yciml[3 + addedVertex] - BI41)
        zciml.insert(3 + addedVertex, zciml[3 + addedVertex] + HI41)
        addedVertex2 += 1
    # Inner joint 4
    if JI4:
        yciml.insert(3 + addedVertex + addedVertex2, yciml[3 + addedVertex + addedVertex2] - BI42)
        zciml.insert(3 + addedVertex + addedVertex2, zciml[3 + addedVertex + addedVertex2] + HI42)
        addedVertex2 += 1
    # Outer Cell_Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Right Inner Cell_Left Side
    ycirl = [-x for x in ycilr]
    zcirl = zcilr.copy()
    # Right Inner Cell_Right Side
    ycirr = [-x for x in ycill]
    zcirr = zcill.copy()
    # Middle Inner Cell_Right Side
    ycimr = [-x for x in yciml]
    zcimr = zciml.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    ycill.reverse()
    zcill.reverse()
    ycirl.reverse()
    zcirl.reverse()
    yciml.reverse()
    zciml.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    ycill.pop(0)
    zcill.pop(0)
    ycirl.pop(0)
    zcirl.pop(0)
    yciml.pop(0)
    zciml.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    ycilAll = ycilr + ycill
    zcilAll = zcilr + zcill
    ycirAll = ycirr + ycirl
    zcirAll = zcirr + zcirl
    ycimAll = ycimr + yciml
    zcimAll = zcimr + zciml
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    inner[0] = ycilAll
    inner[1] = zcilAll
    inner[2] = ycirAll
    inner[3] = zcirAll
    inner[4] = ycimAll
    inner[5] = zcimAll
    return outer, inner, comp

def pscI(vSizeA, vSizeB, vSizeC, vSizeD, joint) :
    # Variable Initialization
    H10, HL10, HL20, HL21, HL22, HL30, HL40, HL41, HL42, HL50 = vSizeA
    BL10, BL20, BL21, BL22, BL40, BL41, BL42 = vSizeB
    HR10, HR20, HR21, HR22, HR30, HR40, HR41, HR42, HR50 = vSizeC
    BR10, BR20, BR21, BR22, BR40, BR41, BR42 = vSizeD
    J1, JL1, JL2, JL3, JL4, JR1, JR2, JR3, JR4 = joint
    # Height Calculation
    heightL = HL10 + HL20 + HL30 + HL40 + HL50
    heightR = HR10 + HR20 + HR30 + HR40 + HR50
    heightC = 0
    if J1 :
        heightC = H10
    else :
        if heightR > heightL :
            heightC = BL20 * (heightR - heightL) / (BL20 + BR20) + heightL
        elif heightR < heightL :
            heightC = BR20 * (heightL - heightR) / (BL20 + BR20) + heightR
        elif heightR == heightL :
            heightC = (heightL + heightR) / 2
    heightM = max(heightL, heightR, heightC)
    # Outer Cell_Left Side
    ycol = [0]
    zcol = [heightC - heightM]
    ycol.append(-BL20)
    zcol.append(heightL - heightM)
    ycol.append(ycol[1])
    zcol.append(zcol[1] - HL10)
    ycol.append(-BL10)
    zcol.append(zcol[2] - HL20)
    ycol.append(ycol[3])
    zcol.append(zcol[3] - HL30)
    ycol.append(-BL40)
    zcol.append(zcol[4] - HL40)
    ycol.append(ycol[5])
    zcol.append(zcol[5] - HL50)
    ycol.append(0)
    zcol.append(-heightM)
    # Added Vertex
    addedVertex = 0
    # Left joint 1
    if JL1:
        ycol.insert(3, ycol[2] + BL21)
        zcol.insert(3, zcol[2] - HL21)
        addedVertex += 1
    # Left joint 2
    if JL2:
        ycol.insert(3 + addedVertex, ycol[2] + BL22)
        zcol.insert(3 + addedVertex, zcol[2] - HL22)
        addedVertex += 1
    # Left joint 3
    if JL3:
        ycol.insert(5 + addedVertex, ycol[5 + addedVertex] + BL42)
        zcol.insert(5 + addedVertex, zcol[5 + addedVertex] + HL42)
        addedVertex += 1
    # Left joint 4
    if JL4:
        ycol.insert(5 + addedVertex, ycol[5 + addedVertex] + BL41)
        zcol.insert(5 + addedVertex, zcol[5 + addedVertex] + HL41)
        addedVertex += 1
    # Outer Cell_Right Side
    ycor = [0]
    zcor = [heightC - heightM]
    ycor.append(BR20)
    zcor.append(heightR - heightM)
    ycor.append(ycor[1])
    zcor.append(zcor[1] - HR10)
    ycor.append(BR10)
    zcor.append(zcor[2] - HR20)
    ycor.append(ycor[3])
    zcor.append(zcor[3] - HR30)
    ycor.append(BR40)
    zcor.append(zcor[4] - HR40)
    ycor.append(ycor[5])
    zcor.append(zcor[5] - HR50)
    ycor.append(0)
    zcor.append(-heightM)
    # Added Vertex
    addedVertex = 0
    # Right joint 1
    if JR1:
        ycor.insert(3, ycor[2] - BR21)
        zcor.insert(3, zcor[2] - HR21)
        addedVertex += 1
    # Right joint 2
    if JR2:
        ycor.insert(3 + addedVertex, ycor[2] - BR22)
        zcor.insert(3 + addedVertex, zcor[2] - HR22)
        addedVertex += 1
    # Right joint 3
    if JR3:
        ycor.insert(5 + addedVertex, ycor[5 + addedVertex] - BR42)
        zcor.insert(5 + addedVertex, zcor[5 + addedVertex] + HR42)
        addedVertex += 1
    # Right joint 4
    if JR4:
        ycor.insert(5 + addedVertex, ycor[5 + addedVertex] - BR41)
        zcor.insert(5 + addedVertex, zcor[5 + addedVertex] + HR41)
        addedVertex += 1
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    return outer, inner, comp

def pscTee(vSizeA, vSizeB, vSizeC, vSizeD, joint) :
    # Variable Initialization
    H10, HL10, HL20, HL30, BL10, BL20, BL30, BL40 = vSizeA
    HL21, HL22, HL31, HL32, BL21, BL22, BL31, BL32 = vSizeB
    HR10, HR20, HR30, BR10, BR20, BR30, BR40 = vSizeC
    HR21, HR22, HR31, HR32, BR21, BR22, BR31, BR32 = vSizeD
    J1, JL1, JL2, JL3, JL4, JR1, JR2, JR3, JR4 = joint
    # Height Calculation
    heightL = HL10 + HL20 + HL30
    heightR = HR10 + HR20 + HR30
    heightC = 0
    if J1 :
        heightC = H10
    else :
        if heightR > heightL :
            heightC = BL40 * (heightR - heightL) / (BL40 + BR40) + heightL
        elif heightR < heightL :
            heightC = BR40 * (heightL - heightR) / (BL40 + BR40) + heightR
        elif heightR == heightL :
            heightC = (heightL + heightR) / 2
    heightM = max(heightL, heightR, heightC)
    # Outer Cell_Left Side
    ycol = [0]
    zcol = [heightC - heightM]
    ycol.append(-BL40)
    zcol.append(heightL - heightM)
    ycol.append(-(BL10 + BL20 + BL30)) 
    zcol.append(zcol[1] - HL10)
    ycol.append(-(BL10 + BL20))
    zcol.append(zcol[2] - HL20)
    ycol.append(-BL10)
    zcol.append(zcol[3] - HL30)
    ycol.append(0)
    zcol.append(-heightM)
    # Added Vertex
    addedVertex = 0
    # Left joint 1
    if JL1:
        ycol.insert(3, ycol[2] + BL31)
        zcol.insert(3, zcol[2] - HL21)
        addedVertex += 1
    # Left joint 2
    if JL2:
        ycol.insert(3 + addedVertex, ycol[2] + BL32)
        zcol.insert(3 + addedVertex, zcol[2] - HL22)
        addedVertex += 1
    # Left joint 3
    if JL3:
        ycol.insert(4 + addedVertex, ycol[4 + addedVertex] - BL21)
        zcol.insert(4 + addedVertex, zcol[4 + addedVertex] + HL31)
        addedVertex += 1
    # Left joint 4
    if JL4:
        ycol.insert(4 + addedVertex, ycol[4 + addedVertex] - BL22)
        zcol.insert(4 + addedVertex, zcol[4 + addedVertex] + HL32)
        addedVertex += 1
    # Outer Cell_Right Side
    ycor = [0]
    zcor = [heightC - heightM]
    ycor.append(BR40)
    zcor.append(heightR - heightM)
    ycor.append(BR10 + BR20 + BR30)
    zcor.append(zcor[1] - HR10)
    ycor.append(BR10 + BR20)
    zcor.append(zcor[2] - HR20)
    ycor.append(BR10)
    zcor.append(zcor[3] - HR30)
    ycor.append(0)
    zcor.append(-heightM)
    # Added Vertex
    addedVertex = 0
    # Right joint 1
    if JR1:
        ycor.insert(3, ycor[2] - BR31)
        zcor.insert(3, zcor[2] - HR21)
        addedVertex += 1
    # Right joint 2
    if JR2:
        ycor.insert(3 + addedVertex, ycor[2] - BR32)
        zcor.insert(3 + addedVertex, zcor[2] - HR22)
        addedVertex += 1
    # Right joint 3
    if JR3:
        ycor.insert(4 + addedVertex, ycor[4 + addedVertex] + BR21)
        zcor.insert(4 + addedVertex, zcor[4 + addedVertex] + HR31)
        addedVertex += 1
    # Right joint 4
    if JR4:
        ycor.insert(4 + addedVertex, ycor[4 + addedVertex] + BR22)
        zcor.insert(4 + addedVertex, zcor[4 + addedVertex] + HR32)
        addedVertex += 1
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    return outer, inner, comp

def pscHalf(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2) :
    # Variable Initialization
    HO10, HO20, HO21, HO22, HO30, HO31 = vSizeA
    BO10, BO11, BO12, BO20, BO21, BO30 = vSizeB
    HI10, HI20, HI21, HI22, HI30, HI31, HI40, HI41, HI42, HI50 = vSizeC
    BI10, BI11, BI12, BI21, BI30, BI31, BI32 = vSizeD
    JO1, JO2, JO3, JI1, JI2, JI3, JI4, JI5 = joint
    # Height Calculation
    xc_sign = 0
    if opt1 == "LEFT" :
        xc_sign = -1
    elif opt1 == "RIGHT" :
        xc_sign = 1
    heightO = HO10 + HO20 + HO30
    heightI = 0
    if opt2 == "POLYGON" :
        heightI = HI10 + HI20 + HI30 + HI40 + HI50
    elif opt2 == "CIRCLE" :
        heightI = HI10 + HI30 + HI50
    elif opt2 == "NONE" :
        heightI = HI10
    heightM = max(heightO, heightI) 
    # Outer Cell
    yco = [0]
    zco = [heightI - heightM]
    yco.append(xc_sign * (BO10 + BO20 + BO30))
    zco.append(heightO - heightM)
    yco.append(yco[1])
    zco.append(zco[1] - HO10)
    yco.append(yco[2] - xc_sign * BO10)
    zco.append(zco[2] - HO20)
    yco.append(yco[3] - xc_sign * BO20)
    zco.append(zco[3] - HO30)
    yco.append(yco[4] - xc_sign * BO30)
    zco.append(zco[4])
    # Added Vertex
    addedVertex = 0
    # Outer joint 1
    if JO1:
        yco.insert(3, yco[2] - xc_sign * BO11)
        zco.insert(3, zco[2] - HO21)
        addedVertex += 1
    # Outer joint 2
    if JO2:
        yco.insert(3 + addedVertex, yco[2] - xc_sign * BO12)
        zco.insert(3 + addedVertex, zco[2] - HO22)
        addedVertex += 1
    # Outer joint 3
    if JO3:
        yco.insert(4 + addedVertex, yco[4 + addedVertex] + xc_sign * BO21)
        zco.insert(4 + addedVertex, zco[4 + addedVertex] + HO31)
        addedVertex += 1
    # Inner Cell
    yci = []
    zci = []
    if opt2 == "POLYGON" :
        yci.append(yco[0])
        zci.append(zco[0] - HI10)
        yci.append(yci[0] + xc_sign * BI10)
        zci.append(zci[0] - HI20)
        yci.append(yco[-1] + xc_sign * BI30)
        zci.append(zci[1] - HI30)
        yci.append(yco[-1])
        zci.append(zci[2] - HI40)
        # Added Vertex
        addedVertex = 0
        # Inner joint 1
        if JI1:
            yci.insert(1, yci[0] + xc_sign * BI11)
            zci.insert(1, zci[0] - HI21)
            addedVertex += 1
        # Inner joint 2
        if JI2:
            yci.insert(1 + addedVertex, yci[0] + xc_sign * BI12)
            zci.insert(1 + addedVertex, zci[0] - HI22)
            addedVertex += 1
        # Inner joint 3
        if JI3:
            yci.insert(2 + addedVertex, yci[3 + addedVertex] + xc_sign * BI21)
            zci.insert(2 + addedVertex, zci[1 + addedVertex] - HI31)
            addedVertex += 1
        # Inner joint 4
        if JI4:
            yci.insert(3 + addedVertex, yci[-1] + xc_sign * BI32)
            zci.insert(3 + addedVertex, zci[-1] + HI42)
            addedVertex += 1
        # Inner joint 5
        if JI5:
            yci.insert(3 + addedVertex, yci[-1] + xc_sign * BI31)
            zci.insert(3 + addedVertex, zci[-1] + HI41)
            addedVertex += 1
    elif opt2 == "CIRCLE" :
        radius = HI30 / 2
        ycr = yco[-1]
        zcr = zco[-1] + HI50 + HI30 / 2
        if opt1 == "LEFT" :
            for i in range(73) :
                yci.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
                zci.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
        elif opt1 == "RIGHT" :
            for i in range(73) :
                yci.append(ycr + radius * math.sin(math.pi * i / 72))
                zci.append(zcr + radius * math.cos(math.pi * i / 72))
    elif opt2 == "NONE" :
        yci.append(yco[0])
        zci.append(zco[0])
        yci.append(yco[-1])
        zci.append(zco[-1])
    # Reverse and All Cell
    if (opt1 == "LEFT" and opt2 == "POLYGON") or (opt1 == "LEFT" and opt2 == "CIRCLE") :
        # Reverse
        yci.reverse()
        zci.reverse()
        # All Cell
        ycAll = yco + yci + [yco[0]]
        zcAll = zco + zci + [zco[0]]
    elif (opt1 == "RIGHT" and opt2 == "POLYGON") or (opt1 == "RIGHT" and opt2 == "CIRCLE"):
        # Reverse
        yco.reverse()
        zco.reverse()
        # All Cell
        ycAll = yco + yci + [yco[0]]
        zcAll = zco + zci + [zco[0]]
    elif opt1 == "LEFT" and opt2 == "NONE" :
        # All Cell
        ycAll = yco + [yco[0]]
        zcAll = zco + [zco[0]]
    elif opt1 == "RIGHT" and opt2 == "NONE" :
        # Reverse
        yco.reverse()
        zco.reverse()
        # All Cell
        ycAll = [yco[-1]] + yco
        zcAll = [zco[-1]] + zco
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycAll
    outer[1] = zcAll
    return outer, inner, comp

def pscMid(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2) :
    # Variable Initialization
    H10, HL10, HL20, HL21, HL22, HL30, HL40, HL41, HL42, HL50 = vSizeA
    BL10, BL20, BL21, BL22, BL41, BL42 = vSizeB
    HR10, HR20, HR21, HR22, HR30, HR40, HR41, HR42, HR50 = vSizeC
    BR10, BR20, BR21, BR22, BR41, BR42 = vSizeD
    J1, JL1, JL2, JL3, JL4, JR1, JR2, JR3, JR4 = joint
    # Height Calculation
    heightC = 0
    heightL = 0
    heightR = 0
    # Left Height
    if opt1 == "NONE" :
        heightL = HL10
    elif opt1 == "CIRCLE" :
        heightL = HL10 + HL30 + HL50
    elif opt1 == "POLYGON" :
        heightL = HL10 + HL20 + HL30 + HL40 + HL50
    # Right Height
    if opt2 == "NONE" :
        heightR = HR10
    elif opt2 == "CIRCLE" :
        heightR = HR10 + HR30 + HR50
    elif opt2 == "POLYGON" :
        heightR = HR10 + HR20 + HR30 + HR40 + HR50
    # Center Height
    if J1:
        heightC = H10
    else :
        if heightR > heightL :
            heightC = BL20 * (heightR - heightL) / (BL20 + BR20) + heightL
        elif heightR < heightL :
            heightC = BR20 * (heightL - heightR) / (BL20 + BR20) + heightR
        elif heightR == heightL :
            heightC = (heightL + heightR) / 2
    heightM = max(heightL, heightR, heightC)
    # Outer Cell_Left Side
    radius = 0
    ycr = 0
    zcr = 0
    addedVertex = 0
    ycol = [0]
    zcol = [heightC - heightM]
    if opt1 == "NONE" :
        ycol.append(ycol[0] - BL20)
        zcol.append(HL10 - heightM)
        ycol.append(ycol[1])
        zcol.append(zcol[1] - HL10)
        ycol.append(ycol[2] + BL20)
        zcol.append(zcol[2])
    elif opt1 == "CIRCLE" :
        radius = HL30 / 2
        ycr = -BL20
        zcr = (heightL - heightM) - (HL10 + HL30 / 2)
        ycol.append(ycol[0] - BL20)
        zcol.append(heightL - heightM)  
        ycol.append(ycol[1])
        zcol.append(zcol[1] - HL10)
        for i in range(73) :
            ycol.append(ycr + radius * math.sin(math.pi * i / 72))
            zcol.append(zcr + radius * math.cos(math.pi * i / 72))
        ycol.append(ycol[-1])
        zcol.append(zcol[-1] - HL50)
        ycol.append(ycol[-1] + BL20)
        zcol.append(zcol[-1])
    elif opt1 == "POLYGON" :
        ycol.append(ycol[0] - BL20)
        zcol.append(heightL - heightM)
        ycol.append(ycol[1])
        zcol.append(zcol[1] - HL10)
        ycol.append(ycol[0] - BL10)
        zcol.append(zcol[2] - HL20)
        ycol.append(ycol[3])
        zcol.append(zcol[3] - HL30)
        ycol.append(ycol[0] - BL20)
        zcol.append(zcol[4] - HL40)
        ycol.append(ycol[5])
        zcol.append(zcol[5] - HL50)
        ycol.append(0)
        zcol.append(zcol[6])
        # Added Vertex
        addedVertex = 0
        # Left joint 1
        if JL1:
            ycol.insert(3, ycol[2] + BL21)
            zcol.insert(3, zcol[2] - HL21)
            addedVertex += 1
        # Left joint 2
        if JL2:
            ycol.insert(3 + addedVertex, ycol[2] + BL22)
            zcol.insert(3 + addedVertex, zcol[2] - HL22)
            addedVertex += 1
        # Left joint 3
        if JL3:
            ycol.insert(5 + addedVertex, ycol[5 + addedVertex] + BL42)
            zcol.insert(5 + addedVertex, zcol[5 + addedVertex] + HL42)
            addedVertex += 1
        # Left joint 4
        if JL4:
            ycol.insert(5 + addedVertex, ycol[5 + addedVertex] + BL41)
            zcol.insert(5 + addedVertex, zcol[5 + addedVertex] + HL41)
            addedVertex += 1
    # Outer Cell_Right Side
    radius = 0
    ycr = 0
    zcr = 0
    addedVertex = 0
    ycor = [0]
    zcor = [heightC - heightM]
    if opt2 == "NONE" :
        ycor.append(ycor[0] + BR20)
        zcor.append(HR10 - heightM)
        ycor.append(ycor[1])
        zcor.append(zcor[1] - HR10)
        ycor.append(ycor[2] - BR20)
        zcor.append(zcor[2])
    elif opt2 == "CIRCLE" :
        radius = HR30 / 2
        ycr = BR20
        zcr = (heightR - heightM) - (HR10 + HR30 / 2)
        ycor.append(ycor[0] + BR20)
        zcor.append(heightR - heightM)
        ycor.append(ycor[1])
        zcor.append(zcor[1] - HR10)
        for i in range(73) :
            ycor.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
            zcor.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
        ycor.append(ycor[-1])
        zcor.append(zcor[-1] - HR50)
        ycor.append(ycor[-1] - BR20)
        zcor.append(zcor[-1])
    elif opt2 == "POLYGON" :
        ycor.append(ycor[0] + BR20)
        zcor.append(heightR - heightM)
        ycor.append(ycor[1])
        zcor.append(zcor[1] - HR10)
        ycor.append(ycor[0] + BR10)
        zcor.append(zcor[2] - HR20)
        ycor.append(ycor[3])
        zcor.append(zcor[3] - HR30)
        ycor.append(ycor[0] + BR20)
        zcor.append(zcor[4] - HR40)
        ycor.append(ycor[5])
        zcor.append(zcor[5] - HR50)
        ycor.append(0)
        zcor.append(zcor[6])
        # Added Vertex
        addedVertex = 0
        # Right joint 1
        if JR1:
            ycor.insert(3, ycor[2] - BR21)
            zcor.insert(3, zcor[2] - HR21)
            addedVertex += 1
        # Right joint 2
        if JR2:
            ycor.insert(3 + addedVertex, ycor[2] - BR22)
            zcor.insert(3 + addedVertex, zcor[2] - HR22)
            addedVertex += 1
        # Right joint 3
        if JR3:
            ycor.insert(5 + addedVertex, ycor[5 + addedVertex] - BR42)
            zcor.insert(5 + addedVertex, zcor[5 + addedVertex] + HR42)
            addedVertex += 1
        # Right joint 4
        if JR4:
            ycor.insert(5 + addedVertex, ycor[5 + addedVertex] - BR41)
            zcor.insert(5 + addedVertex, zcor[5 + addedVertex] + HR41)
            addedVertex += 1
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    return outer, inner, comp

def pscPlat(vSizeA, vSizeB, vSizeC, vSizeD, joint, opt1, opt2) :
    # Variable Initialization
    H10, H20, HOL10, HOL20, HOL30, BOL10, BOL20, BOL30, HOL11, BOL11 = vSizeA
    HIL10, HIL20, BIL10, BIL20, BIL30, BIL40 = vSizeB
    HOR10, HOR20, HOR30, BOR10, BOR20, BOR30, HOR11, BOR11 = vSizeC
    HIR10, HIR20, BIR10, BIR20, BIR30 = vSizeD
    JL1, JR1 = joint
    # Height Calculation
    heightC = 0
    heightL = HOL10 + HOL20 + HOL30
    heightR = HOR10 + HOR20 + HOR30
    if heightR > heightL :
        heightC = BOL10 * (heightR - heightL) / (BOL10 + BOR10) + heightL
    elif heightR < heightL :
        heightC = BOR10 * (heightL - heightR) / (BOL10 + BOR10) + heightR
    elif heightR == heightL :
        heightC = (heightL + heightR) / 2
    heightM = max(heightL, heightR, heightC)
    # Outer Cell
    if opt1 == "HALF" and opt2 == "LEFT" :
        ycol = [0]
        zcol = [0]
        ycol.append(ycol[0] - BOL10)
        zcol.append(zcol[0])
        ycol.append(-BOL30 + BOL20)
        zcol.append(-HOL10)
        ycol.append(-BOL30)
        zcol.append(zcol[2] - HOL20)
        ycol.append(ycol[3])
        zcol.append(zcol[3] - HOL30)
        ycol.append(0)
        zcol.append(zcol[4])
        if JL1 :
            ycol.insert(2, ycol[1] + BOL11)
            zcol.insert(2, zcol[1] - HOL11)
    elif opt1 == "HALF" and opt2 == "RIGHT" :
        ycor = [0]
        zcor = [0]
        ycor.append(ycor[0] + BOR10)
        zcor.append(zcor[0])
        ycor.append(BOR30 - BOR20)
        zcor.append(-HOR10)
        ycor.append(BOR30)
        zcor.append(zcor[2] - HOR20)
        ycor.append(ycor[3])
        zcor.append(zcor[3] - HOR30)
        ycor.append(0)
        zcor.append(zcor[4])
        if JR1 :
            ycor.insert(2, ycor[1] - BOR11)
            zcor.insert(2, zcor[1] - HOR11)
    elif opt1 == "1CELL" or opt1 == "2CELL" :
        ycol = [0]
        zcol = [heightC - heightM]
        ycol.append(ycol[0] - BOL10)
        zcol.append(heightL - heightM)
        ycol.append(-BOL30 + BOL20)
        zcol.append(zcol[1] - HOL10)
        ycol.append(-BOL30)
        zcol.append(zcol[2] - HOL20)
        ycol.append(ycol[3])
        zcol.append(zcol[3] - HOL30)
        ycol.append(0)
        zcol.append(zcol[4])
        if JL1 :
            ycol.insert(2, ycol[1] + BOL11)
            zcol.insert(2, zcol[1] - HOL11)
        ycor = [0]
        zcor = [heightC - heightM]
        ycor.append(ycor[0] + BOR10)
        zcor.append(heightR - heightM)
        ycor.append(BOR30 - BOR20)
        zcor.append(zcor[1] - HOR10)
        ycor.append(BOR30)
        zcor.append(zcor[2] - HOR20)
        ycor.append(ycor[3])
        zcor.append(zcor[3] - HOR30)
        ycor.append(0)
        zcor.append(zcor[4])
        if JR1 :
            ycor.insert(2, ycor[1] - BOR11)
            zcor.insert(2, zcor[1] - HOR11)
    # Inner Cell
    radius = 0
    ycr = 0
    zcr = 0
    ycil = []
    zcil = []
    ycir = []
    zcir = []
    ycill = []
    zcill  = []
    ycilr  = []
    zcilr = []
    ycirl = []
    zcirl = []
    ycirr = []
    zcirr = []
    if opt1 == "HALF" and opt2 == "LEFT" :
        radius = H10 / 2
        ycr = 0
        zcr = -(HOL10 + HOL20 + HOL30) + (H20 + H10 / 2)
        for i in range(73) :
            ycil.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
            zcil.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
    elif opt1 == "HALF" and opt2 == "RIGHT" :
        radius = H10 / 2
        ycr = 0
        zcr = -(HOR10 + HOR20 + HOR30) + (H20 + H10 / 2)
        for i in range(73) :
            ycir.append(ycr + radius * math.sin(math.pi * i / 72))
            zcir.append(zcr + radius * math.cos(math.pi * i / 72))
    elif opt1 == "1CELL" and opt2 == "CIRCLE" :
        radius = H10 / 2
        ycr = 0
        zcr = -heightM + (H20 + H10 / 2)
        for i in range(72) :
            ycil.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
            zcil.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
            ycir.append(ycr + radius * math.sin(math.pi * i / 72))
            zcir.append(zcr + radius * math.cos(math.pi * i / 72))
    elif opt1 == "1CELL" and opt2 == "POLYGON" :
        ycil.append(0)
        zcil.append(-heightM + (H10 + H20))
        ycil.append(ycil[0] - BIL10)
        zcil.append(zcil[0])
        ycil.append(ycil[1] - BIL20)
        zcil.append(zcil[1] - HIL10)
        ycil.append(ycil[0] - BIL30)
        zcil.append(-heightM + H20 + HIL20)
        ycil.append(0)
        zcil.append(-heightM + H20)
        ycir.append(0)
        zcir.append(-heightM + (H10 + H20))
        ycir.append(ycir[0] + BIR10)
        zcir.append(zcir[0])
        ycir.append(ycir[1] + BIR20)
        zcir.append(zcir[1] - HIR10)
        ycir.append(ycir[0] + BIR30)
        zcir.append(-heightM + H20 + HIR20)
        ycir.append(0)
        zcir.append(-heightM + H20)
    elif opt1 == "2CELL" :
        radius = H10 / 2
        ycr = -(BIL40 + H10 / 2)
        zcr = -heightM + (H20 + H10 / 2)
        for i in range(72) :
            ycill.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
            zcill.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
            ycilr.append(ycr + radius * math.sin(math.pi * i / 72))
            zcilr.append(zcr + radius * math.cos(math.pi * i / 72))
        ycr = BIL40 + H10 / 2
        for i in range(72) :
            ycirl.append(ycr + radius * math.sin(2 * math.pi - math.pi * i / 72))
            zcirl.append(zcr + radius * math.cos(2 * math.pi - math.pi * i / 72))
            ycirr.append(ycr + radius * math.sin(math.pi * i / 72))
            zcirr.append(zcr + radius * math.cos(math.pi * i / 72))
    # All Cell
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    if opt1 == "HALF" and opt2 == "LEFT" :
        ycil.reverse()
        zcil.reverse()
        ycoAll = ycol + ycil + [ycol[0]]
        zcoAll = zcol + zcil + [zcol[0]]
        # Return
        outer[0] = ycoAll
        outer[1] = zcoAll
    elif opt1 == "HALF" and opt2 == "RIGHT" :
        ycor.reverse()
        zcor.reverse()
        ycoAll = ycor + ycir + [ycor[0]]
        zcoAll = zcor + zcir + [zcor[0]]
        # Return
        outer[0] = ycoAll
        outer[1] = zcoAll
    elif opt1 == "1CELL" :
        ycor.reverse()
        zcor.reverse()
        ycil.reverse()
        zcil.reverse()
        ycor.pop(0)
        zcor.pop(0)
        ycil.pop(0)
        zcil.pop(0)
        ycoAll = ycol + ycor
        zcoAll = zcol + zcor
        yciAll = ycir + ycil
        zcilAll = zcir + zcil
        # Return
        outer[0] = ycoAll
        outer[1] = zcoAll
        inner[0] = yciAll
        inner[1] = zcilAll
    elif opt1 == "2CELL" :
        ycor.reverse()
        zcor.reverse()
        ycill.reverse()
        zcill.reverse()
        ycirl.reverse()
        zcirl.reverse()
        ycor.pop(0)
        zcor.pop(0)
        ycill.pop(0)
        zcill.pop(0)
        ycirl.pop(0)
        zcirl.pop(0)
        ycoAll = ycol + ycor
        zcoAll = zcol + zcor
        ycilAll = ycilr + ycill
        zcilAll = zcilr + zcill
        ycirAll = ycirr + ycirl
        zcirAll = zcirr + zcirl
        # Return
        outer[0] = ycoAll
        outer[1] = zcoAll
        inner[0] = ycilAll
        inner[1] = zcilAll
        inner[2] = ycirAll
        inner[3] = zcirAll
    return outer, inner, comp

def pscValu(outer_polygon, inner_polygon) :
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    for i in range(len(outer_polygon)) :
        for j in range(len(outer_polygon[i]["VERTEX"])) :
            outer[i*2].append(outer_polygon[i]["VERTEX"][j]["X"])
            outer[i*2+1].append(outer_polygon[i]["VERTEX"][j]["Y"])
        outer[i*2].append(outer[i*2][0])
        outer[i*2+1].append(outer[i*2+1][0])
    if inner_polygon is not None :
        for i in range(len(inner_polygon)) :
            for j in range(len(inner_polygon[i]["VERTEX"])) :
                inner[i*2].append(inner_polygon[i]["VERTEX"][j]["X"])
                inner[i*2+1].append(inner_polygon[i]["VERTEX"][j]["Y"])
            inner[i*2].append(inner[i*2][0])
            inner[i*2+1].append(inner[i*2+1][0])
    
    outer = rotate_coordinates_cw(outer, "CCW")
    inner = rotate_coordinates_cw(inner, "CW")
    max_value = None
    for key, value in outer.items() :
        if key % 2 != 0:
            if max_value is None or max(value) > max_value :
                max_value = max(value)
    for key, value in outer.items() :
        if key % 2 != 0:
            for i in range(len(value)) :
                value[i] = value[i] - max_value
    for key, value in inner.items() :
        if key % 2 != 0:
            for i in range(len(value)) :
                value[i] = value[i] - max_value
    return outer, inner, comp

def compositeSteelBox(vSize, slab) :
    # Variable Initialization
    Hw, tw, b1, bf1, tf1, b2, bf2, tf2 = vSize
    _, tc, Hh = slab
    twx = tw / math.sin(math.atan(Hw/((b1 - b2) / 2)))
    # Outer Cell - Left Side
    ycol = [0]
    zcol = [-(tc + Hh)]
    ycol.append(-(b1 / 2 + bf1))
    zcol.append(zcol[0])
    ycol.append(ycol[1])
    zcol.append(zcol[1] - tf1)
    ycol.append(ycol[2] + bf1 - twx)
    zcol.append(zcol[2])
    ycol.append(-(b2 / 2 + twx))
    zcol.append(zcol[3] - Hw)
    ycol.append(-(b2 / 2 + bf2))
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - tf2)
    ycol.append(0)
    zcol.append(zcol[6])
    # Outer Cell - Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Inner Cell - Left Side
    ycil = [0]
    zcil = [zcol[0] - tf1]
    ycil.append(b1 / 2)
    zcil.append(zcil[0])
    ycil.append(b2 / 2)
    zcil.append(zcil[1] - Hw)
    ycil.append(0)
    zcil.append(zcil[2])
    # Inner Cell - Right Side
    ycir = [-x for x in ycil]
    zcir = zcil.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    ycir.reverse()
    zcir.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    ycir.pop(0)
    zcir.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    yciAll = ycil + ycir
    zciAll = zcil + zcir
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    inner[0] = yciAll
    inner[1] = zciAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeSteelI(vSize, slab) :
    # Variable Initialization
    Hw, tw, b1, tf1, b2, tf2 = vSize
    _, tc, Hh = slab
    # Outer Cell - Left Side
    ycol = [0]
    zcol = [-(tc + Hh)]
    ycol.append(-(b1 / 2))
    zcol.append(zcol[0])
    ycol.append(ycol[1])
    zcol.append(zcol[1] - tf1)
    ycol.append(-(tw / 2))
    zcol.append(zcol[2])
    ycol.append(ycol[3])
    zcol.append(zcol[3] - Hw)
    ycol.append(-(b2 / 2))
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - tf2)
    ycol.append(0)
    zcol.append(zcol[6])
    # Outer Cell - Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeSteelTub(vSize, slab) :
    # Variable Initialization
    Hw, tw, b1, bf1, tf1, b2, bf2, tf2, Bf3, tfp = vSize
    _, tc, Hh = slab
    twx = tw / math.sin(math.atan(Hw/((b1 /2 + bf1 - Bf3) -b2 / 2)))
    # Outer Cell - Left Side
    ycol = [0]
    zcol = [-(tc + Hh + tf1 + Hw)]
    ycol.append(-(b2 / 2))
    zcol.append(zcol[0])
    ycol.append(-(b1 / 2 + bf1 - Bf3))
    zcol.append(zcol[1] + Hw)
    ycol.append(ycol[2] + (bf1 - Bf3))
    zcol.append(zcol[2])
    ycol.append(ycol[3])
    zcol.append(zcol[3] + tf1)
    ycol.append(ycol[4] - bf1)
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - tf1)
    ycol.append(ycol[6] + Bf3 - twx)
    zcol.append(zcol[6])
    ycol.append(-(b2 / 2 + twx))
    zcol.append(zcol[7] - Hw)
    ycol.append(-(b2 / 2 + bf2))
    zcol.append(zcol[8])
    ycol.append(ycol[9])
    zcol.append(zcol[9] - tf2)
    ycol.append(0)
    zcol.append(zcol[10])
    # Outer Cell - Right Side
    ycor = [-x for x in ycol]
    zcor = zcol.copy()
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeSteelGBox(vSize, slab, refSize) :
    # Variable Initialization
    b1, b2, B3, B4, B5, B6, h, t1, t2, tw1, tw2 = vSize
    Bc, tc, Hh = slab
    Sg, Top, Bot = refSize
    twx1 = tw1 * math.sqrt(h ** 2 + ((Bot + B4) - (Top + b1)) ** 2) / h
    twx2 = tw2 * math.sqrt(h ** 2 + ((Top + b1 + b2) - (Bot + B4 + B5)) ** 2) / h
    # Outer Cell - Left Side
    ycol = [(b2 / 2 + b1 + Top) - (Sg + Bc / 2)]
    zcol = [-(tc + Hh)]
    ycol.append(ycol[0] - b2 / 2 - b1)
    zcol.append(zcol[0])
    ycol.append(ycol[1])
    zcol.append(zcol[1] - t1)
    ycol.append(ycol[2] + b1 - twx1)
    zcol.append(zcol[2])
    ycol.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2) - B5 / 2 - twx1)
    zcol.append(zcol[3] - h)
    ycol.append(ycol[4] - B4 + twx1)
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - t2)
    ycol.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2))
    zcol.append(zcol[6])
    # Outer Cell - Right Side
    ycor = [(b2 / 2 + b1 + Top) - (Sg + Bc / 2)]
    zcor = [-(tc + Hh)]
    ycor.append(ycor[0] + b2 / 2 + B3)
    zcor.append(zcor[0])
    ycor.append(ycor[1])
    zcor.append(zcor[1] - t1)
    ycor.append(ycor[2] - B3 + twx2)
    zcor.append(zcor[2])
    ycor.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2) + B5 / 2 + twx2)
    zcor.append(zcor[3] - h)
    ycor.append(ycor[4] + B6 - twx2)
    zcor.append(zcor[4])
    ycor.append(ycor[5])
    zcor.append(zcor[5] - t2) 
    ycor.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2))
    zcor.append(zcor[6])
    # Inner Cell - Left Side
    ycil = [(b2 / 2 + b1 + Top) - (Sg + Bc / 2)]
    zcil = [zcol[0] - t1]
    ycil.append(ycil[0] - b2 / 2)
    zcil.append(zcil[0])
    ycil.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2) - B5 / 2)
    zcil.append(zcil[1] - h)
    ycil.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2))
    zcil.append(zcil[2])
    # Inner Cell - Right Side
    ycir = [(b2 / 2 + b1 + Top) - (Sg + Bc / 2)]
    zcir = [zcor[0] - t1]
    ycir.append(ycir[0] + b2 / 2)
    zcir.append(zcir[0])
    ycir.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2) + B5 / 2)
    zcir.append(zcir[1] - h)
    ycir.append((B5 / 2 + B4 + Bot) - (Sg + Bc / 2))
    zcir.append(zcir[2])
    # Reverse
    ycor.reverse()
    zcor.reverse()
    ycil.reverse()
    zcil.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    ycil.pop(0)
    zcil.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    yciAll = ycir + ycil
    zciAll = zcir + zcil
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    inner[0] = yciAll
    inner[1] = zciAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeSteelGI(vSize, slab, refSize) :
    # Variable Initialization
    B1, B2, B3, B4, H, t1, t2, tw = vSize
    Bc, tc, Hh = slab
    Sg, Top, Bot = refSize
    if ((Top + B1)-(Bot + B3)) == 0 :
        twx = tw
    else :
        twx = tw / math.sin(math.atan(H/((Top + B1)-(Bot + B3))))
    # Outer Cell - Left Side
    ycol = [(Top + B1) - (Sg + Bc / 2)]
    zcol = [-(tc + Hh)]
    ycol.append(ycol[0] - B1)
    zcol.append(zcol[0])
    ycol.append(ycol[1])
    zcol.append(zcol[1] - t1)
    ycol.append(ycol[0] - (twx / 2))
    zcol.append(zcol[2])
    ycol.append(ycol[0] + (Bot + B3) - (Top + B1) - (twx / 2))
    zcol.append(zcol[3] - H)
    ycol.append(ycol[0] + (Bot + B3) - (Top + B1) - B3)
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - t2)
    ycol.append(ycol[0] + (Bot + B3)-(Top + B1))
    zcol.append(zcol[6])
    # Outer Cell - Right Side
    ycor = [(Top + B1) - (Sg + Bc / 2)]
    zcor = [-(tc + Hh)]
    ycor.append(ycor[0] + B2)
    zcor.append(zcor[0])
    ycor.append(ycor[1])
    zcor.append(zcor[1] - t1)
    ycor.append(ycor[0] + twx / 2)
    zcor.append(zcor[2])
    ycor.append(ycor[0] + (Bot + B3) - (Top + B1) + (twx / 2))
    zcor.append(zcor[3] - H)
    ycor.append(ycor[0] + (Bot + B3) - (Top + B1) + B4)
    zcor.append(zcor[4])
    ycor.append(ycor[5])
    zcor.append(zcor[5] - t2)
    ycor.append(ycor[0]+ (Bot + B3) - (Top + B1))
    zcor.append(zcor[6])
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeSteelGTub(vSize, slab, refSize) :
    # Variable Initialization
    b1, b2, B3, B4, B5, B6, h, t1, t2, tw1, tw2, bf1, bf2, tfp = vSize
    Bc, tc, Hh = slab
    Sg, Top, Bot = refSize
    twx1 = tw1 * math.sqrt(h ** 2 + ((Bot + B4) - (Top + bf1)) ** 2) / h
    twx2 = tw2 * math.sqrt(h ** 2 + ((Top + b1 + b2 + B3 - bf2) - (Bot + B4 + B5)) ** 2) / h
    # Outer Cell - Left Side
    ycol = [(Bot + B4 + B5 / 2) - (Sg + Bc / 2)]
    zcol = [-(tc + Hh + t1 + h)]
    ycol.append(ycol[0] - B5 / 2)
    zcol.append(zcol[0])
    ycol.append((Top + bf1) - (Sg + Bc / 2))
    zcol.append(zcol[1] + h)
    ycol.append(ycol[2] + (b1 - bf1))
    zcol.append(zcol[2])
    ycol.append(ycol[3])
    zcol.append(zcol[3] + t1)
    ycol.append(ycol[4] - b1)
    zcol.append(zcol[4])
    ycol.append(ycol[5])
    zcol.append(zcol[5] - t1)
    ycol.append(ycol[6] + bf1 - twx1)
    zcol.append(zcol[6])
    ycol.append(ycol[0] - B5 / 2 - twx1)
    zcol.append(zcol[7] - h)
    ycol.append(ycol[0] - B5 / 2 - B4)
    zcol.append(zcol[8])
    ycol.append(ycol[9])
    zcol.append(zcol[9] - t2)
    ycol.append(ycol[0])
    zcol.append(zcol[10])
    # Outer Cell - Right Side
    ycor = [(Bot + B4 + B5 / 2) - (Sg + Bc / 2)]
    zcor = [-(tc + Hh + t1 + h)]
    ycor.append(ycor[0] + B5 / 2)
    zcor.append(zcor[0])
    ycor.append((Top + b1 + b2 + B3 - bf2) - (Sg + Bc / 2))
    zcor.append(zcor[1] + h)
    ycor.append(ycor[2] - (B3 - bf2))
    zcor.append(zcor[2])
    ycor.append(ycor[3])
    zcor.append(zcor[3] + t1)
    ycor.append(ycor[4] + B3)
    zcor.append(zcor[4])
    ycor.append(ycor[5])
    zcor.append(zcor[5] - t1)
    ycor.append(ycor[6] - bf2 + twx2)
    zcor.append(zcor[6])
    ycor.append(ycor[0] + B5 / 2 + twx2)
    zcor.append(zcor[7] - h)
    ycor.append(ycor[0] + B5 / 2 + B6)
    zcor.append(zcor[8])
    ycor.append(ycor[9])
    zcor.append(zcor[9] - t2)
    ycor.append(ycor[0])
    zcor.append(zcor[10])
    # Reverse
    ycor.reverse()
    zcor.reverse()
    # Remove Origin
    ycor.pop(0)
    zcor.pop(0)
    # All Cell
    ycoAll = ycol + ycor
    zcoAll = zcol + zcor
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeI(vSizeA, vSizeB, vSizeC, vSizdD, joint, slab) :
    # Variable Initialization
    _, tc, Hh = slab
    pscGirder, _, _ = pscI(vSizeA, vSizeB, vSizeC, vSizdD, joint)
    # Outer Cell
    yco = pscGirder[0]
    zco = pscGirder[1]
    # All Cell
    ycoAll = yco.copy()
    zcoAll = [z - (tc + Hh) for z in zco]
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositeTee(vSizeA, vSizeB, vSizeC, vSizdD, joint, slab) :
    # Variable Initialization
    _, tc, Hh = slab
    pscGirder, _, _ = pscTee(vSizeA, vSizeB, vSizeC, vSizdD, joint)
    # Outer Cell
    yco = pscGirder[0]
    zco = pscGirder[1]
    # All Cell
    ycoAll = yco.copy()
    zcoAll = [z - (tc + Hh) for z in zco]
    # Slab
    slab_result = slab_coordinates(slab)
    # Return
    outer = defaultdict(list)
    inner = defaultdict(list)
    comp = defaultdict(list)
    outer[0] = ycoAll
    outer[1] = zcoAll
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def compositePC(outer_polygon, inner_polygon, slab) :
    outer, inner, _ = pscValu(outer_polygon, inner_polygon)
    slab_height = slab[1] + slab[2]
    for key, value in outer.items() :
        if key % 2 != 0:
            for i in range(len(value)) :
                value[i] = value[i] - slab_height
    for key, value in inner.items() :
        if key % 2 != 0:
            for i in range(len(value)) :
                value[i] = value[i] - slab_height
    slab_result = slab_coordinates(slab)
    comp = defaultdict(list)
    comp[0] = slab_result[0]
    comp[1] = slab_result[1]
    return outer, inner, comp

def slab_coordinates(slab) :
    # Variable Initialization
    Bc, tc, _ = slab
    # Coordinates
    yco = [0, -Bc / 2, -Bc / 2, 0, Bc / 2, Bc / 2, 0]
    zco = [0, 0, -tc, -tc, -tc, 0, 0]
    # Return
    slab_coordinates_dict = defaultdict(list)
    slab_coordinates_dict[0] = yco
    slab_coordinates_dict[1] = zco
    return slab_coordinates_dict

def rotate_coordinates_cw(coordinates_dict, direction):
    rotated_coordinates = {}
    
    for i in range(int(len(coordinates_dict)/2)):
        x_coordinates = []
        y_coordinates = []
        
        for j in range(len(coordinates_dict[i*2])):
            x_coordinates.append(coordinates_dict[i*2][j])
            y_coordinates.append(coordinates_dict[i*2+1][j])
        
        sum_products = 0
        n = len(x_coordinates)
        for j in range(n) :
            x1, y1 = x_coordinates[j], y_coordinates[j]
            x2, y2 = x_coordinates[(j + 1) % n], y_coordinates[(j + 1) % n]
            sum_products += (x2 - x1) * (y2 + y1)

        if direction == "CW" and sum_products > 0:
            rotated_coordinates[i*2] = x_coordinates
            rotated_coordinates[i*2+1] = y_coordinates
        elif direction == "CW" and sum_products < 0:
            rotated_coordinates[i*2] = x_coordinates.reverse()
            rotated_coordinates[i*2+1] = y_coordinates.reverse()
        elif direction == "CCW" and sum_products > 0:
            rotated_coordinates[i*2] = x_coordinates.reverse()
            rotated_coordinates[i*2+1] = y_coordinates.reverse()
        elif direction == "CCW" and sum_products < 0 :
            rotated_coordinates[i*2] = x_coordinates
            rotated_coordinates[i*2+1] = y_coordinates
    
    return rotated_coordinates