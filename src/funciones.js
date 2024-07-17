import Swal from "sweetalert2";
import axios from "axios";


export function mostrarAlerta(titulo, icono, foco=''){
    if(foco != ''){
        document.getElementById(foco).focus();

    }
    Swal.fire({
        title: titulo,
        icon: icono,
        customClass:{
            confirmButton:'btn btn-primary',
            popup: 'animated zoonIn'
        },
        buttonsStyling:false
    });
}

export function Confirmar(uri, id, titulo, mensaje, redict){
    var url = uri+id;
    
    const swalWithBootstrapButton = Swal.mixin({
        customClass:{
            confirmButton:'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
        }
    });

    swalWithBootstrapButton.fire({
        title: titulo,
        text: mensaje,
        icon:'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-square-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res=>{
        if(res.isConfirmed){
            enviarSolicitud('DELETE', {id:id}, url, 'Eliminado con exito', redict);
        }
        else{
            mostrarAlerta('Operacion cancelada', 'info');
        }
    }));
}

export  function enviarSolicitud(metodo, parametros = {}, url, mensaje, redict){
    axios({
        method:metodo, 
        url:url, 
        data:parametros
    }).then(function(res){
        var estado = res.status;
        if(estado == 200){
            mostrarAlerta(mensaje, 'success');
            window.setTimeout(function(){
                window.location.href=redict; 
            }, 1000);
        }
        else{
            mostrarAlerta('No se pudo recuperar la respuesta', 'error');
        }
    }).catch(function(error){
        ///

        if (error.response) {
            if(error.response.status = 410){
                mostrarAlerta(mensaje, 'success');
                window.setTimeout(function(){
                    window.location.href=redict; 
                }, 1000);
            }
            else{
                mostrarAlerta('Servidor no disponible', 'error');
            }  
          } 
          else if (error.request) {
            mostrarAlerta('Error al eliminar', 'error');
          } 
          else{
            mostrarAlerta('Error al eliminar', 'error');
          }
    });

}