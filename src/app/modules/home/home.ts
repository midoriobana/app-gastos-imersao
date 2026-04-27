import { Component } from '@angular/core';
import { GastosComponent } from './components/gastos/gastos';

@Component({
  selector: 'app-home',
  imports: [GastosComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
