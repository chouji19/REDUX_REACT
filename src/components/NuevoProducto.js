import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {crearNuevoProductoAction} from '../actions/productoActions'
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions'

const NuevoProducto = ({history}) => {

    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const dispatch = useDispatch();

    //Acceder al state 
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Manda llamar el action del producto action
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )
    
    
    const sumbitNuevoProducto = e=> {
        e.preventDefault();
        
        if(nombre.trim()==='' || precio <= 0){
            const alerta = {
                msg: 'Name and Price must have a value ',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
           dispatch(mostrarAlerta(alerta));
            return;
        }
        dispatch(ocultarAlertaAction());
        agregarProducto({nombre, precio});
        history.push('/');
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p>:null}
                        <form
                            onSubmit={sumbitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Product Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product Name"
                                    name="nombre"
                                    value={nombre}
                                    onChange= { e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Price</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Product Price"
                                    name="precio"
                                    value={precio}
                                    onChange= { e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Add</button>
                        </form>
                        { cargando ? <p>Cargando....</p> : null}
                        { error ? <p className="alert alert-danger p2 ,t-4 text-center">Cargando....</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;