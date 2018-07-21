---
title: Sentinel-1 C-SAR feldolgozás Earth Engine-nel
date: '2018-07-21'
excerpt: >-
  A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi
  vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom.
topic: radar
---
A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom. A fő kérdés, hogy milyen állapotban vannak ezek a XIX. századi folyószabályozás és lecsapolások után visszamaradt vizes élőhelyek? Hol válik szárazabb, illetve hol nedvesedik a terület? Ennek megfelelően lehetne kialakítani a vízügyi tervezést, hogy a számunkra, illetve az ökoszisztémák számára kedvező viszonyokat tartsunk fenn vagy alakítsunk ki.

## Néhány fontos tudnivaló

Térjünk rá máris a szakmai dolgokra! Teljesen világos, hogy az optikai műholdak kevésbé alkalmasak monitoringra - főként a légköri zavaró hatások (aeroszol, felhőborítás, felhőárnyék) miatt. A radarok esetén azonban a mikrohullámok szinte akadály nélkül áthatolnak még a vastag felhőzeten is. Viszont nem állja meg a helyét az állítás, hogy teljesen időjárás-függetlenek lennének. Mert nem azok! A legsúlyosabb problémát a szél jelenti, ugyanis a szélsebesség és a felszín érdessége között kapcsolat áll fenn. Például az erős szélben a vízfelszínen hullámok alakulnak ki, amelyek növelik a vízfelszín érdességét, nagyobb visszaverődést eredményezve a szenzor felé (***Alsdorf*** et al. 2007). Így a vízfelszín detektálásához ezt a problémát kezelni kell, ugyanis a szél a radarképen „elmoshat” bizonyos vízfelszíni elemeket (a vízfelszínre nagyon alacsony visszaverődés jellemző és ezt növeli meg a szél).

Más felszínek (pl. aszfalt, beton) is hasonló érdességgel bírnak, mint a vízfelszínek, ezért ezek is összetéveszthetők a nagyon hasonló vagy teljesen azonos visszaszórási értékek miatt. Bár ezen felületek kimaszkolása könnyedén megoldható.

A C-sávú radarok (5 GHz frekvencia vagy 5 cm hullámhossz körül) alapvetően a lágyszárú növényzettel borított vizes élőhelyeknél, míg az alacsonyabb frekvenciák (P-sáv, L-sáv) az erdőborítás alatti elárasztás detektálására használhatók (***Hess*** 1990), ugyanis az L és a P sávval ellentétben a C-sávban a radar által kibocsátott mikrohullámú sugarak nem hatolnak át a lombkoronaszinten, hanem a lombozatról verődnek vissza - a hullámhossz összemérhető a levelek méretével (***Engman*** 1996, ***Lang és Kasischke*** 2008).

A vízborítás érzékelésére az azonos polarizáltságú (HH, VV) adatok alkalmasabbak. Legalkalmasabb a HH-polarizáció, de a VV szintén megfelelő választás (***Kasischke*** et al. 1997, ***Bourgeau*** et al. 2010). Bár azt is érdemes itt hozzátenni, hogy a kereszt-polarizált sávok is fontos információkat hordoznak, különösen, ha a felszínborítást akarjuk térképezni (***Baghdadi*** 2010). A különböző felszíntípusokat más visszaverődés jellemez a VV és a VH polarizáltságú sávokban.

## A Sentinel-1 jellemzői röviden

Két poláris pályán keringő műholdon (a 2014 áprilisa óta üzemelő Sentinel 1A és a 2016 áprilisa óta operáló Sentinel 1B) található C-SAR berendezés szolgáltatja az adatokat. A radar mind horizontálisan, mind pedig vertikálisan polarizált mikrohullámokat tud kibocsátani, illetve fogadni. A fő felvételezési mód az ún. Interferometrikus Szélessáv mód (Interferometric Wide Swath), ami egy 250 km-es sávban történő felvételezést jelent. Geometriai felbontás: 20*22 méter, amit 10 méterre mintáznak át. A szárazföld felett VH és VV polarizáltságú sávokban készül a műholdkép. A vetületi rendszer WGS84. Az időfelbontás 6 nap (***Torres*** et al. 2012). A Level-1 Ground Range Detected (GRD) adatokat használom.

## Az adatok feldolgozása a Google Earth Engine-nel

Az Earth Engine adatbázisa már előfeldolgozott radarképeket tartalmaz. Az alábbi előfeldolgozási lépéseket végezték el a Sentinel-1 Toolbox szoftver implementációja alapján (***Google Earth Engine Team*** 2015):

1. Pályaadatokkal való korrekció
2. Háttérzaj eltávolítása zajvektorok segítségével (a kép szélein látható sötét sávok érvénytelen adatokkal)
3. Radiometrikus kalibráció: visszaszóródás intenzitásértékeinek számítása a szenzoros kalibrációs paraméterek alapján)
4. Domborzati korrekció: az adatok felszíni tartományba konvertálása az SRTM DEM alapján.
5. A mértékegység nélküli visszszóródási együttható dB-be konvertálása (`10*log10*σ°`)
6. Az értékek leszorítása az 1. és a 99. percentilis értékére, 16 bitbe kvantálás.

A további feldolgozási lépéseket nekem kellett végezni.

Normalizálnom kellett a visszaszóródási értékeket a mikrohullámok beesési szögével, az ún. **koszinusz korrekció** segítségével. Ez rendkívül fontos! A kis beesési szögek nagyobb visszaverődést, míg a nagyobb szögek kisebb visszaverődést eredményeznek. A beesési szögekből származó eltérések nem csak egy képen belül jelentkeznek, hanem különböző szenzorok esetén, valamint eltérő felvételezési geometriák, más műholdpályák esetén is (emelkedő és süllyedő pályák). Ez nagy beesési szög varianciát okoz a különböző időben készült felvételekben. A normalizáció nélkül ezek nem hasonlíthatók össze (***Weiß*** 2018).

A szeles időben készült radarfelvételeket ki kellett zárnom a vizsgálatból, így a szél általi felszíni érdesség hatásokat kiküszöböltem (***Elyouncha*** et al. 2015). Az **1 m/s feletti** szélsebességű területeket ki kellett maszkolni. Erre a célra rendelkezésre álltak a `CFSV2: NCEP Climate Forecast System Version 2, 6-Hourly Products` klimatológiai adatok (***Saha*** et al. 2011), melyekből kinyerhetjük a szélsebességet (a `v` és az `u` komponensek felhasználásával). Ezek a szélsebesség-adatok a felszín felett 10 méterre vonatkoznak.

A következő lépés volt a tüskeszűrés (speckle filtering), amire az általánosan használt Refined Lee filtert (***Lee*** 1980, 1981) alkalmaztam ***Yommy, Liu, és Wu*** (2015) JavaScript kódja alapján (SNAP 3.0 S1TBX szoftver implemetációjával egyenértékű változat). Ezzel a radarképen látható szemcsés zajt redukálhatjuk le.

Az utolsó lépés a vizsgált időszakra vonatkozó átlagképek számítása volt. Most havi léptékben vizsgálódom, de tetszés szerint lehet más időszakra is átlagolni. Ez a lépés tovább javítja a kép minőségét. Külön csináltam átlagképet az emelkedő pályán (tehát amikor a műhold az Egyenlítő felől halad a sarkok felé) és a süllyedő pályán (északról délre) készült felvételekből. Soha ne keverd a különböző pályán készült felvételeket!

## A korrigált adatok automatikus osztályozása, az eredmények exportálása

A `wekaKMeans` klasztarezési algoritmust használtam, ami egy továbbfejlesztett kmeans típusú kemény osztályozás (***Arthur és Vassilvitskii*** 2007). Az osztályközepektől való eltéréseken alapul, csakúgy, mint az ISODATA eljárás. A `wekaKmeans` a kezdeti osztályközepeket random mintákból számítja. Távolság függvénynek az euklideszi távolságot használtam. A kimenő klaszterek számát 15-re állítottam. A VV és a VH sávot is felhasználtam az osztályozásnál.

A tapasztalatok szerint a `-17--18 dB` körüli klaszterközéppel rendelkező osztályok vízborítást reprezentálnak. Az eredményeket a felhasználónak kell értelmeznie. Ez a lépés nem automatizálható.

Miután meghatározásra kerültek a vízborításos osztályok, újraosztályozom a az osztályozott képet az alábbiak szerint:
* vízborítás: 1
* nem vízborítás: 0

Az utolsó lépésként pedig az újraosztályozott kép alapján kiszámítom a vízborította terület nagyságát (`reducer`-t alkalmazva). Az osztályozott képet GeoTIFF formátumban a Google Drive-ra mentem.

## A JavaScript kódok

Mivel annyira memóriaigényes feladat a tüskeszűrés és az osztályozás, két részre kellett bontanom a szkriptemet, és a részeredményt (a Lee szűrt átlagkép) az `Assets` mappámba lementeni, hogy onnan beolvasva dolgozhassak tovább az adatokon. Elsőnek a `main1` (az adatfeldolgozást végzi a Lee filtert beleértve), utána pedig a `main2` (az osztályozást végzi) szkriptet kell futtatni. Néhol szükséges lehet átírni a kódot (a mintaterület megváltoztatása, a saját Assets mappádba menteni a részeredményedet).

[Ezen a linken eléred a használt kódjaimat](https://code.earthengine.google.com/?accept_repo=users/gulandras90/inlandExcessWater), de csak olvasási jogokkal rendelkezel. Ezért azt javaslom, hogy készíts saját repository-t magadnak, ahol létrehozod ugyanazokat a fájlokat, mint én és belemásolod a kódokat.

**main1**:
```javascript
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++                      Sentinel-1 Processing Tool                    ++++++
 * +++++                      Author: András Gulácsi                        ++++++
 * +++++                      Date: July 21, 2018                           ++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


// Import date functions module
var date = require('users/gulandras90/inlandExcessWater:inputDate');

// Import Refined Lee speckle filtering module
var lee = require('users/gulandras90/inlandExcessWater:process/refinedLeeFilter');

// Import Refined Lee speckle filtering module
var save = require('users/gulandras90/inlandExcessWater:exportData');

// Add rectangle (the study area)
var region = ee.Geometry.Rectangle(19.1223, 46.7513, 19.2341, 46.8884);

// Create a Feature object using the rectangle
var studyArea = ee.Feature(region, { name: 'Felső-Kiskun lakes'});

// Show object properies in the Console
print(studyArea);

// Sets the map view to the center of the study area
Map.centerObject(studyArea);


// Loads the Sentinel-1 image collection (class instantiation)
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

/* Coordinate pairs, set start and end date
 * for filtering the collection */
var point = ee.Geometry.Point(19.1753, 46.8156);


// User input for filtering ImageCollection by date (year, month)
var dateInput = date.dateInput();

print(dateInput.finish);
print(dateInput.daysInMonth);


// Filtering based on metadata properties
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filterBounds(point)
  .filterDate(dateInput.start, dateInput.finish);

print(vh);

var path = prompt('Which path you want to process (1: ASCENDING, 2: DESCENDING)?', '2');

var vhDescending;
var pathString;
if(path === '1') {
  // Filter to get images from different look angles.
  vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
  pathString = 'ASC';
} else if (path === '2') {
  // Filter to get images from different look angles.
  vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
  pathString = 'DESC';
} else {
  pathString = null;
  throw new Error('Wrong user input', 'Allowed options (1: ASCENDING, 2: DESCENDING)');
}


// Use descending path only, do not mix it with ascending path!
var vhDescending = vhDescending.map(toGammaVV);
vhDescending = vhDescending.map(toGammaVH);
print(vhDescending);

// Function to apply angle correction (for VV)
function toGammaVV(image) {
 return image.addBands(image.select('VV').subtract(image.select('angle')
  .multiply(Math.PI/180.0).cos().log10().multiply(10.0)).rename('VV_corr'));
}
// Function to apply angle correction (for VH)
function toGammaVH(image) {
 return image.addBands(image.select('VH').subtract(image.select('angle')
  .multiply(Math.PI/180.0).cos().log10().multiply(10.0)).rename('VH_corr'));
}


// Get date properties from the image collection
var dates = vhDescending.map(function(image) {
  return image.set('date', image.date().format('Y-MM-dd'));
});

// Get a list of the dates.
var datesList = dates.aggregate_array('date');



// Get data from CFSV2: NCEP Climate Forecast System Version 2, 6-Hourly Products
// for the wind mask to eliminate surface roughening by wind
var ws = ee.List(datesList).map(function (date) {
  var wx = ee.ImageCollection('NOAA/CFSV2/FOR6H').filterDate(date);
  var vWind = wx.select(['v-component_of_wind_height_above_ground']);
  var a = vWind.max();
  var uWind = wx.select(['u-component_of_wind_height_above_ground']);
  var b = uWind.max();
  a = a.pow(2);
  b = b.pow(2);
  var ab = a.add(b);
  var ws = ab.sqrt();
  ws = ws.multiply(3.6);
  return ws.rename('windy').set('date', date);
});

print(ws);
print(dates);


// Define an inner join.
var innerJoin = ee.Join.inner();

// Specify an equals filter for image dates
var filterDateEq = ee.Filter.equals({
  leftField: 'date',
  rightField: 'date'
});

// Apply the join. We have to join the wind data with the Sentinel-1 data
// in order to apply a mask on VV and VH bands!
var innerJoined = innerJoin.apply(dates, ee.ImageCollection(ws), filterDateEq);
print(innerJoined);

// Concatenate images to create an ImageCollection
var joinedS1pol = innerJoined.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
});
print(joinedS1pol);

// We need an explicit cast to ImageCollection so that GEE can understand the type to work with
var joinedS1pol = ee.ImageCollection(joinedS1pol);


// update mask to exlude areas where where the wind speed is >= 12 m/s
function windMask(image) {
  var mask = ee.Image(0).where(image.select('windy').lt(1), 1).not();
  return image.updateMask(mask);
}

var joinedS1pol = joinedS1pol.map(windMask);
print(joinedS1pol);

//Map.addLayer(joinedS1pol.first().clip(studyArea));

// Create a monthly composite from means at different polarizations and look angles.
var leeFiltered = ee.Image.cat([
  lee.toDB(
    lee.refinedLee(
      lee.toNatural(
        joinedS1pol.select('VH_corr').mean()
      )
    )
  ),
  lee.toDB(
    lee.refinedLee(
      lee.toNatural(
        joinedS1pol.select('VV_corr').mean()
      )
    )
  )
]).clip(studyArea);

print(leeFiltered);
Map.addLayer(leeFiltered);

// Outline for the study area
Map.addLayer(ee.Image().paint(region, 0, 2), {}, 'Study Area');


// Save leeFiltered VH and VV bands
// Export the image to an Earth Engine asset.
Export.image.toAsset({
  image: leeFiltered,
  description: 'Sentinel_1_lee_' + pathString + '_' + dateInput.year + dateInput.month,
  assetId: 'Sentinel_1_lee_' + pathString + '_' + dateInput.year + dateInput.month,
  scale: 10,
  region: region
});
```

**main2**:
```javascript
// Add rectangle (the study area)
var region = ee.Geometry.Rectangle(19.1223, 46.7513, 19.2341, 46.8884);

// Create a Feature object using the rectangle
var studyArea = ee.Feature(region, { name: 'Felső-Kiskun lakes'});

// Import Refined Lee speckle filtering module
var save = require('users/gulandras90/inlandExcessWater:exportData');

// Import Classifier module
var classifier = require('users/gulandras90/inlandExcessWater:process/classifier');

// Import Classifier module
var chartClusters = require('users/gulandras90/inlandExcessWater:utils/chart-clusters');

// Load the image to classify
var image = ee.Image('users/gulandras90/sentinel1_radar_lee/Sentinel_1_lee_DESC_201503');

Map.addLayer(image);

// Classify the image
var classifiedData = classifier.radarClassifier(image, region, 10, 'clusters');

// Plot clusters by backscatter mean values to inspect water classes.
chartClusters.plotClustersByBackscatter(
  image,
  classifiedData,
  studyArea
);

// Outline for the study area
Map.addLayer(ee.Image().paint(region, 0, 2), {}, 'Study Area');

var reclassified = ee.Image(0).where(classifiedData.eq(5).or(classifiedData.eq(14)), 1).rename('water').clip(studyArea);
Map.addLayer(reclassified, { min: 0, max: 1}, 'Water cover');

print(reclassified);


// Calculate area of clusters
var areaChart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().addBands(reclassified.select('water')),
  classBand: 'water', 
  region: studyArea,
  scale: 10,
  reducer: ee.Reducer.sum()
});

print(areaChart);

save.saveCompositeBand(
  reclassified,
  10,
  'Sentinel_1_water_DESC_',
  '2015',
  '03',
  studyArea
);
```

## Irodalom

*Feltöltés alatt...*

## Eredménykép

*Feltöltés alatt...*



