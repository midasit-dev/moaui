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
import math
from pyscript_engineers_web import set_g_values, get_g_values, requests_json
from pyscript_engineers_web import MidasAPI, Product
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

def py_db_get_maxid(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_get_max_id(item_name))
'''

██╗    ██╗██████╗ ██╗████████╗███████╗    ██╗  ██╗███████╗██████╗ ███████╗
██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝    ██║  ██║██╔════╝██╔══██╗██╔════╝
██║ █╗ ██║██████╔╝██║   ██║   █████╗      ███████║█████╗  ██████╔╝█████╗  
██║███╗██║██╔══██╗██║   ██║   ██╔══╝      ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██║  ██║███████╗██║  ██║███████╗
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
                                                                          
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
'''

def CalFoundationCoordinates(Width, Length):
	FoundationCoordinates = []
	FoundationCoordinates.append([0, 0])
	FoundationCoordinates.append([0, Width])
	FoundationCoordinates.append([Length, Width])
	FoundationCoordinates.append([Length, 0])
	FoundationCoordinates.append([0, 0])
	return json.dumps(FoundationCoordinates)

def extract_numbers(input_string):
	parts = input_string.replace(',', ' ').split()
	
	result = []
	for part in parts:
		if '@' in part:
			sub_parts = part.split('@')
			try:
				num1 = int(sub_parts[0])
				num2 = float(sub_parts[1])
				result += [num2] * num1
			except:
				pass
		else:
			try:
				num = float(part)
				result.append(num)
			except:
				pass
	return json.dumps(result)

## 각 pile의 좌표 계산
def CalPileCoordinates(PileTableData, PileLocationData):
    
    ## Width는 Y축, Length는 X축
    ## PileDia는 Pile의 지름
    ## MajorRefValue는 X축의 기준점 (1일 경우 원점, 2일 경우 Length)
    ## MinorRefValue는 Y축의 기준점 (1일 경우 원점, 2일 경우 Width)
    
	pileTableData = json.loads(PileTableData)
	pileLocationData = json.loads(PileLocationData)
	Coordinates = []
	for i in range(len(pileLocationData)):
		GroupCoordinates = []
		for j in range(len(pileLocationData[i])):
			Diameter = float(pileTableData[i]['concreteDiameter'])/1000
			EachPileCoordinates = []
			for angle in range(0, 360, 30):
				## Dia 단위가 mm
				x = float(pileLocationData[i][j][0]) + Diameter/2 * math.cos(math.radians(angle))
				y = float(pileLocationData[i][j][1]) + Diameter/2 * math.sin(math.radians(angle))
				EachPileCoordinates.append([x, y])
			EachPileCoordinates.append(EachPileCoordinates[0])
			GroupCoordinates.append(EachPileCoordinates)
		Coordinates.append(GroupCoordinates)
	return json.dumps(Coordinates)
	

## 각 파일의 중심 좌표 계산 (각 파일 타입 별로 받음)
def CalPileCenterCoordinates(PileData, FoundationWidth, SideLength):

	pileData = json.loads(PileData)
	foundationWidth = float(json.loads(FoundationWidth))
	sideLength = float(json.loads(SideLength))
	majorSpace = json.loads(extract_numbers(pileData['majorSpace']))
	CenterX = []
	try:
		if pileData['majorRefValue'] == 1:
			CenterX = [float(pileData['majorStartPoint'])]
			for i in range(len(majorSpace)):
				CenterX.append(float(CenterX[i]+float(majorSpace[i])))
		elif pileData['majorRefValue'] == 2:
			CenterX=[float(sideLength)-float(pileData['majorStartPoint'])]
			for i in range(len(majorSpace)):
				CenterX.append(float(CenterX[i]-float(majorSpace[i])))
		CenterCoordinates = []
		if pileData['minorRefValue'] == 1:
			for i in range(len(CenterX)):
				CenterCoordinates.append([CenterX[i], float(pileData['minorStartPoint'])])
		elif pileData['minorRefValue'] == 2:
			for i in range(len(CenterX)):
				CenterCoordinates.append([CenterX[i], float(foundationWidth)-float(pileData['minorStartPoint'])])
	except:
		ErrorReturn = [[0,0]]
		return json.dumps(ErrorReturn)
	return json.dumps(CenterCoordinates)

## 각 파일의 각도 계산
def CalPileDegree(PileData):
    
	pileData = json.loads(PileData)

	majorDegree = json.loads(extract_numbers(pileData['majorDegree']))
	minorDegree = json.loads(extract_numbers(pileData['minorDegree']))
	degree = []
	## 각 파일의 각도의 개수를 조정하는 코드 추가 필요함
	for i in range(len(majorDegree)):
		degree.append([majorDegree[i], minorDegree[i]])
	return json.dumps(degree)

## 말뚝 특성치 계산
def Cal_Beta(SoilData, PileTableData, Condition, SlopeEffectState, GroupEffectValue):
    
	pileTableData = json.loads(PileTableData)
	soilData = json.loads(SoilData)

	Beta = [1 for i in range(len(pileTableData))]
	Avg_alpha_E0 = [0 for i in range(len(pileTableData))]
	Bh = [0 for i in range(len(pileTableData))]
	Kh0 = [0 for i in range(len(pileTableData))]
	Kh = [0 for i in range(len(pileTableData))]
	Alpha_H_Theta_Total = json.loads(CalAlphaTheta(json.dumps(soilData), SlopeEffectState, json.dumps(pileTableData)))
	for i in range(len(pileTableData)):

		InitialBeta = 1/(float(pileTableData[i]['pileLength'])/4)
		while True:
			LayerDepth = 0
			Avg_alpha_E0[i] = 0
			for j in range(len(soilData)):
				Alpha_HTheta = Alpha_H_Theta_Total[j]
				LayerDepth += float(soilData[j]['Depth'])
				if LayerDepth < (1/InitialBeta):
					## DE(액상화 저감계수)는 고유주기 특성치 계산시에만 적용
					## 군말뚝 효과는 항상 적용
					## 사면 효과는 항상 적용
					if (Condition == 'normal'):
						Avg_alpha_E0[i] += float(soilData[j]['aE0'])*float(soilData[j]['Depth']) * Alpha_HTheta
					elif (Condition == 'seismic'):
						De = float(soilData[j]['DE'])
						Avg_alpha_E0[i] += float(soilData[j]['aE0_Seis'])*float(soilData[j]['Depth'])* Alpha_HTheta
					elif (Condition == 'period'):
						De = float(soilData[j]['DE'])
						Avg_alpha_E0[i] += float(soilData[j]['ED'])*float(soilData[j]['Depth'])*De*Alpha_HTheta
				else:
					if (Condition == 'normal'):
						Avg_alpha_E0[i] += float(soilData[j]['aE0'])*((1/InitialBeta)-(LayerDepth-float(soilData[j]['Depth'])))* Alpha_HTheta
						break
					elif (Condition == 'seismic'):
						De = float(soilData[j]['DE'])
						Avg_alpha_E0[i] += float(soilData[j]['aE0_Seis'])*((1/InitialBeta)-(LayerDepth-float(soilData[j]['Depth'])))* Alpha_HTheta
						break
					elif (Condition == 'period'):
						De = float(soilData[j]['DE'])
						Avg_alpha_E0[i] += float(soilData[j]['ED'])*((1/InitialBeta)-(LayerDepth-float(soilData[j]['Depth'])))*De*Alpha_HTheta
						break
			Avg_alpha_E0[i] = Avg_alpha_E0[i]/(1/InitialBeta)
			Properties = json.loads(Cal_EI_D(json.dumps(pileTableData[i]), (1/InitialBeta)))
			PileEI = Properties[0]
			PileD = Properties[1]
			Bh[i] = math.sqrt(PileD/InitialBeta)
			Kh0[i] = Avg_alpha_E0[i] / (0.3)
			Kh[i] = Kh0[i] * math.pow((Bh[i]/0.3),(-3/4))*float(GroupEffectValue)
			Beta[i] = math.pow((Kh[i]*PileD/(4*PileEI)),(1/4))
			if abs(Beta[i]-InitialBeta) > 0.00000001:
				InitialBeta = Beta[i]	
			elif abs(Beta[i]-InitialBeta) <= 0.00000001:
				break

	result = [Beta, Avg_alpha_E0, Bh, Kh0, Kh]
	return json.dumps(result)
   
def CalAlphaTheta(SoilData, SlopeEffectState, PileTableData):
    
	soilData = json.loads(SoilData)
	pileTableData = json.loads(PileTableData)
	Property = json.loads(Cal_Property(json.dumps(pileTableData[0]), 'top', 'reinforced'))
	Diameter = float(Property[3])
	Alpha_HTheta = [1 for i in range(len(soilData))]
	if (SlopeEffectState == True):
		for i in range(len(soilData)):
			Alpha_H = float(soilData[i]['Length'])/Diameter
			if (Alpha_H >=0 and Alpha_H < 0.5):
				Alpha_HTheta[i] = 0
			elif (Alpha_H >= 0.5 and Alpha_H < 10):
				Alpha_HTheta[i] = float(round(0.3*math.log10(Alpha_H)+0.7,3))
			else :
				Alpha_HTheta[i] = 1
	return json.dumps(Alpha_HTheta)

def CalKv(PileTableData):
    
	pileTableData = json.loads(PileTableData)
	Alpha1 =[0 for i in range(len(pileTableData))]
	Alpha2 =[0 for i in range(len(pileTableData))]
	Kv = [0 for i in range(len(pileTableData))]
	Kv_Top_Reinforced = [0 for i in range(len(pileTableData))]
	Kv_Top_Unreinforced = [0 for i in range(len(pileTableData))]
	Kv_Bottom_Reinforced = [0 for i in range(len(pileTableData))]
	Kv_Bottom_Unreinforced = [0 for i in range(len(pileTableData))]

	for i in range(len(pileTableData)):
		if (pileTableData[i]['constructionMethod'] == '타격말뚝(타격 공법)'):
			Alpha1[i] = 0.014
			Alpha2[i] = 0.72
		elif (pileTableData[i]['constructionMethod'] == '타격말뚝(바이브러 해머공법)'):
			Alpha1[i] = 0.017
			Alpha2[i] = -0.014
		elif (pileTableData[i]['constructionMethod'] == '현장타설말뚝'):
			Alpha1[i] = 0.031
			Alpha2[i] = -0.15
		elif (pileTableData[i]['constructionMethod'] == '중굴착 말뚝'):
			Alpha1[i] = 0.01
			Alpha2[i] = 0.36
		elif (pileTableData[i]['constructionMethod'] == 'preboring 말뚝'):
			Alpha1[i] = 0.013
			Alpha2[i] = 0.53
		elif (pileTableData[i]['constructionMethod'] == '강관 소일시멘트 말뚝'):
			Alpha1[i] = 0.040
			Alpha2[i] = 0.15
		elif (pileTableData[i]['constructionMethod'] == '회전말뚝'):
			Alpha1[i] = 0.013
			Alpha2[i] = 0.54
			
		
		if(pileTableData[i]['compositeTypeCheck'] == True):
			Top_Length = float(pileTableData[i]['compStartLength'])
			Bottom_Length = float(pileTableData[i]['pileLength']) - float(pileTableData[i]['compStartLength'])
		else:
			Top_Length = float(pileTableData[i]['pileLength'])
			Bottom_Length = 0
		if(float(pileTableData[i]['reinforcedEndLength']) - float(pileTableData[i]['reinforcedStartLength']) == 0):
			Reinforced_Existance = False
			ReinforcedStartLength = 0
			ReinforcedEndLength = 0
		else:
			Reinforced_Existance = True
			ReinforcedStartLength = float(pileTableData[i]['reinforcedStartLength'])
			ReinforcedEndLength = float(pileTableData[i]['reinforcedEndLength'])

		if (Reinforced_Existance == False):
			Top_Unreinforced_Length = Top_Length
			Top_Reinforced_Length = 0
			Bottom_Unreinforced_Length = Bottom_Length
			Bottom_Reinforced_Length = 0
			
		else:
			if Bottom_Length == 0:
				Top_Reinforced_Length = ReinforcedEndLength - ReinforcedStartLength
				Top_Unreinforced_Length = Top_Length - Top_Reinforced_Length
				Bottom_Reinforced_Length = 0
				Bottom_Unreinforced_Length = 0
			else:
				if ReinforcedEndLength <= Top_Length:
					Top_Reinforced_Length = ReinforcedEndLength - ReinforcedStartLength
					Top_Unreinforced_Length = Top_Length - Top_Reinforced_Length
					Bottom_Reinforced_Length = 0
					Bottom_Unreinforced_Length = Bottom_Length
				elif ReinforcedStartLength < Top_Length and ReinforcedEndLength > Top_Length:
					Top_Reinforced_Length = Top_Length - ReinforcedStartLength
					Top_Unreinforced_Length = ReinforcedStartLength
					Bottom_Reinforced_Length = ReinforcedEndLength - Top_Length
					Bottom_Unreinforced_Length = Bottom_Length - Bottom_Reinforced_Length
				elif Top_Length <= ReinforcedStartLength:
					Top_Reinforced_Length = 0
					Top_Unreinforced_Length = Top_Length
					Bottom_Reinforced_Length = ReinforcedEndLength - ReinforcedStartLength
					Bottom_Unreinforced_Length = Bottom_Length - Bottom_Reinforced_Length

		if (Top_Unreinforced_Length == 0):
			Kv_Top_Unreinforced[i] = 0
		else:
			try:
				Property = json.loads(Cal_Property(json.dumps(pileTableData[i]), 'top', 'unreinforced'))
				if (pileTableData[i]['pileType'] == '소일시멘트말뚝'):
					Asp = Property[4]
					Esp = Property[6]
					Asc = Property[5]
					Esc = Property[7]
					Alpha = Alpha1[i] * (Top_Unreinforced_Length/Property[3]) + Alpha2[i]
					Kv_Top_Unreinforced[i] = 1/(Alpha*(Asp*Esp + Asc*Esc)/Top_Unreinforced_Length)
				else:
					Ap = Property[0]
					Ep = Property[1]
					Alpha = Alpha1[i] * (Top_Unreinforced_Length/Property[3]) + Alpha2[i]
					Kv_Top_Unreinforced[i] = 1/(Alpha*Ap*Ep/Top_Unreinforced_Length)
			except:
				error = 'error'
    
		if (Top_Reinforced_Length == 0):
			Kv_Top_Reinforced[i] = 0
		else:
			try:
				Property = json.loads(Cal_Property(json.dumps(pileTableData[i]), 'top', 'reinforced'))
				if (pileTableData[i]['pileType'] == '소일시멘트말뚝'):
					Asp = Property[4]
					Esp = Property[6]
					Asc = Property[5]
					Esc = Property[7]
					Alpha = Alpha1[i] * (Top_Reinforced_Length/Property[3]) + Alpha2[i]
					Kv_Top_Reinforced[i] = 1/(Alpha*(Asp*Esp + Asc*Esc)/Top_Reinforced_Length)
				else:
					Ap = Property[0]
					Ep = Property[1]
					Alpha = Alpha1[i] * (Top_Reinforced_Length/Property[3]) + Alpha2[i]
					Kv_Top_Reinforced[i] = 1/(Alpha*Ap*Ep/Top_Reinforced_Length)
			except:
				error = 'error'
    
		if (Bottom_Unreinforced_Length == 0):
			Kv_Bottom_Unreinforced[i] = 0
		else:
			try:
				Property = json.loads(Cal_Property(json.dumps(pileTableData[i]), 'bottom', 'unreinforced'))
				if (pileTableData[i]['compPileType'] == '소일시멘트말뚝'):
					Asp = Property[4]
					Esp = Property[6]
					Asc = Property[5]
					Esc = Property[7]
					Alpha = Alpha1[i] * (Bottom_Unreinforced_Length/Property[3]) + Alpha2[i]
					Kv_Bottom_Unreinforced[i] = 1/(Alpha*(Asp*Esp + Asc*Esc)/Bottom_Unreinforced_Length)
				else:
					Ap = Property[0]
					Ep = Property[1]
					Alpha = Alpha1[i] * (Bottom_Unreinforced_Length/Property[3]) + Alpha2[i]
					Kv_Bottom_Unreinforced[i] = 1/(Alpha*Ap*Ep/Bottom_Unreinforced_Length)
			except:
				error = 'error'
    
		if (Bottom_Reinforced_Length == 0):
			Kv_Bottom_Reinforced[i] = 0
		else:
			try:
				Property = json.loads(Cal_Property(json.dumps(pileTableData[i], 'bottom', 'reinforced')))
				if (pileTableData[i]['compPileType'] == '소일시멘트말뚝'):
					Asp = Property[4]
					Esp = Property[6]
					Asc = Property[5]
					Esc = Property[7]
					Alpha = Alpha1[i] * (Bottom_Reinforced_Length/Property[3]) + Alpha2[i]
					Kv_Bottom_Reinforced[i] = 1/(Alpha*(Asp*Esp + Asc*Esc)/Bottom_Reinforced_Length)
				else:
					Ap = Property[0]
					Ep = Property[1]
					Alpha = Alpha1[i] * (Bottom_Reinforced_Length/Property[3]) + Alpha2[i]
					Kv_Bottom_Reinforced[i] = 1/(Alpha*Ap*Ep/Bottom_Reinforced_Length)
			except:
				error = 'error'
    
		Kv[i] = 1/(Kv_Top_Unreinforced[i] + Kv_Top_Reinforced[i] + Kv_Bottom_Unreinforced[i] + Kv_Bottom_Reinforced[i])

	result = [Kv, Alpha1, Alpha2, Kv_Top_Unreinforced, Kv_Top_Reinforced, Kv_Bottom_Unreinforced, Kv_Bottom_Reinforced]
	return json.dumps(result)

def CalKValue(PileTableData, GroundLevel, TopLevel, SoilData, Condition, SlopeEffectState, GroupEffectValue):
    
	pileTableData = json.loads(PileTableData)

	h = float(TopLevel) - float(GroundLevel)
	CalBetaResult = json.loads(Cal_Beta(SoilData, PileTableData, Condition, SlopeEffectState, GroupEffectValue))
	Kvalue = [[0,0,0,0] for i in range(len(pileTableData))]
	for i in range(len(pileTableData)):
		
		## Area, Modulus, SecInertia, Diameter, SteelArea, CementArea, SteelModulus, CementModulus, SteelInertia, CementInertia
		if float(pileTableData[i]['reinforcedStartLength']) == 0 and float(pileTableData[i]['reinforcedStartLength'])-float(pileTableData[i]['reinforcedEndLength']) != 0:
			Property = json.loads(Cal_Property(json.dumps(pileTableData[i]), 'top','reinforced'))
		else:
			Property = json.loads(Cal_Property(json.dumps(pileTableData[i]), 'top','unreinforced'))


		if (pileTableData[i]['pileType'] == '소일시멘트말뚝'):
			## 소일시멘트 말뚝이면 강관 modulus, 2차단면모멘트 사용
			Modulus = Property[6]
			SecInertia = Property[8]
		else:
			Modulus = Property[1]
			SecInertia = Property[2]
   
		Beta = float(CalBetaResult[0][i])

		if (pileTableData[i]['headCondition'] == '강결'):
			if (h == 0):
				Kvalue[i][0] = 4*Modulus*SecInertia*math.pow(Beta,3)
				Kvalue[i][1] = 2*Modulus*SecInertia*math.pow(Beta,2)
				Kvalue[i][2] = 2*Modulus*SecInertia*math.pow(Beta,2)
				Kvalue[i][3] = 2*Modulus*SecInertia*math.pow(Beta,1)
			else:
				Kvalue[i][0] = (12*Modulus*SecInertia*math.pow(Beta,3))/(math.pow(1+Beta*h,3)+2)
				Kvalue[i][1] = Kvalue[i][0]*(h+1/Beta)/2
				Kvalue[i][2] = Kvalue[i][0]*(h+1/Beta)/2
				Kvalue[i][3] = (4*Modulus*SecInertia*Beta)/(1+Beta*h)*(math.pow(1+Beta*h,3)+0.5)/(math.pow(1+Beta*h,3)+2)
		
		elif (pileTableData[i]['headCondition'] == '힌지'):
			if (h == 0):
				Kvalue[i][0] = 2*Modulus*SecInertia*math.pow(Beta,3)
				Kvalue[i][1] = 0
				Kvalue[i][2] = 0
				Kvalue[i][3] = 0
			else:
				Kvalue[i][0] = (3*Modulus*SecInertia*math.pow(Beta,3))/(math.pow(1+Beta*h,3)+0.5)
				Kvalue[i][1] = 0
				Kvalue[i][2] = 0
				Kvalue[i][3] = 0
	
	return json.dumps(Kvalue)

def CalDistFromCentriod(PileTableData, FoundationWidth, SideLength):
    
	pileTableData = json.loads(PileTableData)
	foundationWidth = json.loads(FoundationWidth)
	sideLength = json.loads(SideLength)
	TotalPileNums = 0
	CenterX = 0
	CenterY = 0
	CentroidX = 0
	CentroidY = 0
	for pileData in pileTableData:
		CenterCoordinates = json.loads(CalPileCenterCoordinates(json.dumps(pileData), json.dumps(foundationWidth), json.dumps(sideLength)))
		for i in range(len(CenterCoordinates)):
			CenterX = CenterX + float(CenterCoordinates[i][0])
			CenterY = CenterY + float(CenterCoordinates[i][1])
		TotalPileNums += 1
	CentroidX = CenterX / TotalPileNums
	CentroidY = CenterY / TotalPileNums
	DistFromCentroid = []
	for pileData in pileTableData:
		CenterCoordinates = json.loads(CalPileCenterCoordinates(json.dumps(pileData), json.dumps(foundationWidth), json.dumps(sideLength)))
		for i in range(len(CenterCoordinates)):
			CenterCoordinates[i][0] = CenterCoordinates[i][0] - CentroidX
			CenterCoordinates[i][1] = CenterCoordinates[i][1] - CentroidY
		
		DistFromCentroid.append(CenterCoordinates)
	return json.dumps(DistFromCentroid)
    
def CalMatrix(PileTableData, FoundationWidth, SideLength, GroundLevel, TopLevel, SoilData, SlopeEffectState, ResultType, Direction, GroupEffectValue):
	pileTableData = json.loads(PileTableData)
	foundationWidth = json.loads(FoundationWidth)
	sideLength = json.loads(SideLength)
	soilData = json.loads(SoilData)
	disFromCentroid = json.loads(CalDistFromCentriod(json.dumps(pileTableData), json.dumps(foundationWidth), json.dumps(sideLength)))
	PileDegree = []
	for pileData in pileTableData:
		PileDegree.append(json.loads(CalPileDegree(json.dumps(pileData))))

	## PileDegree 안의 모든 값을 radian으로 변환
	for i in range(len(PileDegree)):
		for j in range(len(PileDegree[i])):
			PileDegree[i][j][0] = math.radians(PileDegree[i][j][0])
			PileDegree[i][j][1] = math.radians(PileDegree[i][j][1])
   

	CalKvResult = json.loads(CalKv(json.dumps(pileTableData)))
	Kv = CalKvResult[0]
	if (ResultType == 'normal'):
		KValue = json.loads(CalKValue(json.dumps(pileTableData), GroundLevel, TopLevel, json.dumps(soilData), 'normal', SlopeEffectState, GroupEffectValue))
	elif (ResultType == 'seismic'):
		KValue = json.loads(CalKValue(json.dumps(pileTableData), GroundLevel, TopLevel, json.dumps(soilData), 'seismic', SlopeEffectState, GroupEffectValue))
	elif (ResultType == 'period'):
		KValue = json.loads(CalKValue(json.dumps(pileTableData), GroundLevel, TopLevel, json.dumps(soilData), 'period',SlopeEffectState, GroupEffectValue))
	Axx = 0 
	Axy = 0 
	Axa = 0 
	Ayy = 0
	Aya = 0
	Aaa = 0
	if (Direction == 'X'):
		for i in range(len(Kv)):
			for j in range(len(PileDegree[i])):
				Axx = Axx + float(KValue[i][0])*math.pow(math.cos(PileDegree[i][j][0]),2) + float(Kv[i])*math.pow(math.sin(PileDegree[i][j][0]),2)
				Axy = Axy + (float(Kv[i])-float(KValue[i][0]))*math.sin(PileDegree[i][j][0])*math.cos(PileDegree[i][j][0])
				Axa = Axa + (float(Kv[i])-float(KValue[i][0]))*float(disFromCentroid[i][j][0])*math.sin(PileDegree[i][j][0])*math.cos(PileDegree[i][j][0])-float(KValue[i][1])*math.cos(PileDegree[i][j][0])
				Ayy = Ayy + float(Kv[i])*math.pow(math.cos(PileDegree[i][j][0]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][0]),2)
				Aya = Aya + (float(Kv[i])*math.pow(math.cos(PileDegree[i][j][0]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][0]),2))*float(disFromCentroid[i][j][0])+float(KValue[i][1])*math.sin(PileDegree[i][j][0])
				Aaa1 = (float(Kv[i])*math.pow(math.cos(PileDegree[i][j][0]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][0]),2))*math.pow(float(disFromCentroid[i][j][0]),2)
				Aaa2 = (float(KValue[i][1])+float(KValue[i][2]))*float(disFromCentroid[i][j][0])*math.sin(PileDegree[i][j][0])+float(KValue[i][3])
				Aaa = Aaa + Aaa1 + Aaa2
	
	elif (Direction == 'Z'):
		for i in range(len(Kv)):
			for j in range(len(PileDegree[i])):
				Axx = Axx + float(KValue[i][0])*math.pow(math.cos(PileDegree[i][j][1]),2) + float(Kv[i])*math.pow(math.sin(PileDegree[i][j][1]),2)
				Axy = Axy + (float(Kv[i])-float(KValue[i][0]))*math.sin(PileDegree[i][j][1])*math.cos(PileDegree[i][j][1])
				Axa = Axa + (float(Kv[i])-float(KValue[i][0]))*float(disFromCentroid[i][j][1])*math.sin(PileDegree[i][j][1])*math.cos(PileDegree[i][j][1])-float(KValue[i][1])*math.cos(PileDegree[i][j][1])
				Ayy = Ayy + float(Kv[i])*math.pow(math.cos(PileDegree[i][j][1]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][1]),2)
				Aya = Aya + (float(Kv[i])*math.pow(math.cos(PileDegree[i][j][1]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][1]),2))*float(disFromCentroid[i][j][1])+float(KValue[i][1])*math.sin(PileDegree[i][j][1])
				Aaa1 = (float(Kv[i])*math.pow(math.cos(PileDegree[i][j][1]),2) + float(KValue[i][0])*math.pow(math.sin(PileDegree[i][j][1]),2))*math.pow(float(disFromCentroid[i][j][1]),2)
				Aaa2 = (float(KValue[i][1])+float(KValue[i][2]))*float(disFromCentroid[i][j][1])*math.sin(PileDegree[i][j][1])+float(KValue[i][3])
				Aaa = Aaa + Aaa1 + Aaa2
	result = [Axx, Axy, Axa, Ayy, Aya, Aaa]
	return json.dumps(result)
 
  
def Cal_Property(PileData, Position, ReinforcedState):
  
	pileData = json.loads(PileData)
	Area = 0
	Modulus = 0
	SecInertia = 0
	Diameter = 0
	SteelArea = 0
	CementArea = 0
	SteelModulus = 0
	CementModulus = 0
	SteelInertia = 0
	CementInertia = 0
	
	## 입력 제원 정리 / 단위계는 KN m 단위로 통일
	## 상부 말뚝일 경우
	try:
		if (Position == 'top'):
			concreteDiameter = float(pileData['concreteDiameter'])/1000 ## mm -> m
			concreteThickness = float(pileData['concreteThickness'])/1000 ## mm -> m
			concreteModulus = float(pileData['concreteModulus'])*1000 ## N/mm^2 -> kN/m^2
			if (pileData['pileType'] == 'PHC말뚝' or pileData['pileType'] == '현장타설말뚝'):
				steelDiameter = float(pileData['steelDiameter'])/10000 ## cm^2 -> m^2
			else:
				steelDiameter = float(pileData['steelDiameter'])/1000 ## mm -> m
			steelThickness = float(pileData['steelThickness'])/1000 ## mm -> m
			steelModulus = float(pileData['steelModulus'])*1000 ## N/mm^2 -> kN/m^2
			steelCorThickness = float(pileData['steelCorThickness'])/1000 ## mm -> m
		
		## 하부 말뚝일 경우
		elif (Position == 'bottom'):
			concreteDiameter = float(pileData['compConcreteDiameter'])/1000 ## mm -> m
			concreteThickness = float(pileData['compConcreteThickness'])/1000 ## mm -> m
			concreteModulus = float(pileData['compConcreteModulus'])*1000 ## N/mm^2 -> kN/m^2
			if (pileData['pileType'] == 'PHC말뚝' or pileData['pileType'] == '현장타설말뚝'):
				steelDiameter = float(pileData['compSteelDiameter'])/10000 ## cm^2 -> m^2
			else:
				steelDiameter = float(pileData['compSteelDiameter'])/1000 ## mm -> m
			steelThickness = float(pileData['compSteelThickness'])/1000 ## mm -> m
			steelModulus = float(pileData['compSteelModulus'])*1000 ## N/mm^2 -> kN/m^2
			steelCorThickness = float(pileData['compSteelCorThickness'])/1000 ## mm -> m
		
		## 보강 단면일 경우
		outerThickness = float(pileData['outerThickness'])/1000 ## mm -> m
		outerModulus = float(pileData['outerModulus'])*1000 ## N/mm^2 -> kN/m^2
		innerThickness = float(pileData['innerThickness'])/1000
		innerModulus = float(pileData['innerModulus'])*1000 ## N/mm^2 -> kN/m^2
	except:
		error = 'error'
	try:
	## 미보강 단면 특성치 계산 (상부)
		if (Position == 'top'):
			if (ReinforcedState == 'unreinforced'):
				if (pileData['pileType'] == '현장타설말뚝'):
					Area = math.pi/4 * (concreteDiameter)**2
					Modulus = concreteModulus
					SecInertia = (math.pi * (concreteDiameter)**4)/64
					Diameter = concreteDiameter

				elif (pileData['pileType'] == 'PHC말뚝'):
					Area = (concreteDiameter-concreteThickness) * math.pi * (concreteThickness) + (steelModulus/concreteModulus-1)*steelDiameter
					Modulus = concreteModulus
					Ic = math.pi/64 * (math.pow(concreteDiameter,4)-math.pow((concreteDiameter-2*concreteThickness),4))
					Is = ((steelModulus)/(concreteModulus)-1)*(1/2)*steelDiameter*math.pow(steelCorThickness,2)
					SecInertia = Ic + Is
					Diameter = concreteDiameter

				elif (pileData['pileType']=='SC말뚝'):
					Area1 = math.pi/4 * (math.pow(concreteDiameter-2*steelCorThickness,2) - math.pow(concreteDiameter-2*concreteThickness,2))
					Area2 = math.pi/4 * (steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,2)-math.pow(concreteDiameter-2*steelThickness,2))
					Area = Area1 + Area2
					Modulus = concreteModulus
					Ic = math.pi/64*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*concreteThickness,4))
					Is = math.pi/64*(steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*steelThickness,4))
					SecInertia = Ic + Is
					Diameter = concreteDiameter
		
				elif (pileData['pileType']=='강관말뚝'):
					Area = math.pi/4 * (math.pow(steelDiameter - 2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					Modulus = steelModulus
					SecInertia = math.pi/64 * (math.pow(steelDiameter - 2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					Diameter = steelDiameter
		
				elif (pileData['pileType']=='소일시멘트말뚝'):
					SteelArea = math.pi/4 * (math.pow(steelDiameter-2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					SteelModulus = steelModulus
					SteelInertia = math.pi/64 * (math.pow(steelDiameter-2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					CementArea = math.pi/4*math.pow(concreteDiameter,2) - SteelArea
					CementModulus = concreteModulus
					CementInertia = math.pi/64 * math.pow(concreteDiameter,4) - SteelInertia
					Diameter = concreteDiameter
		
			## 보강 단면 특성치 계산
			elif (ReinforcedState == 'reinforced'):
				if (pileData['pileType'] == '현장타설말뚝'):
					Area1 = math.pi/4 * (concreteDiameter)**2
					Area2 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+ 2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = concreteModulus
					SecInertia1 = (math.pi * (concreteDiameter)**4)/64
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness
		
				elif (pileData['pileType'] == 'PHC말뚝'):
					Area1 = (concreteDiameter-concreteThickness) * math.pi * (concreteThickness) + (steelModulus/concreteModulus-1)*steelDiameter
					Area2 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+ 2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = concreteModulus
					Ic = math.pi/64 * (math.pow(concreteDiameter,4)-math.pow((concreteDiameter-2*concreteThickness),4))
					Is = ((steelModulus)/(concreteModulus)-1)*(1/2)*steelDiameter*math.pow(steelCorThickness,2)
					SecInertia1 = Ic + Is
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['pileType'] == 'SC말뚝'):
					Area1 = math.pi/4 * (math.pow(concreteDiameter-2*steelCorThickness,2) - math.pow(concreteDiameter-2*concreteThickness,2))
					Area2 = math.pi/4 * (steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,2)-math.pow(concreteDiameter-2*steelThickness,2))
					Area3 = Area1 + Area2
					Area4 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+2*innerThickness)*math.pi*outerThickness
					Area5 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area3 + Area4 + Area5
					Modulus = concreteModulus
					Ic = math.pi/64*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*concreteThickness,4))
					Is = math.pi/64*(steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*steelThickness,4))
					SecInertia1 = Ic + Is
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['pileType'] == '강관말뚝'):
					Area1 = math.pi/4 * (math.pow(steelDiameter - 2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					Area2 = outerModulus/steelModulus*(steelDiameter + outerThickness+2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/steelModulus*(steelDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = steelModulus
					SecInertia1 = math.pi/64 * (math.pow(steelDiameter - 2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					SecInertia2 = (outerModulus)/(steelModulus)/8*math.pow(steelDiameter+outerThickness+innerThickness,2)*(steelDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(steelModulus)/8*math.pow(steelDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = steelDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['pileType']=='소일시멘트말뚝'):
					SteelArea = math.pi/4 * (math.pow(steelDiameter-2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					SteelModulus = steelModulus
					SteelInertia = math.pi/64 * (math.pow(steelDiameter-2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					CementArea = math.pi/4*math.pow(concreteDiameter,2) - SteelArea
					CementModulus = concreteModulus
					CementInertia = math.pi/64 * math.pow(concreteDiameter,4) - SteelInertia
					Diameter = concreteDiameter
		
		## 미보강 단면 특성치 계산 (하부)
		if (Position == 'bottom'):
			if (ReinforcedState == 'unreinforced'):
				if (pileData['compPileType'] == '현장타설말뚝'):
					Area = math.pi/4 * (concreteDiameter)**2
					Modulus = concreteModulus
					SecInertia = (math.pi * (concreteDiameter)**4)/64
					Diameter = concreteDiameter

				elif (pileData['compPileType'] == 'PHC말뚝'):
					Area = (concreteDiameter-concreteThickness) * math.pi * (concreteThickness) + (steelModulus/concreteModulus-1)*steelDiameter
					Modulus = concreteModulus
					Ic = math.pi/64 * (math.pow(concreteDiameter,4)-math.pow((concreteDiameter-2*concreteThickness),4))
					Is = ((steelModulus)/(concreteModulus)-1)*(1/2)*steelDiameter*math.pow(steelCorThickness,2)
					SecInertia = Ic + Is
					Diameter = concreteDiameter

				elif (pileData['compPileType']=='SC말뚝'):
					Area1 = math.pi/4 * (math.pow(concreteDiameter-2*steelCorThickness,2) - math.pow(concreteDiameter-2*concreteThickness,2))
					Area2 = math.pi/4 * (steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,2)-math.pow(concreteDiameter-2*steelThickness,2))
					Area = Area1 + Area2
					Modulus = concreteModulus
					Ic = math.pi/64*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*concreteThickness,4))
					Is = math.pi/64*(steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*steelThickness,4))
					SecInertia = Ic + Is
					Diameter = concreteDiameter
		
				elif (pileData['compPileType']=='강관말뚝'):
					Area = math.pi/4 * (math.pow(steelDiameter - 2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					Modulus = steelModulus
					SecInertia = math.pi/64 * (math.pow(steelDiameter - 2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					Diameter = steelDiameter
		
				elif (pileData['compPileType']=='소일시멘트말뚝'):
					SteelArea = math.pi/4 * (math.pow(steelDiameter-2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					SteelModulus = steelModulus
					SteelInertia = math.pi/64 * (math.pow(steelDiameter-2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					CementArea = math.pi/4*math.pow(concreteDiameter,2) - SteelArea
					CementModulus = concreteModulus
					CementInertia = math.pi/64 * math.pow(concreteDiameter,4) - SteelInertia
					Diameter = concreteDiameter
		
			## 보강 단면 특성치 계산
			elif (ReinforcedState == 'reinforced'):
				if (pileData['compPileType'] == '현장타설말뚝'):
					Area1 = math.pi/4 * (concreteDiameter)**2
					Area2 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+ 2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = concreteModulus
					SecInertia1 = (math.pi * (concreteDiameter)**4)/64
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness
		
				elif (pileData['compPileType'] == 'PHC말뚝'):
					Area1 = (concreteDiameter-concreteThickness) * math.pi * (concreteThickness) + (steelModulus/concreteModulus-1)*steelDiameter
					Area2 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+ 2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = concreteModulus
					Ic = math.pi/64 * (math.pow(concreteDiameter,4)-math.pow((concreteDiameter-2*concreteThickness),4))
					Is = ((steelModulus)/(concreteModulus)-1)*(1/2)*steelDiameter*math.pow(steelCorThickness,2)
					SecInertia1 = Ic + Is
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['compPileType'] == 'SC말뚝'):
					Area1 = math.pi/4 * (math.pow(concreteDiameter-2*steelCorThickness,2) - math.pow(concreteDiameter-2*concreteThickness,2))
					Area2 = math.pi/4 * (steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,2)-math.pow(concreteDiameter-2*steelThickness,2))
					Area3 = Area1 + Area2
					Area4 = outerModulus/concreteModulus*(concreteDiameter + outerThickness+2*innerThickness)*math.pi*outerThickness
					Area5 = innerModulus/concreteModulus*(concreteDiameter + innerThickness)*math.pi*innerThickness
					Area = Area3 + Area4 + Area5
					Modulus = concreteModulus
					Ic = math.pi/64*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*concreteThickness,4))
					Is = math.pi/64*(steelModulus/concreteModulus-1)*(math.pow(concreteDiameter-2*steelCorThickness,4)-math.pow(concreteDiameter-2*steelThickness,4))
					SecInertia1 = Ic + Is
					SecInertia2 = (outerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+outerThickness+innerThickness,2)*(concreteDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(concreteModulus)/8*math.pow(concreteDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = concreteDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['compPileType'] == '강관말뚝'):
					Area1 = math.pi/4 * (math.pow(steelDiameter - 2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					Area2 = outerModulus/steelModulus*(steelDiameter + outerThickness+2*innerThickness)*math.pi*outerThickness
					Area3 = innerModulus/steelModulus*(steelDiameter + innerThickness)*math.pi*innerThickness
					Area = Area1 + Area2 + Area3
					Modulus = steelModulus
					SecInertia1 = math.pi/64 * (math.pow(steelDiameter - 2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					SecInertia2 = (outerModulus)/(steelModulus)/8*math.pow(steelDiameter+outerThickness+innerThickness,2)*(steelDiameter+outerThickness)*math.pi*outerThickness
					SecInertia3 = (innerModulus)/(steelModulus)/8*math.pow(steelDiameter+innerThickness,3)*math.pi*innerThickness
					SecInertia = SecInertia1 + SecInertia2 + SecInertia3
					Diameter = steelDiameter + 2* outerThickness + 2* innerThickness

				elif (pileData['compPileType']=='소일시멘트말뚝'):
					SteelArea = math.pi/4 * (math.pow(steelDiameter-2*steelCorThickness,2)-math.pow(steelDiameter-2*steelThickness,2))
					SteelModulus = steelModulus
					SteelInertia = math.pi/64 * (math.pow(steelDiameter-2*steelCorThickness,4)-math.pow(steelDiameter-2*steelThickness,4))
					CementArea = math.pi/4*math.pow(concreteDiameter,2) - SteelArea
					CementModulus = concreteModulus
					CementInertia = math.pi/64 * math.pow(concreteDiameter,4) - SteelInertia
					Diameter = concreteDiameter
	except:
		Area = 0
		Modulus = 0
		SecInertia = 0
		Diameter = 0
		SteelArea = 0
		CementArea = 0
		SteelModulus = 0
		CementModulus = 0
		SteelInertia = 0
		CementInertia = 0
	result = [Area, Modulus, SecInertia, Diameter, SteelArea, CementArea, SteelModulus, CementModulus, SteelInertia, CementInertia]
	return json.dumps(result)
	
def Cal_EI_D(PileData, Length):
  
	pileData = json.loads(PileData)
	PileTotalLength = float(pileData['pileLength'])
	CompStartLength = float(pileData['compStartLength'])
	ReinforcedStartLength = float(pileData['reinforcedStartLength'])
	ReinforcedEndLength = float(pileData['reinforcedEndLength'])
 	## 상부 미보강 길이, 상부 보강 길이, 상부 미보강길이, 하부 미보강 길이, 하부 보강 길이
	
	Top_Length = 0
	Bottom_Length = 0
	Top_unreinforced_Length = 0
	Top_reinforced_Length = 0
	Bottom_unreinforced_Length = 0
	Bottom_reinforced_Length = 0
	Top_unreinforced_PileEI = 0
	Top_unreinforced_PileD = 0
	Top_reinforced_PileEI = 0
	Top_reinforced_PileD = 0
	Bottom_unreinforced_PileEI = 0
	Bottom_unreinforced_PileD = 0
	Bottom_reinforced_PileEI = 0
	Bottom_reinforced_PileD = 0
	
	## 말뚝 특성치
	Top_reinforced_Property = json.loads(Cal_Property(json.dumps(pileData), 'top', 'reinforced'))
	Top_unreinforced_Property = json.loads(Cal_Property(json.dumps(pileData), 'top', 'unreinforced'))
	Bottom_unreinforced_Property = json.loads(Cal_Property(json.dumps(pileData), 'bottom', 'unreinforced'))
	Bottom_reinfored_Property = json.loads(Cal_Property(json.dumps(pileData), 'bottom', 'reinforced'))
 
	if(pileData['pileType'] == '소일시멘트말뚝'):
		Top_unreinforced_PileEI = Top_unreinforced_Property[6]*Top_unreinforced_Property[8]
		Top_unreinforced_PileD = Top_unreinforced_Property[3]
		Top_reinforced_PileEI = Top_reinforced_Property[6]*Top_reinforced_Property[8]
		Top_reinforced_PileD = Top_reinforced_Property[3]
	else:
		Top_unreinforced_PileEI = Top_unreinforced_Property[1]*Top_unreinforced_Property[2]
		Top_unreinforced_PileD = Top_unreinforced_Property[3]
		Top_reinforced_PileEI = Top_reinforced_Property[1]*Top_reinforced_Property[2]
		Top_reinforced_PileD = Top_reinforced_Property[3]
  
	if (pileData['compPileType'] == '소일시멘트말뚝'):
		Bottom_unreinforced_PileEI = Bottom_unreinforced_Property[6]*Bottom_unreinforced_Property[8]
		Bottom_unreinforced_PileD = Bottom_unreinforced_Property[3]
		Bottom_reinforced_PileEI = Bottom_reinfored_Property[6]*Bottom_reinfored_Property[8]
		Bottom_reinforced_PileD = Bottom_reinfored_Property[3]
	else:
		Bottom_unreinforced_PileEI = Bottom_unreinforced_Property[1]*Bottom_unreinforced_Property[2]
		Bottom_unreinforced_PileD = Bottom_unreinforced_Property[3]
		Bottom_reinforced_PileEI = Bottom_reinfored_Property[1]*Bottom_reinfored_Property[2]
		Bottom_reinforced_PileD = Bottom_reinfored_Property[3]
 
	## 하부 말뚝이 있는 경우
	if CompStartLength > 0:
		Top_Length = CompStartLength
		Bottom_Length = Length - CompStartLength
	##하부 말뚝이 없는 경우
	else:
		Top_Length = PileTotalLength
		Bottom_Length = 0

	## Length 내 상부 길이, 하부 길이 계산
	## 이음 위치가 요구 길이보다 작을 경우
	if (Top_Length < Length):
		Top_Length = Top_Length
		Bottom_Length = Length - Top_Length
	## 이음 위치가 요구 길이보다 클 경우
	else:
		Top_Length = Length
		Bottom_Length = 0
	
	## 보강이 없을 경우
	if (ReinforcedEndLength - ReinforcedStartLength == 0):
		Top_unreinforced_Length = Top_Length
		Top_reinforced_Length = 0
		Bottom_unreinforced_Length = Bottom_Length
		Bottom_reinforced_Length = 0
  
	## 보강이 있을 경우
	else:
		##  이음 위치가 보강 시작부보다 작을 경우
		if (Top_Length <= ReinforcedStartLength):
			Top_unreinforced_Length = Top_Length
			Top_reinforced_Length = 0
			## 전체 길이가 보강 종료부보다 작을 경우
			if (Length <= ReinforcedEndLength):
				Bottom_reinforced_Length = min(Length, ReinforcedStartLength) - Top_Length
				Bottom_unreinforced_Length = Bottom_Length - Bottom_reinforced_Length
			## 전체 길이가 보강 종료부보다 클 경우
			else:
				Bottom_reinforced_Length = ReinforcedEndLength - ReinforcedStartLength
				Bottom_unreinforced_Length = Bottom_Length - ReinforcedEndLength
    
    ## 이음 위치가 보강 사이에 있을 경우
		elif ( ReinforcedStartLength< Top_Length and Top_Length <= ReinforcedEndLength):
			Top_reinforced_Length = Top_Length - ReinforcedStartLength
			Top_unreinforced_Length = Top_Length - Top_reinforced_Length
			Bottom_reinforced_Length = min(Length, ReinforcedEndLength) - Top_Length
			Bottom_unreinforced_Length = Bottom_Length - Bottom_reinforced_Length
   
		## 이음 위치가 보강 종료부보다 클 경우
		else:
			Top_reinforced_Length = ReinforcedEndLength - ReinforcedStartLength
			Top_unreinforced_Length = Top_Length - Top_reinforced_Length
			Bottom_unreinforced_Length = Bottom_Length
			Bottom_reinforced_Length = 0

	
	PileEI = (Top_unreinforced_PileEI*Top_unreinforced_Length + Top_reinforced_PileEI*Top_reinforced_Length + Bottom_unreinforced_PileEI*Bottom_unreinforced_Length + Bottom_reinforced_PileEI*Bottom_reinforced_Length)/Length
	PileD = (Top_unreinforced_PileD*Top_unreinforced_Length + Top_reinforced_PileD*Top_reinforced_Length + Bottom_unreinforced_PileD*Bottom_unreinforced_Length + Bottom_reinforced_PileD*Bottom_reinforced_Length)/Length
	result = [PileEI, PileD]
	return json.dumps(result)
