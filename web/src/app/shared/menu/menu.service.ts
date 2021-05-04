import { Injectable } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private navigatorService: NavigationService) {}
}
