import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ImagesService } from './images.service';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  form:FormGroup;
  message: string;
  imagePath: any;
  startTime;
  endTime;
  ExecutionTime:any;
  executionTime;
  imgURL: string | ArrayBuffer;
  constructor(private formBuilder : FormBuilder,private service:ImagesService,private sanitizer: DomSanitizer) { }
  Images=[];
  Images2:any;
  ImageSize=[];
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Image:[]     
    }); 
    this.startTime = Date.now(); 
    this.service.getIImagesLive().subscribe(data=>{
      //console.log(data)
      this.Images2=data;
      //console.log(this.Images2);
      for(var i=0;i<this.Images2.length;i++){        
        this.Images[i] = 'data:image/jpeg;base64,'+this.Images2[i].Image;
        this.ImageSize[i]=this.calculateImageSize(this.Images2[i].Image);
      }     
      this.endTime = Date.now(); 
      //console.log(this.endTime - this.startTime)
      this.ExecutionTime=(this.endTime - this.startTime)/1000;
      //console.log(this.ImageSize);
    });    
  }

  calculateImageSize(base64String){
    let padding, inBytes, base64StringLength;
    if(base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    //console.log(base64StringLength)
    inBytes =(base64StringLength / 4 ) * 3 - padding;
    //console.log(inBytes);
    var kbytes = inBytes / 1024;
    return kbytes/1024;
  }
  submit(data){    
    this.service.sendImage(data).subscribe(data=>{      
     alert("Triggerd");
     this.ngOnInit();
     this.imgURL="";
    });
  }
  change(files){    
    var reader = new FileReader();
    this.imagePath = files.target.files[0];    
    reader.readAsDataURL(this.imagePath);   
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      let data ={ "Name":files.target.files[0].name,"Image":reader.result.slice(23)};
      console.log(data);
      this.submit(data);      
    }     
  }
}
