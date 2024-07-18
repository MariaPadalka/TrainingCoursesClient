import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
