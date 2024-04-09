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
			selected_data[nodekey] = {
				"element_key" : selected_element_key,
				"section_id" : elements[selected_element_key]['SECT'],
				"material_id" : elements[selected_element_key]['MATL'],
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
	return json.dumps(civil.post_reactiontable(keyindex, loadcomb))