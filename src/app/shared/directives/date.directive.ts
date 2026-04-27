import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[dateMask]',
  standalone: true,
})
export class DateMaskDirective {
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

    input.value = value;
  }
}
