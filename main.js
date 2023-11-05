let counter = 0
let autoPrice = 0
let precioSeguro = 0
let iva = 0
let total = 0
const autos = [
    {
        id: 1,
        modelo: "Sedan",
        descripcion: 'Ideal para una peque;a familia',
        imagen: "../imagenes/Sedan-Acura.jpg",
        precio: 250
    },
    {
        id: 2,
        modelo: "SUV",
        descripcion: 'Ideal para familias numerosas y mucho equipaje!',
        imagen: "../imagenes/SUV-Maserati.jpg",
        precio: 300
    },
    {
        id: 3,
        modelo: "Deportivo",
        descripcion: 'Ideal para parejas y amigos y ser el centro de atencion!',
        imagen: "../imagenes/Deportivo-Aston Martin.jpg",
        precio: 450
    },
    {
        id: 4,
        modelo: "Camioneta",
        descripcion: 'Ideal para viajes al rancho y terrenos baldios!',
        imagen: "../imagenes/Camioneta-Ram.jpg",
        precio: 400
    },
];

document.addEventListener('click', function (e) {
    if (e.target.id === 'borrarDias') {
        counter = 0
        autoPrice = 0
        precioSeguro = 0
        iva = 0
        total = 0
        document.querySelector('#dias').innerHTML = counter
        document.querySelector('#total').innerHTML = total
        document.querySelector('#iva').innerHTML = iva
        document.querySelector('#seguroAuto').innerHTML = precioSeguro
        document.querySelector('#totalAuto').innerHTML = autoPrice
    }
    if (e.target.id === 'renta') {
        if (counter > 0) {
            alert(`Gracias por rentar autos con nosotros el total de su renta es de ${total}`)
        }
    }
})

localStorage.setItem('renta', JSON.stringify(autos));
let borrar = document.getElementById('dias')
let rentaStorage = localStorage.getItem('renta');

autos.forEach((item) => {
    let div = document.createElement('div');
    div.innerHTML = `
    <img src="${item.imagen}" alt="${item.modelo}" width="500">
    <div class="card-info">
    <div class="card-text">
    <p>Modelo: ${item.modelo}</p>
    <p>Descripcion: ${item.descripcion}</p>
    <p>Precio: ${item.precio}</p>
    </div>
    <button class="dias-renta" data-price =${item.precio}>Rentar</button>
    <button class="resta-renta" data-price =${item.precio}>Quitar</button>
    </div>`;

    document.body.append(div)
});

let botonesSuma = document.querySelectorAll('.dias-renta')
botonesSuma.forEach(function (boton) {
    boton.addEventListener('click', function (e) {
        let buttonClicked = e.target
        let label = document.querySelector('#dias')
        counter = label.innerHTML ? parseInt(label.innerHTML) + 1 : 1
        label.innerHTML = counter
        autoPrice = buttonClicked.dataset.price * counter
        document.querySelector('#totalAuto').innerHTML = autoPrice
        if (counter == 0) {
            precioSeguro = 0
        } else if (counter != 0) {
            precioSeguro = counter <= 7 ? 2000 : Math.ceil(counter / 7) * 2000
        }
        document.querySelector('#seguroAuto').innerHTML = precioSeguro
        iva = (precioSeguro + autoPrice) * 0.1
        document.querySelector('#iva').innerHTML = iva
        total = iva + precioSeguro + autoPrice
        document.querySelector('#total').innerHTML = total

    })
})

let botonesResta = document.querySelectorAll('.resta-renta')
counter = 0
autoPrice = 0
botonesResta.forEach(function (boton) {
    boton.addEventListener('click', function (e) {
        let buttonClicked = e.target
        let label = document.querySelector('#dias')
        counter = label.innerHTML ? parseInt(label.innerHTML) - 1 : 1
        if (counter >= 0) {
            label.innerHTML = counter
            autoPrice = buttonClicked.dataset.price * counter
            document.querySelector('#totalAuto').innerHTML = autoPrice
            if (counter == 0) {
                precioSeguro = 0
            } else if (counter != 0) {
                precioSeguro = counter <= 7 ? 2000 : Math.ceil(counter / 7) * 2000
            }
            document.querySelector('#seguroAuto').innerHTML = precioSeguro
            iva = (precioSeguro + autoPrice) * 0.1
            document.querySelector('#iva').innerHTML = iva
            total = iva + precioSeguro + autoPrice
            document.querySelector('#total').innerHTML = total
        }
    })
})