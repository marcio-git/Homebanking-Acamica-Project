//Declaración de variables
let saldoCuenta = 5000;
let limiteExtraccion = 2000;

const agua = 350;
const telefono = 425;
const luz = 210;
const internet = 570;
const cuentaAmiga1 = "1234567";
const cuentaAmiga2 = "7654321";
const codigoDeSeguridad = 1234;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
  iniciarSesion();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  let limite = prompt("Ingrese nuevo límite de extracción");
  if (limite == null || limite == "") {
    alert("No se ingresó un nuevo límite de extracción.");
  } else {
    let nuevoLimite = parseInt(limite);
    if (isNaN(nuevoLimite)) {
      alert("no es un numero")
    } else {
      limiteExtraccion = nuevoLimite;
      actualizarLimiteEnPantalla();
      alert(`Su nuevo límite es de $ ${limiteExtraccion}`);
    }
  }
}

function extraerDinero() {
  let saldoAnterior = saldoCuenta;
  let egresoDeDinero = prompt("Ingrese la cantidad de dinero que desea extraer");
  if (egresoDeDinero == null || egresoDeDinero == "") {
    alert("No ingresó monto a extraer.");
  } else {
    egresoDeDinero = parseInt(egresoDeDinero);
    if (egresoDeDinero > saldoCuenta) {
      alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.")
    } else if (egresoDeDinero > limiteExtraccion) {
      alert("La cantidad de dinero que deseae extraer es mayor a tu límite de extracción.");
    } else if (egresoDeDinero % 100 !== 0) {
      alert("Solo puedes extraer billetes de 100.");
    } else {
      restarDinero(egresoDeDinero);
      actualizarSaldoEnPantalla();
      alert(`Has extraido $ ${egresoDeDinero}\nSaldo Anterior $ ${saldoAnterior}\nSaldo Actual $ ${saldoCuenta}`)
    }
  }
}

function depositarDinero() {
  let deposito = prompt('Ingrese el dinero que desea depositar');
  let ingresoDeposito = parseInt(deposito);
  if (ingresoDeposito == null || ingresoDeposito == "") {
    alert("No ingresó monto a depositar");
  } else if (isNaN(ingresoDeposito)) {
    alert("Por favor ingrese solo números");
  } else {
    let saldoAnterior = saldoCuenta;
    sumarDinero(ingresoDeposito);
    actualizarSaldoEnPantalla();
    alert(`Has depositado $ ${ingresoDeposito}\nSaldo Anterior $ ${saldoAnterior}\nSaldo Actual $ ${saldoCuenta}`);
  }
}

function pagarServicio() {
  let servicioElegido = prompt("Ingrese el número que corresponda con el servicio que queres pagar\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono")
  if (servicioElegido == null || servicioElegido == "") {
    alert("No eligió un servicio")
  } else {
    let servicioAPagar = parseInt(servicioElegido);
    switch (servicioAPagar) {
      case 1:
        realizarPagoServicio("Agua", agua);
        break;
      case 2:
        realizarPagoServicio("Luz", luz);
        break;
      case 3:
        realizarPagoServicio("Internet", internet);
        break;
      case 4:
        realizarPagoServicio("Teléfono", telefono);
        break;
      default: alert("No existe el sevicio que se ha seleccionado")
        break;
    }
    actualizarSaldoEnPantalla();
  }

}
function realizarPagoServicio(servicio, precioServicio) {
  let saldoAnterior = saldoCuenta;
  if (saldoCuenta > precioServicio) {
    restarDinero(precioServicio);
    alert(`Has pagado el servicio de ${servicio}\nSaldo Anterior $ ${saldoAnterior}\nDinero descontado $ ${precioServicio}\nSaldo Actual $ ${saldoCuenta}`);
  } else {
    alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
  }
}

function transferirDinero() {
  let monto = prompt("Monto que desea transferir");
  if (monto == null || monto == "") {
    alert("No ingresó ningún monto")
  } else if (saldoCuenta < monto) {
    alert("No hay saldo suficiente");
  } else if (saldoCuenta >= monto) {
    let cuentaAmiga = prompt("Ingrese el número de cuenta al que desea transferir");
    if (cuentaAmiga == null || cuentaAmiga == "") {
      alert("No ingresó ninguna cuenta");
    } else if (cuentaAmiga == cuentaAmiga1 || cuentaAmiga == cuentaAmiga2) {
      monto = parseInt(monto);
      restarDinero(monto);
      actualizarSaldoEnPantalla();
      alert(`Se ha transferido $ ${monto}\nCuenta destino: ${cuentaAmiga}`)
    } else {
      alert("Solo se puede transferir a una cuenta amiga.");
    }
  }
}

function iniciarSesion() {
  let nombreUsuario = prompt(`Ingrese su nombre`)
  let codigoIngresado = prompt(`Ingrese código de su cuenta`);
  if (codigoIngresado == codigoDeSeguridad) {
    cargarNombreEnPantalla(nombreUsuario);
    alert(`Bienvenido/a ${nombreUsuario}, ya puedes a comenzar a realizar operaciones.`)
  } else {
    saldoCuenta = 0;
    alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
    actualizarSaldoEnPantalla();
  }
}
function sumarDinero(dineroX) {
  saldoCuenta += dineroX;
}
function restarDinero(dineroX) {
  saldoCuenta -= dineroX;
}
//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(nombreUsuario) {
  document.getElementById("nombre").innerHTML = `Bienvenido/a ${nombreUsuario}`;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = `$ ${saldoCuenta}`;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML = `Tu límite de extracción es: $ ${limiteExtraccion}`;
}
