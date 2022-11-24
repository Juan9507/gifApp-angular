import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey     : string = 'NB9EpIWN9qeTQimYnPM6yzIxgKU2qYrj';
  private _historial : string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados  : Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=NB9EpIWN9qeTQimYnPM6yzIxgKU2qYrj&q=drangon ball z&limit=10')
    //   .then(resp => {
    //     resp.json().then(data => {
    //       console.log(data)
    //     })
    //   })

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(
        `${this.servicioUrl}/search`, {params}
      )
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
