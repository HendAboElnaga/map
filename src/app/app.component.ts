import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'map';
   dropdownOpen = false;
     fdtList = [
     { name: 'FDT_RYD1000000', percentage: '50%' },
     { name: 'FDT_MDN2000001', percentage: '47%' },
     { name: 'FDT_JED3000002', percentage: '45%' },
     { name: 'FDT_TAB4000003', percentage: '43%' },
     { name: 'FDT_HAF5000004', percentage: '42%' }
   ];
   

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }
}
