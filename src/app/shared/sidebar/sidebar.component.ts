import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  itemTemp: string = "";

  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar(item: string){

    if(this.itemTemp != item ){
      this.itemTemp = item;
      return this.gifsService.buscarGifs(item)
    }

  }

}
