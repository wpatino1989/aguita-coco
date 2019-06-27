import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { Producto} from '../models/producto';
import { Observable } from  'rxjs';
import { delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //direccion local del backend
  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private http: HttpClient) { }

  //metodo para recuperar todos los productos
  leerProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.PHP_API_SERVER}/api/leer.php`)
      .pipe(
        delay(1500)
      );
  }

  //metodo para recuperar todos los productos
  leerUnProducto(id: number): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.PHP_API_SERVER}/api/leerUnProducto.php/?id=${id}`);
  }


  //metodo para crear un producto
  crearProducto(policy: Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.PHP_API_SERVER}/api/crear.php`, policy);
  }

  //metodo para actualizar un producto
  actualizarProducto(policy: Producto){
    return this.http.put<Producto>(`${this.PHP_API_SERVER}/api/actualizar.php`, policy);
  }

  //metodo para eliminar un producto
  eliminarProducto(id: number){
    return this.http.delete<Producto>(`${this.PHP_API_SERVER}/api/eliminar.php/?id=${id}`);
  }
}
