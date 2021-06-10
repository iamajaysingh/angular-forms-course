import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { of } from "rxjs";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requireFileType;
  fileName: string = "";
  fileUploadError: boolean = false;
  fileUploadProgress: number;
  onChange = (fileName) => {};
  onToched = () => {};
  disabled: boolean = false;
  isUploadSuccess: boolean = false;
  onValidatorChange = () => {};

  constructor(private http: HttpClient) {}

  uploadFile(event) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      this.fileName = file.name;
      const fd = new FormData();
      fd.append("thumbnail", file);
      this.http
        .post("/api/thumbnail-upload", fd, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          // it execute either Obserable completed or found
          finalize(() => {
            this.fileUploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(
              (event.loaded / event.total) * 100
            );
          } else if (event.type === HttpEventType.Response) {
            this.onChange(this.fileName);
            this.isUploadSuccess = true;
            this.onValidatorChange();
          }
        });
    }

    // end of block
  }

  onClickForm(fileUpload: HTMLInputElement) {
    this.onToched();
    fileUpload.click();
  }

  // it set the value for formcontrol
  writeValue(value: any): void {
    this.fileName = value;
  }
  // it allow us to communicate with parent form it accept
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  // When user get away from the form field after edit somthing in filed
  registerOnTouched(onToched: any): void {
    this.onToched = onToched;
  }
  //disable the form filed
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  // validator interface function
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requireFileType,
    };
    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }
    return errors;
  }
}
