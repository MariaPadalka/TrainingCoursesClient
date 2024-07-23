import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export function showError(
    snackBar: MatSnackBar,
    error: HttpErrorResponse
): void {
    const errorMessage =
        error.error?.message || error.statusText || 'An unknown error occurred';
    snackBar.open(errorMessage, 'Close', {
        duration: 3000,
    });
}
