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
import math

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
	
	return_value = [
		{
			"id": 1,
			"desc": 'Density, ρ',
			"value": formatted_density,
			"unit":'kN/m3/g'
		},
		{
			"id": 2,
			"desc": 'Unit Weight, w',
			"value": formatted_weight,
			"unit":'kN/m3'
		},
		{
			"id": 3,
			"desc": 'Elastic Modulus, E',
			"value": formatted_Ecm,
			"unit":'MPa'
		},
		{
			"id": 4,
			"desc": 'Shear Modulus, G',
			"value": formatted_G,
			"unit":'MPa'
		},
		{
			"id": 5,
			"desc": 'poisson\'s ratio, ν',
			"value": formatted_nu,
			"unit":'-'
		},
		{
			"id": 6,
			"desc": 'Coefficient of thermal expansion, α',
			"value": formatted_alpha,
			"unit":'1/°C'
		}
	]

	return json.dumps(return_value)

def stain_stress_curve(grade, partial_factor):
	
	# EN 1992-1-1:2004
	# §3.1.5 Stress-strain relation for non-linear structural analysis
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

def creep_shrinkage_comps(input_data):
	
	input_data = json.loads(input_data)

	# fck is the characteristic compressive cylinder strength of concrete at 28 days in MPa
	# fcm is the mean value of concrete cylinder strength in MPa
	# RH is the relative humidity of the ambient environment in %
	# h0 is the notional value of the member in mm
	# t0 is the age of concrete at loading in days

	fck = float(input_data["grade"])
	fcm = fck + 8
	RH = float(input_data["humidity"])
	h0 = float(input_data["notion"]) * 1000
	t0 = float(input_data["dayCreep"])
	T = float(input_data["temperature"])
	t_last = float(input_data["dayLast"])
	cement_class = input_data["cement"]
	ts = float(input_data["dayShrink"])

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
	for _, t_i in enumerate(t_c):
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
	for i, _ in enumerate(t_c):
		epsilon_cs_t.append(
			epsilon_cd_t[i] + epsilon_ca_t[i]
		)
	
	# εcs is the total shrinkage strain
	epsilon_ts_inf = epsilon_cd_inf + epsilon_ca_inf

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
	# Graph Data
	# ---------------------------------------------------------------------------------------------	
	data_creep = []
	data_shrinkage = []
	data_compStr = []
	data_tensStr = []
	data_compEls = []
	for i, _ in enumerate(t_c):
		data_creep.append({
			"x": t_c[i],
			"y": phi_t_t0[i],
		})
	
	for i, _ in enumerate(t_s):
		data_shrinkage.append({
			"x": t_s[i],
			"y": epsilon_cs_t[i]*(10**5),
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
	print("Creep", phi_0)
	print("Shrinkage", epsilon_ts_inf*10**5)
	result_value = {
		"Strength":{
			"GraphData": {
				"compStrength" : data_compStr,
				"tensStrength" : data_tensStr,
				"compElastic" : data_compEls,
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
				"epsilon_cd_t" : epsilon_cd_t,
				"beta_as_t" : beta_as_t,
				"epsilon_ca_t" : epsilon_ca_t,
				"epsilon_ca_t" : epsilon_ca_t,
				"epsilon_cd_t" : epsilon_cd_t,
				"epsilon_cs_t" : epsilon_cs_t,
			},
			"Value" : {
				"epsilon_ca_inf" : epsilon_ca_inf,
				"epsilon_cd_inf" : epsilon_cd_inf,
				"epsilon_ts_inf" : epsilon_ts_inf,
				"kh" : kh,
				"beta_RH" : beta_RH,
				"alpha_ds1" : alpha_ds1,
				"alpha_ds2" : alpha_ds2,
				"epsilon_cd_0" : epsilon_cd_0,
			}
		}
	}

	return json.dumps(result_value)