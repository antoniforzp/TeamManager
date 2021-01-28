import { FormGroup } from '@angular/forms';

// WORKS this.addressForm.markAsTouched()
// export class FormsUtils {
//   static markFormGroupTouched(formGroup: FormGroup): void {
//     (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
//       control.markAsTouched();

//       if (control.controls) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
// }
