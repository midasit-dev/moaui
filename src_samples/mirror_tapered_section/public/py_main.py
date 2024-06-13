### do not delete this import scripts ###
import json
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet
### do not delete this import scripts ###

def py_db_read_tapered():
	civil = MidasAPI(Product.CIVIL, "KR")
	section_list = civil.db_read("SECT")
	tapered_section_list = {}
	for key in section_list:
		if section_list[key]["SECTTYPE"] ==  "TAPERED":
			tapered_section_list[key] = section_list[key]

	maxID = 0
	if not section_list or "error" in section_list:
		maxID = 0
	else:
		keys = section_list.keys()
		if keys:
			maxID = max(keys)
		else:
			maxID = 0
	return json.dumps([tapered_section_list, maxID])

def py_db_create_tapered(section):
	civil = MidasAPI(Product.CIVIL, "KR")
	section_list = civil.db_create("SECT", json.loads(section))
	return json.dumps(section_list)

