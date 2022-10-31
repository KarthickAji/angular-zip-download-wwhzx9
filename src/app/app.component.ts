import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  constructor(private http: HttpClient) {}

  download = async () => {
    const zip = new JSZip();
    // create a file
    zip.file('hello.txt', 'Hello[p my)6cxsw2q');
    // oops, cat on keyboard. Fixing !
    zip.file('hello.txt', 'Hello World\n');

    // create a file and a folder
    zip.file('im.jpg', 'im.jpg');
    // same as
    // zip.folder('nested').file('hello.txt', 'Hello World\n');
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'example.zip');
    });
  };

  downloadZip() {
    this.loadSvgData(
      'https://c.staticblitz.com/assets/client/icons/file-icons/angular-component-31179578a9a8a16512e9e90ade26549a.svg',
      this.saveAsZip
    );
  }

  private loadSvgData(url: string, callback: Function): void {
    this.http
      .get(url, { responseType: 'arraybuffer' })
      .subscribe((x) => callback(x));
  }

  private saveAsZip(content: Blob): void {
    var zip = new JSZip();
    zip.file('image.svg', content);
    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => saveAs(blob, 'image.zip'));
  }
}
