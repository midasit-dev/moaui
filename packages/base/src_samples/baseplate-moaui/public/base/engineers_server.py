g_MAPI_key = "eyJ1ciI6ImtqdzMzODciLCJwZyI6ImNpdmlsIiwiY24iOiJsd0ozVU43YlFnIn0.ece204694bd5d77ac5c3dd8d0323f409028d44bd3a2f31ebcecce44da5d5bf36"
g_base_uri = "moa-engineers.midasit.com"
g_base_port = "443"

import requests

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
        response = requests.post(url, headers=self.headers, json={'Argument': file_path})
        return response.json()
    
    def doc_anal(self):
        url = f'{self.base_url}/doc/anal'
        response = requests.post(url, headers=self.headers, json={})
        return response.json()
    
    ## db #############################################################################################################
    def db_create(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        response = requests.post(url, headers=self.headers, json={'Assign': items})
        return response.json()
    
    def db_create_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        response = requests.post(url, headers=self.headers, json={'Assign': item})
        return response.json()
    
    def db_read(self, item_name):
        url = f'{self.base_url}/db/{item_name}'
        response = requests.get(url, headers=self.headers)
        responseJson = response.json()
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            print(f"Error: Unable to find the registry key or value for {item_name}")
            return None
        keyVals = responseJson[item_name]
        return { int(k): v for k, v in keyVals.items() }
    
    def db_read_item(self, item_name, item_id):
        item_id_str = str(item_id)
        url = f'{self.base_url}/db/{item_name}/{item_id_str}'
        response = requests.get(url, headers=self.headers)
        responseJson = response.json()
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            print(f"Error: Unable to find the registry key or value for {item_name}")
            return None
        if item_id_str not in responseJson[item_name]:
            print(f"Error: Unable to find the registry key or value for {item_id}")
            return None
        return response.json()[item_name][item_id_str]
    
    def db_update(self, item_name, items):
        url = f'{self.base_url}/db/{item_name}'
        response = requests.put(url, headers=self.headers, json={'Assign': items})
        return response.json()
    
    def db_update_item(self, item_name, item_id, item):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        response = requests.put(url, headers=self.headers, json={'Assign': item})
        return response.json()
    
    def db_delete(self, item_name, item_id):
        url = f'{self.base_url}/db/{item_name}/{item_id}'
        response = requests.delete(url, headers=self.headers)
        return response.json()
    
    def db_get_next_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all:
            return 1
        next_id = max(map(int, res_all.keys()))
        return next_id + 1
    
    def db_get_max_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all:
            return 0
        return max(map(int, res_all.keys()))
    
    def db_get_min_id(self, item_name):
        res_all = self.db_read(item_name)
        if not res_all:
            return 1
        return min(map(int, res_all.keys()))
    
    ## view ############################################################################################################
    def view_select_get(self):
        url = f'{self.base_url}/view/select'
        response = requests.get(url, headers=self.headers)
        return response.json()['SELECT']
    
    ## Steel Code Check (Gen Only) ########################################################################################################
    def post_steelcodecheck(self):
        url = f'{self.base_url}/post/steelcodecheck'
        response = requests.post(url, headers=self.headers, json={})
        return response.json()

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
