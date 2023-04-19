document.addEventListener('DOMContentLoaded', function() {
    // Configurar reglas de validación y mensajes de error usando jQuery validation
    $('#formularioProceso').validate({
        rules: {
            nombreProceso: 'required',
            nombreproducto: 'required',
            precio: 'required',
            cantidad: 'required'
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            nombreproducto: 'Por favor ingrese el nombre del producto',
            precio: 'Por favor ingrese el precio',
            cantidad: 'Por favor ingrese la cantidad'
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombre = document.getElementById('nombreProceso').value;
            var nombreproducto = document.getElementById('nombreproducto').value;
            var precio = document.getElementById('precio').value;
            var cantidad = document.getElementById('cantidad').value;

            // Realizar cálculos para la cotización
            var subtotal = precio * cantidad;
            var impuesto = subtotal * 421; // Se asume los impuestos pais
            var total = impuesto;

            // Generar el resumen de la cotización
            var cotizacion = 'Cotización:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'Nombre del producto: ' + nombreproducto + '\n' +
                'Precio: $' + precio + '\n' +
                'Cantidad: ' + cantidad + '\n' +
                'Subtotal: $' + subtotal + '\n' +
                'Impuesto (421 dolar hoy): $' + impuesto + '\n' +
                'Total: $' + total;

            // Mostrar la cotización en un cuadro de diálogo
            alert(cotizacion);

            // Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario
            // ...
            // Crear un nuevo objeto jsPDF
            var pdf = new jsPDF();

            // Agregar el resumen al documento PDF
            pdf.text(cotizacion, 10, 10);

            // Generar el archivo PDF como Blob
            var pdfBlob = pdf.output('blob');

            // Crear un enlace de descarga
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_cotizacion.pdf';
            downloadLink.click();

            // Liberar el objeto Blob
            URL.revokeObjectURL(pdfBlob);
        
        }
    });

    // Configurar reglas de validación y mensajes de error usando jQuery validation para el formulario de contacto
    $('#formularioContacto').validate({
        rules: {
            nombre: 'required',
            email: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombre: 'Por favor ingrese su nombre',
            email: {
                required: 'Por favor ingrese su dirección de correo electrónico',
                email: 'Por favor ingrese una dirección de correo electrónico válida'
            },
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombre = $('#nombre').val();
            var email = $('#email').val();
            var mensaje = $('#mensaje').val();

            // Hacer la petición AJAX para enviar los datos al servidor
            $.ajax({
                url: 'https://reqres.in/api/users?page=2', // URL de regres.in para la petición de contacto
                method: 'POST', // Método HTTP POST
                data: {
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje
                },
                success: function(response) {
                    // Aquí puedes manejar la respuesta del servidor si es necesario
                    console.log('Éxito:', response);
                    // Puedes mostrar un mensaje de éxito al usuario
                    alert('¡Mensaje enviado con éxito!');
                },
                error: function(xhr, status, error) {
                    // Aquí puedes manejar los errores de la petición AJAX si es necesario
                    console.error('Error:', error);
                    // Puedes mostrar un mensaje de error al usuario
                    alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
                }
            });
        }
    });
});

  


