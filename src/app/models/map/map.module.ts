import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { BrowserModule } from "@angular/platform-browser";
import { FileHelper } from "./file-helper";
import { MapService } from "./map.service";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileHelper,MapService],
  bootstrap: [],
  exports:[MapComponent]
})
export class MapModule { }