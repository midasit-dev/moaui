# default Setting
g_MAPI_key = ""
g_base_uri = "moa-engineers.midasit.com"
g_base_port = "443"

# from web FE, Set & Get
def set_g_values(g_values):
	_g_values = json.loads(g_values)
	global g_MAPI_key
	global g_base_uri
	global g_base_port
	g_MAPI_key = _g_values['g_mapi_key']
	g_base_uri = _g_values['g_base_uri']
	g_base_port = _g_values['g_base_port']

def get_g_values():
    return json.dumps({
        'g_mapi_key': g_MAPI_key,
        'g_base_uri': g_base_uri,
        'g_base_port': g_base_port
    })

# from javascript import globalThis
# fetch = globalThis.fetch
# JSON = globalThis.JSON
from js import fetch, JSON, XMLHttpRequest
import json

import numpy as np

class requests_json:
    @staticmethod
    def post(url, headers, jsonObj):
        xhr = XMLHttpRequest.new()
        xhr.open("POST", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send(json.dumps(jsonObj))
        ## responseText가 json 형식이 아닐 경우, error return
        try:
            return json.loads(xhr.responseText)
        except:
            return {"error": "Error: responseText is not json format"}
        

    def get(url, headers):
        xhr = XMLHttpRequest.new()
        xhr.open("GET", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send()
        return json.loads(xhr.responseText)
    
    def put(url, headers, jsonObj):
        xhr = XMLHttpRequest.new()
        xhr.open("PUT", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send(json.dumps(jsonObj))
        return json.loads(xhr.responseText)
    
    def delete(url, headers):
        xhr = XMLHttpRequest.new()
        xhr.open("DELETE", url, False)
        for key, value in headers.items():
            xhr.setRequestHeader(key, value)
        xhr.send()
        return json.loads(xhr.responseText)

class Product:
    CIVIL = 1,
    GEN = 2,

def get_base_url(product, country="KR"):
    country_code = country.upper()
    base_url = ""
    if(product == Product.CIVIL):
        base_uri = g_base_uri
        base_port = g_base_port
        base_url = f"https://{base_uri}:{base_port}/civil"
    elif(product == Product.GEN):
        base_uri = g_base_uri
        base_port = g_base_port
        base_url = f"https://{base_uri}:{base_port}/gen"
    else:
        print(f"Error: Unable to find the registry key or value for {product}")
    return base_url

def get_MAPI_Key(product, country="KR"):
    country_code = country.upper()
    mapikey = ""
    if(product == Product.CIVIL):
        mapikey = g_MAPI_key
    elif(product == Product.GEN):
        mapikey = g_MAPI_key
    else:
        print(f"Error: Unable to find the registry key or value for {product}")
    return mapikey

class MidasAPI:
    def __init__(self, product, country="KR") -> None:
        self.product = product
        self.base_url = get_base_url(product, country)
        self.headers = {
            'MAPI-Key': get_MAPI_Key(product, country),
            'Content-Type': 'application/json'
        }
    
    # def __init__(self, product, base_url, mapikey) -> None:
    #     self.product = product
    #     self.base_url = base_url
    #     self.headers = {
    #         'MAPI-Key': mapikey,
    #         'Content-Type': 'application/json'
    #     }
    
    ## doc #############################################################################################################
    def doc_open(self, file_path):
        url = f'{self.base_url}/doc/open'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': file_path})
    
    def doc_anal(self):
        url = f'{self.base_url}/doc/anal'
        return requests_json.post(url, headers=self.headers, jsonObj={})
    
    ## db #############################################################################################################
    def db_create(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        return requests_json.post(url, headers=self.headers, jsonObj={'Assign': items})
    
    def db_create_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.post(url, headers=self.headers, jsonObj={'Assign': item})
    
    def db_read(self, item_name):
        url = f'{self.base_url}/db/{item_name}'
        responseJson = requests_json.get(url, headers=self.headers)
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            error_message = {"error": f"Error: Unable to find the registry key or value for {item_name}"}
            return error_message
        keyVals = responseJson[item_name]
        return { int(k): v for k, v in keyVals.items() }

    def db_read_try_catch(self, item_name):
        url = f'{self.base_url}/db/{item_name}'
        responseJson = requests_json.get(url, headers=self.headers)
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            error_dict = { "error": f"Error: Unable to find the registry key or value for {item_name}" }
            raise Exception(error_dict)
        keyVals = responseJson[item_name]
        return { int(k): v for k, v in keyVals.items() }
    
    def db_read_item(self, item_name, item_id):
        item_id_str = str(item_id)
        url = f'{self.base_url}/db/{item_name}/{item_id_str}'
        responseJson = requests_json.get(url, headers=self.headers)
        # check responseJson[item_name] is Exist
        if item_name not in responseJson:
            error_message = {"error": f"Error: Unable to find the registry key or value for {item_name}"}
            return error_message
        return responseJson[item_name]
    
    def db_update(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        return requests_json.put(url, headers=self.headers, jsonObj={'Assign': items})
    
    def db_update_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.put(url, headers=self.headers, jsonObj={'Assign': item})
    
    def db_delete(self, item_name, item_id):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        return requests_json.delete(url, headers=self.headers)
    
    def db_get_next_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 1
        next_id = max(map(int, res_all.keys()))
        return next_id + 1
    
    def db_get_max_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 0
        return max(map(int, res_all.keys()))
    
    def db_get_min_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all or "error" in res_all:
            return 1
        return min(map(int, res_all.keys()))
    
    def meshing(self, items):
        url = f'{self.base_url}/OPE/AUTOMESH'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': items})
    
    def divide_element(self, items):
        url = f'{self.base_url}/OPE/DIVIDEELEM'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': items})
    
    def saveas(self, file_path):
        url = f'{self.base_url}/doc/saveas'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': file_path})
    ## view ############################################################################################################
    def view_select_get(self):
        url = f'{self.base_url}/view/select'
        response = requests_json.get(url, headers=self.headers)
        return response['SELECT']
    
    ## Steel Code Check (Gen Only) ########################################################################################################
    def post_steelcodecheck(self):
        url = f'{self.base_url}/post/steelcodecheck'
        return requests_json.post(url, headers=self.headers, jsonObj={})
    
    def post_reactiontable(self, keyindex, loadcomb):
        url = f'{self.base_url}/POST/TABLE'
        jsonObj = {
            "Argument": {
                "TABLE_NAME": "Reaction(Global)",
                "TABLE_TYPE": "REACTIONG",
                "UNIT": {
                    "FORCE": "kN",
                    "DIST": "m"
                },
                "STYLES": {
                    "FORMAT": "Fixed",
                    "PLACE": 12
                },
                "COMPONENTS": [
                    "Node",
                    "Load",
                    "FX",
                    "FY",
                    "FZ",
                    "MX",
                    "MY",
                    "MZ",
                    "Mb"
                ],
                "NODE_ELEMS": {
                "KEYS": keyindex,
                },
                "LOAD_CASE_NAMES": loadcomb
            }
        }
        result = requests_json.post(url, headers=self.headers, jsonObj=jsonObj)
        return result
    
    def NewProject(self):
        url = f'{self.base_url}/doc/new'
        return requests_json.post(url, headers=self.headers, jsonObj={})
    
    def GetResult(self, items):
        url = f'{self.base_url}/POST/TABLE'
        return requests_json.post(url, headers=self.headers, jsonObj={'Argument': items})
    
# function ##########################################################################################################

def select_by_subkey(value, dict, *subkey):
    ret = []
    if(len(subkey) == 1):
        ret = [key for key in dict.keys() if dict[key][subkey[0]] == value]
    if(len(subkey) == 2):
        ret =  [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]] == value]
    if(len(subkey) == 3):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]] == value]
    if(len(subkey) == 4):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]] == value]
    if(len(subkey) == 5):
        ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]][subkey[4]] == value]

    if(len(subkey) > 5):
        print("Error: Please check the subkey length")
        return None
    if(len(ret) == 0):
        print("Error: Please check the subkey value")
        return None
    return ret[0]

def get_subitem_next_id(subitem_list):
    if 'ITEMS' not in subitem_list:
        return 1
    return max(map(lambda x: x['ID'], subitem_list['ITEMS'])) + 1

