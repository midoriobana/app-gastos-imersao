import { Gasto } from '@/app/core/interface/gasto.interface';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  url_api = environment.apiUrl + '/gastos';

  constructor(private http: HttpClient) {}

  getGastos() {
    return this.http.get(this.url_api);
  }

  setGastos(gasto: Gasto) {
    return this.http.post(this.url_api, gasto);
  }
}
