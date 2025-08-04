import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { BrowserModule } from "@angular/platform-browser";
import { FileHelper } from "./file-helper";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileHelper],
  bootstrap: [],
  exports:[MapComponent]
})
export class MapModule { }