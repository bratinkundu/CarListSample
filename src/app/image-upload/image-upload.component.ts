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
  imgURL: string | ArrayBuffer;
  constructor(private formBuilder : FormBuilder,private service:ImagesService,private sanitizer: DomSanitizer) { }
  Images=[];
  Images2:any;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Image:[]     
    }); 
    this.startTime = Date.now();
    this.service.getimagesI().subscribe(data=>{
      console.log(data)
      this.Images2=data;
      console.log(this.Images2);
      for(var i=0;i<this.Images2.length;i++){        
        this.Images[i] = 'data:image/jpeg;base64,'+this.Images2[i].Image;
      }     
      this.endTime = Date.now(); 
      console.log(this.endTime - this.startTime)
    });
    

    
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
