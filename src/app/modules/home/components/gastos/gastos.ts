import { DateMaskDirective } from '@/app/shared/directives/date.directive';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NgxMaskDirective } from 'ngx-mask';
import { Gasto } from '@/app/core/interface/gasto.interface';
import { GastosService } from '@/app/core/service/gastos.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-gastos',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    DateMaskDirective,
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
    descricao: new FormControl(''),
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
    console.log(typeof form.value.data, form.value.data);
    if (form.invalid) {
      this.openSnackBar('Preencha todos os campos obrigatórios!');
      return;
    }
    if (form.value) {
      const gasto: Gasto = {
        ...(this.form.value as any),
        valor: String(form.value.valor ?? ''),
        data: form.value.data ? format(new Date(form.value.data as any), 'dd/MM/yyyy') : null,
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
