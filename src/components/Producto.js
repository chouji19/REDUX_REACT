import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { borrarProductoAction, obtenerProductoEditarAction } from '../actions/productoActions'
import Swal from 'sweetalert2'


const Producto = ({producto}) => {
    const { nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    //confirmar si desea eliminar
    const confirmarEliminarProducto = id => {
        //Pregunta si desea eliminarlo
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                dispatch( borrarProductoAction(id) );
                
            }
            })       
    }


    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditarAction(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold"> $ {precio}</span></td>
            <td className="acciones"> 
                <button 
                    onClick={()=>redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2"
                >
                    Edit
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={()=>confirmarEliminarProducto(id)}
                    >Delete</button>
            </td>
        </tr>
     );
}
 
export default Producto;