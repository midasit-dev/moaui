from engineers import *

# create MidasAPI
midas = MidasAPI(Product.CIVIL)

data = midas.view_select_get()
print(data)
