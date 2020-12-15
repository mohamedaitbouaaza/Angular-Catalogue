/**
 * @author Mohamed AIT BOUAAZA
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  pagePhotos:any;
  currentPage:number=1;
  size:number=10;
  pages:Array<number>=[];
  totalPage:number;
  motcle:string="";
  x:number;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  onSearch(dataForm) {
    this.http.get("https://pixabay.com/api/?key=13912530-3570838dcf41d8311f7d6e054&q="
    +dataForm.motcle+"&per_page="+this.size+"&page="+this.currentPage)
    .subscribe(data=>{
      this.pagePhotos=data;
      this.totalPage=this.pagePhotos['totalHits'] / this.size;
      console.log(Math.trunc(this.totalPage));
      this.x=Math.trunc(this.totalPage);
      if(this.pagePhotos['totalHits'] % this.size!=0) ++this.x;
      this.pages = new Array(this.x);
    })


  }
  goToPage(i){
    this.currentPage=i+1;
    this.onSearch({motcle:this.motcle});
   }
}
