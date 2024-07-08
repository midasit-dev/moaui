import requests
import winreg
from enum import Enum


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

	def get_reg_val(path, name):
		try:
			with winreg.OpenKey(winreg.HKEY_CURRENT_USER, path) as key:
				value, _ = winreg.QueryValueEx(key, name)
				return value
		except FileNotFoundError:
			print(f"Error: Unable to find the registry key or value for {path}, {name}")
			return ""

	def get_base_url(product, country="KR"):
		country_code = country.upper()
		base_url = ""
		if (product == Product.CIVIL):
			base_uri = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\CVLwNX_{country_code}\\CONNECTION", "URI")
			base_port = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\CVLwNX_{country_code}\\CONNECTION", "PORT")
			base_url = f"https://{base_uri}:{base_port}/civil"
		elif (product == Product.GEN):
			base_uri = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\midasGen_{country_code}\\CONNECTION", "URI")
			base_port = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\midasGen_{country_code}\\CONNECTION", "PORT")
			base_url = f"https://{base_uri}:{base_port}/gen"
		else:
			print(f"Error: Unable to find the registry key or value for {product}")
		return base_url


	def get_MAPI_Key(product, country="KR"):
		country_code = country.upper()
		mapikey = ""
		if (product == Product.CIVIL):
			mapikey = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\CVLwNX_{country_code}\\CONNECTION", "Key")
		elif (product == Product.GEN):
			mapikey = midas_util.get_reg_val(f"SOFTWARE\\MIDAS\\midasGen_{country_code}\\CONNECTION", "Key")
		else:
			print(f"Error: Unable to find the registry key or value for {product}")
		return mapikey


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


class Product(Enum):
    CIVIL = 1,
    GEN = 2,

# from base.engineers import midas_util, Product

global g_base_url, g_headers
g_base_url = midas_util.get_base_url(Product.CIVIL, "KR")   
g_headers = {
	'MAPI-Key': midas_util.get_MAPI_Key(Product.CIVIL, "KR"),
	'Content-Type': 'application/json'
}