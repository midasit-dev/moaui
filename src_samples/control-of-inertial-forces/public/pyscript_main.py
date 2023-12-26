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
	res = requests_json.get(url=f'https://{g_base_uri}/health', headers={
		'Content-Type': 'application/json'
	})
	return json.dumps(res)

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

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

def main(
		jsonInput:str
	):
	
    UIinputs = json.loads(jsonInput)
	
    if type(UIinputs) is not dict:
        return json.dumps({'error': 'input is not json'})
    else:
        return json.dumps({"success" : "Hello World!"})
