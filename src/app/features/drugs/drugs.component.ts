import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent {

  datasets: any = []

  constructor (private router: Router) { }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

}
