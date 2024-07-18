async function fetchStock() {
    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://blox-fruits.fandom.com/wiki/Blox_Fruits_%22Stock%22');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Verificar si el contenido fue obtenido correctamente
        console.log("Contenido obtenido:", text);

        const stockDiv = doc.querySelector('#mw-customcollapsible-Current');

        if (stockDiv) {
            const stockContent = stockDiv.innerHTML;
            document.getElementById('stock-container').innerHTML = stockContent;
            notifyStock(stockContent);
        } else {
            document.getElementById('stock-container').innerText = 'No se pudo encontrar el stock actual.';
            console.error('No se encontró el elemento con el ID #mw-customcollapsible-Current.');
        }
    } catch (error) {
        document.getElementById('stock-container').innerText = 'Error al cargar el stock.';
        console.error('Error al obtener el stock:', error);
    }
}

function notifyStock(stockContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stockContent, 'text/html');
    const stockItems = doc.querySelectorAll('li');

    stockItems.forEach(item => {
        const fruitName = item.textContent.trim();
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nueva fruta en stock', {
                body: fruitName,
                icon: 'https://blox-fruits.fandom.com/wiki/Blox_Fruits_%22Stock%22'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Nueva fruta en stock', {
                        body: fruitName,
                        icon: 'https://blox-fruits.fandom.com/wiki/Blox_Fruits_%22Stock%22'
                    });
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchStock);
