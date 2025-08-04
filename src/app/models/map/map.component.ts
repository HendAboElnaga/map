import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import * as ol from 'ol';
import { OSM, Vector, XYZ } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import { Point, Polygon } from 'ol/geom';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { Feature } from 'ol';
import { FileHelper } from './file-helper';
import * as olProj from 'ol/proj';
import { Subject } from "rxjs";
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { MapService } from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {


  items = [
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
    { district: "Riyadh", fdtPI: 30, tbPI: 50, region: "Northern" },
  ];




    private map: any;
    public status: string='live';
    private vectorSource!: Vector;
    private vectorLayer!: VectorLayer;
    private markersLayer!: VectorLayer;

    tooltipElement!: HTMLElement;
    // private _unsubscribeAll: Subject<any>;
    fdtLocations: any[] = [];
    private _unsubscribeAll: Subject<void> = new Subject<void>();



    constructor(
    private fileHelper: FileHelper,
  private _mapService:MapService )
 {
    this._unsubscribeAll = new Subject();
   
    

  }


  ngOnInit(): void {
      this.initMap();
  }

  initMap() {

    this.vectorSource = new Vector();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    // Set up the markers layer
    this.markersLayer = new VectorLayer({
      source: new Vector()
    });


    const tileLayer = new TileLayer({
      source: new XYZ({
        // url: 'http://10.23.68.138:5000/tiles/osm_bright/{z}/{x}/{y}.png', // Path to your local tiles
        url: 'http://localhost:5000/tiles/osm_bright/{z}/{x}/{y}.png', // Path to your local tiles
        //http://localhost:5000/

      })
    });


    this.map = new ol.Map({
      target: 'map',
      layers: [
        tileLayer,
        this.markersLayer,
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([46.6753, 24.7136]), // Center of Saudi Arabia
        zoom: 5
      })
    });


    this.setMapIcons();


  }



  setMapIcons() {
    let districts = [
      { name: 'ABHA', coordinates: [42.5050, 18.2207], region: 'Southern', color: '#35a164' },
      { name: 'ALAHSA', coordinates: [49.5887, 25.3422], region: 'Eastern', color: '#35a164' },
      { name: 'ALJOUF', coordinates: [40.1480, 29.9735], region: 'Northern', color: '#35a164' },
      { name: 'ARAR', coordinates: [41.0000, 30.9070], region: 'Northern', color: '#35a164' }, // Corrected
      { name: 'ASIR', coordinates: [42.7500, 19.1000], region: 'Southern', color: '#35a164' }, // Corrected
      { name: 'BAHA', coordinates: [41.4680, 20.0200], region: 'Southern', color: '#35a164' },
      { name: 'DAMMAM', coordinates: [49.9777, 26.4207], region: 'Eastern', color: '#35a164' },
      { name: 'HAIL', coordinates: [41.7225, 27.5116], region: 'Northern', color: '#35a164' },
      { name: 'JEDDAH', coordinates: [39.1925, 21.2854], region: 'Western', color: '#35a164' },
      { name: 'JIZAN', coordinates: [42.5510, 16.8890], region: 'Southern', color: '#35a164' },
      { name: 'JUBAIL', coordinates: [49.9753, 27.0375], region: 'Eastern', color: '#35a164' },
      { name: 'MADINAH', coordinates: [39.6117, 24.4707], region: 'Western', color: '#35a164' },
      { name: 'MAKKAH', coordinates: [39.8262, 21.4225], region: 'Western', color: '#35a164' },
      { name: 'NAJRAN', coordinates: [44.1250, 17.4930], region: 'Southern', color: '#35a164' },
      { name: 'NORTHERN BORDER', coordinates: [42.0000, 31.0000], region: 'Northern', color: '#35a164' }, // Corrected
      { name: 'QASSIM', coordinates: [43.9780, 26.3540], region: 'Central', color: '#35a164' },
      { name: 'RIYADH', coordinates: [46.7200, 24.6877], region: 'Central', color: '#35a164' },
      { name: 'TABUK', coordinates: [36.5772, 28.3835], region: 'Northern', color: '#35a164' },
      { name: 'TAIF', coordinates: [40.4167, 21.2854], region: 'Western', color: '#35a164' },
      { name: 'YANBU', coordinates: [38.0532, 24.0889], region: 'Western', color: '#35a164' }
    ];

    // this._mapService.GetTopDistrictsData(this.status).subscribe(res => {
    //   this.topdistricts = res.Data;
    //   // this.alldistricts=res.Data;
    //   for (let i = 0; i < this.topdistricts.length; i++) {
    //     var district = districts.filter(x => x.name == this.topdistricts[i].district)[0];
    //     if (district != null) {
    //       if ((this.status=='live' && this.topdistricts[i].fdt_pi >= 95) ||(this.status=='history' && this.topdistricts[i].fdt_pi >= 85)) {
    //         districts.filter(x => x.name == this.topdistricts[i].district)[0].color = '#35a164';
    //       }
    //       else if ((this.status=='live' && this.topdistricts[i].fdt_pi <95 && this.topdistricts[i].fdt_pi >= 85) || (this.status=='history' && this.topdistricts[i].fdt_pi <85 && this.topdistricts[i].fdt_pi >= 70)) {
    //         districts.filter(x => x.name == this.topdistricts[i].district)[0].color = '#3d348b';
    //       }
    //       else {
    //         districts.filter(x => x.name == this.topdistricts[i].district)[0].color = 'red';

    //       }
    //     }


    //   }
    //   this.addCityMarkers(districts);
    // });


    this.map.on('moveend', () => {
      const zoomLevel = this.map.getView().getZoom();

      if (zoomLevel > 9) { // Zoom in to show district boundaries
        console.log('zoom in ');
        this.showDistrictBoundaries();
      } else {
        console.log('zoom out ');

        this.showCityMarkers(districts);
      }
    });


    


    /////////////////// Tooltip /////////////////////
    // Tooltip Element
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'tooltip';
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    this.tooltipElement.style.border = '1px solid #ccc';
    this.tooltipElement.style.padding = '5px';
    document.getElementById('mapdiv')?.appendChild(this.tooltipElement);

    // Add mouse move event to show tooltip
    this.map.on('pointermove', (event: MapBrowserEvent<any>) => {

      const pixel = this.map.getEventPixel(event.originalEvent);
      const coordinate = this.map.getCoordinateFromPixel(pixel);
      const coordinateLonLat = olProj.toLonLat(coordinate);

      // Example: Show tooltip on a specific location
      if (this.isTargetLocation(coordinateLonLat)) {
        console.log('hoverimg');
        this.showTooltip(coordinate, 'You are hovering over this point!');
      } else {
        console.log('un-hoverimg');
        // this.hideTooltip();
      }
    });
    //////////////////////////////////////////////////


  }////////////////////// End ////////////////////



    isTargetLocation(lonLat: number[]): boolean {
    // Example condition: Only show tooltip if it's near a specific location
    const targetLonLat = [46.7200, 24.6877]; // Example coordinates to check against
    const tolerance = 0.5; // Acceptable distance tolerance in degrees

    const distance = Math.sqrt(
      Math.pow(lonLat[0] - targetLonLat[0], 2) + Math.pow(lonLat[1] - targetLonLat[1], 2)
    );
    return distance < tolerance;
  }


    private showDistrictBoundaries(): void {
    // Clear previous markers
    this.markersLayer?.getSource()?.clear();

    // Create the tooltip element for showing FDT names
    const tooltipElement = document.createElement('div');
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    tooltipElement.style.padding = '5px';
    tooltipElement.style.borderRadius = '5px';
    tooltipElement.style.border = '1px solid #ccc';
    tooltipElement.style.whiteSpace = 'nowrap';
    tooltipElement.style.visibility = 'hidden'; // Initially hidden

    // Add the tooltip to the map as an overlay
    const tooltipOverlay = new ol.Overlay({
      element: tooltipElement,
      offset: [10, 0], // Offset the tooltip slightly
      positioning: 'bottom-left', // Position the tooltip relative to the icon
    });
    this.map.addOverlay(tooltipOverlay);

    // Add markers for FDT locations
    this.fdtLocations.forEach(location => {
      const point = new Point(fromLonLat([location.longitude, location.latitude]));
      const feature = new ol.Feature(point);

      // Set the name property for the tooltip
      feature.set('name', location.name);
      feature.set('percentage', location.percentage);


      feature.setStyle(new Style({
        image: new Icon({
          src: '../../../../../assets/images/logo/icons/circleh40.png',
          color: location.color, // Color based on region or property
          scale: 0.5, // Resize the marker icon
          opacity: 0.7,
        }),
      }));

      this.markersLayer?.getSource()?.addFeature(feature);
    });

    // Add hover event listeners

this.map.on('pointermove', (event: MapBrowserEvent<any>) => {
  const pixel = this.map.getEventPixel(event.originalEvent);
  const feature = this.map.forEachFeatureAtPixel(pixel, (feat: Feature) => feat);

  if (feature) {
    const featureName = feature.get('name');
    const featurePercentage = feature.get('percentage');

    if (featureName) {
      tooltipElement.innerHTML = `${featureName} <br> (${featurePercentage}%)`;
      tooltipElement.style.visibility = 'visible';
      tooltipOverlay.setPosition(event.coordinate);
    }
  } else {
    tooltipElement.style.visibility = 'hidden';
  }
});

    // Hide tooltip when mouse leaves the map
    this.map.on('pointerout', () => {
      tooltipElement.style.visibility = 'hidden';
    });
  }


  // Function to show city markers when zoomed out
  private showCityMarkers(districts: any[]): void {
    // Clear previous district boundaries
    this.vectorSource.clear();

    ////////////////////////////////////////// Start of added code

      const tooltipElement = document.createElement('div');
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    tooltipElement.style.padding = '5px';
    tooltipElement.style.borderRadius = '5px';
    tooltipElement.style.border = '1px solid #ccc';
    tooltipElement.style.whiteSpace = 'nowrap';
    tooltipElement.style.visibility = 'hidden'; // Initially hidden

    const tooltipOverlay = new ol.Overlay({
      element: tooltipElement,
      offset: [10, 0], // Offset the tooltip slightly
      positioning: 'bottom-left', // Position the tooltip relative to the icon
    });
    this.map.addOverlay(tooltipOverlay);


     districts.forEach(location => {
      const point = new Point(fromLonLat([location.longitude, location.latitude]));
      const feature = new ol.Feature(point);

      // Set the name property for the tooltip
      console.log('name '+ location.name);
      feature.set('name', location.name);
      feature.set('percentage', 90);


      feature.setStyle(new Style({
        image: new Icon({
          src: '../../../../../assets/images/logo/icons/circleh40.png',
          color: location.color, // Color based on region or property
          scale: 0.5, // Resize the marker icon
          opacity: 0.7,
        }),
      }));

      this.markersLayer?.getSource()?.addFeature(feature);
    });


    this.map.on('pointermove', (event: MapBrowserEvent<any>) => {
  const pixel = this.map.getEventPixel(event.originalEvent);
  const feature = this.map.forEachFeatureAtPixel(pixel, (feat: Feature) => feat);

  if (feature) {
    const featureName = feature.get('name');
    const featurePercentage = feature.get('percentage');
    if (featureName) {
      tooltipElement.innerHTML = `${featureName} <br> (${featurePercentage}%)`;
      tooltipElement.style.visibility = 'visible';
      tooltipOverlay.setPosition(event.coordinate);
    }
  } else {
    tooltipElement.style.visibility = 'hidden';
  }
});

    // Hide tooltip when mouse leaves the map
    this.map.on('pointerout', () => {
      tooltipElement.style.visibility = 'hidden';
    });



    //////////////////////////////////////////// end of added code

    // Add city markers again
    this.addCityMarkers(districts);
  }

   showTooltip(coordinate: number[], text: string) {
    // Position tooltip
    this.tooltipElement.style.left = '50px';//`${this.map.getPixelFromCoordinate(coordinate)[0]*2}px`;
    this.tooltipElement.style.top = '50px'; //`${this.map.getPixelFromCoordinate(coordinate)[1]*2}px`;

    // Set tooltip text
    this.tooltipElement.innerHTML = text;
    this.tooltipElement.style.display = 'block';
    this.tooltipElement.style.color = 'black'
  }


    hideTooltip() {
    this.tooltipElement.style.display = 'none';
  }


  // Function to add city markers (points)
  private addCityMarkers(districts: any[]): void {
    // Clear previous markers
    this.markersLayer?.getSource()?.clear();

    districts.forEach(district => {
      const point = new Point(fromLonLat(district.coordinates));
      const feature = new ol.Feature(point);

      feature.setStyle(new Style({
        image: new Icon({
          src: '../../../../../assets/images/logo/icons/circleh40.png',
          color: district.color, // Color based on region or property
          scale: 1, // Resize the marker icon
          opacity: 0.7
        }),
      }));

      this.markersLayer?.getSource()?.addFeature(feature);
    });
  }


   ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.map.setTarget(null);
    document.body.removeChild(this.tooltipElement);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    // Unsubscribe to prevent memory leaks when component is destroyed
  }



}

