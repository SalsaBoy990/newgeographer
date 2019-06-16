---
title: 'Big data, GeoJSON és JSON?'
date: '2017-11-05'
excerpt: >-
  A Big Data a világszerte előállított óriási adatmennyiséget jelenti, amiből
  információt akarunk nyerni. A GIS-tudományban a térbeli adatok feldolgozása a
  célunk. Ebben segít a felhő alapú számítástechnika.
topic: 'Big data, GeoJSON, Google Earth Engine'
coverImage: google_servers.jpg
---
## Mi az a Big Data?

Néhány részletet közlök az IT Services Hungary honlapján megjelent cikkből.

A „Big Data” („Nagy Adat”) a cégek, az intelligens hálózatok, a magánszektor és az egyéni felhasználók által világszerte és napi szinten előállított óriási adatmennyiséget jelenti. Strukturáltan és kielemezve ez a rengeteg információ nagy hasznot hozhat a cégek és ügyfelek számára.

A megfelelően felhasznált „Big Data” magyarázatot adhat a felhasználók fogyasztói és információs viselkedésére, segítséget nyújthat piacok felméréséhez, javíthatja a marketing- és értékesítési kampányokat, támogatást adhat az árképzésnél és optimalizálhatja a logisztikai folyamatokat és az árufolyamot.

A „Big Data” analitika az az eszköz, amely segít az adattömeget összegyűjteni, integrálni és elemezni – majd a vállalkozások számára felhasználhatóvá tenni.

Sven Löffler-t, a T-Systems Üzleti Intelligencia és Big Data üzletfejlesztési igazgatóját kérdeztük a „Big Data” és a felhő kapcsolatáról, továbbá a „3V”-ről.

Löffler úr, hogyan jellemezné a „Big Data”-t?

> Sven Löffler: A Big Data-nak három jellemzője van: mennyiség (volume), sebesség (velocity) és változatosság (variety). Erre szoktunk úgy utalni, hogy a „3V”. A mennyiség a másodpercenként előállított hatalmas adatözönre vonatkozik. A sebesség azért fontos kérdés, mert az adatok nem halmazokban jönnek, hanem folyamatosan áramolnak. Mindig gyorsabban és gyorsabban kell őket feldolgozni, és lehetőleg valós időben. Végül pedig az egyik legnagyobb kihívást a változatosság jelenti, mert az egyes adatokat strukturálni kell és egymással összefüggésbe hozni, a forrásra való tekintet nélkül. A cél a kontrollálatlan adatfolyamok formázása az értékes információk kinyeréséhez. Ez végső soron hozzásegíthet minket üzleti döntések meghozatalához, és hosszú távú versenyelőnyök megszerzéséhez.

Pontosan hogy kapcsolódik a felhő és a big data?

> Löffler: Nagyon egyszerűen fogalmazva: felhő nélkül nincs Big Data. Az internet és a felhő – magánéletünk fokozódó digitalizációja és az üzleti folyamatok virtualizálásának térhódítása – egyszerre teszik szükségessé és lehetővé a big datát. A felhő alapú számítástechnika az egyetlen lehetőség, hogy támogassuk a Big Data infrastruktúra-igényeit. Hatalmas tárolókapacitást és nagyteljesítményű szervereket és adatbázisokat kínál.

## Adatfúzió és a térbeli adatok feldolgozása

Az adatgyűjtés, adatfeldolgozás, adatelemzés és adatmegjelenítés egyre inkább áttevődik a felhő alapú megoldásokra.

Az adatfúzió (data fusion) során a különböző forrásból származó adatokat összevonjuk vagy együtt kezeljük egy adott jelenség vagy valamilyen létező dolog (entitás) érzékelésére, azonosítására vagy jellemzésére egy valamilyen ismereteken alapuló keretrendszerben. Az adatfúzió célja független adatállományokból származó, különböző információkat hordozó változók összekapcsolása az egyes esetek szintjén. Ezáltal adott a lehetőség különálló információk együttes elemzésére (_**Carl Reed**_, 2010). A Google Earth Engine a földtudományi és távérzékelt adatokat fogja össze egy egységes rendszerbe.

A „Big Data” tárolására és megosztásához egységes adatszabványokra van szükség, hiszen az adatok változatos forrásokból származnak, más formátumban állnak rendelkezésre. Ahhoz, hogy ezeket össze tudjuk kapcsolni, egy egységes, integrált rendszert kell felépíteni: egy internet felhőre van szükség. Egy ilyet épített fel a földi léptékű földrajzi és távérzékelt adatok feldolgozására a Google. A nagyvállalat hatalmas szerverparkokat üzemeltet erre a célra, amik óriási számítási teljesítményre képesek.

![2. kép: Csendélet a Google egyik szerverparkjában. Persze a gépek keményen pörögnek. Komoly hűtőrendszer védi őket a besüléstől.](/assets/images/google_servers.jpg)

## GeoJSON és JSON

Több nemzetközi szabványt létezik a földrajzi adatokra. Mivel a JavaScripttel kiemelten foglalkozom, ezért először a szabad hozzáférésű GeoJSON-t (JavaScript Object Notation, JSON) említem meg, ugyanis ezt extenzíven használja a GEE. Ez annyiban különbözik a hagyományos JSON-tól, hogy van egy geometria (`geometry`) tulajdonsága, ami tartalmazza az adott objektum (pont, vonal, poligon) földrajzi koordinátáit tömbök formájában, a szabvány által megszabott módon. De egy egyszerű példán keresztül jobban szemléltethető ez:

```json
{
  "type": "Feature",
    "properties": {
      "fovaros": "Colombo",
      "lakossag": 669700,
      "orszag": "Sri Lanka"
    },
    "geometry": {
      "type": "Point",
        "coordinates": [
          79.88433837890625,
          6.931879889517218
        ]
    }
}
```

A `properties` tulajdonság a város főbb jellemzőit (név, lakosság, melyik ország fővárosa) tartalmazza, míg a `geometry` tulajdonság a geometria típusát és a koordinátákat tartalmazza. Nagyon könnyű átalakítani egy JavaScript objektummá a `JSON.parse()` metódussal:

```javascript
var szoveg = `{"type":"Feature","properties":{"fovaros":"Colombo","lakossag":669700,"orszag":"Sri Lanka"},"geometry":{"type":"Point","coordinates":[79.88433837890625,6.931879889517218]}}`;

var telepules = JSON.parse(szoveg);
console.log(
  telepules.properties.orszag + ' fővárosa ' +
  telepules.properties.fovaros + ', melynek lakossága: ' +
  telepules.properties.lakossag + ' fő.'
);

// Természetesen vissza is alakítható:
var geojson = JSON.stringify(telepules);
console.log(geojson);
```

A JSON nagyon tömör és talán jobb választás, mint az XML formátum, ami tag-eket használ, ezért nagyon redundáns, hiszen a nyitó és a zárótag-ek kétszer tartalmazzák a tulajdonság nevét:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
	<type>Feature</type>
	<properties>
		<fovaros>Colombo</fovaros>
		<lakossag>669700</lakossag>
		<orszag>Sri Lanka</orszag>
	</properties>
	<geometry>
		<type>Point</type>
		<coordinates>79.88433837890625</coordinates>
		<coordinates>6.931879889517218</coordinates>
	</geometry>
```

A kliens (a Google Earth Engine Kódszerkesztő) és a szerver közötti kommunikáció JSON-ba csomagoltan történik: a felhasználó kérést (request) küld a szerver számára, hogy az végezze el az általunk megszabott műveletek sorozatát az adatbázisban található általunk meghatározott adatokra. A szerver ezt fogadja és elvégzi a feladatot, és JSON-ban válaszol (az eredményeket beleágyazza). A JSON-t a kliens dekódolja és megjeleníti. Ha hiba volt a kódunkban, akkor természetesen hibával tér vissza a szerver. Egyszerű, nem agysebészet.

Hogy bebizonyítsam, hogy ez tényleg így van, írjuk be ezt a GEE Kódszerkesztőjébe, és futtassuk:

```javascript
// Az adatok kiválasztása: SRTM domborzatmodell
var image = ee.Image('CGIAR/SRTM90_V4');
// Hozzáadunk 10-et a domborzatmodell minden cellájához
var operation = image.add(10);
// Kiírjuk a konzolra a kérésünket szövegként (JSON)
print(operation.toString());
// A szerver válasza (JSON)
print(operation);
```

A kérésünk így néz ki (ezt küldjük a szerver számára):

```json
ee.Image({
  "type": "Invocation",
  "arguments": {
    "image1": {
      "type": "Invocation",
      "arguments": {
        "id": "CGIAR/SRTM90_V4"
      },
      "functionName": "Image.load"
    },
    "image2": {
      "type": "Invocation",
      "arguments": {
        "value": 10
      },
      "functionName": "Image.constant"
    }
  },
  "functionName": "Image.add"
})
```

A `print()` függvénnyel az új objektum (kép) tulajdonságait kérdeztük le. A szerver hozzáadott 10-et a domborzatmodell minden egyes cellaértékéhez. Ezt nyilván el kell végeznie, hiszen akkor nem tudná kiírni a létrehozott új kép tulajdonságait. A GEE-ben csak akkor küldjük el a kérést, ha explicite utasítást adunk rá. Ez a lazy feldolgozás miatt van így (fölöslegesen nem dolgoznak a processzormagok) A példánkban a print meghívásával ez teljesül. Így néz ki a szerver válasza (POST válasz):

```json
{
  "type": "Image",
  "bands": [
    {
      "id": "elevation",
      "data_type": {
        "type": "PixelType",
        "precision": "int",
        "min": -32758,
        "max": 32777
      },
      "crs": "EPSG:4326",
      "crs_transform": [
        0.0008333333535119891,
        0,
        -180,
        0,
        -0.0008333333535119891,
        60
      ]
    }
  ]
}
```

Eredményül kaptuk az új objektumunk tulajdonságait. Látható, hogy a kérés és a válasz is JSON. Így működik a Google Earth Engine. A számításnak persze nem sok értelme volt, de itt a működés megértésén volt a hangsúly.

## Irodalom

* ***Carl Reed*** (2010). OGC Standards and Geospatial Big Data. – In. Hassan A. Karimi (szerk.): Big Data: Techniques and Technologies in Geoinformatics. CRC Press, Boca Raton, USA. pp. 279-289.
* [Google Earth Engine API kézikönyv](https://developers.google.com/earth-engine/concepts_overview).
* IT Services Hungary 2013. [Mi az a „Big Data”?](https://www.it-services.hu/hirek/mi-az-a-big-data/)
