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
import math

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

def get_selected():
	civil = MidasAPI(Product.CIVIL, "KR")
	select = civil.view_select_get()
	if select == None:
		error_msg = {"error": "No selected Nodes"}
		return json.dumps(error_msg)

	selected_node = select.get("NODE_LIST")
	if selected_node == None:
		error_msg = {"error": "No selected Nodes"}
		return json.dumps(error_msg)

	return json.dumps(selected_node)

def ApplyLink(MasterNode, SlaveNode, LinkType):
	civil = MidasAPI(Product.CIVIL, "KR")
	
	masternode = json.loads(MasterNode)
	slavenode = json.loads(SlaveNode)
	
	masternodestring = ','.join(str(value) for value in masternode)
	slavenodestring = ','.join(str(value) for value in slavenode)

	masternode_Cordinate = civil.db_read_item("NODE", masternodestring)
	slavenode_Cordinate = civil.db_read_item("NODE", slavenodestring)
	masternode_keys = list(masternode_Cordinate.keys())
	slavenode_keys = list(slavenode_Cordinate.keys())
	
	Link_Array = {}
	
	for master_node_id, master_node_cordinate in masternode_Cordinate.items():
		closest_slave_node_id = []
		min_distance = float('inf')
		for slave_node_id, slave_node_cordinate in slavenode_Cordinate.items():
			x_diff = master_node_cordinate["X"] - slave_node_cordinate["X"]
			y_diff = master_node_cordinate["Y"] - slave_node_cordinate["Y"]
			z_diff = master_node_cordinate["Z"] - slave_node_cordinate["Z"]
			distance = math.sqrt(x_diff**2 + y_diff**2 + z_diff**2)
			if distance < min_distance:
				min_distance = distance
				closest_slave_node_id = [int(slave_node_id)]
			elif distance == min_distance:
				closest_slave_node_id.append(int(slave_node_id))
		Link_Array[master_node_id] = closest_slave_node_id
  
	## PUT 으로 보냄
	existRigidLink = civil.db_read("RIGD")
	## POST 로 보냄
	newRigidLink = {}
	for master_node_id, slave_node_id in Link_Array.items():
		if not("error" in existRigidLink):
      		## 기존 키 안에 있을 경우
			if int(master_node_id) in existRigidLink:
				exist_ITEMS = existRigidLink[int(master_node_id)]['ITEMS']
				## 각 ITEM 을 돌면서 같은 DOF 가 있는지 확인
				for i in range(len(exist_ITEMS)):
					# DOF 가 같은 경우를 찾으면, 해당 DOF 에 해당하는 S_NODE 에 추가
					if int(exist_ITEMS[i]['DOF']) == int(LinkType):
						nodelist = exist_ITEMS[i]['S_NODE']
						for j in range(len(slave_node_id)):
							if not(int(slave_node_id[j]) in nodelist):
								print("기존 노드에 없음")
								existRigidLink[int(master_node_id)]['ITEMS'][i]['S_NODE'].append(int(slave_node_id[j]))
						## 다 추가하면, for문 종료
						break
					
					newID = exist_ITEMS[-1]['ID'] + 1
					existRigidLink[int(master_node_id)]['ITEMS'].append({"ID":newID, "GROUP_NAME":"", "DOF":int(LinkType), "S_NODE":slave_node_id})
				
		
			## 기존 키 안에 없을 경우
			else:
				newRigidLink[int(master_node_id)]={"ITEMS":[{"ID":1, "GROUP_NAME":"", "DOF":int(LinkType), "S_NODE":slave_node_id}]}
		## existRigidLink 가 아예 없으면, newRigidLink 에 추가
		else:
			newRigidLink[int(master_node_id)]={"ITEMS":[{"ID":1, "GROUP_NAME":"", "DOF":int(LinkType), "S_NODE":slave_node_id}]}

	if not("error" in existRigidLink):
		put_result = civil.put_Rigid_Link(existRigidLink)
	else:
		put_result = {}
	if not(newRigidLink == {}):
		post_result = civil.post_Rigid_Link(newRigidLink)
	else:
		post_result = {}
	
	result = [put_result, post_result]
	return json.dumps(result)

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
  
def py_get_boundary_group_list():
	civil = MidasAPI(Product.CIVIL)
	boundary_group_list = civil.db_read("BNGR")
	if "error" in boundary_group_list:
		error_message = {"error" : "Cannot get boundary group list"}
		return json.dumps(error_message)
	return json.dumps(boundary_group_list)
