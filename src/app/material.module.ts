import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule
} from '@angular/material';

@NgModule({
    imports:[
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatGridListModule,
        MatIconModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatGridListModule,
        MatIconModule
    ]
})

export class MaterialModule {}