import os
import datetime
import json
from js import Blob, document
from js import window
### Select_Active_List & Select_LCB_Case ###

all_active_type_list = {
		0: { "Real": "Inactive", "API": "INACTIVE" },
		1: { "Real": "Strength/Stress", "API": "STRENGTH" },
		2: { "Real": "Serviceability", "API": "SERVICE" },
		3: { "Real": "Special", "API": "SPECIAL" },
		4: { "Real": "Vertical", "API": "VERTICAL" },
		5: { "Real": "Strength(Ealstic)", "API": "ELSTRENGTH" },
		6: { "Real": "U.G.Strength/Stress", "API": "UGSTRENGTH" },
		7: { "Real": "U.G.Serviceability", "API": "UGSERVICE" },
		8: { "Real": "U.G.Special", "API": "UGSPECIAL" }
}

active_type_list = {}
for key, value in all_active_type_list.items():
	if key == 0: continue
	active_type_list[key] = value["Real"]
 
active_type_list_api = {}
for key, value in all_active_type_list.items():
	active_type_list_api[key] = value["API"]

all_lcb_type_list = {
	1: { "Real": "Steel Design", "API": "LCOM-STEEL" },
 	2: { "Real": "Concrete Design", "API": "LCOM-CONC" },
  3: { "Real": "SRC_Design", "API": "LCOM-SRC" },
  4: { "Real": "Composite Steel Girder Design", "API": "LCOM-STLCOMP" },
  5: { "Real": "Seismic", "API": "LCOM-SEISMIC" }	
}

def get_all_lcb_type_list():
	return json.dumps(all_lcb_type_list)

lcb_type_list = {}
for key, value in all_lcb_type_list.items():
	lcb_type_list[key] = value["Real"]
 
lcb_type_list_api = {}
for key, value in all_lcb_type_list.items():
	lcb_type_list_api[key] = value["API"]

def get_select_acitve_list():
	return json.dumps(active_type_list)
       
def get_lcb_type_list():
    return json.dumps(lcb_type_list)

def generate_select_lists(select_type, select_LCB):
    Select_Active_List = [active_type_list_api[item] for item in select_type]
    Select_LCB_Case = lcb_type_list_api[select_LCB]

    return Select_Active_List, Select_LCB_Case

# Example Usage:
select_type = [0, 1, 2]
select_LCB = 1

Select_Active_List, Select_LCB_Case = generate_select_lists(select_type, select_LCB)
# print("Select_Active_List:", Select_Active_List)
# print("Select_LCB_Case:", Select_LCB_Case)


### Download ###

def save_dataframe_to_excel(dataframe, filename=None):
    # 기본 다운로드 경로
    download_path = os.path.expanduser("~")

    # If a file name is not given, a file name is created using the current date and time.
    if not filename:
        filename = f"output.txt"

    # Set file storage path
    file_path = os.path.join(download_path, filename)

    # Save DataFrame as a text file (CSV format with tab-separated values)
    dataframe.to_csv(file_path, sep='\t', index=False)

    print(f"Text file saved at: {file_path}")