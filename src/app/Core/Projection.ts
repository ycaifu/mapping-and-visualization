import NVisCanvasSandbox from '..';

export class Projection {
    // static mercatorProjection: MercatorProjection;
    app: NVisCanvasSandbox
    constructor(App: NVisCanvasSandbox) {
        // MercatorProjection.mercatorProjection = this;
        // this.type = PROJECTION_TYPE.MERCATOR;
        this.app = App;
    }
    // x = screenX 
    // y = screenY
    // .....
    // webM x
    // webMercator
    ToMap(x: number, y: number): number[] {
        // console.log(this.app.mapView.toMap);
        // console.log('----', x, y);
        // this.app.sPoint.x = x;
        // this.app.sPoint.y = y;

        let mp = this.app.mapView.toMap({ x: x, y: y }).clone();
        // console.log(mp);
        return [mp.longitude, mp.latitude, mp.x, mp.y];
        // return [this.app.nGraphics.mPoint.longitude, this.app.nGraphics.mPoint.latitude];
        //  return [-1,-1]; 
    }
    ToScreen(long: number, lat: number): number[] {
        // console.log(long, lat);
        this.app.mPoint.longitude = long; this.app.mPoint.latitude = lat;
        this.app.mPoint.spatialReference.wkid = 102100;
        let p = this.app.mapView.toScreen(this.app.mPoint);
        // console.log(p);
        return [p.x, p.y]; // screen X Y
        //  return [-1,-1];

    }
    ToScreenFromGeoPos(long: number, lat: number) {
        // this.app.nGraphics.mPoint.longitude = long; this.app.nGraphics.mPoint.latitude = lat;
        // // this.app.nGraphics.mPoint.spatialReference.wkid = 102100;
        // let p = this.app.nGraphics.mapView.toScreen(this.app.nGraphics.mPoint);
        // // console.log(p);
        // return [p.x, p.y];

        let mp = this.app.mapView.toMap({ x: long, y: lat }).clone();
        // mp.spatialReference.wkid = 102100;
        mp.longitude = long;
        mp.latitude = lat;
        let p = this.app.mapView.toScreen(mp);
        return [p.x, p.y];
    }
    ToScreenFromProjectedPos(proX: number, proY: number) {
        let mp = this.app.mapView.toMap({ x: proX, y: proY }).clone();
        let p = this.app.mapView.toScreen(mp);
        return [p.x, p.y];
    }
    ToScreenOld(x: number, y: number) {
        let mp = this.app.mapView.toMap({ x: x, y: y }).clone();
        mp.spatialReference.wkid = 102100;
        mp.longitude = x;
        mp.latitude = y;
        let p = this.app.mapView.toScreen(mp);
        // console.log(x, y);
        // console.log(p.x, p.y);
        return [p.x, p.y];
    }
}