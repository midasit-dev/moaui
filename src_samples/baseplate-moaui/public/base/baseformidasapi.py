

global g_base_url, g_headers
g_MAPI_key = "eyJ1ciI6ImhqYW5nQG1pZGFzaXQuY29tIiwicGciOiJjaXZpbCIsImNuIjoicVI0d0FYNUNTZyJ9.78fdf94142d3acefdecbf2a61d411126a6e1d1bd0acb37799d328270141725eb"
g_base_url = "https://moa-engineers.midasit.com:443/civil"

#####################################################################################################################

import requests

class midas_util:
	@staticmethod
	def ERROR_DICT(prefix='', message='', postfix=''):
		return {"error": f"Error: {prefix} {message if message != '' else 'request is failed...'} {postfix}"}

	def is_json(text):
		text = text.strip()
		return text.startswith('{') and text.endswith('}') or text.startswith('[') and text.endswith(']')

	def response_handler(response):
		if (midas_util.is_json(response.text)):
			return response.json()
		else:
			return midas_util.ERROR_DICT(postfix=response.url)

	def post(url, headers, json):
		try:
			response = requests.post(url, headers=headers, json=json)
			return midas_util.response_handler(response)
		except requests.exceptions.RequestException as e:
			return midas_util.ERROR_DICT(postfix=url)


	def get(url, headers):
		try:
			response = requests.get(url, headers=headers)
			return midas_util.response_handler(response)
		except requests.exceptions.RequestException as e:
			return midas_util.ERROR_DICT(postfix=url)


	def put(url, headers, json):
		try:
			response = requests.put(url, headers=headers, json=json)
			return midas_util.response_handler(response)
		except requests.exceptions.RequestException as e:
			return midas_util.ERROR_DICT(postfix=url)


	def delete(url, headers):
		try:
			response = requests.delete(url, headers=headers)
			return midas_util.response_handler(response)
		except requests.exceptions.RequestException as e:
			return midas_util.ERROR_DICT(postfix=url)


#####################################################################################################################

g_headers = {
	'MAPI-Key': g_MAPI_key,
	'Content-Type': 'application/json'
}

class MidasAPI:
    @staticmethod
    def doc_open(file_path):
        url = f'{g_base_url}/doc/open'
        return midas_util.post(url, headers=g_headers, json={'Argument': file_path})

    def doc_anal():
        url = f'{g_base_url}/doc/anal'
        return midas_util.post(url, headers=g_headers, json={})

    ## db #############################################################################################################
    def db_create(item_name, items):
        url = f'{g_base_url}/db/{item_name}'
        return midas_util.post(url, headers=g_headers, json={'Assign': items})

    def db_create_item(item_name, item_id, item):
        url = f'{g_base_url}/db/{item_name}/{item_id}'
        return midas_util.post(url, headers=g_headers, json={'Assign': item})

    def db_read(item_name):
        url = f'{g_base_url}/db/{item_name}'
        responseJson = midas_util.get(url, headers=g_headers)
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            # print(f"Error: Unable to find the registry key or value for {item_name}")
            # return None
            return midas_util.ERROR_DICT(message=f"Unable to find the registry key or value for {item_name}")
        keyVals = responseJson[item_name]
        return {int(k): v for k, v in keyVals.items()}

    def db_read_item(item_name, item_id):
        item_id_str = str(item_id)
        url = f'{g_base_url}/db/{item_name}/{item_id_str}'
        responseJson = midas_util.get(url, headers=g_headers)
        # check response.json()[item_name] is Exist
        if item_name not in responseJson:
            print(f"Error: Unable to find the registry key or value for {
                  item_name}")
            # return None
            return midas_util.ERROR_DICT(message=f"Unable to find the registry key or value for {item_name}")
        if item_id_str not in responseJson[item_name]:
            print(
                f"Error: Unable to find the registry key or value for {item_id}")
            # return None
            return midas_util.ERROR_DICT(message=f"Unable to find the registry key or value for {item_id}")
        return responseJson[item_name][item_id_str]

    def db_update(item_name, items):
        url = f'{g_base_url}/db/{item_name}'
        return midas_util.put(url, headers=g_headers, json={'Assign': items})

    def db_update_item(item_name, item_id, item):
        url = f'{g_base_url}/db/{item_name}/{item_id}'
        return midas_util.put(url, headers=g_headers, json={'Assign': item})

    def db_delete(item_name, item_id):
        url = f'{g_base_url}/db/{item_name}/{item_id}'
        return midas_util.delete(url, headers=g_headers)

    def db_get_next_id(item_name):
        res_all = midas_util.db_read(item_name)
        if not res_all:
            return 1
        next_id = max(map(int, res_all.keys()))
        return next_id + 1

    def db_get_max_id(item_name):
        res_all = midas_util.db_read(item_name)
        if not res_all:
            return 0
        return max(map(int, res_all.keys()))

    def db_get_min_id(item_name):
        res_all = midas_util.db_read(item_name)
        if not res_all:
            return 1
        return min(map(int, res_all.keys()))

    ## view ############################################################################################################
    def view_select_get():
        url = f'{g_base_url}/view/select'
        responseJson = midas_util.get(url, headers=g_headers)
        if 'error' in responseJson:
            return responseJson
        else:
            return responseJson['SELECT']

    ## Steel Code Check (Gen Only) ########################################################################################################
    def post_steelcodecheck():
        url = f'{g_base_url}/post/steelcodecheck'
        return midas_util.post(url, headers=g_headers, json={})

# function ##########################################################################################################

    def select_by_subkey(value, dict, *subkey):
        ret = []
        if (len(subkey) == 1):
            ret = [key for key in dict.keys() if dict[key][subkey[0]] == value]
        if (len(subkey) == 2):
            ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]] == value]
        if (len(subkey) == 3):
            ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]] == value]
        if (len(subkey) == 4):
            ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]] == value]
        if (len(subkey) == 5):
            ret = [key for key in dict.keys() if dict[key][subkey[0]][subkey[1]][subkey[2]][subkey[3]][subkey[4]] == value]

        if (len(subkey) > 5):
            print("Error: Please check the subkey length")
            # return None
            return midas_util.ERROR_DICT(message="Please check the subkey length")
        if (len(ret) == 0):
            print("Error: Please check the subkey value")
            # return None
            return midas_util.ERROR_DICT(message="Please check the subkey value")
        return ret[0]


    def get_subitem_next_id(subitem_list: dict) -> int:
        """
        Get the next ID of the subitem list

        Args:
            subitem_list (dict): The subitem list

        Returns:
            int: The next ID
        """

        if 'ITEMS' not in subitem_list:
            return 1
        return max(map(lambda x: x['ID'], subitem_list['ITEMS'])) + 1


#####################################################################################################################

def get_nodes():
    res = MidasAPI.db_read("NODE")
    return res

get_nodes()