import { HttpErrorResponse } from '@angular/common/http';

export interface RequestResult {
  status: number;
  message: string;
  data: string;
}
