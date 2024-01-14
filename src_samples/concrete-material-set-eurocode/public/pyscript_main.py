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
from bisect import insort
import copy
import math
import re

# MATERIAL PROPERTIES
def concrete_properties(grade):

	# Density and Weight of Cocnrete
	# EN 1991-1-1:2002
	# Table A.1
	# nomarl weight = 24.0 / Increase by 1 kN/m3 for normal persentage of reinforcing and pre-stressing steel
	density = 25.0 / 9.806
	formatted_density = "{:.3f}".format(density)

	weight = 25.0
	formatted_weight = "{:.1f}".format(weight)

	# Elastic Modulus
	# EN 1992-1-1:2004
	# Table 3.1
	# Ecm = 22 * [(fcm)/10]^0.3
	# fcm = fck + 8
	fcm = grade + 8
	Ecm = 22 * ((fcm)/10)**0.3
	formatted_Ecm = "{:.1f}".format(Ecm*1000)

	# Poisson's Ratio
	# EN 1992-1-1:2004
	# §3.1.3(4) Poissons's ratio may be taken equal to 0.2 for uncracekd concrete and 0 for cracked concrete.
	nu = 0.2
	formatted_nu = "{:.1f}".format(nu)

	# Shear Modulus
	G = Ecm / (2*(1+nu))
	formatted_G = "{:.1f}".format(G*1000)

	# Thermal Expansion Coefficient
	# EN 1992-1-1:2004
	# §3.1.3(5) The thermal expansion coefficient may be taken equal to 10*10^-6 /°C
	alpha = 10*10**-6
	formatted_alpha = "{:.1e}".format(alpha)

	return_value = {
		"density": formatted_density,
		"weight": formatted_weight,
		"Elastic": formatted_Ecm,
		"Shear": formatted_G,
		"Poisson": formatted_nu,
		"Thermal": formatted_alpha,
	}

	return json.dumps(return_value)

# ADDITIONAL MATERIAL PROPERTIES
def addInfo_material(grade, partial_factor) :
	
	# ---------------------------------------------------------------------------------------------
	# Concrete Properties
	# ---------------------------------------------------------------------------------------------
	# Elastic Modulus
	# EN 1992-1-1:2004
	# Table 3.1
	if check_numbers(partial_factor):
		return json.dumps({ "error": "Partial Factor must be a number" })
	elif math.isnan(partial_factor):
		return json.dumps({ "error": "Partial Factor must be a number" })
	elif partial_factor<=1:
		return json.dumps({ "error": "Partial Factor must be greater than 1" })

	# Mean value of concrete cylinder compressive strength 
	fcm = grade + 8
	
	# Mean value of axial tensile strength of concrete 
	if grade <= 50:
		fctm = 0.30*grade**(2/3)
	elif grade > 50:
		fctm = 2.12*math.log(1+(fcm/10))
	
	# Characteristic axial tensile strength of concrete
	fctk_5 = 0.7*fctm
	fctk_95 = 1.3*fctm

	# Design value of concrete compressive strength
	fcd_alpha_max = 1*grade/partial_factor
	fcd_alpha_bridge = 0.85*grade/partial_factor
	fcd_alpha_min = 0.8*grade/partial_factor

	# Compressive strain in the concrete at the peak stress f
	# Ultimate compressive strain in the concrete
	epsilon_c1 = min(0.7*(fcm)**0.31/1000,0.0028)
	if grade <= 50:
		epsilon_cu1 = 0.0035
	elif grade > 50:
		epsilon_cu1 = (2.8 + 27*((98-fcm)/100)**4)/1000
	
	if grade <= 50:
		epsilon_c2 = 0.002
		epsilon_cu2 = 0.0035
		n = 2
	elif grade > 50:
		epsilon_c2 = (2.0+0.085*(grade-50)**0.53)/1000
		epsilon_cu2 = (2.6+35*((90-grade)/100)**4)/1000
		n = 1.4 + 23.4*((90-grade)/100)**4
	
	if grade <= 50:
		epsilon_c3 = 0.00175
		epsilon_cu3 = 0.0035
	elif grade > 50:
		epsilon_c3 = (1.75+0.55*((grade-50)/40))/1000
		epsilon_cu3 = (2.6+35*((90-grade)/100)**4)/1000
	
	# as DATA GRID
	return_value = [
		{
			"id": 1,
			"descStrength": 'fcm',
			"valueStrength": "{:.3f}".format(fcm),
			"descStrain": 'εc1',
			"valueStrain": "{:.3e}".format(epsilon_c1),
		},
		{
			"id": 2,
			"descStrength": 'fctm',
			"valueStrength": "{:.3f}".format(fctm),
			"descStrain": 'εcu1',
			"valueStrain": "{:.3e}".format(epsilon_cu1),
		},
		{
			"id": 3,
			"descStrength": 'fctk,0.05',
			"valueStrength": "{:.3f}".format(fctk_5),
			"descStrain": 'εc2',
			"valueStrain": "{:.3e}".format(epsilon_c2),
		},
		{
			"id": 4,
			"descStrength": 'fctk,0.95',
			"valueStrength": "{:.3f}".format(fctk_95),
			"descStrain": 'εcu2',
			"valueStrain": "{:.3e}".format(epsilon_cu2),
		},
		{
			"id": 5,
			"descStrength": 'fcd with αcc = 1.00',
			"valueStrength": "{:.3f}".format(fcd_alpha_max),
			"descStrain": 'n',
			"valueStrain": "{:.3f}".format(n),
		},
		{
			"id": 6,
			"descStrength": 'fcd with αcc = 0.85',
			"valueStrength": "{:.3f}".format(fcd_alpha_bridge),
			"descStrain": 'εc3',
			"valueStrain": "{:.3e}".format(epsilon_c3),
		},
		{
			"id": 7,
			"descStrength": 'fcd with αcc = 0.80',
			"valueStrength": "{:.3f}".format(fcd_alpha_min),
			"descStrain": 'εcu3',
			"valueStrain": "{:.3e}".format(epsilon_cu3),
		},
	]

	return json.dumps(return_value)

# STRESS-STRAIN CURVE
def stain_stress_curve(grade, partial_factor):
	
	# EN 1992-1-1:2004
	# §3.1.5 Stress-strain relation for non-linear structural analysis
	if check_numbers(partial_factor):
		return json.dumps({ "error": "Partial Factor must be a number" })
	elif math.isnan(partial_factor):
		return json.dumps({ "error": "Partial Factor must be a number" })
	elif partial_factor<=1:
		return json.dumps({ "error": "Partial Factor must be greater than 1" })
	
	fcm = grade + 8
	Ecm = 22 * ((fcm)/10)**0.3*1000
	epsilon_c1 = min(0.7*(fcm)**0.31/1000,0.0028)
	if grade <= 50:
		epsilon_cu1 = 0.0035
	elif grade > 50:
		epsilon_cu1 = (2.8 + 27*((98-fcm)/100)**4)/1000
	k = 1.05*Ecm*abs(epsilon_c1)/fcm

	strain_spacing = 0.0001
	interval_c = int(epsilon_cu1 / strain_spacing)

	epsilon_c = []
	for i in range(interval_c):
		epsilon_c.append(i*strain_spacing)
	epsilon_c.append(epsilon_cu1)

	if epsilon_c1 not in epsilon_c:
		insort(epsilon_c, epsilon_c1)

	data_nonlinear = []
	for i in range(len(epsilon_c)):
		eta = epsilon_c[i]/epsilon_c1
		stress = (k*eta-eta**2)/(1+(k-2)*eta)*fcm
		if epsilon_c[i]	==	epsilon_c1 or epsilon_c[i] == epsilon_cu1:
			data_nonlinear.append({
				"x": epsilon_c[i]*1000,
				"y": stress,
				"x_scatter": epsilon_c[i]*1000,
				"y_scatter": stress
			})
		else:
			data_nonlinear.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
	
	# §3.1.7 Stress-strain relations for the design of cross-sections
	# Parabola-rectangle stress-strain curve
	if grade <= 50:
		epsilon_c2 = 0.002
		epsilon_cu2 = 0.0035
		n = 2
	elif grade > 50:
		epsilon_c2 = (2.0+0.085*(grade-50)**0.53)/1000
		epsilon_cu2 = (2.6+35*((90-grade)/100)**4)/1000
		n = 1.4 + 23.4*((90-grade)/100)**4
	
	interval_c = int(epsilon_cu2 / strain_spacing)

	epsilon_c = []
	for i in range(interval_c):
		epsilon_c.append(i*strain_spacing)
	epsilon_c.append(epsilon_cu2)

	if epsilon_c2 not in epsilon_c:
		insort(epsilon_c, epsilon_c2)

	data_parabola_pure = []
	data_parabola_min = []
	data_parabola_max = []
	data_parabola_bridge = []

	alpha_cc_min = 0.8
	alpha_cc_max = 1
	alpha_cc_bridge = 0.85

	for i in range(len(epsilon_c)):
		factor = (1-(1-(epsilon_c[i]/epsilon_c2))**n)
		if epsilon_c[i] < epsilon_c2:
			stress = grade*factor
			data_parabola_pure.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_min*grade/partial_factor * factor
			data_parabola_min.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_max*grade/partial_factor * factor
			data_parabola_max.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_bridge*grade/partial_factor * factor
			data_parabola_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
		elif epsilon_c[i] == epsilon_c2 or epsilon_c[i] == epsilon_cu2:
			data_parabola_pure.append({
				"x": epsilon_c[i]*1000,
				"y": grade,
				"x_scatter": epsilon_c[i]*1000,
				"y_scatter": grade
			})
			data_parabola_min.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_min*grade/partial_factor,
			})
			data_parabola_max.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_max*grade/partial_factor,
			})
			data_parabola_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_bridge*grade/partial_factor,
				"x_scatter": epsilon_c[i]*1000,
				"y_scatter": alpha_cc_bridge*grade/partial_factor
			})
		elif epsilon_c[i] > epsilon_c2:
			data_parabola_pure.append({
				"x": epsilon_c[i]*1000,
				"y": grade
			})
			data_parabola_min.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_min*grade/partial_factor
			})
			data_parabola_max.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_max*grade/partial_factor
			})
			data_parabola_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_bridge*grade/partial_factor
			})

	# §3.1.7 Stress-strain relations for the design of cross-sections
	# Bilinear stress-strain curve
	if grade <= 50:
		epsilon_c3 = 0.00175
		epsilon_cu3 = 0.0035
	elif grade > 50:
		epsilon_c3 = (1.75+0.55*((grade-50)/40))/1000
		epsilon_cu3 = (2.6+35*((90-grade)/100)**4)/1000

	interval_c = int(epsilon_cu3 / strain_spacing)

	epsilon_c = []
	for i in range(interval_c):
		epsilon_c.append(i*strain_spacing)
	epsilon_c.append(epsilon_cu3)

	if epsilon_c3 not in epsilon_c:
		insort(epsilon_c, epsilon_c3)
	
	data_bilinear_pure = []
	data_bilinear_min = []
	data_bilinear_max = []
	data_bilinear_bridge = []

	for i in range(len(epsilon_c)):
		if epsilon_c[i] < epsilon_c3:
			stress = grade*epsilon_c[i]/epsilon_c3
			data_bilinear_pure.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_min*grade/partial_factor * epsilon_c[i]/epsilon_c3
			data_bilinear_min.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_max*grade/partial_factor * epsilon_c[i]/epsilon_c3
			data_bilinear_max.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
			stress = alpha_cc_bridge*grade/partial_factor * epsilon_c[i]/epsilon_c3
			data_bilinear_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": stress
			})
		elif epsilon_c[i] == epsilon_c3 or epsilon_c[i] == epsilon_cu3:
			data_bilinear_pure.append({
				"x": epsilon_c[i]*1000,
				"y": grade,
				"x_scatter": epsilon_c[i]*1000,
				"y_scatter": grade
			})
			data_bilinear_min.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_min*grade/partial_factor,
			})
			data_bilinear_max.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_max*grade/partial_factor,
			})
			data_bilinear_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_bridge*grade/partial_factor,
				"x_scatter": epsilon_c[i]*1000,
				"y_scatter": alpha_cc_bridge*grade/partial_factor
			})
		elif epsilon_c[i] > epsilon_c3:
			data_bilinear_pure.append({
				"x": epsilon_c[i]*1000,
				"y": grade
			})
			data_bilinear_min.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_min*grade/partial_factor
			})
			data_bilinear_max.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_max*grade/partial_factor
			})
			data_bilinear_bridge.append({
				"x": epsilon_c[i]*1000,
				"y": alpha_cc_bridge*grade/partial_factor
			})
	
	data_elastic_modulus =[
		{
			"x":0,
			"y":0,
			"x_scatter":0,
			"y_scatter":0,
		},
		{
			"x":0.4*fcm/Ecm * 1000,
			"y":0.4*fcm,
			"x_scatter":0.4*fcm/Ecm * 1000,
			"y_scatter":0.4*fcm,
		},
		{
			"x":fcm/Ecm * 1000,
			"y":fcm,
			"x_scatter":fcm/Ecm * 1000,
			"y_scatter":fcm,
		}
	]

	return_value = {
		"nonlinear": data_nonlinear,
		"parabola_pure": data_parabola_pure,
		"parabola_min": data_parabola_min,
		"parabola_max": data_parabola_max,
		"parabola_bridge": data_parabola_bridge,
		"bilinear_pure": data_bilinear_pure,
		"bilinear_min": data_bilinear_min,
		"bilinear_max": data_bilinear_max,
		"bilinear_bridge": data_bilinear_bridge,
		"elastic_modulus": data_elastic_modulus,
	}

	return json.dumps(return_value)

# TIMEDEPENDENT PROPERTIES
def creep_shrinkage_comps(input_data):
	
	input_data = json.loads(input_data)

	# fck is the characteristic compressive cylinder strength of concrete at 28 days in MPa
	# fcm is the mean value of concrete cylinder strength in MPa
	# RH is the relative humidity of the ambient environment in %
	# h0 is the notional value of the member in mm
	# t0 is the age of concrete at loading in days

	fck = input_data["grade"]
	fcm = fck + 8
	RH = convert_to_number(input_data["humidity"])
	h0 = convert_to_number(input_data["notionalSize"])
	t0 = convert_to_number(input_data["dayCreep"])
	T = convert_to_number(input_data["temperature"])
	t_last = convert_to_number(input_data["dayLast"])
	cement_class = input_data["cementType"]
	ts = convert_to_number(input_data["dayShrink"])
	silica = input_data["silica"]
	codeType = input_data["codeType"]

	#Value Validation
	if check_numbers(RH, h0, t0, T, t_last, ts):
		return json.dumps({ "error": "Input must be a number" })
	elif math.isnan(RH) or math.isnan(h0) or math.isnan(t0) or math.isnan(T) or math.isnan(t_last) or math.isnan(ts):
		return json.dumps({ "error": "Input must be a number" })
	elif RH < 40 or RH > 99:
		return json.dumps({ "error": "Relative Humidity must be between 40 and 99" })
	elif h0 <= 0:
		return json.dumps({ "error": "Notional Size must be greater than 0" })
	elif T < -40 or T > 40:
		return json.dumps({ "error": "Temperature must be between -40 and 40" })
	elif t0 <= 0:
		return json.dumps({ "error": "t0 must be greater than 0" })
	elif ts <= 0:
		return json.dumps({ "error": "ts must be greater than 0" })
	elif t_last <= max(t0, ts):
		return json.dumps({ "error": "t,end must be greater than t0 and ts" })
	# elif codeType == "EC2-2" and (fck <= 50 or RH > 80):
	# 	return json.dumps({ "error": "EC2-2 is only valid for fck > 50 and RH <= 80" })
	
	h0 = h0 *1000
	# ---------------------------------------------------------------------------------------------
	# Creep Coefficient
	# ---------------------------------------------------------------------------------------------
	# α1,2,3 are coefficients to consider the influence of the concrete stnregnth:
	alpha_1 = (35/fcm)**0.7
	alpha_2 = (35/fcm)**0.2
	alpha_3 = (35/fcm)**0.5

	# βH is a coefficient depending on the relative humidity (RH in %) and the notional member size (h0 in mm):
	if fcm <= 35:
		beta_H = min(1.5*(1+(0.012*RH)**18)*h0 + 250, 1500)
	elif fcm >= 35:
		beta_H = min(1.5*(1+(0.012*RH)**18)*h0 + 250*alpha_3, 1500*alpha_3)

	# φ_RH is a factor to allow for the effect of relative humidity on the notional creep coefficient:
	if fcm <= 35:
		phi_RH = 1+(1-RH/100)/(0.1*(h0**(1/3)))
	if fcm > 35:
		phi_RH = (1+(1-RH/100)/(0.1*(h0**(1/3)))*alpha_1)*alpha_2

	# β(fcm) is a factor to allow for the effect of concrete strength on the notional creep coefficient:
	beta_fcm = 16.8 / math.sqrt(fcm)

	# t is the age of concrete in days at the moment considered
	nb_t = 24
	log_t_s = math.log(t0, 10)
	log_t_e = math.log(t_last, 10)
	t_c = []
	for i in range(nb_t):
		log_t = (log_t_e - log_t_s) / nb_t * (i + 1) + log_t_s
		t_c.append(10**log_t)
	
	# βc(t,t0) is a coefficient to describe the development of creep with time after loading:
	# t-t0 is the non-adjusted duration of loading in days
	beta_c_t_t0 = []
	for _, t_i in enumerate(t_c):
		beta_c_t_t0.append(
			((t_i - t0)/(beta_H + (t_i - t0)))**0.3
		)

	# tT is the temperature adjusted concrete age which replaces t in the corresponding equations
	tT = math.exp(-(4000/(273+T)-13.65))*t0
	
	# α is a power which depnds on the type of cement
	if cement_class == "S":
		alpha = -1
	elif cement_class == "N":
		alpha = 0
	elif cement_class == "R":
		alpha = 1

	# t0_adjust
	t0_adjust = max(tT * ((9/(2 + tT**1.2))+1)**alpha,0.5)

	# β(t0) is a factor to allow for the effect of concrete age at loading on the notional creep coeffcient:
	beta_t0 = 1 / (0.1 + t0_adjust**0.2)

	# φ0 is the notional creep coefficient
	phi_0 = phi_RH * beta_fcm * beta_t0

	# φ(t,t0) is the creep coefficient
	phi_t_t0 = []
	for _, beta_c_t_t0_i in enumerate(beta_c_t_t0):
		phi_t_t0.append(
			phi_0 * beta_c_t_t0_i
		)

	# ---------------------------------------------------------------------------------------------
	# Shrinkage Strain
	# ---------------------------------------------------------------------------------------------
	# t is the age of concrete in days at the moment considered
	log_t_s = math.log(ts, 10)
	log_t_e = math.log(t_last, 10)
	t_s = []
	for i in range(nb_t):
		log_t = (log_t_e - log_t_s) / nb_t * (i + 1) + log_t_s
		t_s.append(10**log_t)
	
	# kh is a coefficient dpending on the notional siz h0
	if h0 <= 100:
		kh = 1
	elif h0 > 100 and h0 <= 200 :
		kh = (1 - 0.85) / (100 - 200) * (h0 - 100) + 1
	elif h0 > 200 and h0 <= 300 :
		kh = (0.85 - 0.75) / (200 - 300) * (h0 - 200) + 0.85
	elif h0 > 300 and h0 <= 500 :
		kh = (0.75 - 0.70) / (300 - 500) * (h0 - 300) + 0.75
	elif h0 >= 500:
		kh = 0.70
	
	# βRH it the effect of relative humidity
	RH0 = 100
	beta_RH = 1.55 * ( 1 - (RH/RH0)**3)

	# αds1, αds2 is a coefficient which depends on the type of cement
	if cement_class == "S":
		alpha_ds1 = 3
		alpha_ds2 = 0.13
	elif cement_class == "N":
		alpha_ds1 = 4
		alpha_ds2 = 0.12
	elif cement_class == "R":
		alpha_ds1 = 6
		alpha_ds2 = 0.11

	# εcd,0 is the basic drying shrinkage strain
	fcmo = 10
	epsilon_cd_0 = 0.85*((220+110*alpha_ds1)*math.exp(-alpha_ds2*fcm/fcmo))*10**-6*beta_RH

	# βds(t,ts) is the time-development coefficient for drying shrinkage
	beta_ds_t_ts = []
	for _, t_i in enumerate(t_s):
		beta_ds_t_ts.append(
			(t_i - ts)/((t_i - ts) + 0.04*math.sqrt(h0**3))
		)
	
	# εcd(t) is the drying shrinkage strain
	epsilon_cd_t = []
	for _, beta_ds_t_ts_i in enumerate(beta_ds_t_ts):
		epsilon_cd_t.append(
			beta_ds_t_ts_i * kh * epsilon_cd_0
		)
	
	# εca(∞) is the finale value of the autogenous shrinkage strain
	epsilon_ca_inf = 2.5*(fck - 10)*10**-6

	# βas(t) is the time-development coefficient for drying shrinkage
	beta_as_t = []
	for _, t_i in enumerate(t_s):
		beta_as_t.append(
			(1 - math.exp(-0.2*t_i**0.5))
		)

	# εca(t) is the autogenous shrinkage strain
	epsilon_ca_t = []
	for _, beta_as_t_i in enumerate(beta_as_t):
		epsilon_ca_t.append(
			beta_as_t_i * epsilon_ca_inf
		)

	# εcd(∞) is the finale value of the drying shrinkage strain
	epsilon_cd_inf = kh * epsilon_cd_0

	# εcs(t) is the total shrinkage strain
	epsilon_cs_t = []
	for i, _ in enumerate(t_s):
		epsilon_cs_t.append(
			epsilon_cd_t[i] + epsilon_ca_t[i]
		)
	
	# εcs is the total shrinkage strain
	epsilon_cs_inf = epsilon_cd_inf + epsilon_ca_inf

	# ---------------------------------------------------------------------------------------------
	# Compressive Strength and Modulus
	# ---------------------------------------------------------------------------------------------	
	# t is the age of concrete in days at the moment considered
	# log_t_s = math.log(0.1, 10)
	# log_t_e = math.log(30, 10)
	# t_sm = []
	# for i in range(nb_t):
	# 	log_t = (log_t_e - log_t_s) / nb_t * (i + 1) + log_t_s
	# 	t_sm.append(10**log_t)
	t_sm = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] + list(range(1,31))

	# s is a coefficient which depends on the type of cement
	if cement_class == "S":
		s = 0.38
	elif cement_class == "N":
		s = 0.25
	elif cement_class == "R":
		s = 0.20

	# βcc(t) is a coefficient which depends on the age of the concrete t
	beta_cc_t = []
	for _, t_i in enumerate(t_sm):
		beta_cc_t.append(
			math.exp(s*(1-(28/t_i)**0.5))
		)
	
	# fcm(t) is the mean compressive strength of concrete at the age t
	fcm_t = []
	for i, _ in enumerate(t_sm):
		fcm_t.append(
			beta_cc_t[i] * fcm
		)

	# fctm is the mean tensile strength of concrete at the age 28
	if fck <= 50:
		fctm = 0.3 * fck**(2/3)
	elif fck > 50:
		fctm = 2.12 * math.log(1 + (fcm/10))
	
	# fctm(t) is the mean tensile strength of concrete at the age t
	fctm_t = []
	for i, t_i in enumerate(t_sm):
		if t_i < 28:
			alpha_ctm = 1
		elif t_i >= 28:
			alpha_ctm = 2/3
		fctm_t.append(
			(beta_cc_t[i]**alpha_ctm) * fctm
		)

	# Ecm(t) is the elastic modulus of concrete at the age t
	Ecm = 22 * ((fcm)/10)**0.3
	Ecm_t = []
	for i, _ in enumerate(t_sm):
		Ecm_t.append(
			(fcm_t[i] / fcm)**0.3 * Ecm
		)

	# ---------------------------------------------------------------------------------------------
	# EN 1992-2
	# ---------------------------------------------------------------------------------------------	
	# Autogeneous shrinkage
	beta_cc_t_br = []
	for _, t_i in enumerate(t_s):
		beta_cc_t_br.append(
			math.exp(s*(1-(28/t_i)**0.5))
		)

	fcm_t_br = []
	for i, _ in enumerate(t_s):
		fcm_t_br.append(
			beta_cc_t_br[i] * fcm
		)
	
	epsilon_ca_t_br = []
	for i, t_i in enumerate(t_s):
		if t_i < 28:
			if fcm_t_br[i] / fck < 0.1:
				epsilon_ca_t_br.append(0)
			elif fcm_t_br[i] / fck >= 0.1:
				epsilon_ca_t_br.append(
					(fck - 20)*(2.2 * fcm_t_br[i]/fck - 0.2)*10**-6
				)
		elif t_i >= 28:
			epsilon_ca_t_br.append(
				(fck - 20)*(2.8 - 1.1 * math.exp(-t_i/96))*10**-6
			)

	# Drying shrinkage
	if silica ==  True:
		beta_cd_br = 0.007
	elif silica == False:
		beta_cd_br = 0.021
	
	if fck <= 55:
		Kfck = 18
	elif fck > 55:
		Kfck = 30 - 0.21*fck

	epsilon_cd_t_br = []
	for i, t_i in enumerate(t_s):
		epsilon_cd_t_br.append(
			(Kfck*(72*math.exp(-0.046*fck)+75-RH)*(t_i - ts)*10**-6)/((t_i - ts)+beta_cd_br*h0**2)
		)

	# εcs(t) is the total shrinkage strain
	epsilon_cs_t_br = []
	for i, _ in enumerate(t_s):
		epsilon_cs_t_br.append(
			epsilon_cd_t_br[i] + epsilon_ca_t_br[i]
		)
	
	# Basic Creep
	beta_cc_t0 = math.exp(s*(1-(28/t0)**0.5))
	fcm_t0 = beta_cc_t0 * fcm
	if silica ==  True:
		phi_b0 = 3.6 / (fcm_t0**0.37)
		beta_bc = 0.37 * math.exp(2.8 * fcm_t0/fck)
	elif silica == False:
		phi_b0 = 1.4
		beta_bc = 0.4 * math.exp(3.1 * fcm_t0/fck)
	
	phi_b_t_t0 = []
	for i, t_i in enumerate(t_c):
		phi_b_t_t0.append(
			phi_b0 * (math.sqrt(t_i - t0)/(math.sqrt(t_i - t0) + beta_bc))
		)
	
	# Dry Creep
	if silica ==  True:
		phi_d0 = 1000
	elif silica == False:
		phi_d0 = 3200
	
	phi_d_t_t0 = []
	epsilon_cd_t0 = (Kfck*(72*math.exp(-0.046*fck)+75-RH)*(t0 - ts)*10**-6)/((t0 - ts)+beta_cd_br*h0**2)
	for i, t_i in enumerate(t_c):
		phi_d_t_t0.append(
			phi_d0 *(epsilon_cd_t_br[i]-epsilon_cd_t0)
		)

	phi_t_t0_br = []
	for i, t_i in enumerate(t_c):
		phi_t_t0_br.append(
			phi_b_t_t0 + phi_d_t_t0
		)

	# ---------------------------------------------------------------------------------------------
	# Graph Data
	# ---------------------------------------------------------------------------------------------	
	data_creep = []
	data_creep_br = []
	data_shrinkage = []
	data_shrinkage_br = []
	data_compStr = []
	data_tensStr = []
	data_compEls = []

	for i, _ in enumerate(t_c):
		data_creep.append({
			"x": t_c[i],
			"y": phi_t_t0[i],
		})

	for i, _ in enumerate(t_c):
		data_creep_br.append({
			"x": t_c[i],
			"y": phi_t_t0_br[i],
		})

	for i, _ in enumerate(t_s):
		data_shrinkage.append({
			"x": t_s[i],
			"y": epsilon_cs_t[i]*(10**5),
		})

	for i, _ in enumerate(t_s):
		data_shrinkage_br.append({
			"x": t_s[i],
			"y": epsilon_cs_t_br[i]*(10**5),
	})

	for i, _ in enumerate(t_sm):
		data_compStr.append({
			"x": t_sm[i],
			"y": fcm_t[i],
		})
		data_tensStr.append({
			"x": t_sm[i],
			"y": fctm_t[i],
		})
		data_compEls.append({
			"x": t_sm[i],
			"y": Ecm_t[i],
		})

	# if codeType == "EN2-1":
	result_value = {
		"Strength":{
			"GraphData": {
				"compStrength" : data_compStr,
				"tensStrength" : data_tensStr,
				"compElastic" : data_compEls,
			},
			"TimeDependent" :{
				"t_sm": t_sm,
				"beta_cc_t" : beta_cc_t,
				"fcm_t" : fcm_t,
				"fctm_t" : fctm_t,
				"Ecm_t" : Ecm_t,
			}
		},
		"Creep" :{
			"GraphData": data_creep,
			"TimeDependent" :{
				"t_c": t_c,
				"beta_c_t_t0" : beta_c_t_t0,
				"phi_t_t0" : phi_t_t0,
			},
			"Value" : {
				"alpha_1" : alpha_1,
				"alpha_2" : alpha_2,
				"alpha_3" : alpha_3,
				"beta_H" : beta_H,
				"phi_RH" : phi_RH,
				"beta_fcm" : beta_fcm,
				"tT" : tT,
				"alpha" : alpha,
				"t0_adjust" : t0_adjust,
				"beta_t0" : beta_t0,
				"phi_0" : phi_0,
			}
		},
		"Shrinkage" : {
			"GraphData": data_shrinkage,
			"TimeDependent" :{
				"t_s": t_s,
				"beta_ds_t_ts" : beta_ds_t_ts,
				"beta_as_t" : beta_as_t,
				"epsilon_ca_t" : epsilon_ca_t,
				"epsilon_cd_t" : epsilon_cd_t,
				"epsilon_cs_t" : epsilon_cs_t,
			},
			"Value" : {
				"epsilon_ca_inf" : epsilon_ca_inf,
				"epsilon_cd_inf" : epsilon_cd_inf,
				"epsilon_cs_inf" : epsilon_cs_inf,
				"kh" : kh,
				"beta_RH" : beta_RH,
				"alpha_ds1" : alpha_ds1,
				"alpha_ds2" : alpha_ds2,
				"epsilon_cd_0" : epsilon_cd_0,
			}
		}
	}
	# elif codeType == "EN2-2":
	# 	result_value = {
	# 		"Strength":{
	# 			"GraphData": {
	# 				"compStrength" : data_compStr,
	# 				"tensStrength" : data_tensStr,
	# 				"compElastic" : data_compEls,
	# 			},
	# 			"TimeDependent" :{
	# 				"t_sm": t_sm,
	# 				"beta_cc_t" : beta_cc_t,
	# 				"fcm_t" : fcm_t,
	# 				"fctm_t" : fctm_t,
	# 				"Ecm_t" : Ecm_t,
	# 			}
	# 		},
	# 		"Creep" :{
	# 			"GraphData": data_creep_br,
	# 			"TimeDependent" :{
	# 				"t_c": t_c,
	# 				"phi_b_t_t0" : phi_b_t_t0,
	# 				"phi_d_t_t0" : phi_d_t_t0,
	# 				"phi_t_t0" : phi_t_t0_br,
	# 			},
	# 			"Value" : {
	# 				"beta_cc_t0" : beta_cc_t0,
	# 				"fcm_t0" : fcm_t0,
	# 				"phi_b0" : phi_b0,
	# 				"beta_bc" : beta_bc,
	# 				"phi_d0" : phi_d0,
	# 			}
	# 		},
	# 		"Shrinkage" : {
	# 			"GraphData": data_shrinkage,
	# 			"TimeDependent" :{
	# 				"t_s": t_s,
	# 				"beta_cc_t" : beta_cc_t_br,
	# 				"fcm_t" : fcm_t_br,
	# 				"epsilon_ca_t" : epsilon_ca_t_br,
	# 				"epsilon_cd_t" : epsilon_cd_t_br,
	# 				"epsilon_cs_t" : epsilon_cs_t_br,
	# 			},
	# 			"Value" : {
	# 				"beta_cd_br" : beta_cd_br,
	# 				"Kfck" : Kfck,
	# 			}
	# 		}
	# 	}

	return json.dumps(result_value)

def Create_material(input_data):
	input_data = json.loads(input_data)

	ID = int(input_data["ID"])
	selected_grade = input_data["selectedGrade"]
	RH = convert_to_number(input_data["humidity"])
	h0 = convert_to_number(input_data["notionalSize"])
	cementType = input_data["cementType"]
	codeType = input_data["codeType"]
	dayShrinkage = convert_to_number(input_data["dayShrinkage"])
	silica = input_data["silica"]

	#Value Validation
	if check_numbers(RH, h0):
		return json.dumps({ "error": "RH, h0 must be a number" })
	elif RH < 40 or RH > 99:
		return json.dumps({ "error": "RH must be between 40 and 99" })
	elif h0 <= 0:
		return json.dumps({ "error": "h0 must be greater than 0" })
	elif not isinstance(ID, int):
		return json.dumps({ "error": "ID number must be integer" })
	elif dayShrinkage <= 0:
		return json.dumps({ "error": "ts must be greater than 0" })
	elif selected_grade == None:
		return json.dumps({ "error": "No selected grade" })

	# ---------------------------------------------------------------------------------------------
	# Material Properties
	# ---------------------------------------------------------------------------------------------
	civil = MidasAPI(Product.CIVIL, "KR")

	unit_basic = {
		"1": {
			"FORCE": "KN",
			"DIST": "M",
			"HEAT": "KCAL",
			"TEMPER": "C"
		}
	}
	res_unit = civil.db_update("UNIT", unit_basic)
	if "error" in res_unit:
		return json.dumps({ "error": "Midas Error" })
	
	ID_list = []
	Grade_list = []
	for i in range(len(selected_grade)):
		ID_list.append(ID+i)
		Grade_list.append(selected_grade[i]["strength"])
	res_matl = civil.db_read("MATL")
	res_matl_key = list(res_matl.keys())

	if ID_list in res_matl_key:
		return json.dumps({ "error": "ID already exists" })
	
	matl_basic = {
            "TYPE": "CONC",
            "NAME": "C12/15",
            "HE_SPEC": 0,
            "HE_COND": 0,
            "PLMT": 0,
            "P_NAME": "",
            "bMASS_DENS": False,
            "DAMP_RAT": 0.05,
            "PARAM": [
                {
                    "P_TYPE": 1,
                    "STANDARD": "EN04(RC)",
                    "CODE": "",
                    "DB": "C12/15",
                    "bELAST": False,
                }
            ]
        }

	matl_create = {}
	for i, ID in enumerate(ID_list):
		matl_create[ID] = copy.deepcopy(matl_basic)
		matl_create[ID]["NAME"] = Grade_list[i]
		matl_create[ID]["PARAM"][0]["DB"] = Grade_list[i]
	
	res_matl_craete = civil.db_create("MATL", matl_create)
	if "error" in res_matl_craete:
		return json.dumps({ "error": "MATL Error" })
	
	# ---------------------------------------------------------------------------------------------
	# Creep & Shrinkage Properties
	# ---------------------------------------------------------------------------------------------
	res_tdmt = civil.db_read("TDMT")
	if "error" in res_tdmt:
		max_tdmt_key = 0
		res_tdmt_name = []
	else:
		max_tdmt_key = max(list(res_tdmt.keys()))
		res_tdmt_name = [item["NAME"] for item in res_tdmt.values()]

	tdmt_name_list = []
	intersection = set(Grade_list) & set(res_tdmt_name)

	if bool(intersection):
		for i in range(len(Grade_list)):
			tdmt_name_list.append(
				Grade_list[i] + "_" + "CS"
			)
	else:
		for i in range(len(Grade_list)):
			tdmt_name_list.append(
				Grade_list[i]
			)

	tdmt_base = {
		"NAME": "C12/15",
		"CODE": "EUROPEAN",
		"STR": 12000,
		"HU": 70,
		"AGE": 3,
		"MSIZE": 1,
		"CTYPE": "Class N",
		"TCODE": 1,
		"bSILICA": True
	}

	pattern = re.compile(r'C(\d+)')
	fck = [float(pattern.search(strength).group(1)) for strength in Grade_list]

	if codeType == "EC2-1":
		intCode = 0
		bSILICA = False
	elif codeType == "EC2-2":
		intCode = 1
		bSILICA = silica

	tdmt_create ={}
	for i, ID in enumerate(ID_list):
		max_tdmt_key += 1
		tdmt_create[max_tdmt_key] = copy.deepcopy(tdmt_base)
		tdmt_create[max_tdmt_key]["NAME"] = tdmt_name_list[i]
		tdmt_create[max_tdmt_key]["STR"] = fck[i]*1000
		tdmt_create[max_tdmt_key]["HU"] = RH
		tdmt_create[max_tdmt_key]["MSIZE"] = h0
		tdmt_create[max_tdmt_key]["CTYPE"] = "Class " + cementType 
		tdmt_create[max_tdmt_key]["TCODE"] = intCode
		tdmt_create[max_tdmt_key]["AGE"] = dayShrinkage
		tdmt_create[max_tdmt_key]["bSILICA"] = bSILICA
	
	res_tdmt_create = civil.db_create("TDMT", tdmt_create)
	if "error" in res_tdmt_create:
		return json.dumps({ "error": "TDMT Error" })

	# ---------------------------------------------------------------------------------------------
	# Compressive Strength Properties
	# ---------------------------------------------------------------------------------------------
	res_tdme = civil.db_read("TDME")
	if "error" in res_tdme:
		max_tdme_key = 0
		res_tdme_name = []
	else:
		max_tdme_key = max(list(res_tdme.keys()))
		res_tdme_name = [item["NAME"] for item in res_tdme.values()]
	
	tdme_name_list = []
	intersection = set(Grade_list) & set(res_tdme_name)

	if bool(intersection):
		for i in range(len(Grade_list)):
			tdme_name_list.append(
				Grade_list[i] + "_" + "CS"
			)
	else:
		for i in range(len(Grade_list)):
			tdme_name_list.append(
				Grade_list[i]
			)
	
	tdme_base ={
		"NAME": "C12/15",
		"TYPE": "CODE",
		"CODENAME": "EUROPEAN",
		"STRENGTH": 20000,
		"iCTYPE": 2
	}

	if cementType == "R":
		iCTYPE = 1
	elif cementType == "N":
		iCTYPE = 2
	elif cementType == "S":
		iCTYPE = 3

	tdme_create = {}
	for i, ID in enumerate(ID_list):
		max_tdme_key += 1
		tdme_create[max_tdme_key] = copy.deepcopy(tdme_base)
		tdme_create[max_tdme_key]["NAME"] = tdme_name_list[i]
		tdme_create[max_tdme_key]["STRENGTH"] = (fck[i] + 8) * 1000
		tdme_create[max_tdme_key]["iCTYPE"] = iCTYPE
	
	res_tdme_create = civil.db_create("TDME", tdme_create)
	if "error" in res_tdme_create:
		return json.dumps({ "error": "TDME Error" })
	
	# ---------------------------------------------------------------------------------------------
	# Material Link
	# ---------------------------------------------------------------------------------------------
	res_tmat = civil.db_read("TMAT")
	if "error" in res_tmat:
		max_tdme_key = 0
	else:
		max_tdme_key = max(list(res_tmat.keys()))

	tmat_base = {
		"TDMT_NAME": "C12/15",
		"TDME_NAME": "C12/15"
	}

	tmat_create = {}
	for i, ID in enumerate(ID_list):
		max_tdme_key += 1
		tmat_create[max_tdme_key] = copy.deepcopy(tmat_base)
		tmat_create[max_tdme_key]["TDMT_NAME"] = tdmt_name_list[i]
		tmat_create[max_tdme_key]["TDME_NAME"] = tdme_name_list[i]
	
	res_tmat_create = civil.db_create("TMAT", tmat_create)
	if "error" in res_tmat_create:
		return json.dumps({ "error": "TMAT Error" })
	
	return(json.dumps({"success": "Success"}))

def get_material_ID():
	civil = MidasAPI(Product.CIVIL, "KR")
	res_matl = civil.db_read("MATL")
	if "error" in res_matl:
		return 1
	else:
		max_id = max(list(res_matl.keys()))
		return max_id + 1

def check_numbers(*args):
	for arg in args:
		if not isinstance(arg, (int, float)):
			return True
	return False

def convert_to_number(value):
    try:
        result = float(value)
        return result
    except (ValueError, TypeError):
        return math.nan