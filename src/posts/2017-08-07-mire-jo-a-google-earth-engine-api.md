---
title: Mire jó Google Earth Engine API?
date: '2017-08-07'
excerpt: >-
  Ma már nem a térbeli adatok hiánya jelenti a GIS kutatások korlátját, hanem az
  irdatlan mennyiségben rendelkezésünkre álló távérzékelt adatnak a nagyon
  hosszadalmas, manuális feldolgozása.
topic: Google Earth Engine
---

Ma már nem az adatok hiánya jelenti a földrajzi kutatások korlátját, hanem annak a tömérdek rendelkezésre álló és ingyenes távérzékelt adatnak a rendkívül hosszadalmas feldolgozása. Hiszen csak nagy mennyiségű, empirikus adatból lehet szilárd, megbízható tudományos következtetéseket levonni, és megbízható modelleket megalapozni. A Google Earth Engine felhő alapú számítási platform alkalmazásával szeretném demonstrálni az objektum-orientált programozás szükségét a GIS-tudományban.

![borito](/assets/images/cover.jpg)

## A Google Earth Engine bemutatása

@[youtube](4E6yQLoGO2o)

A felhő alapú szolgáltatások (cloud computing) közös jellemzője, hogy a szolgáltatásokat nem egy dedikált hardvereszközön üzemeltetik, hanem a szolgáltató eszközein elosztva, a szolgáltatás üzemeltetési részleteit a felhasználótól elrejtve. Ezeket a szolgáltatásokat a felhasználók a hálózaton keresztül érhetik el.

A Google Earth Engine is egy ilyen felhő alapú szolgáltatás. Ez egy olyan szoftverszolgáltatási módszer, amelynél a szoftver és a kapcsolódó adatok központilag vannak tárolva (tipikusan egy internet felhőben, esetünkben a Google szerverein), ugyanakkor a felhasználói hozzáférések egy vékony kliensen keresztül zajlanak, amely leggyakrabban egy valamilyen webböngésző alkalmazás. Esetünkben ez a Google Earth Engine alkalmazásprogramozási felülete vagy interfésze (application programming interface, API).

A Google Earth Engine API a JavaScript és a Python programozási nyelveket használja. A Python használatához telepítésre is szükség van. Funkcionalitásban mindkettő egy és ugyanaz. A böngészőben természetesen csak a JavaScript futtatható, hiszen a böngésző része a JS fordítómotor, Míg a Python esetén a saját gépeden dolgozol. Miven a Python-úl nem tudok, így csak a JS-sel foglalkozom.

A Google Earth Engine (a későbbiekben: GEE) felhő alapú platformját műholdképek és egyéb földi megfigyelési adatok feldolgozására hozták létre. Hozzáférést nyújt a Google képi adattáraihoz (több, mint 2 petabájt (10^15^ bájt) adat) és biztosítja azt az elképesztő számítási teljesítményt, ami a képek feldolgozásához szükséges.

### A tudomány tekintélyes adat- és technológiai erőforrásokkal való párosítása több előnnyel jár:

1. Példa nélküli sebesség: még a legerősebb felhasználói számítógépekkel is napokba vagy hetekbe telik egy elemzés lefuttatása a földfelszín bármely nagyobb szegletére. A felhő alapú számítással nagyságrendileg lecsökken a számítási idő.

2. Könnyen használható és alacsony költségű: egy internetes felület, amely könnyű hozzáférést nyújtva az adatokhoz (Landsat, MODIS, Sentinel stb.), a tudományos algoritmusokhoz és a számítási teljesítményhez. Drámaian lecsökkenti a földrajzi adatok elemzésének költségeit és összetettségét. Ez lehetővé teszi a magas befolyású, adat-vezérelte tudományt.

A GEE számítási módszere figyelemreméltóan hatékony: automatikusan párhuzamosítja az elemzéseket, így aztán számos számítógép CPU-ján egy időben futnak a Google adatközpontokban. A számításokat „lustán” hajtja végre, csak a kijelző megtöltéséhez vagy a kért értékek számításához szükséges bemenő adatokat kéri be. Ez az éppen időben (just-in-time) megosztott számítási modell lehetővé teszi az eredmények valós idejű felfedezését. A számítás után, az eredményeket gyorsítótárazza a memóriában azért, hogy az ugyanarra a műholdképre vagy értékre vonatkozó többszörös HTTP lekérések ne vezessenek fölösleges újraszámításhoz.

A GEE Code Editor fejlesztői környezet felületét a lenti kép mutatja: fent középen a JavaScript kódszerkesztő, alul a térképnézet, a bal felső ablakban a fülekkel a szkriptkezelő (**Scripts**), az API dokumentáció (**Docs**) és a saját feltöltött adataink (**Assets**) érhetők el. A jobb felső ablakban a felügyelő (**Inspector**) – pl. a térképre kattintva egy pont földrajzi koordinátáit írja ki –, a konzol (**Console**) – a `print()` függvény ide ír –, és a feladatok (**Tasks**) – pl. egy műholdkép GeoTIFF-be exportálása – jeleníthető meg a fülekre kattintva. A kódszerkesztő ablak fejlécében a **Get Link** gombra kattintva megkapjuk a szkriptünkre mutató egyedi html címet.

### Néhány fontos tudnivaló

A GEE nem kereskedelmi célra ingyenesen elérhető, viszont a használata az **Earth Engine Kiértékelők** (Earth Engine Evaluators) számára korlátozott.

* A Google Earth Engine használatához [Google Fiókkal kell rendelkezni](https://accounts.google.com/SignUp?hl=hu).

* Egy űrlapot kell kitölteni [itt](https://signup.earthengine.google.com/). Kb. 1 hét alatt bírálják el, és adnak hozzáférést a platformhoz.

Csak ez a két lépés után tudod használni a Google Earth Engine-t.
 A továbbiakban dióhéjban bemutatom a GEE működését.

## Hogyan működik a Google Earth Engine?

### 1. Kliens kontra szerver

Fontos megkülönböztetni az **EE objektumokat** más JavaScript objektumoktól vagy elemi grafikus objektumoktól (ún. primitívek), amelyek a kódban lehetnek. A szerveren található objektumokat kliens oldali **„proxy” objektumok** (tárolók) manipulálásával lehet változtatni.  A webböngészőt hívjuk kliensnek: esetünkben ez a Google Earth Engine API. **Minden „ee”-vel kezdődő dolog egy proxy objektum.** Ezek nem tartalmaznak semmilyen tényleges adatot, mert ezek csupán a szerveren található objektumok kezelői.
 Ezek tartalmazzák, hogy mely adatokon milyen műveleteket akarunk elvégeztetni a szerverrel.

A következő példában a kliensSztring sztring típusú változót becsomagoljuk egy tárolóba (az `ee.Date()` konstruktorát hívjuk meg). Ezeket a tárolókat küldjük el a szervernek feldolgozásra!

```javascript
var kliensSztring = "2017-04-01";
print(typeof kliensSztring); //=> sztring
// Az ee.Date() konstruktorát meghívjuk.
var szerverSztring = ee.Date(kliensSztring);
print(
    "Ez egy EE objektum?",
    (szerverSztring instanceof ee.ComputedObject)
); //=> igaz
```

A dátum objektumok segítségével könnyedén le tudjuk válogatni a megadott időszakban készült műholdképeket a képkollekcióból (`ee.ImageCollection` objektum).

A szerver oldali objektumok és metódusok (tagfüggvények) szintaxisa `ee.Thing`, illetve `ee.Thing.method()`. Bármely másik objektum, ami nem „ee”-vel kezdődik az mind kliens oldali. Például a `print()`, a `Map`, az `Export` vagy a `Chart`. Mivel a kliens nem tudja, hogy mi található a szerver oldali `ee.Thing` objektumokban, így aztán **a rajtuk végzett for ciklusok és feltételes kifejezések (if-else) nem működnek!** Helyette a **szerver oldali** funkciókat kell használni:

```javascript
// Normalizált Differenciált Vegetációindex számítása.
var addNDVIBand = function (image) {
    "use strict";
    return function (image) {
        return image.addBands(
            image.normalizedDifference(["B5", "B4"])
                .rename("NDVI")
        );
    };
};

/* Landsat 8 kollekció szűrése, NDVI számítása az
 * összes képre a map() metódussal. */
var point = ee.Geometry.Point(19.064, 47.547);
var landsat = "LANDSAT/LC8_L1T_TOA_FMASK";

var filteredCollection = ee.ImageCollection(landsat)
    .filterBounds(point)
    .filterDate("2016-08-01", "2016-08-31")
    .map(addNDVIBand(landsat))
    // Növekvő sorrend a %-os felhőborítás alapján.
    .sort("CLOUD_COVER", true);
```


### 2. Késleltetett végrehajtás

Ha egy szkriptet írunk, akkor a kód nem közvetlenül fut le az EE szerverein. Ehelyett, a kliens könyvtár (GEE API) átkódolja a szkriptet **JSON objektumok** sorozatává, majd ezeket elküldi a Google-nek, és válaszra vár. Semmi sem lesz elküldve a Google számára feldolgozásra, ha explicite nem adunk rá utasítást. Tehát fölöslegesen nem dolgoz fel semmit a szerver, ha nem utasítjuk rá. A `print()` vagy a `Map.addLayer()` utasítás viszont elegendő a kérés elküldéséhez:

```javascript
// Az első kép leválogatása (a legkevesebb felhő).
var first = filteredCollection.first();
var landsatImage = ee.Image(first);

// A kép tulajdonságainak kiírása a konzolra.
print(landsatImage);

var studyArea = ee.Geometry.Rectangle(
    19.1223,
    46.7513,
    19.2341,
    46.8884
);

// Megjelenítési paraméterek beállítása.
var vizParams = {
    bands: ["B5", "B4", "B3"],
    min: 0,
    max: 0.5,
    gamma: 1.3
};

// A 11. piramisszinthez tartozó felbontás 76 méter!
Map.setCenter(19.17826, 46.81987, 11);

// Megjelenítés a térképnézeten.
Map.addLayer(studyArea);
Map.addLayer(
    landsatImage.clip(studyArea),
    vizParams,
    "Landsat 8 hamis színes kompozit"
);
```


### 3. A lépték és a vetületek kezelése

Fontos tudnivaló, hogy a `Map.addLayer()` segítségével a térképen kirajzolt kép eltérő bemenetekből készül a nagyítási szint és a térképnézet határaitól függően. A lépték a GEE-ben pixelméretet jelent. A GEE az elemzés / a bemenő adat léptékét a kimenetből határozza meg, amit nekünk meg kell adnunk. A GEE ugyanis **képpiramisokat** használ, ahol minden egyes cella értéke egy adott piramisszinten az alatta levő szint 2x2-es blokkjának, azaz 4 cellájának az átlagértéke. Az aggregálás egy 256x256 cella felbontású képszelvényig történik. A GEE azt a piramisszintet választja, ami **legközelebb esik az általunk megadott léptékhez** (kisebb vagy egyenlő annál), és abból számol.

![2. kép: Google Earth Engine képpiramisok
](/assets/images/keppiramisok.jpg)


Nagyítási szint | Pixelméret az Egyenlítőnél
--- | ---
11 | 76 m
12 | 38 m
13 | 19 m
14 | 9,6 m
15 | 4,8 m
16 | 2,4 m
[1. táblázat: Pixelméretek a különböző nagyítási szinteknél (0-20) a Google Mercator vetülete esetén (EPSG:3857). Ha Magyarországra akarunk vonatkoztatni, akkor a földrajzi szélesség koszinuszával be kell szorozni az értékeket. Például a 12-es nagyítási szintnél: 38·cos(47°) = 25,6 m.]

A Google a térképek megjelenítéséhez a **Mercator** vetületet használja (WGS 84 / Pseudo-Mercator, EPSG:3857), így aztán a képpiramis megfelelő szintjén, a megjelenítést megelőzően, vetületi transzformációra kerül sor (röptében). Ha lehetséges, akkor célszerű elkerülni az egyéb vetületi transzformációkat. Meg kell hagyni az adatokat eredeti vetületükben! Az EOV nem támogatott. Ne is próbáld használni, mert rossz lesz az eredmény!

```javascript
// Az első sáv kiválasztása; vetület, lépték kiírása.
var myImage = landsatImage.select(0);
print(
    "Vetület, crs, és crs_transform:",
    myImage.projection()
);
print(
    "Felbontás méterben:",
    myImage.projection().nominalScale()
);
```


### 4. Input/output műveletek

Több lehetőség áll rendelkezésünkre az exportálásra: az adatainkat GeoTIFF-be/HD videóba menthetjük a **Google Drive**-ra, a Google felhő-alapú tárolóegységre (**Google Cloud Storage**) vagy az **Assets** mappánkba. Ez utóbbi helyre a saját GeoTIFF raszterállományainkat is feltölthetünk. A vektoros adatokat KML formátumban ajánlott feltölteni, amiből Fusion Table készül, amit betölthetünk a szkriptünkbe az azonosítója segítségével. A készített idősorok adatai is lementhetők CSV-be (pontosvesszővel tagolt értékek).

```javascript
/* Mindig adjuk meg az eredeti felbontást!
 * A kép eredeti vetületébe (WGS 84 / UTM) menti. */
Export.image.toDrive({
    image: landsatImage.select("NDVI"),
    description: "NDVI_image",
    scale: 30,
    region: studyArea
});
```

Próbáljátok ki a kódrészleteket a [Google Earth Engine Code Editor](https://code.earthengine.google.com/)-ban! A [GitHub-on](https://github.com/SalsaBoy990/EarthEngine/blob/master/tutorial1.js) megtalálod a teljes szkriptet.

A Google Earth Engine-nek nem csak alkalmazásprogramozási felülete (API) van, hanem rendelkezésre áll a [Google Earth Engine Explorer](https://explorer.earthengine.google.com), ami egy grafikus felhasználói felület (graphical user interface, GUI), ahol programozási ismeretek nélkül is hozzáférhetünk az adatok egy részéhez. Természetesen sokkal korlátozottabb funkcionalitással bír, mint a kódszerkesztő. Ennek a használata is regisztrációhoz kötött és szintén ingyenes nem kereskedelmi célokra.


## Irodalom

1. Google Earth Engine Team (2015). [Google Earth Engine: A planetary-scale geospatial analysis platform.](https://earthengine.google.com)
2. [Google Earth Engine API kézikönyv.](https://developers.google.com/earth-engine/) 
3. [Google Earth Engine Code Editor.](https://code.earthengine.google.com/)
4. [Google Earth Engine Explorer.](https://explorer.earthengine.google.com)

Fontos: Egy Earth Engine Kiértékelő felhasználói fiókért egy elektronikus űrlap kitöltésével [itt lehet jelentkezni](https://signup.earthengine.google.com/). 

