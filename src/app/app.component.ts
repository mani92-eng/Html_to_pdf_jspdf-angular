import { Component, OnInit, ElementRef ,ViewChild,Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import *as $ from "jquery"

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit   {
  title = 'htmltopdf';
  today: Date = new Date();
  constructor(@Inject(DOCUMENT) private document: Document,
  ) {
  }
  
  ngOnInit(): void {

  }
  exportToPDF() {
    const htmlWidth:any = $("#print-section").width();
    const htmlHeight:any = $("#print-section").height();

    const topLeftMargin = 15;

    let pdfWidth:any = htmlWidth + (topLeftMargin * 2);
    let pdfHeight:any = (pdfWidth * 0.9) + (topLeftMargin * 2);

    const canvasImageWidth:any = htmlWidth;
    const canvasImageHeight:any = htmlHeight;

    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    const data:any = this.document.getElementById('print-section');
    html2canvas(data, { allowTaint: true }).then(canvas => {

      canvas.getContext('2d');
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'png', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([pdfWidth, pdfHeight], 'p');
        pdf.addImage(imgData, 'png', topLeftMargin, - (pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
      }

      pdf.save(`Document ${new Date().toLocaleString()}.pdf`);
    });
  }

}
  
  
 
 


