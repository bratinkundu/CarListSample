import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private http:HttpClient) { }
  hostedUrl ="https://10.0.2.150:8183/";
  localurl ="https://localhost:44341/"
  sendImage(data){
    return this.http.post('https://localhost:44341/api/Insertimage',data);
  }
  getimagesI(){
    return this.http.get("https://localhost:44341/api/GetImageOfIImages");
  }
  getimagesV(){
    return this.http.get("https://localhost:44341/api/GetImageVImages");
  }
  getIImagesLive(){
    return this.http.get(this.hostedUrl+"api/GetImageOfIImages");
  }
  getVImagesLive(){
    return this.http.get(this.hostedUrl+"api/GetImageVImages");
  }
  sendImagetoLive(data){
    return this.http.post(this.hostedUrl+'api/Insertimage',data);
  }
}
