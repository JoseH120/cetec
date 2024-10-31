import Swal from "sweetalert2";
import { api } from "@/pluggins/axios";
import router from "@/router";
function mostrarAlerta(titulo, icono, foco = "") {
  if (foco != "") document.getElementById(foco).focus();
  Swal.fire({
    title: titulo,
    icon: icono,
    timer: 1000,
    customClass: {
      confirmButton: "btn btn-primary",
      popup: "animated zoonIn",
    },
    buttonsStyling: false,
  });
}

function Confirmar(uri, id, titulo, mensaje, redict) {
  var url = uri + id;
  const swalWithBootstrapButton = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
  });

  swalWithBootstrapButton
    .fire({
      title: titulo,
      text: mensaje,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-square-check"></i>Si, eliminar',
      cancelButtonText: '<i class="fa-solid fa-circle-xmark"></i>Cancelar',
    })
    .then((res) => {
      if (res.isConfirmed) {
        //send enviar solicitud
        enviarSolicitud(
          "DELETE",
          { id: id },
          url,
          "Eliminado con exito",
          redict
        );
      } else {
        mostrarAlerta("Operacion cancelada", "info");
      }
    });
}

function enviarSolicitud(metodo, parametros = {}, url, mensaje, redict) {
  api({
    method: metodo,
    url: url,
    data: parametros,
  })
    .then((res) => {
      var estado = res.status;
      if (estado == 200 || estado == 201) {
        mostrarAlerta(mensaje, "success");
        setTimeout(function () {
          router.push(redict);
        }, 1000);
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 400) {
          mostrarAlerta("Error: " + err.response.data.messages.error, "error");
        } else if (err.response.status == 500) {
          mostrarAlerta(
            "Error interno en el servidor" + err.response.data.messages,
            "error"
          );
        } else {
          mostrarAlerta("servidor no disponible", "error");
        }
      } else if (err.request) {
        mostrarAlerta("Error", "error");
      } else {
        mostrarAlerta("Error", "error");
      }
    });
}

export { enviarSolicitud, Confirmar, mostrarAlerta };
