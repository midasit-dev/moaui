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
	res = requests_json.get(url=f'https://{g_base_uri}/health', headers={
		'Content-Type': 'application/json'
	})
	return json.dumps(res)

def py_db_read(item_name):
	try:
		civil = MidasAPI(Product.CIVIL, "KR")
		return json.dumps(civil.db_read_try_catch(item_name))
	except Exception as e:
		return json.dumps(e.args[0])

'''

██╗    ██╗██████╗ ██╗████████╗███████╗    ██╗  ██╗███████╗██████╗ ███████╗
██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝    ██║  ██║██╔════╝██╔══██╗██╔════╝
██║ █╗ ██║██████╔╝██║   ██║   █████╗      ███████║█████╗  ██████╔╝█████╗  
██║███╗██║██╔══██╗██║   ██║   ██╔══╝      ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██║  ██║███████╗██║  ██║███████╗
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
                                                                          
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
'''

import copy
import math

def main(jsonInput: str):
    try:
      # Civil API
      civil = MidasAPI(Product.CIVIL, "KR")
      
      # Convert input to dictionary
      inputs = json.loads(jsonInput)
      
      # Input data
      angle_list = [item['angle'] for item in inputs['RowData']]
      
      # Create load case
      res_stld = civil.db_read_try_catch("STLD")
      stld_max_key = max(res_stld.keys())
      stld_base_name = res_stld[inputs["StaticLoadLC"]].get("NAME")
      stld_exist_name_list = [item['NAME'] for item in res_stld.values()]
      
      # Create stld data and Check Load case name already exists
      update_stld_data = {}
      stld_new_name_list = []
      for _, angle in enumerate(angle_list):
          stld_max_key += 1
          stld_name = stld_base_name + "_" + str(angle) + "deg"
          stld_new_name_list.append(stld_name)
          if stld_name in stld_exist_name_list:
              error_message = {"error": "Load case name that has same angle already exists"}
              return json.dumps(error_message)
          update_stld_data[stld_max_key] = {
              "NAME":stld_name,
              "TYPE":"USER"
          }
      
      # Create cnld data
      res_cnld = civil.db_read_try_catch("CNLD")
      update_cnld_data = {}
      if res_cnld == None:
          pass
      else:
          base_cnld_data ={key: value for key, value in res_cnld.items() if any(item['LCNAME'] == stld_base_name for item in value['ITEMS'])}
          if base_cnld_data == {}:
              pass
          else:
              for key, value in base_cnld_data.items():
                  items_list = []
                  base_items = value['ITEMS'][0]
                  id_number = base_items['ID']
                  for index, angle in enumerate(angle_list):
                      id_number += 1
                      items_list.append(
                          {
                              "ID":id_number,
                              "LCNAME":stld_new_name_list[index],
                              "GROUP_NAME":base_items['GROUP_NAME'],
                              "FX":base_items['FX']*math.cos(math.radians(angle))-base_items['FY']*math.sin(math.radians(angle)),
                              "FY":base_items['FX']*math.sin(math.radians(angle))+base_items['FY']*math.cos(math.radians(angle)),
                              "FZ":base_items['FZ'],
                              "MX":base_items['MX'],
                              "MY":base_items['MY'],
                              "MZ":base_items['MZ']
                          }
                      )
                  update_cnld_data[key] = {
                      "ITEMS":items_list
                  }
      
      # Create nbof data
      res_nbof = civil.db_read_try_catch("NBOF")
      update_nbof_data = {}
      if res_nbof == None:
          pass
      else:
          base_nbof_data = {key: value for key, value in res_nbof.items() if value.get("LCNAME") == stld_base_name}
          if base_nbof_data == {}:
              pass
          else:
              base_nbof_data = base_nbof_data[inputs["StaticLoadLC"]]
              key_number = max(res_nbof.keys())
              for index, angle in enumerate(angle_list):
                  key_number += 1
                  update_nbof_data[key_number] = {
                      "LCNAME": stld_new_name_list[index],
                      "OPT_USE_GROUP": base_nbof_data['OPT_USE_GROUP'],
                      "KEY_NODE_ITEMS": base_nbof_data['KEY_NODE_ITEMS'],
                      "OPT_NODAL_MASS": base_nbof_data['OPT_NODAL_MASS'],
                      "OPT_LOAD_TO_MASS": base_nbof_data['OPT_LOAD_TO_MASS'],
                      "OPT_STRUCT_MASS": base_nbof_data['OPT_STRUCT_MASS'],
                      "X": base_nbof_data['X']*math.cos(math.radians(angle))-base_nbof_data['Y']*math.sin(math.radians(angle)),
                      "Y": base_nbof_data['X']*math.sin(math.radians(angle))+base_nbof_data['Y']*math.cos(math.radians(angle)),
                      "Z": base_nbof_data['Z']
                  }
      
      # Time History Load Case
      res_this = civil.db_read_try_catch("THIS")
      base_this_data = res_this[inputs["TimeHistoryLC"]]
      max_this_key = max(res_this.keys())
  
      update_this_data = {}
      for index, angle in enumerate(angle_list):
          max_this_key += 1
          update_this_data[max_this_key] = copy.deepcopy(base_this_data)
          update_this_data[max_this_key]["COMMON"]["NAME"] = stld_new_name_list[index]
  
      #Time History Forcing Functions
      res_thfc = civil.db_read_try_catch("THFC")
      if res_thfc != None:
          thfc_exist_name_list = [item['NAME'] for item in res_thfc.values()]
  
      # Create Gravity data
      res_styp = civil.db_read_try_catch("STYP")
      preset_name = "Linear"
      gravity = res_styp[1]["GRAV"]
      preset = {
          "NAME": preset_name,
          "FUNCTYPE": 1,
          "iTYPE": 5,
          "iMETHOD": 0,
          "SCALE": 1,
          "GRAV": gravity,
          "aFUNCDATA": [
              {
                  "TIME": 0,
                  "VALUE": 0
              },
              {
                  "TIME": 1,
                  "VALUE": 1
              }
          ],
          "DESC":"Preset"
      }
  
      # Choose Preset
      update_thfc_data = {}
      thfc_name = ""
      if inputs["THfunction"] == 0:
          # if thfc data is empty
          if res_thfc == None:
              update_thfc_data[1] = preset
              thfc_name = preset_name
          # thfc data is not empty and preset name is exist
          elif "Linear" in thfc_exist_name_list:
              matching_key = next(key for key, value in res_thfc.items() if value["NAME"] == preset_name)
              compare_preset_data = copy.deepcopy(preset)
              compare_exist_data = copy.deepcopy(res_thfc[matching_key])
              del compare_preset_data["DESC"]
              del compare_exist_data["DESC"]
              # if preset data is same with exist data
              if compare_preset_data == compare_exist_data:
                  thfc_name = preset_name
              # if preset data is not same with exist data
              else:
                  error_message = {"error": "There exists preset data with the same name but different loads"}
                  return json.dumps(error_message)
          # thfc data is not empty and preset name is not exist
          else:
              max_thfc_key = max(res_thfc.keys())
              max_thfc_key += 1
              update_thfc_data[max_thfc_key] = preset
              thfc_name = preset_name
      # Choose User Defined
      else:
          thfc_name = res_thfc[inputs["THfunction"]]["NAME"]
  
      # Time Varying Static Load
      res_thsl = civil.db_read_try_catch("THSL")
      if res_thsl == None:
          max_res_thsl_key = 0
      else:
          max_res_thsl_key = max(res_thsl.keys())
  
      update_thsl_data = {}
      for index, angle in enumerate(angle_list):
          max_res_thsl_key += 1
          update_thsl_data[max_res_thsl_key] = {
              "THIS_LCNAME": stld_new_name_list[index],
              "SLOAD": stld_new_name_list[index],
              "THIS_FUNCNAME": thfc_name,
              "ATIME": 0,
              "SCALE": float(inputs["ScaleFactor"])
          }
  
      # Create stld data
      civil.db_update("STLD", update_stld_data)
      civil.db_update("CNLD", update_cnld_data)
      civil.db_update("NBOF", update_nbof_data)
      civil.db_update("THIS", update_this_data)
      if update_thfc_data != {}:
          civil.db_update("THFC", update_thfc_data)
      civil.db_update("THSL", update_thsl_data)
  
      return json.dumps({"success": "Success"})
    
    except Exception as e:
      return json.dumps(e.args[0])