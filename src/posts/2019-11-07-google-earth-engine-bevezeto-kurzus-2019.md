---
title: Google Earth Engine bevezető kurzus 2019
date: '2019-11-07'
excerpt: >-
  A Szegedi Tudományegyetemen tartott Google Earth Engine kurzusom írott
  változata. Csatoltam a szükséges kódrészleteket, fájlokat és a prezentációm
  diáit is.
topic:
  - Google Earth Engine
coverImage: /assets/images/articles/gee_editor.jpg
---
## Bevezetés

Korábban csak kevés távérzékelt adat állt rendelkezésre a környezeti monitoring számára. Ma viszont teljesen megváltozott a helyzet: már tekintélyes számú műhold/szenzor szolgáltat nehezen kezelhető mennyiségben adatokat (Big Data), melyek feldolgozása kihívás.

Az adatfeldolgozás és elemzés felhő alapú szolgáltatásokkal oldható meg, melyek a hálózaton keresztül érhetők el. A felhő alapú számítástechnika hatalmas tárolókapacitást, szerverparkokat és adatbázisokat kínál a nagy mennyiségű távérzékelt adat feldolgozására és elemzésére.

A tudomány tekintélyes adat- és technológiai erőforrásokkal való párosítása több előnnyel jár:

1. Példa nélküli sebesség: még a legerősebb felhasználói számítógépekkel is napokba vagy hetekbe telik egy elemzés lefuttatása a földfelszín bármely nagyobb szegletére. A felhő alapú számítással nagyságrendileg lecsökken a számítási idő.



2. Könnyen használható és alacsony költségű: egy internetes felület, amely könnyű hozzáférést nyújtva az adatokhoz (Landsat, MODIS, Sentinel stb.), a tudományos algoritmusokhoz és a számítási teljesítményhez. Drámaian lecsökkenti a földrajzi adatok elemzésének költségeit és összetettségét. Ez lehetővé teszi a magas befolyású, adat-vezérelte tudományt.

## A Google Earth Engine bemutatása
A Google Earth Engine (GEE) egy felhő alapú számítási platform, amit műholdképek és egyéb földi megfigyelési adatok feldolgozására hoztak létre. Egy alkalmazásprogramozási felületet, API-t biztosít, amin keresztül hozzáférünk az adatokhoz és az adatok feldolgozására/elemzésére írt metódusokhoz. A JavaScript API a GEE Code Editor webalkalmazáson belül használható, másik lehetőség a Python könyvtár használata (telepíteni kell a számítógépre).



@[youtube](4E6yQLoGO2o)

A GEE Code Editor fejlesztői környezet felületét a lenti kép mutatja: fent középen a JavaScript kódszerkesztő, alul a térképnézet, a bal felső ablakban a fülekkel a szkriptkezelő (**Scripts**), az API dokumentáció (**Docs**) és a saját feltöltött adataink (**Assets**) érhetők el. A jobb felső ablakban a felügyelő (**Inspector**) – pl. a térképre kattintva egy pont földrajzi koordinátáit írja ki –, a konzol (**Console**) – a `print()` függvény ide ír –, és a feladatok (**Tasks**) – pl. egy műholdkép GeoTIFF-be exportálása – jeleníthető meg a fülekre kattintva. A kódszerkesztő ablak fejlécében a **Get Link** gombra kattintva megkapjuk a szkriptünkre mutató egyedi html címet.

![A Google Earth Engine Kódszerkesztő felülete. Ezen keresztül használhatjuk a JavaScript API-t](/assets/images/articles/gee_editor.jpg)

### Néhány fontos tudnivaló indulás előtt



A GEE nem kereskedelmi célra ingyenesen elérhető, viszont a használata az **Earth Engine Kiértékelők** (Earth Engine Evaluators) számára korlátozott.

* A Google Earth Engine használatához [Google Fiókkal kell rendelkezned](https://accounts.google.com/SignUp?hl=hu).

* [Egy űrlapot kell kitölteni](https://signup.earthengine.google.com/) hozzá. Kb. 1 hét alatt bírálják el, és adnak hozzáférést a platformhoz.

 Csak ez a két lépés után tudod a Google Earth Engine-t elindítani.


A Google Earth Engine használatba vételéhez viszont tudni kellene programozni és a JavaScript-et sem árt ismerni!

## Az 1. óra anyaga

1. A csatolt prezentációban elsőként röviden írok a felhő alapú számítástechnikáról és Google Earth Engine felhő platformról.

2. Utána a JavaScript nyelvről adok egy részleges áttekintést, különös figyelmet szentelve azon nyelvi elemeknek, amelyek a Google Earth Engine használata során elengedhetetlenek.

3. Végül egy nagyon egyszerű feladaton keresztül elkezdjük beizzítani a motort:
- Szeretnénk egy általunk választott mintaterületre egy augusztusi és lehetőség szerint minimális felhőborítottságú Landsat 8 műholdképből egy kivágatot készíteni.
- A kivágatot le szeretnénk menteni a Google Drive-ra
- Szeretnénk NDVI vegetációs indexet számítani a kivágatunkra, amit szintén a Drive-ra szeretnénk menteni.

Ha esetleg nem töltene be a PDF nézet, akkor [ezen a linken letöltheted](/assets/files/google_earth_engine_gulacsi_andras_2019_1ora.pdf). Ha esetleg kell: [Adobe Acrobat Reader letöltése](https://get.adobe.com/hu/reader/).

<embed src="assets/files/google_earth_engine_gulacsi_andras_2019_1ora.pdf" type="application/pdf" width="100%" height="600px" />

Beillesztettem ide az órán készített kódrészletet, amit bemásolhatsz a saját kódszerkesztődbe és futtathatod. A kódrészlet hiányos, a végét neked kell befejezned:

````javascript
// A mintaterületünk, amit a térképnézeten rajzoltunk körbe
var mintaterulet = ee.Geometry.Polygon(
  [[[19.66764078793983, 46.53990707814004],
    [20.09061442075233, 46.53990707814004],
    [20.07962809262733, 46.811275369789364],
    [19.68961344418983, 46.80751569692509]]]);

// A térképnézeten a mintaterületünkre zoomolunk
Map.centerObject(mintaterulet);

// Hozzáadjuk a térképnézethez a mintaterület poligonunkat
Map.addLayer(mintaterulet);

// Egyedi szűrő: a felhőborítás <= mint 20% 
var cloudFilter = ee.Filter.lessThanOrEquals('CLOUD_COVER', 20);

// A Landsat 8 felszíni reflektancia (Tier 1, azaz
// a legjobb minőségű képek) képkollekció szűrése
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  // A mintaterületre eső képeket válogatjuk le elsőként
  .filterBounds(mintaterulet)
  // Dátum szerint válogatjuk le a két időpont között készült felvételeket
  .filterDate('2019-08-01', '2019-09-01')
  // A 20%-nál kisebb felhőborítottságú képeket válogatjuk le
  .filter(cloudFilter)
  // növekvő sorba rendezés a felhőborítottság tulajdonság szerint
  .sort('CLOUD_COVER', true);

// Kiíratjuk a konzolra a szűrt képkollekciónk metaadatait
print(landsat);

// A first() metódus visszaadja az első képet a képkollekcióból
// (legalacsonyabb felhőborítás)
var myImage = landsat.first();
// Kiíratjuk a konzolra a tulajdonságait
print(myImage);

// Megjelenítési beállítások a térképen az RBG kompozithoz
var visuals = {
  bands: ['B5', 'B4', 'B3'],
  min: 500,
  max: 3500,
  gamma: 1.3
};

// A kiválasztott képünknek a mintaterületre eső részét vágjuk ki
var kivagat = myImage.clip(mintaterulet);

// Hozzáadjuk a térképhez a képünket
/* argumentumként átadjuk a képet, a megjelenítési beállításokat tartalmazó objektumot,
   és sztringként nevet adunk a térképrétegünknek. */
Map.addLayer(kivagat, visuals, 'Landsat 8 kivágat');


// NDVI index számítása függvénnyel
var getNDVI = function(image) {
  return image.normalizedDifference(['B5', 'B4']);
};

// NDVI-t számolunk
var result = getNDVI(kivagat);

// Megjelenítési beállítások a térképen az NDVI-hez
var ndviVisuals = {
  min: -0.05,
  max: 1,
  palette: ['#3461FF',
    '#E86303',
    '#C6EE53',
    '#59CE46',
    '#00440F']
};

// Hozzáadjuk a térképhez az NDVI képünket
Map.addLayer(result, ndviVisuals, 'Landsat 8 NDVI');


// A képünk mentése a Google Drive-ra
Export.image.toDrive({
  image: kivagat.select([ 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']),
  description: 'test02',
  scale: 30,
  region: mintaterulet
});

// FELADAT 1: Mentsd le az NDVI képet is a Google Drive-ra!

/* FELADAT 2: A honlapomról letöltött shapefájlt (miklapuszta)
   töltsd fel az Assets mappádba (Assets fül).
   Utána erre a mintaterületre készíts kivágatot!
   Így töltheted be a shapefájlodat (az elérési útvonalat módosítsd):
// var mintaterulet = ee.FeatureCollection('users/gulandras90/shapefiles/miklapuszta');



// SEGÍTSÉG: Nézd meg a dokumentációt a Google honlapján!
````
A feladat megoldásához töltsd le a miklapuszta shapefájlt: [miklapuszta.zip](/assets/files/miklapuszta.zip).


## A 2. óra anyaga

A 2. óra prezentációjában egy kis betekintést nyújtok a Google Earth Engine működéséről, az alábbi pontokra kitérve:

1. Kliens kontra szerver
2. Kommunikáció a szerverrel JSON formátumban
3. Késleltetett végrehajtás
4. A lépték és a vetületek kezelése
5. Adatok importálása és exportálása
6. Earth Engine Apps, az eredmények publikálása

Ha esetleg nem töltene be a PDF nézet, akkor [ezen a linken letöltheted](/assets/files/google_earth_engine_gulacsi_andras_2019_2ora.pdf).

<embed src="assets/files/google_earth_engine_gulacsi_andras_2019_2ora.pdf" type="application/pdf" width="100%" height="600px" />

Az órán felmerült a mozaikolás szükségessége, ugyanis ha olyan a mintaterületünk, hogy egy műholdképpel nem tudjuk lefedni, akkor össze kell tudnunk illeszteni több képet egymáshoz. Lásd a kódrészletet:


````javascript
// Műholdképek összeillesztése, mozaikolás
var mintaterulet = ee.Geometry.Polygon(
  [[[19.256866745235698, 46.79779563152633],
    [19.256866745235698, 45.45781107032422],
    [20.970733932735698, 45.45781107032422],
    [20.970733932735698, 46.79779563152633]]], null, false);

Map.centerObject(mintaterulet);       
Map.addLayer(mintaterulet, {
   color: '#666666'
});

var cloudFilter = ee.Filter.lessThanOrEquals('CLOUD_COVER', 5);

var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(mintaterulet)
  .filterDate('2019-08-01', '2019-09-01')
  .filter(cloudFilter)
  // csökkenő sorrendbe felhőborítás szerint
  .sort('CLOUD_COVER', false);

print(landsat);

var img1 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_187027_20190817').clip(mintaterulet);
var img2 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_187028_20190817').clip(mintaterulet);
var img3 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_186028_20190810').clip(mintaterulet);
var img4 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_186029_20190810').clip(mintaterulet);

var visuals = {
  bands: ['B7', 'B5', 'B4'],
  min: 350,
  max: 5000,
  gamma: 1.3,
};


Map.addLayer(img1, visuals, 'Image 1');
Map.addLayer(img2, visuals, 'Image 2');
Map.addLayer(img3, visuals, 'Image 3');
Map.addLayer(img4, visuals, 'Image 4');


/* A mozaikolás során a képkollekcióban található képeket
   egymásra fedjük a képkollekcióban lévő sorrendjükben.
   Vagyis a legelső kép lesz legalul, utána fölé kerül a következő...
   Ezért rendeztem a képeket csökkenő sorba a felhőborítás szerint
*/
var landsatMosaic = landsat.mosaic().clip(mintaterulet);
print(landsatMosaic);
Map.addLayer(landsatMosaic, visuals, 'Landsat Mozaik');



var getNDVI = function(image) {
  return image.normalizedDifference(['B5', 'B4']);
};

var result = getNDVI(landsatMosaic);

var ndviVisuals = {
  min: -0.1,
  max: 1,
  palette: ['#3461FF',
    '#E86303',
    '#C6EE53',
    '#59CE46',
    '#00440F']
};

Map.addLayer(result, ndviVisuals, 'Landsat 8 NDVI');
````



## A 3. óra anyaga
*Még nem tartottam meg ezt az órát. Később kerül feltöltésre.*
