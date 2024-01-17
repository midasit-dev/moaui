import os
import datetime
import json
from js import Blob, document
from js import window
### Select_Active_List & Select_LCB_Case ###

def get_select_acitve_list():
    Active_Type_list = {
        1: "Strength/Stress",
        2: "Serviceability",
        3: "Special",
        4: "Vertical",
        5: "Strength(Ealstic)",
        6: "U.G.Strength/Stress",
        7: "U.G.Serviceability",
        8: "U.G.Special"
    }
    
    return json.dumps(Active_Type_list)

def get_lcb_type_list():
    lcb_type_List = {
        # 0: "Select LCB Case",
        1: "Steel Design",
        2: "Concrete Design",
        3: "SRC_Design",
        4: "Composite Steel Girder Design",
        5: "Seismic"
    }
    
    return json.dumps(lcb_type_List)

def generate_select_lists(select_type, select_LCB):
    Active_Type_list_API = {
        0: "INACTIVE",
        1: "STRENGTH",
        2: "SERVICE",
        3: "SPECIAL",
        4: "VERTICAL",
        5: "ELSTRENGTH",
        6: "UGSTRENGTH",
        7: "UGSERVICE",
        8: "UGSPECIAL"
    }

    lcb_type_List_API = {
        1: "LCOM-STEEL",
        2: "LCOM-CONC",
        3: "LCOM-SRC",
        4: "LCOM-STLCOMP",
        5: "LCOM-SEISMIC"
    }

    Select_Active_List = [Active_Type_list_API[item] for item in select_type]
    Select_LCB_Case = lcb_type_List_API[select_LCB]

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