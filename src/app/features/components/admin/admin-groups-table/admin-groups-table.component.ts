import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../../../core/models/group.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../../core/services/group/group.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { GroupDialogComponent } from '../../common/dialogs/group-dialog/group-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { showError } from '../../../../core/handlers/error.handler.';

@Component({
  selector: 'app-admin-groups-table',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginator,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin-groups-table.component.html',
  styleUrls: [
    './admin-groups-table.component.scss',
    '../../../../../styles/table.scss',
    '../admin-table.style.scss',
  ],
})
export class AdminGroupsTableComponent implements OnInit {
  groups: Group[] = [];
  displayedColumns: string[] = [
    'specialty',
    'department',
    'studentCount',
    'actions',
  ];
  dataSource = new MatTableDataSource<Group>([]);
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      this.dataSource.data = groups;
      this.isLoading = false;
    });
  }

  openGroupDialog(group?: Group): void {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: {
        group,
        groups: this.groups,
        onSubmit: (updatedGroup: Group) => {
          if (group) {
            this.updateGroup(updatedGroup);
          } else {
            this.createGroup(updatedGroup);
          }
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGroups();
      }
    });
  }

  createGroup(group: Group): void {
    this.groupService.createGroup(group).subscribe({
      next: () => {
        this.loadGroups();
        this.snackBar.open('Group created successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (responce) => {
        showError(this.snackBar, responce);
      },
    });
  }

  updateGroup(group: Group): void {
    this.groupService.updateGroup(group._id, group).subscribe({
      next: () => {
        this.loadGroups();
        this.snackBar.open('Group updated successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (responce) => {
        showError(this.snackBar, responce);
      },
    });
  }

  openDeleteDialog(id: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        question: 'Are you sure you want to delete this group?',
        onConfirm: () => this.deleteGroup(id),
      },
    });
  }

  deleteGroup(id: string): void {
    this.groupService.deleteGroup(id).subscribe({
      next: () => {
        this.groups = this.groups.filter((group) => group._id !== id);
        this.loadGroups();
        this.snackBar.open('Group deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (responce) => {
        showError(this.snackBar, responce);
      },
    });
  }
}
