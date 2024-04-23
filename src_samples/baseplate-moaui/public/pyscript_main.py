'''
██████╗ ██╗   ██╗    ███╗   ███╗ █████╗ ██╗███╗   ██╗
██╔══██╗╚██╗ ██╔╝    ████╗ ████║██╔══██╗██║████╗  ██║
██████╔╝ ╚████╔╝     ██╔████╔██║███████║██║██╔██╗ ██║
██╔═══╝   ╚██╔╝      ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
██║        ██║       ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
╚═╝        ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

@description This is a sample code for python script.
'''

# this is sample code for python script.
# if you want to use other python files, import here and functions export your javascript code.
import json
from pyscript_engineers_web import set_g_values, get_g_values, requests_json
from pyscript_engineers_web import MidasAPI, Product
from baseplate_KDS41_30_2022_calc import calc
from baseplate_KDS41_30_2022_report import GenerateReport
import pandas as pd
def HelloWorld():
	return (f'Hello World! this message is from def HelloWorld of PythonCode.py')

def ApiGet():
	values = json.loads(get_g_values())
	base_uri = values["g_base_uri"]
	res = requests_json.get(url=f'https://{base_uri}/health', headers={
		'Content-Type': 'application/json'
	})
	return json.dumps(res)

# Basic CRUD Sample
def py_db_create(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_create(item_name, json.loads(items)))

def py_db_create_item(item_name, item_id, item):
  civil = MidasAPI(Product.CIVIL, "KR")
  return json.dumps(civil.db_create_item(item_name, item_id, json.loads(item)))

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

def py_db_read_item(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read_item(item_name, item_id))

def py_db_update(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update(item_name, json.loads(items)))

def py_db_update_item(item_name, item_id, item):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update_item(item_name, item_id, json.loads(item)))

def py_db_delete(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_delete(item_name, item_id))

'''

██╗    ██╗██████╗ ██╗████████╗███████╗    ██╗  ██╗███████╗██████╗ ███████╗
██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝    ██║  ██║██╔════╝██╔══██╗██╔════╝
██║ █╗ ██║██████╔╝██║   ██║   █████╗      ███████║█████╗  ██████╔╝█████╗  
██║███╗██║██╔══██╗██║   ██║   ██╔══╝      ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██║  ██║███████╗██║  ██║███████╗
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
                                                                          
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
'''
def py_select_node_list():
	civil = MidasAPI(Product.CIVIL)
	civil.db_update("UNIT", {
        "1": {
            "FORCE": "KN",
            "DIST": "M",
            "HEAT": "BTU",
            "TEMPER": "C"
        }
    })
	select = civil.view_select_get()
	if select == None:
			error_message = {"error" : "Cannot get selected node list"}
			return json.dumps(error_message)
	nodes = select.get("NODE_LIST")
	if nodes == None:
			error_message = {"error" : "Cannot get node list"}
			return json.dumps(error_message)
	return json.dumps(nodes)
  
def py_set_column_info(selectedNodeList):
	civil = MidasAPI(Product.CIVIL)
	## 선택된 node list 추출
	node_list = civil.db_read("NODE")
	selected_nodes = {}
	for key, value in node_list.items():
		if str(key) in selectedNodeList:
			selected_nodes[key] = value
	elements = civil.db_read("ELEM")
	## selected node에 연결된 부재 정보 추출
	if elements == None:
		error_message = {"error" : "Cannot get elements"}
		return json.dumps(error_message)
	else:
		selected_data = {}
		for nodekey in selected_nodes.keys():
			start_angle = 100000000
			selected_element_key = 0
			for key, value in elements.items():
				if value['TYPE'] == 'BEAM':
					if value['NODE'][0] == nodekey or value['NODE'][1] == nodekey:
						if value['NODE'][0] == nodekey:
							other_node = value['NODE'][1]
						else:
							other_node = value['NODE'][0]
						## nodekey 가 아래인 부재만 선택
						if node_list[nodekey]['Z'] < node_list[other_node]['Z']:
							ZLength = node_list[other_node]['Z'] - node_list[nodekey]['Z']
							XYLength = ((node_list[other_node]['X'] - node_list[nodekey]['X'])**2 + (node_list[other_node]['Y'] - node_list[nodekey]['Y'])**2)**0.5
							angle = XYLength/ZLength
							if start_angle > angle:
								start_angle = angle
								selected_element_key = key
			if elements[selected_element_key]['NODE'][0] == nodekey:
				Position = "I"
			else:
				Position = "J"
    
			selected_data[nodekey] = {
				"element_key" : selected_element_key,
				"section_id" : elements[selected_element_key]['SECT'],
				"material_id" : elements[selected_element_key]['MATL'],
				"angle" : elements[selected_element_key]['ANGLE'],
				"position" : Position
			}
	
	return json.dumps(selected_data)

def py_get_node_info():
	civil = MidasAPI(Product.CIVIL)
	node_list = civil.db_read("NODE")

	## 노드 좌표들 중, X,Y 평면 최대, 최소 값 추출
	minX = 100000000
	minY = 100000000
	maxX = -100000000
	maxY = -100000000
	for key, value in node_list.items():
		if minX > value['X']:
			minX = value['X']
		if minY > value['Y']:
			minY = value['Y']
		if maxX < value['X']:
			maxX = value['X']
		if maxY < value['Y']:
			maxY = value['Y']
	result = [minX, minY, maxX, maxY]
	return json.dumps(result)

def py_get_reaction_table(keyindex, loadcomb):
	civil = MidasAPI(Product.CIVIL)
	keyindex= json.loads(keyindex)
	for i in range(len(keyindex)):
		keyindex[i] = int(keyindex[i])
	## keyindex 안의 값을 str 에서 int로 변경

	loadcomb= json.loads(loadcomb)
	result = civil.post_reactiontable(keyindex, loadcomb)
	return json.dumps(result)

def py_NewPorject():
	civil = MidasAPI(Product.CIVIL)
	return json.dumps(civil.NewProject())

def py_CreateBasePlateOutlines(PlateWidth, PlateHeight, HBeamHeigth, HBeamWidth):
  
	civil = MidasAPI(Product.CIVIL)
	## 단위계 변경
	civil.db_update("UNIT", {
        "1": {
            "FORCE": "N",
            "DIST": "MM",
            "HEAT": "BTU",
            "TEMPER": "C"
        }
    })
 
 ## node를 생성
 
	node_items = {
		"1": {
			"X": 0,
			"Y": 0,
			"Z": 0
		},
		"2": {
			"X": PlateWidth,
			"Y": 0,
			"Z": 0
		},
		"3": {
			"X": PlateWidth,
			"Y": PlateHeight,
			"Z": 0
		},
		"4": {
			"X": 0,
			"Y": PlateHeight,
			"Z": 0
		},
		"5": {
				"X": int(PlateWidth)/2,
				"Y": int(PlateHeight)/2 - int(HBeamHeigth)/2,
				"Z": 0
			},
		"6": {
				"X": int(PlateWidth)/2,
				"Y": int(PlateHeight)/2 + int(HBeamHeigth)/2,
				"Z": 0
			},
		"7": {
				"X": int(PlateWidth)/2 - int(HBeamWidth)/2,
				"Y": int(PlateHeight)/2 - int(HBeamHeigth)/2,
				"Z": 0
			},
		"8": {
				"X": int(PlateWidth)/2 + int(HBeamWidth)/2,
				"Y": int(PlateHeight)/2 - int(HBeamHeigth)/2,
				"Z": 0
			},
		"9": {
			"X": int(PlateWidth)/2 - int(HBeamWidth)/2,
			"Y": int(PlateHeight)/2 + int(HBeamHeigth)/2,
			"Z": 0
		},
		"10": {
				"X": int(PlateWidth)/2 + int(HBeamWidth)/2,
				"Y": int(PlateHeight)/2 + int(HBeamHeigth)/2,
				"Z": 0
			},
	
	}
	civil.db_create("NODE",node_items)
	element_items = {
		"1": {
            "TYPE": "BEAM",
            "MATL": 1,
            "SECT": 1,
            "NODE": [
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "ANGLE": 0,
            "STYPE": 0
        },
		"2": {
            "TYPE": "BEAM",
            "MATL": 1,
            "SECT": 1,
            "NODE": [
                2,
                3,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "ANGLE": 0,
            "STYPE": 0
        },
		"3": {
            "TYPE": "BEAM",
            "MATL": 1,
            "SECT": 1,
            "NODE": [
                3,
                4,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "ANGLE": 0,
            "STYPE": 0
        },
		"4": {
            "TYPE": "BEAM",
            "MATL": 1,
            "SECT": 1,
            "NODE": [
                4,
                1,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "ANGLE": 0,
            "STYPE": 0
        },
		"5": {
			"TYPE": "BEAM",
			"MATL": 1,
			"SECT": 1,
			"NODE": [
					5,
					6,
					0,
					0,
					0,
					0,
					0,
					0
			],
			"ANGLE": 0,
			"STYPE": 0
		},
  "6": {
			"TYPE": "BEAM",
			"MATL": 1,
			"SECT": 1,
			"NODE": [
					7,
					5,
					0,
					0,
					0,
					0,
					0,
					0
			],
			"ANGLE": 0,
			"STYPE": 0
		},
  "7": {
			"TYPE": "BEAM",
			"MATL": 1,
			"SECT": 1,
			"NODE": [
					5,
					8,
					0,
					0,
					0,
					0,
					0,
					0
			],
			"ANGLE": 0,
			"STYPE": 0
		},
  "8": {
			"TYPE": "BEAM",
			"MATL": 1,
			"SECT": 1,
			"NODE": [
					9,
					6,
					0,
					0,
					0,
					0,
					0,
					0
			],
			"ANGLE": 0,
			"STYPE": 0
		},
  "9": {
			"TYPE": "BEAM",
			"MATL": 1,
			"SECT": 1,
			"NODE": [
					6,
					10,
					0,
					0,
					0,
					0,
					0,
					0
			],
			"ANGLE": 0,
			"STYPE": 0
		}
	}
	civil.db_create("ELEM", element_items)
	divide_items = {
		"TARGETS": [
				5,6,7,8,9
		],
		"DIVIDE": {
				"ELEM_TYPE": "Frame",
				"DIV_METHOD": "Equal",
				"OPTION": {
						"EQUAL_OPTION": {
								"NUM_X": 1
						}
				}
		}
	}
	civil.divide_element(divide_items)
	node_data = civil.db_read("NODE")
	node_list = []
	for key, value in node_data.items():
		node_list.append(key)
	## node_list 에서 1,2,3,4 삭제
	node_list.remove(1)
	node_list.remove(2)
	node_list.remove(3)
	node_list.remove(4)

	boundary_items = {}
	for key in node_list:
		boundary_items[key] = {
			"ITEMS": [
				{
					"ID": 1,
					"CONSTRAINT": "1111110"
				}
			]
		}
	civil.db_create("CONS", boundary_items)
	return json.dumps("civil.CreateBasePlateOutlines(PlateWidth, PlateHeight)")

def py_meshing(PlateWidth, PlateHeight, PlateMaterial, PlateThickness):
	minsize = min(int(PlateWidth), int(PlateHeight)) / 30
	civil = MidasAPI(Product.CIVIL)
	items = {
        "MESHER": {
            "TARGETS": [
                1,2,3,4
            ],
            "TYPE": "Quad and triangle",
            "MESH_INNER_DOMAIN": False,
            "INCLUDE_INTERIOR_NODES": {
                "OPT_CHECK": True,
                "OPTION": "Auto"
            },
            "INCLUDE_INTERIOR_LINES": {
                "OPT_CHECK": True,
                "OPTION": "Auto"
            },
            "INCLUDE_BOUNDARY_CONNECTIVITY": True
        },
        "MESH_SIZE": {
            "LENGTH" : minsize
        },
        "PROPERTY": {
            "ELEMENT_TYPE": "Plate",
            "ELEMENT_SUB_TYPE": {
                "TYPE": "Thick",
                "WITH_DRILLING_DOF": False
            },
            "MATERIAL": 1,
            "THICKNESS": 1
        },
        "DOMAIN_NAME": {
            "NAME": "frame2"
        },
        "ADDITIONAL_OPTION": {
            "DELETE_LINE_ELEM": True,
            "SUBDIVIDE_LINE_ELEM": True
        }
    }
	civil.meshing(items)
	deleted_element_list = []
	element_data = civil.db_read("ELEM")
	for key, value in element_data.items():
		if (value['TYPE'] == 'BEAM'):
			deleted_element_list.append(key)
	## 배열을 ,로 구분하여 문자열로 변환
	deleted_element_list = ','.join(map(str, deleted_element_list))
	civil.db_delete("ELEM", deleted_element_list)
	material_items = {
		"1": {
			"TYPE": "STEEL",
			"NAME": "Plate",
			"HE_SPEC": 0,
			"HE_COND": 0,
			"PLMT": 0,
			"P_NAME": "",
			"bMASS_DENS": False,
			"DAMP_RAT": 0.02,
			"PARAM": [
					{
							"P_TYPE": 1,
							"STANDARD": "KS22(S)",
							"CODE": "",
							"DB": PlateMaterial,
							"bELAST": False,
							"ELAST": 210
					}
			]
		}
	}
	civil.db_create("MATL", material_items)
	thickness_items = {
		"1": {
			"NAME": "1",
			"TYPE": "VALUE",
			"bINOUT": False,
			"T_IN": PlateThickness,
			"T_OUT": 0,
			"O_VALUE": 0
		}
	}
	civil.db_create("THIK", thickness_items)
	return json.dumps("civil.CreateBasePlateOutlines(PlateWidth, PlateHeight)")

def py_applyloads(loaddata, PlateWidth, PlateHeight):
	civil = MidasAPI(Product.CIVIL)
	loadcase_items = {}
	for i in range(len(loaddata)):
		loadcase_items[str(i+1)] = {
			"NO" : str(i+1),
			"NAME" : "LoadCase" + str(i+1),
			"TYPE" : "D",
			"DESC" : ""
		}
	civil.db_create("STLD", loadcase_items)
	
	element_data = civil.db_read("ELEM")
	element_list = []
	for key, value in element_data.items():
		element_list.append(key)
	pressure_load_items = {}
	for i in range(len(element_list)):
		loaditems = []
		for j in range(len(loaddata)):
			eachload = {
				"ID" : j+1,
				"LCNAME" : "LoadCase" + str(j+1),
				"GROUP_NAME" : "",
				"CMD" : "PRES",
				"ELEM_TYPE" : "PLATE",
				"FACE_EDGE_TYPE": "FACE",
				"DIRECTION": "GZ",
				"FORCES": [
					- round(float(loaddata[j])*1000/(float(PlateWidth)*float(PlateHeight)),6),
					0,0,0,0
				]
			}
			loaditems.append(eachload)
		pressure_load_items[element_list[i]] = {"ITEMS" : loaditems }
	
	civil.db_create("PRES", pressure_load_items)
	
	return json.dumps("civil.CreateBasePlateOutlines(PlateWidth, PlateHeight)")

def py_analysis(DBName):
	civil = MidasAPI(Product.CIVIL)
	save_items = "C:\\MIDAS\\Test"+str(DBName)+".mcb"
	civil.saveas(save_items)
	civil.doc_anal()

	element_data = civil.db_read("ELEM")
	element_list = []
	for key, value in element_data.items():
		element_list.append(key)
  
	return json.dumps("civil.CreateBasePlateOutlines(PlateWidth, PlateHeight)")

def py_getresult():
	civil = MidasAPI(Product.CIVIL)
	element_data = civil.db_read("ELEM")
	element_list = []
	for key, value in element_data.items():
		element_list.append(key)

	loadcase_data = civil.db_read("STLD")
	loadcase_list = []
	for key, value in loadcase_data.items():
		loadcase_name = value["NAME"] + ("(ST)")
		loadcase_list.append(loadcase_name)
  
	getresult_items = {
		"TABLE_NAME": "PlateForce(UnitLength:UCS)",
		"TABLE_TYPE": "PLATEFORCEUG",
		"UNIT": {
				"FORCE": "kN",
				"DIST": "m"
		},
		"STYLES": {
				"FORMAT": "Fixed",
				"PLACE": 12
		},
		"COMPONENTS": [
				"Elem",
				"Load",
				"Node",
				"Mxx"
		],
		"NODE_ELEMS": {
				"KEYS": element_list
		},
		"LOAD_CASE_NAMES": loadcase_list,
		"AVERAGE_NODAL_RESULT": True,
		"NODE_FLAG": {
				"CENTER": False,
				"NODES": True
		}
	}
	
	result = civil.GetResult(getresult_items)
	result = result["PlateForce(UnitLength:UCS)"]["DATA"]
	
	df = pd.DataFrame(result, columns = ['ID', 'ElementKey', 'LoadCase', 'NodeNo', 'Mxx'])
	df['Mxx'] = df['Mxx'].astype(float)
	result_df = df.groupby(['ElementKey', 'LoadCase'])['Mxx'].mean().reset_index()
	minvalue = result_df['Mxx'].min()
	min_result = {"min" : minvalue}
	
	return json.dumps(min_result)

## baseplate_KDS41_30_2022_calc.py 의 calc 함수 호출
def Calculatation(jsondata):

	cal_result = calc(jsondata)
	return json.dumps(cal_result)


def convert_to_Markdown(data):
	## baseplate_KDS41_30_2022_report.py 의 GenerateReport 함수 호출
	report = GenerateReport(data)
	return json.dumps(report)