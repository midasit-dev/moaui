# from rich.console import Console
# from rich.table import Column, Table
import numpy as np
# import inspect
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import copy

# def table_print(*value, tabletitle, pricision):
#     ## Data Setting
#     dataValue = []
#     for i in range(len(value)):
#         for j in range(len(value[i])):
#             dataValue.append(value[i][j])
#     ## Create Header
#     frame = inspect.currentframe()
#     frame = inspect.getouterframes(frame)[1]
#     string = inspect.getframeinfo(frame[0]).code_context[0].strip()
#     args = string[string.find('(')+ 1:-1].split(',')
#     names = []
#     for i in args:
#         if i.find('=') != -1:
#             names.append(i.split('=')[1].strip())
#         else:
#             names.append(i)
#     names.pop(-1)
#     names.pop(-1)
#     ## Table - Base Setting
#     console = Console()
#     table = Table(show_header=True, title=tabletitle, title_justify="center", title_style="Italic bold green", header_style="bold red")
#     ## Table - Column Setting
#     table.add_column("Index", justify="center", style="cyan")
#     for i in range(len(value)):
#         for j in range(len(value[i])):
#             if j % 2 == 0:
#                 table.add_column(names[i] + "_#" + str(i+1) +"_x", justify="right", style="yellow")
#             else:
#                 table.add_column(names[i] + "_#" + str(i+1) +"_y", justify="right", style="green")
#     ## Table - Number of Rows
#     MaxLen = 1
#     for i in range(len(dataValue)):
#         if type(dataValue[i]) is list:
#             Temp = len(dataValue[i])
#             if Temp > MaxLen:
#                 MaxLen = Temp
#     ## Table - Row Setting
#     AddRow = []
#     formatf = '.'+str(pricision)+"f"
#     if MaxLen > 1:
#         for i in range(MaxLen):
#             AddItem = []
#             AddItem.append(str(i+1))
#             for j in range(len(dataValue)):
#                 try:
#                     AddItem.append(str(format(round(dataValue[j][i], pricision),formatf)))
#                 except:
#                     try :
#                         AddItem.append(str(dataValue[j][i]))    
#                     except:
#                         AddItem.append(str("-"))
#             AddRow.append(AddItem)
#     else:
#         AddItem = []
#         AddItem.append(str(1))
#         for i in range(len(dataValue)):
#             try:
#                 AddItem.append(str(format(round(dataValue[i], pricision),formatf)))
#             except:
#                 AddItem.append(str(dataValue[i]))
#         AddRow.append(AddItem)
#     for i in range(len(AddRow)):
#         table.add_row(*AddRow[i])
    
#     ## Print Table
#     console.print(table)

def plot_section(*value) :
    ## Data Setting
    dataValue = []
    for i in range(len(value)):
        for j in range(len(value[i])):
            dataValue.append(value[i][j])
    cell = int(len(dataValue)/2)
    for i in range(cell):
        plt.plot(dataValue[i*2+0], dataValue[i*2+1])
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.axis('equal')
    plt.show()

def plot_temp(x_h, y_h, x_c, y_c) :
    plt.plot(x_h, y_h, color='red')
    plt.plot(x_c, y_c, color='blue')
    plt.xlabel('Temperature (°C)')
    plt.ylabel('Depth')
    plt.show()

def stress_result(eq_stress) :
    fig, ax = plt.subplots(figsize=(18, 12), subplot_kw=dict(projection='3d'))

    inter = 200
    # [{yi:.4f}][{zi:.4f}]
    for i in range(len(eq_stress)):
        for j in range(len(eq_stress[i])):
            y_sect = eq_stress[i][j]["y"]
            z_sect = eq_stress[i][j]["z"]
            if i % 2 == 0 :
                color = "red"
                x_sect = [0]*len(y_sect)
                sigma = eq_stress[i][j]["s"]
                for k, (xi, yi, zi) in enumerate(zip(sigma, y_sect, z_sect)):
                    if xi < 0 :
                        ax.text(xi, yi, zi, f'({xi:.4f})', color=color, fontsize=8, ha='right', va='center_baseline')
                    else :
                        ax.text(xi, yi, zi, f'{xi:.4f}', color=color, fontsize=8, ha='right', va='center_baseline')
            else:
                color = "blue"
                x_sect = [inter]*len(y_sect)
                sigma_sub = eq_stress[i][j]["s"]
                sigma = [x + inter for x in sigma_sub]
                for k, (xi, yi, zi) in enumerate(zip(sigma, y_sect, z_sect)):
                    if xi-inter < 0 :
                        ax.text(xi, yi, zi, f'({xi - inter:.4f})', color=color, fontsize=8, ha='right', va='center_baseline')
                    else :
                        ax.text(xi, yi, zi, f'{xi-inter:.4f}', color=color, fontsize=8, ha='right', va='center_baseline')

            ax.plot(x_sect, y_sect, z_sect, linestyle='-', color="black")
            ax.plot(sigma, y_sect, z_sect, linestyle='-', color=color)

    # ax.set_xlabel('Stress')
    # ax.set_ylabel('Y')
    # ax.set_zlabel('Z')

    # Set axis limits to have equal scale
    max_y_values = [max(item['y']) for sublist in eq_stress for item in sublist if 'y' in item]
    min_y_values = [min(item['y']) for sublist in eq_stress for item in sublist if 'y' in item]
    max_z_values = [max(item['z']) for sublist in eq_stress for item in sublist if 'z' in item]
    min_z_values = [min(item['z']) for sublist in eq_stress for item in sublist if 'z' in item]

    max_range = max(max(max_y_values) - min(min_y_values), max(max_z_values) - min(min_z_values))
    mid_y = (max(max_y_values) + min(min_y_values)) / 2
    mid_z = (max(max_z_values) + min(min_z_values)) / 2

    ax.set_ylim(mid_y - max_range/2, mid_y + max_range/2)
    ax.set_zlim(mid_z - max_range/2, mid_z + max_range/2)

    # 조정된 크기로 축 설정
    ax.get_proj = lambda: np.dot(Axes3D.get_proj(ax), np.diag([1, 1, 1, 1]))

    ax.axis('off')

    # 그래프 표시
    plt.show()

def plot_temp_stress(height, inf_point, inf_temp_h, inf_temp_c, self_eq_stress):

    title_fontsize = 9
    fontsize = 8
    mark_size = 15

    # Temperature Gradient
    x_g = [0,0]
    y_g = [0, -height]

    x_h_temp = copy.deepcopy(inf_temp_h)
    x_h_temp.insert(0, 0)
    x_h_temp.append(0)

    x_c_temp = copy.deepcopy(inf_temp_c)
    x_c_temp.insert(0, 0)
    x_c_temp.append(0)

    y_temp = copy.deepcopy(inf_point)
    y_temp.insert(0, 0)
    y_temp.append(inf_point[-1])

    plt.subplot(1, 3, 1)
    plt.plot(x_h_temp, y_temp, color='red')
    plt.scatter(x_h_temp, y_temp, color='red', s=mark_size)
    plt.plot(x_c_temp, y_temp, color='blue')
    plt.scatter(x_c_temp, y_temp, color='blue', s=mark_size)
    plt.plot(x_g, y_g, color='black')
    plt.scatter(x_g, y_g, color='black', s=mark_size)
    plt.xticks(fontsize=fontsize)
    plt.yticks(fontsize=fontsize)
    plt.title("Temperature Gradient", fontsize=title_fontsize)
    
    # Heating Stress
    x_outer_h_stress = self_eq_stress[0][0]["s"]
    y_outer_h_stress = self_eq_stress[0][0]["z"]

    sorted_indices = np.argsort(y_outer_h_stress)
    x_outer_h_stress = np.array(x_outer_h_stress)[sorted_indices]
    y_outer_h_stress = np.array(y_outer_h_stress)[sorted_indices]

    if len(self_eq_stress[4][0]) > 0:
        x_slab_h_stress = self_eq_stress[4][0]["s"]
        y_slab_h_stress = self_eq_stress[4][0]["z"]

        sorted_indices = np.argsort(y_slab_h_stress)
        x_slab_h_stress = np.array(x_slab_h_stress)[sorted_indices]
        y_slab_h_stress = np.array(y_slab_h_stress)[sorted_indices]

    plt.subplot(1, 3, 2)
    plt.plot(x_outer_h_stress, y_outer_h_stress, color='red')
    plt.scatter(x_outer_h_stress, y_outer_h_stress, color='red', s=mark_size)
    plt.plot(x_g, y_g, color='black')
    plt.scatter(x_g, y_g, color='black', s=mark_size)
    if len(self_eq_stress[4][0]) > 0:
        plt.plot(x_slab_h_stress, y_slab_h_stress, color='red')
        plt.scatter(x_slab_h_stress, y_slab_h_stress, color='red', s=mark_size)
    plt.xticks(fontsize=fontsize)
    plt.yticks(fontsize=fontsize)
    plt.title("Self_Equilibrating Stress\n(Heating)", fontsize=title_fontsize)

    # Cooling Stress
    x_outer_c_stress = self_eq_stress[1][0]["s"]
    y_outer_c_stress = self_eq_stress[1][0]["z"]

    sorted_indices = np.argsort(y_outer_c_stress)
    x_outer_c_stress = np.array(x_outer_c_stress)[sorted_indices]
    y_outer_c_stress = np.array(y_outer_c_stress)[sorted_indices]

    if len(self_eq_stress[5][0]) > 0:
        x_slab_c_stress = self_eq_stress[5][0]["s"]
        y_slab_c_stress = self_eq_stress[5][0]["z"]

        sorted_indices = np.argsort(y_slab_c_stress)
        x_slab_c_stress = np.array(x_slab_c_stress)[sorted_indices]
        y_slab_c_stress = np.array(y_slab_c_stress)[sorted_indices]

    plt.subplot(1, 3, 3)
    plt.plot(x_outer_c_stress, y_outer_c_stress, color='blue')
    plt.scatter(x_outer_c_stress, y_outer_c_stress, color='blue', s=mark_size)
    plt.plot(x_g, y_g, color='black')
    plt.scatter(x_g, y_g, color='black', s=mark_size)
    if len(self_eq_stress[5][0]) > 0:
        plt.plot(x_slab_c_stress, y_slab_c_stress, color='blue')
        plt.scatter(x_slab_c_stress, y_slab_c_stress, color='blue', s=mark_size)
    plt.xticks(fontsize=fontsize)
    plt.yticks(fontsize=fontsize)
    plt.title("Self_Equilibrating Stress\n(Cooling)", fontsize=title_fontsize)

    # Shpw Plot
    plt.tight_layout()
    plt.show()
