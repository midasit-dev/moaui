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

from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
from scipy.spatial import Delaunay
import numpy as np
import json
from dataclasses import dataclass, field as dataclass_field

def text_to_plate_call(json_str:str) -> str:
    return text_to_plate_mesh(**json.loads(json_str))

@dataclass
class PrintColor:
    """
    The color of the RGB, [0~255, 0~255, 0~255]
    """
    r: int = dataclass_field(default=0, metadata={"description": "The red component of the color"})
    g: int = dataclass_field(default=0, metadata={"description": "The green component of the color"})
    b: int = dataclass_field(default=0, metadata={"description": "The blue component of the color"})


def text_to_plate_mesh(text: str, color: PrintColor, insert: str, height: str) -> str:
	"""
	Convert the text to a plate mesh and upload the image as a triangular mesh to MIDAS CIVIL.

	Args:
		text: The text to convert
		color: The color of the text RGB, [0~255, 0~255, 0~255]
		insert: The insert point of the text (lower left corner)
		height: The height of the text

	Returns:
		str: The result of the conversion
	"""
  
	def rgb_to_hex(rgb: tuple[int,3])-> str:
		"""
		Convert RGB to HEX
  
		Args:
			rgb (tuple[int,3]): The RGB color

		Returns:
			str: The HEX color
		"""
		return "#{:02x}{:02x}{:02x}".format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

	def image_to_triangular_mesh(image: Image)-> tuple[list[list[list[int]]], list[float], list[list[int]]]:
		"""
		Convert the image to a triangular mesh.
  
		Args:
			image (Image): The image to convert
   
		Returns:
			tuple[list[list[list[int]]], list[float], list[list[int]]]: The triangular mesh
		"""
		# Number of Points
		num_points=10000

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

			if not np.allclose(simplex_color, [255,255,255], atol=10):
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

	import numpy as np

	def unique_index(arrays_list: list[list[int]]) -> list[int]:
		"""
		Combine the given arrays into a single array and assign unique numbers to each value.

		Args:
			arrays_list (list[list[int]]): A list of arrays to be combined.

		Returns:
			list[int]: A list of unique numbers assigned to each value in the combined array.
		"""
		combined_array = np.vstack(arrays_list)
		flattened_array = np.ravel_multi_index(combined_array.T, combined_array.max(axis=0) + 1)
		unique_values = np.unique(flattened_array)
		unique_numbers = np.arange(1, len(unique_values) + 1)
		combined_array_numbers = np.searchsorted(unique_values, flattened_array) + 1
		return combined_array_numbers

	def assign_unique_numbers(input_list: list[int])-> list[int]:
		"""
		Assigns unique numbers to each value in the given list.

		Args:
			input_list (list): The list of values to assign unique numbers to.

		Returns:
			list: A list of assigned unique numbers corresponding to the input values.
		"""
		unique_numbers = {}
		assigned_numbers = []

		for item in input_list:
			if item not in unique_numbers:
				unique_numbers[item] = len(unique_numbers) + 1
			assigned_numbers.append(unique_numbers[item])

		return assigned_numbers

	def group_into_threes(lst: list[int])-> list[list[int]]:
		"""
		Group the given list into sublists of three elements each and return a new list.

		Args:
			lst (list): The input list

		Returns:
			list: The new list with sublists of three elements each
		"""
		return [lst[i:i+3] for i in range(0, len(lst), 3)]

	import numpy as np

	def find_duplicates_in_nparray(lst: list[int]) -> list[int]:
		"""
		Return the indices of duplicate values in the given list.

		Args:
			lst (list[int]): The given list

		Returns:
			list[int]: The list of indices of duplicate values
		"""
		duplicate_indices = []
		for i, sublist in enumerate(lst):
			if len(sublist) != len(np.unique(sublist)):
				duplicate_indices.append(i)
		return duplicate_indices

	def remove_indices(lst, indices_to_remove)-> list[int]:
		"""
		Remove the elements at the given indices from the list and return a new list.

		Args:
			lst (list): The input list.
			indices_to_remove (list): The indices to remove from the list.

		Returns:
			list: A new list with the elements removed.

		Example:
			>>> lst = [1, 2, 3, 4, 5]
			>>> indices_to_remove = [1, 3]
			>>> remove_indices(lst, indices_to_remove)
			[1, 3, 5]
		"""
		indices_set = set(indices_to_remove)
		return [elem for i, elem in enumerate(lst) if i not in indices_set]

	def missing_ranges(list: list[int]) -> list[tuple[int, int, int]]:
		"""
		Find the missing ranges in a list of numbers.

		Args:
			list (list[int]): The list of numbers.

		Returns:
			list[tuple[int, int, int]]: The list of missing ranges, each represented as a tuple (start, length, value).

		Example:
			>>> lst = [1, 2, 4, 5, 7, 8]
			>>> missing_ranges(lst)
			[(3, 1, 3), (6, 1, 6)]
		"""
		missing_ranges_with_values = []


		# A 리스트의 첫 번째 숫자가 1이 아닌 경우를 처리
		if list[0] > 1:
			missing_ranges_with_values.append((0, 1, list[0] - 1))

		# A 리스트 내의 빠진 숫자 범위 찾기
		for i in range(len(list) - 1):
			if list[i] + 1 < list[i + 1]:
				# 빠진 숫자들의 시작 인덱스, 그 값, 그리고 길이 계산
				start = i + 1
				start_value = list[i] + 1
				length = list[i + 1] - list[i] - 1
				missing_ranges_with_values.append((start, start_value, length))

		# A 리스트의 마지막 숫자가 999999보다 작은 경우를 처리
		if list[-1] < 999999:
			missing_ranges_with_values.append((len(list), list[-1] + 1, 999999 - list[-1]))
		
		return missing_ranges_with_values

	
	

	# 입력값 검증
	if text == None or text == "":
		message = {"error": "text is empty"}
		return json.dumps(message)
	
	# 이미지 생성
	font_path = './NotoSansKR-Medium.ttf'
	font_size = 40
	font = ImageFont.truetype(font_path, font_size)
	
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

	tri_coord, tri_thick, tri_color = image_to_triangular_mesh(image)
	node_number = unique_index(tri_coord)
	node_number = group_into_threes(node_number)
	
	dupleIndex = find_duplicates_in_nparray(node_number)
	
	tri_coord_uniq = remove_indices(tri_coord, dupleIndex)
	tri_thick_uniq = remove_indices(tri_thick, dupleIndex)
	tri_color_uniq = remove_indices(tri_color, dupleIndex)
	node_number_uniq = remove_indices(node_number, dupleIndex)
	thik_number_uniq = assign_unique_numbers(tri_thick_uniq)

	# 절점의 좌하단의 위치를 Insert에 맞게 재지정
	origin_split = insert.split(",")
	origin_coord = [float(x) if x else 0 for x in origin_split] + [0]*(3-len(origin_split))
	origin_x, origin_y, origin_z = origin_coord[:3]
	
	# tri_coord_uniq의 인덱스 기준으로 최소값 찾는다.
	min_x = min([min([x[0] for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])
	min_y = min([min([x[1]*-1 for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])
	max_y = max([max([x[1]*-1 for x in tri_coord_uniq[i]]) for i in range(len(tri_coord_uniq))])

	# 이미지의 크기를 기준으로 삼각형 메쉬의 크기를 조정
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

	# Node Number Check
	civil = MidasAPI(Product.CIVIL, "KR")
	res_node = civil.db_read("NODE")
 
	if res_node == None:
		new_node_start = 1
		pass
	else:
		res_node_id = list(res_node.keys())
		missing_index = missing_ranges(res_node_id)
		missing_check = False
		for i in range(len(missing_index)):
			if missing_index[i][2] >= len(node_number_uniq):
				missing_check = True
				new_node_start = missing_index[i][1]
				new_node_end = missing_index[i][1] + len(node_number_uniq)
				break

		if missing_check == False:
			message = {"error": "Not enough node number. Please check node number."}
			return json.dumps(message)

	# Node Number Reassign
	for i in range(len(node_number_uniq)):
		for j in range(3):
			node_number_uniq[i][j] = node_number_uniq[i][j] + new_node_start - 1

	# Create Node
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

	# Element Number Check
	res_elem = civil.db_read("ELEM")

	if res_elem == None:
		new_node_start = 1
		pass
	else:
		res_elem_id = list(res_elem.keys())
		missing_index = missing_ranges(res_elem_id)
		missing_check = False
		for i in range(len(missing_index)):
			if missing_index[i][2] >= len(ReSized_coord):
				missing_check = True
				new_node_start = missing_index[i][1]
				break

		if missing_check == False:
			message = {"error": "Not enough element number. Please check element number."}
			return json.dumps(message)

	# Create Element
	elem_body = {}
	start_id = 1
	for i in range(len(ReSized_coord)):
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
			elem_body[new_node_start] = {
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
			new_node_start += 1

	# Thick Number Check
	res_thik = civil.db_read("THIK")

	if res_thik == None:
		new_node_start = 1
		pass
	else:
		res_thik_id = list(res_thik.keys())
		missing_index = missing_ranges(res_thik_id)
		missing_check = False
		for i in range(len(missing_index)):
			if missing_index[i][2] >= len(set(thik_number_uniq)):
				missing_check = True
				new_node_start = missing_index[i][1]
				break

		if missing_check == False:
			message = {"error": "Not enough element number. Please check element number."}
			return json.dumps(message)

	for i in range(len(thik_number_uniq)):
		thik_number_uniq[i] = thik_number_uniq[i] + new_node_start - 1
	
	dupleNo = []
	thik_body = {}
	for i in range(len(thik_number_uniq)):
		if int(thik_number_uniq[i]) in dupleNo:
			pass
		else:
			thik_body[thik_number_uniq[i]] = {
				"NAME": thik_number_uniq[i],
				"TYPE": "VALUE",
				"T_IN": float(tri_thick_uniq[i])*scale,
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

	civil.db_create("THIK", thik_body)
	civil.db_create("NODE", node_body)
	civil.db_create("ELEM", elem_body)
	civil.db_update("CO_T", co_t_body)

	messge =  {"success": "Success!"}
	return json.dumps(messge)