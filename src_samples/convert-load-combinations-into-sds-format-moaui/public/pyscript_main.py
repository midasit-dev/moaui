'''                                                                     
                                                      __             
 _____    __  __                ___ ___       __     /\_\     ___    
/\ '__`\ /\ \/\ \             /' __` __`\   /'__`\   \/\ \  /' _ `\  
\ \ \L\ \\ \ \_\ \            /\ \/\ \/\ \ /\ \L\.\_  \ \ \ /\ \/\ \ 
 \ \ ,__/ \/`____ \           \ \_\ \_\ \_\\ \__/.\_\  \ \_\\ \_\ \_\
  \ \ \/   `/___/> \  _______  \/_/\/_/\/_/ \/__/\/_/   \/_/ \/_/\/_/
   \ \_\      /\___/ /\______\                                       
    \/_/      \/__/  \/______/                                       

'''

# this is sample code for python script.
# if you want to use other python files, import here and functions export your javascript code.
import json
from pyscript_engineers_web import set_g_values, get_g_values, requests_json
from pyscript_engineers_web import MidasAPI, Product
from Component import get_all_lcb_type_list, get_select_acitve_list, get_lcb_type_list, generate_select_lists, save_dataframe_to_excel
import copy
import pandas as pd
import numpy as np

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
                            __                         __                                
                     __    /\ \__                     /\ \                               
 __  __  __   _ __  /\_\   \ \ ,_\     __             \ \ \___       __    _ __     __   
/\ \/\ \/\ \ /\`'__\\/\ \   \ \ \/   /'__`\            \ \  _ `\   /'__`\ /\`'__\ /'__`\ 
\ \ \_/ \_/ \\ \ \/  \ \ \   \ \ \_ /\  __/             \ \ \ \ \ /\  __/ \ \ \/ /\  __/ 
 \ \___x___/' \ \_\   \ \_\   \ \__\\ \____\             \ \_\ \_\\ \____\ \ \_\ \ \____\
  \/__//__/    \/_/    \/_/    \/__/ \/____/  _______     \/_/\/_/ \/____/  \/_/  \/____/
                                             /\______\                                   
                                             \/______/                                   
'''
# ↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓

def main(select_type, select_LCB):
	try:
		CivilApp = MidasAPI(Product.CIVIL, "KR")
		Select_Active_List, Select_LCB_Case = generate_select_lists(select_type, select_LCB)
  
		# Select ANAL_NAME List
		ANAL_NAME_List = {
				1 : "CBS",
				2 : "CBC",
				3 : "CBR",
				4 : "CBSC",
				5 : "CBSM"
		}

		# ANAL_NAME List
		Select_ANAL_NAME = ANAL_NAME_List[select_LCB]

		lcomb = CivilApp.db_read_try_catch(Select_LCB_Case)
		lcomb_Select ={}

		for key in lcomb.keys() :
				for i in range(len(select_type)):
						if lcomb[key]["ACTIVE"] == Select_Active_List[i] :
								lcomb_Select[key] = lcomb[key]
						else : pass

		# Add Type 만 선택
		lcomb_data = {}

		for key in lcomb_Select.keys() :
				if lcomb_Select[key]["iTYPE"] == 0:
						lcomb_data[key] = lcomb_Select[key]
				else : pass

		# LoadCase에 CBC데이터가 있는 경우 ACTIVE -> INACTIVE로 변경

		# Active / InActive 구분
		active_data = {}
		inactive_data = {}

		for key in lcomb_data.keys() :
				if lcomb_data[key]["ACTIVE"] == "INACTIVE" :
						inactive_data[key] = lcomb_data[key]
				else:
						active_data[key] = lcomb_data[key]

		# inactive_data 중 Name 추출
		name_list = [value['NAME']for value in inactive_data.values()]

		# Active_data 중 Name 추출
		name_list_cbc = []
		for key, value in active_data.items():
				for item in value['vCOMB']:
						if item["ANAL"] == Select_ANAL_NAME:
								name_list_cbc.append(item["LCNAME"])
						else: pass

		list_cbc_set = list(set(name_list_cbc))

		# Active_data 중 CBC를 포함한 데이터 INACTIVE로 변경
		for key in active_data.keys() :
				for i in range(len(list_cbc_set)): 
						if active_data[key]["NAME"] == list_cbc_set[i] :
								inactive_data[key] = lcomb_data[key]

		# inactive_data 중 vCOMB 데이터 추출
		inactive_vCOMB={}
		for key in inactive_data.keys():
				inactive_vCOMB[inactive_data[key]["NAME"]] = inactive_data[key]["vCOMB"]

		# 최종 comb에 변경할 내용만 추출하기

		final_comb = {}
		i = len(inactive_vCOMB)
		for n in range(i-1): 
				for key in active_data.keys():
						vCOMB = active_data[key]["vCOMB"]
						for index, value in enumerate(vCOMB):
								if value["LCNAME"] in list_cbc_set:
										final_comb[key] = active_data[key]

										# active vCOMB에서 Factor값 추출
										for index, value in enumerate(vCOMB):
												if value["LCNAME"] in list_cbc_set:
														factor = value["FACTOR"]
														lcname = value["LCNAME"]
														vCOMB_del = vCOMB.pop(index)

														# Factor를 곱한 inactive_vCOMB 만들기
														vCOMB_reset = copy.deepcopy(inactive_vCOMB)
														for i in range(len(vCOMB_reset[lcname])):
																final_factor = round(vCOMB_reset[lcname][i]["FACTOR"] * factor, 4)
																vCOMB_reset[lcname][i]["FACTOR"] = final_factor

														# vCOMB 리스트 결합
														sum_vCOMB = list(vCOMB) + list(vCOMB_reset[lcname])

														# final_comb vCOMB 대체
														final_comb[key]["vCOMB"] = sum_vCOMB

		# CivilApp.db_update("LCOM-CONC",final_comb)

		# SDS로 바꾸기 위한 데이터 정렬
		final_load_case=copy.deepcopy(lcomb_data)

		for key in lcomb_data.keys() :
				if final_load_case[key]["ACTIVE"]=="INACTIVE":
						del final_load_case[key]
				else :
						pass

		# SDS 리스트 생성
		# Active_list
		Active_list = []
		for key in final_load_case.keys() :
						if final_load_case[key]["ACTIVE"] == "STRENGTH" :
										Active_list.append(1)
						else: Active_list.append(0)

		# lcb_number_list
		lcb_number_list = []
		for key in final_load_case.keys() :
						lcb_number_list.append(final_load_case[key]["NAME"])


		# load case 정리
		## STLD
		load_case_st = CivilApp.db_read_try_catch("STLD")
		# NO 값을 기준으로 오름차순으로 정렬
		load_Case_st_rev = sorted(load_case_st.items(), key=lambda x: x[1]['NO'])

		# 정렬된 결과를 딕셔너리로 변환
		load_Case_st_sort = {k: v for k, v in load_Case_st_rev}

		list_st = []
		list_st_case = []
		for key in load_Case_st_sort.keys() :
						list_st.append(load_Case_st_sort[key]["NAME"])
		for i in range(len(list_st)):
						list_st_case.append(list_st[i]+"(ST)")

		## SPLC
		load_case_dy = CivilApp.db_read_try_catch("SPLC")

		list_Es_check = ()
		list_dy = []
		list_dy_case = []
		list_Es = []
		list_Es_case = []
		if load_case_dy != None:
						for key in load_case_dy.keys() :
										list_dy.append(load_case_dy[key]["NAME"])
						for i in range(len(list_dy)):
										list_dy_case.append(list_dy[i]+"(RS)")
						
						for key in lcomb_data.keys() :
										for i in range(len(lcomb_data[key]["vCOMB"])) :
														if lcomb_data[key]["vCOMB"][i]["ANAL"] == "ES":
																		list_Es_check = 1
						for i in range(len(list_dy)):
										if list_Es_check == 1 :
														list_Es.append(list_dy[i])
						for i in range(len(list_Es)):
										list_Es_case.append(list_Es[i]+"(Es)")

		sum_list_case = list_st + list_dy + list_Es_case
		sum_list_type = list_st_case + list_dy_case + list_Es_case

		# factor list 생성
		lc_factors = {lcname: {key: next((item['FACTOR'] for item in value.get('vCOMB', []) if item['LCNAME'] == lcname), 0)
																								for key, value in final_load_case.items()}
																for lcname in sum_list_case}
		if list_Es_check== 1 :
						Rx_Es_factors = {key: next((item['FACTOR'] for item in value['vCOMB'] if item['LCNAME'] == list_Es[0]), 0)
																		for key, value in final_load_case.items()}
						Ry_Es_factors = {key: next((item['FACTOR'] for item in value['vCOMB'] if item['LCNAME'] == list_Es[1]), 0)
																		for key, value in final_load_case.items()}
		else : pass

		if list_Es_check == 1 :
						lc_factors[list_Es_case[0]] = Rx_Es_factors
						lc_factors[list_Es_case[1]] = Ry_Es_factors
		else : pass

		# 순서 정리
  
  	# Replace spaces in keys with underscores "Self Weight" -> "Self_Weight"
		lc_factors_with_underscore = {key.replace(' ', '_'): value for key, value in lc_factors.items()}
		sorted_keys = sorted(lc_factors, key=lambda x:sum_list_case.index(x))
  
  	# Replace spaces in keys with underscores "Self Weight" -> "Self_Weight"
		sorted_keys_with_underscore = [key.replace(' ', '_') for key in sorted_keys]
  
		sorted_factors = {key: lc_factors_with_underscore[key] for key in sorted_keys_with_underscore}

		# Pandas 형식으로 정리
		df1 = pd.DataFrame(sorted_factors)
		df2 = pd.DataFrame(lcb_number_list)
		df2_2 = df2.rename(columns={0:"Name"})
		df3 = pd.DataFrame(Active_list)
		df3_2 = df3.rename(columns={0:"ACTIVE"})
		df1.reset_index(drop=True, inplace=True)

		# df2를 이어붙이기
		result_df = pd.concat([df3_2,df2_2, df1], axis=1)
		result_df.index = result_df.index + 1
		# print("result_df \n",result_df)

		########################
		##### Component.py #####
		########################

		# result_df.to_excel(os.path.join(os.path.expanduser("~/Downloads"), 'TEST9.xlsx'), index=False)
		# return result_df.to_json(orient='records')
		save_dataframe_to_excel(result_df)
  
		# pd.set_option('display.max_rows', None)
		# pd.set_option('display.max_columns', None)
		# print("Last result: \n",str(result_df))
		# pd.reset_option('all')
		# return str(result_df)
  
  	# Convert the DataFrame to a list of dictionaries
		result_list = result_df.to_dict(orient='records')
		return json.dumps({
			"value": result_list
		})
  
	except Exception as e:
		print("exception: ", e)
		return json.dumps(e.args[0])
	