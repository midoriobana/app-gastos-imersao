import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { GastosService } from '../../../../core/service/gastos.service';
import { Gasto } from '../../../../core/interface/gasto.interface';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-gastos',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './gastos.html',
  styleUrl: './gastos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastosComponent implements OnInit {
  gastos: Object | undefined;
  maxDate = new Date();
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private gastosService: GastosService) {}
  form = new FormGroup({
    valor: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    data: new FormControl<Date | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.buscarGastos();
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  buscarGastos() {
    this.gastosService.getGastos().subscribe({
      next: (dados) => (this.gastos = dados),
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    const form = this.form;
    if (form.invalid) {
      this.openSnackBar('Preencha todos os campos obrigatórios!');
      return;
    }
    if (form.value) {
      const gasto: Gasto = {
        ...(this.form.value as any),
        valor: String(form.value.valor ?? ''),
        data: form.value.data || null,
      };

      this.gastosService.setGastos(gasto).subscribe({
        next: (item) => {
          console.log(item);
          this.openSnackBar('Gasto adicionado com sucesso!');
          this.form.reset();
        },
      });
    }
  }
}
