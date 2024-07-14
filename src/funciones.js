import Swal from "sweetalert2";
import axios, { Axios } from "axios";

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

export function Confirmar(url, id, titulo, mensaje){
    var url = url+id;
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
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res=>{
        if(res.isConfirmed){
            enviarSolicitud('DELETE', {id:id}, url, 'Eliminado con exito');
        }
        else{
            mostrarAlerta('Operacion cancelada', 'info');
        }
    }));

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

export function enviarSolicitud(metodo, parametros, url, mensaje){
    axios({method:metodo, url:url, data:parametros}).then(function(res){
        var estado = res.status;
        if(estado == 200){
            mostrarAlerta(mensaje, 'Success');
            window.setTimeout(function(){
                window.location.href='/';
            }, 1000);
        }
        else{
            mostrarAlerta(mensaje, 'Error de servidor', 'error')
        }
    }).catch(function(error){
        mostrarAlerta(mensaje, 'Servidor no disponible', 'error')
    });

}