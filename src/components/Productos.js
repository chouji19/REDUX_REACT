import React,{Fragment, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {obtenerProductosAction} from '../actions/productoActions'
import Producto from './Producto'

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( (params) => {
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
        // eslint-disable-next-line 
    }, []
    );

    const productos = useSelector( state => state.productos.productos);
    const error = useSelector( state => state.productos.error);
    const loading = useSelector( state => state.productos.loading);


    return ( 
        <Fragment>
            <h2 className="text-center my-5">Products List</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">There was an error</p> : null}
            {loading ? <p className="text-center">Loading....</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? 'There are no products ': (
                        productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Productos;