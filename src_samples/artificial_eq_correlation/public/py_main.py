### do not delete this import scripts ###
import json
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet
import numpy as np
### do not delete this import scripts ###

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

def calculate_correlation(THFC_List, THFC_Data):
	THFC_List = json.loads(THFC_List)
	THFC_Data = json.loads(THFC_Data)
	
	Checked_List = []
	for i in range(len(THFC_List)):
		if THFC_List[i]['checked'] == True:
			Checked_List.append(THFC_List[i]['name'])

	## THFC_Data 내의 데이터를 1:1 비교하며 상관계수를 계산
	Correlation_Result = []
	for i in range(len(Checked_List)):
		Name_i = Checked_List[i]
		for j in range(i+1, len(Checked_List)):
			Name_j = Checked_List[j]
			
			## TIME 값이 일치하는지 확인
			Time_i = THFC_Data[Name_i]['TIME']
			Time_j = THFC_Data[Name_j]['TIME']
			if Time_i != Time_j:
				Correlation_Result.append({'NAME1': Name_i, 'NAME2': Name_j, 'CORRELATION': 'NG'})
			else:
				Value_i = THFC_Data[Name_i]['VALUE']
				Value_j = THFC_Data[Name_j]['VALUE']
				
				Correlation = abs(np.corrcoef(Value_i, Value_j)[0][1])
				if np.isnan(Correlation):
					Correlation_Result.append({'NAME1': Name_i, 'NAME2': Name_j, 'CORRELATION': 'NG'})
				else:
					Correlation_Result.append({'NAME1': Name_i, 'NAME2': Name_j, 'CORRELATION': round(Correlation,5)})
	return json.dumps(Correlation_Result)