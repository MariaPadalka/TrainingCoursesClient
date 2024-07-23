import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './features/components/main/main.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FooterComponent,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'course-management-client';
}
