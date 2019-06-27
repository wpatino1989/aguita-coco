import { Component, OnInit } from '@angular/core';
import { Producto } from "../../models/producto";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto-crear-editar',
  templateUrl: './producto-crear-editar.component.html',
  styleUrls: ['./producto-crear-editar.component.css']
})
export class ProductoCrearEditarComponent implements OnInit {


  //producto = new Producto();

  productos:  Producto[];
  ProductoSeleccionado:  Producto  = {
    id :  null ,
    nombre:null,
    descripcion:null,
    precio:  null,
    descuento : null,
    fecha_inicial_descuento : null,
    fecha_final_descuento: null,
    fecha_creacion: null
  };

  constructor( private apiService: ApiService,
               private  route: ActivatedRoute) { }

  ngOnInit() {

    const id:any = this.route.snapshot.paramMap.get('id');
    
    if (id != 'nuevo') {


      this.apiService.leerUnProducto(id).subscribe((productos: Producto[])=>{
        this.ProductoSeleccionado = productos[0];
        console.log("productoszzzzz-- ",this.ProductoSeleccionado);
      })

    }

  }

  seleccionarProducto(producto: any){
    this.ProductoSeleccionado = producto;
  }

  crearOActualizarProducto(form){

    if(this.ProductoSeleccionado && this.ProductoSeleccionado.id){
      form.value.id = this.ProductoSeleccionado.id;
      this.apiService.actualizarProducto(form.value).subscribe((producto: Producto)=>{


        Swal.fire({
          title: '',
          text: 'Registro actualizado correctamente',
          type: 'success'
        });

      });
    }
    else{

      this.apiService.crearProducto(form.value).subscribe((producto: Producto)=>{

        Swal.fire({
          title: '',
          text: 'Registro creado correctamente',
          type: 'success'
        });

      });
    }

  }


}
