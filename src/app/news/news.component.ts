import {Component, NgZone, OnInit} from '@angular/core';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MediaService} from "../service/media.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-news',
  standalone: true,
    imports: [
        EditorComponent,
        FormsModule,
        ReactiveFormsModule, CommonModule
    ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  content = '';
  showMediaModal = false;
  mediaList: any[] = [];
  selectedUrl: string | null = null;
  editorInstance: any;
  imageDialogOpen = false;
  private tinyCallback: ((url: string, meta?: any) => void) | null = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private mediaService: MediaService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    this.mediaService.getAll().subscribe({
      next: (res: any[]) => {
        this.mediaList = res.map((m: any) => ({
          ...m,
          fileUrl: `http://localhost:3000/uploads/${m.filePath}`,
        }));
      },
      error: () => this.toastr.error('Failed to load media'),
    });
  }

  // 🔹 TinyMCE "Browse" button handler
  filePickerCallback(callback: (url: string, meta?: any) => void, value: string, meta: any) {
    if (meta.filetype === 'image') {
      this.ngZone.run(() => {
        this.showMediaModal = true;
        this.tinyCallback = callback;
      });
    }
  }

  selectImage(url: string) {
    this.selectedUrl = url;
  }

  onEditorInit(event: any) {
    this.editorInstance = event.editor;
  }
  // 🔹 “Insert” button
  confirmImage() {
    if (this.selectedUrl && this.editorInstance) {
      const editor = this.editorInstance;

      // Insert the image
      editor.insertContent(
        `<img src="${this.selectedUrl}" alt="Selected image" style="max-width:100%;height:auto;" />`
      );

      // Select the last inserted image
      const imgs = editor.dom.select('img');
      const lastImg = imgs[imgs.length - 1];
      editor.selection.select(lastImg);

      // Open TinyMCE image dialog for resizing & advanced options
      editor.execCommand('mceImage');

      this.toastr.success('Image inserted!');
      this.closeModal();
    }
  }
  confirmImageT() {
    if (this.selectedUrl && this.editorInstance) {
      this.ngZone.run(() => {
        // Insert image as TinyMCE object so resizing works
        this.editorInstance.insertContent(
          `<img src="${this.selectedUrl}" alt="Selected image" class="mce-object" style="max-width:100%;height:auto;" />`
        );

        this.toastr.success('Image inserted!');
        this.closeModal();
      });
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http
      .post<any>('http://localhost:3000/api/media/upload', formData)
      .subscribe({
        next: () => {
          this.toastr.success('Image uploaded!');
          this.loadMedia();
        },
        error: () => this.toastr.error('Upload failed'),
      });
  }

  closeModal() {
    this.showMediaModal = false;
    this.selectedUrl = null;
    this.tinyCallback = null;
  }
}
