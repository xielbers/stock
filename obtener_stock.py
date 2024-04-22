# obtener_stock.py
import requests
from bs4 import BeautifulSoup

# URL de la página con el stock
url = 'https://blox-fruits.fandom.com/wiki/Blox_Fruits_%22Stock%22'

# Realizar la solicitud GET a la URL
response = requests.get(url)

# Comprobar si la solicitud fue exitosa (código 200)
if response.status_code == 200:
    # Obtener el contenido HTML de la página
    soup = BeautifulSoup(response.text, 'html.parser')

    # Buscar el elemento con el stock
    stock_element = soup.find('div', {'id': 'mw-customcollapsible-Current'})

    if stock_element:
        # Obtener el texto del stock
        stock_text = stock_element.get_text().strip()
        print('Stock actual:', stock_text)
    else:
        print('No se pudo encontrar el stock en la página')
else:
    print('Error al obtener la página')
