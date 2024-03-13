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

██╗    ██╗██████╗ ██╗████████╗███████╗    ██╗  ██╗███████╗██████╗ ███████╗
██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝    ██║  ██║██╔════╝██╔══██╗██╔════╝
██║ █╗ ██║██████╔╝██║   ██║   █████╗      ███████║█████╗  ██████╔╝█████╗  
██║███╗██║██╔══██╗██║   ██║   ██╔══╝      ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██║  ██║███████╗██║  ██║███████╗
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
                                                                          
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ write a main logic here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
'''

from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
from scipy.spatial import Delaunay
import numpy as np

def create_text(input_json):
	"""
	입력받는 값
	- text: 텍스트
	- color: 텍스트 색상
	- insert: 삽입 위치(좌하단)
	- height: 높이
	위에 데이터에 따라, 텍스트 이미지를 생성하고, 이미지를 삼각형 메쉬로 변환하여 MIDAS CIVIL에 업로드합니다.
	"""
	def rgb_to_hex(rgb):
		"""
		RGB 값을 16진수로 변환합니다.
		"""
		return "#{:02x}{:02x}{:02x}".format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

	def image_to_triangular_mesh(image):
		"""
		이미지를 삼각형 메쉬로 변환합니다.
		"""
		# Number of Points
		num_points= 9999

		# Load image
		img = np.array(image)

		# Generate random points
		points = np.column_stack((np.random.randint(0, img.shape[1], num_points),
								np.random.randint(0, img.shape[0], num_points)))
		
		# Adjust Delaunay triangulation parameters for finer mesh
		tri = Delaunay(points, qhull_options='QJ')

		# Plot the image
		plt.figure(figsize=(10, 10))
		plt.imshow(img, extent=(0, img.shape[1], img.shape[0], 0), alpha=0.8)

		tri_coord = []
		tri_thick = []
		tri_color = []
		# Calculate and fill triangles
		for simplex in tri.simplices:
			simplex_points = points[simplex]
			simplex_color = np.mean(img[simplex_points[:, 1], simplex_points[:, 0]], axis=0)
			
			if simplex_color.shape[0] ==4:
				simplex_color = simplex_color[:3]

			if not np.allclose(simplex_color, [255,255,255], atol=0):
				simplex_color /= 255.0        
				hex_color = rgb_to_hex(simplex_color*255)
				plt.fill(*zip(*simplex_points), color=simplex_color)
			
			# Print coordinates of each triangle
				r = simplex_color[0] * 255.0
				g = simplex_color[1] * 255.0
				b = simplex_color[2] * 255.0
				tri_coord.append(simplex_points)
				tri_color.append([r,g,b])
				if int(hex_color[1:], 16)/1000000 == 0:
					tri_thick.append(1.111111)
				else:
					tri_thick.append(int(hex_color[1:], 16)/1000000)        

		# plt.axis('off')
		# plt.show()
		return tri_coord, tri_thick, tri_color

	def unique_index(arrays_list):
		"""
		주어진 배열들을 하나의 배열로 합치고, 각 값들에 대해 고유한 번호를 부여합니다.
		"""
		combined_array = np.vstack(arrays_list)
		flattened_array = np.ravel_multi_index(combined_array.T, combined_array.max(axis=0) + 1)
		unique_values = np.unique(flattened_array)
		unique_numbers = np.arange(1, len(unique_values) + 1)
		combined_array_numbers = np.searchsorted(unique_values, flattened_array) + 1
		return combined_array_numbers

	def assign_unique_numbers(input_list):
		"""
		주어진 리스트의 각 값들에 대해 고유한 번호를 부여합니다.
		"""
		unique_numbers = {}
		assigned_numbers = []

		for item in input_list:
			if item not in unique_numbers:
				unique_numbers[item] = len(unique_numbers) + 1
			assigned_numbers.append(unique_numbers[item])

		return assigned_numbers

	def group_into_threes(lst):
		"""
		주어진 리스트를 3개씩 묶어서 새로운 리스트를 반환합니다.
		"""
		return [lst[i:i+3] for i in range(0, len(lst), 3)]

	def find_duplicates_in_nparray(lst):
		"""
		주어진 리스트에서 중복되는 값들의 인덱스를 반환합니다.
		"""
		duplicate_indices = []

		for i, sublist in enumerate(lst):
			if len(sublist) != len(np.unique(sublist)):
				duplicate_indices.append(i)

		return duplicate_indices

	def remove_indices(lst, indices_to_remove):
		"""
		리스트에서 주어진 인덱스들을 삭제하고 새로운 리스트를 반환합니다.
		"""
		indices_set = set(indices_to_remove)
		return [elem for i, elem in enumerate(lst) if i not in indices_set]
	
	# 입력값을 변수에 저장
	input_json = json.loads(input_json)

	text = input_json["text"]
	color = input_json["color"]
	insert = input_json["insert"]
	height = input_json["height"]

	# 입력값 검증
	if text == None or text == "":
		message = {"error": "text is empty"}
		return json.dumps(message)
	
	# 폰트 설정
	font_path = './NotoSansKR-Medium.ttf'
	font_size = 40
	font = ImageFont.truetype(font_path, font_size)
	
	# 텍스트 이미지 생성
	text_color = (color["r"], color["g"], color["b"])
	dummy_image = Image.new("RGB", (1, 1))
	dummy_draw = ImageDraw.Draw(dummy_image)
	text_bbox = dummy_draw.textbbox((0, 0), text, font=font)
	text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

	margin = 20
	image_size = (text_width + margin * 2, text_height + margin * 2)
	
	image = Image.new("RGBA", image_size, (255, 255, 255, 0))
	draw = ImageDraw.Draw(image)

	text_width, text_height = draw.textbbox((0, 0), text, font=font)[2:]
	text_x = (image_size[0] - text_width) / 2
	text_y = (image_size[1] - text_height) / 2
	draw.text((text_x, text_y), text, fill=text_color, font=font)

	# 삼각형 메쉬로 변환
	tri_coord, tri_thick, tri_color = image_to_triangular_mesh(image)
	node_number = unique_index(tri_coord)
	node_number = group_into_threes(node_number)
    
	dupleIndex = find_duplicates_in_nparray(node_number)
    
	tri_coord_uniq = remove_indices(tri_coord, dupleIndex)
	tri_thick_uniq = remove_indices(tri_thick, dupleIndex)
	tri_color_uniq = remove_indices(tri_color, dupleIndex)
	node_number_uniq = remove_indices(node_number, dupleIndex)
	thik_number_uniq = assign_unique_numbers(tri_thick_uniq)

	# 삽입 위치 설정
	origin_split = insert.split(",")
	origin_coord = [float(x) if x else 0 for x in origin_split] + [0]*(3-len(origin_split))
	origin_x, origin_y, origin_z = origin_coord[:3]
	
	# 이미지의 크기를 기준으로 삼각형 메쉬의 크기를 조정
	min_x = min([min([x[0] for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])
	min_y = min([min([x[1]*-1 for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])
	max_y = max([max([x[1]*-1 for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])

	ReSized_coord = [[[0 for _ in range(2)] for _ in range(3)] for _ in range(len(tri_coord_uniq))]
	scale = float(height) / (max_y - min_y)
	for i in range(len(tri_coord_uniq)):
		for j in range(3):
			ReSized_coord[i][j][0] = (float(tri_coord_uniq[i][j][0]) - min_x) * scale
			ReSized_coord[i][j][1] = (float(tri_coord_uniq[i][j][1])*-1 - min_y) * scale

	min_x = min([min([x[0] for x in ReSized_coord[i]]) for i in range(len(ReSized_coord))])
	min_y = min([min([x[1] for x in ReSized_coord[i]]) for i in range(len(ReSized_coord))])

	for i in range(len(ReSized_coord)):
		for j in range(3):
			ReSized_coord[i][j][0] = (ReSized_coord[i][j][0] - min_x)
			ReSized_coord[i][j][1] = (ReSized_coord[i][j][1] - min_y)

	# MIDAS CIVIL에 업로드
	dupleNo = []
	node_body = {}
	for i in range(len(ReSized_coord)):
		for j in range(3):
			if int(node_number_uniq[i][j]) in dupleNo:
				pass
			else:
				node_body[int(node_number_uniq[i][j])] = {
					"X": float(ReSized_coord[i][j][0]) + origin_x,
					"Y": float(ReSized_coord[i][j][1]) + origin_y,
					"Z": origin_z
				}
				dupleNo.append(int(node_number_uniq[i][j]))

	elem_body = {}
	start_id = 1
	for i in range(len(tri_coord_uniq)):
		node_id1 = int(node_number_uniq[i][0])
		node_id2 = int(node_number_uniq[i][1])
		node_id3 = int(node_number_uniq[i][2])

		node_1_coord = [node_body[node_id1]["X"], node_body[node_id1]["Y"], node_body[node_id1]["Z"]]
		node_2_coord = [node_body[node_id2]["X"], node_body[node_id2]["Y"], node_body[node_id2]["Z"]]
		node_3_coord = [node_body[node_id3]["X"], node_body[node_id3]["Y"], node_body[node_id3]["Z"]]

		if node_1_coord[0] == node_2_coord[0] and node_2_coord[0] == node_3_coord[0]:
			pass
		elif node_1_coord[1] == node_2_coord[1] and node_2_coord[1] == node_3_coord[1]:
			pass
		else:
			elem_body[start_id] = {
				"TYPE": "PLATE",
				"MATL": 1,
				"SECT": thik_number_uniq[i],
				"NODE": [
					int(node_number_uniq[i][0]),
					int(node_number_uniq[i][1]),
					int(node_number_uniq[i][2])
				],
				"ANGLE": 0,
				"STYPE": 1
			}
			start_id += 1

	dupleNo = []
	thik_body = {}
	for i in range(len(thik_number_uniq)):
		if int(thik_number_uniq[i]) in dupleNo:
			pass
		else:
			thik_body[thik_number_uniq[i]] = {
				"NAME": thik_number_uniq[i],
				"TYPE": "VALUE",
				"T_IN": float(tri_thick_uniq[i]),
				"T_OUT": 0,
			}
			dupleNo.append(int(thik_number_uniq[i]))
	dupleNo = []
	co_t_body= {}
	for i in range(len(thik_number_uniq)):
		if thik_number_uniq[i] in dupleNo:
			pass
		else:
			dupleNo.append(thik_number_uniq[i])
			co_t_body[thik_number_uniq[i]] = {
				"W_R": int(tri_color_uniq[i][0]),
				"W_G": int(tri_color_uniq[i][1]),
				"W_B": int(tri_color_uniq[i][2]),
				"HF_R": int(tri_color_uniq[i][0]),
				"HF_G": int(tri_color_uniq[i][1]),
				"HF_B": int(tri_color_uniq[i][2]),
				"HE_R": int(tri_color_uniq[i][0]),
				"HE_G": int(tri_color_uniq[i][1]),
				"HE_B": int(tri_color_uniq[i][2]),
				"bBLEMD": False,
				"FACT":0.5
			}

	civil = MidasAPI(Product.CIVIL, "KR")
	civil.db_create("THIK", thik_body)
	civil.db_create("NODE", node_body)
	civil.db_create("ELEM", elem_body)
	civil.db_update("CO_T", co_t_body)

	messge =  {"success": "Success!"}
	return json.dumps(messge)