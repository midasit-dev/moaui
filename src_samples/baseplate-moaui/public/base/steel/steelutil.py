import json

path = "base/steel/KS18.json"

def safe_divide(upper, lower):
    return 0 if lower == 0 else upper / lower

def _get_fy_for_thickness(fy_data, thickness):
    # Convert all keys to integers, with 'over' as a high value to catch all higher thicknesses
    keys_as_ints = {int(key) if key.isdigit() else float('inf'): value for key, value in fy_data.items()}
    applicable_keys = [key for key in keys_as_ints if thickness <= key]

    if applicable_keys:
        # Find the closest key that matches the condition
        closest_key = min(applicable_keys, default=float('inf'))
        return keys_as_ints[closest_key]
    return None

def _read_materials_from_json(file_path):
    try:
        with open(file_path, 'r') as file:
            materials = json.load(file)
        return materials
    except Exception as e:
        return f"Error reading JSON file: {str(e)}"

def get_fy(material_code, MatlName, thickness):
    materials = _read_materials_from_json(path)
    matl = "steel"
    if matl in materials:
        material = materials[matl]
        material = material[material_code]
        fy_data = material[0]['Fy']
        fu_value = material[1]['Fu']
        fy_value = _get_fy_for_thickness(fy_data, thickness)
        return fy_value
    else:
        return None

def get_fu(material_code, MatlName, thickness):
    materials = _read_materials_from_json(path)
    matl = "steel"
    if matl in materials:
        material = materials[matl]
        material = material[material_code]
        fu_value = material[1]['Fu']
        return fu_value
    else:
        return None
    
def get_bolt_Fnt(material_code):
    materials = _read_materials_from_json(path)
    matl = "bolt"
    if matl in materials:
        material = materials[matl]
        material = material[material_code]
        Fnt_data = material['Fnt']
        return Fnt_data
    else:
        return None
    
def get_bolt_Fnv(material_code):
    materials = _read_materials_from_json(path)
    matl = "bolt"
    if matl in materials:
        material = materials[matl]
        material = material[material_code]
        Fnt_data = material['Fnv']
        return Fnt_data
    else:
        return None
    
def get_bolt_Fu(material_code):
    materials = _read_materials_from_json(path)
    matl = "bolt"
    if matl in materials:
        material = materials[matl]
        material = material[material_code]
        Fnt_data = material['Fu']
        return Fnt_data
    else:
        return None