---
title: Mire jó Google Earth Engine API?
date: '2017-08-07'
excerpt: >-
  Ma már nem a térbeli adatok hiánya jelenti a GIS kutatások korlátját, hanem az irdatlan mennyiségben rendelkezésünkre álló távérzékelt adatnak a nagyon hosszadalmas, manuális feldolgozása.
topic: Google Earth Engine
---

Ma már nem az adatok hiánya jelenti a földrajzi kutatások korlátját, hanem annak a tömérdek rendelkezésre álló és ingyenes távérzékelt adatnak a rendkívül hosszadalmas feldolgozása. Hiszen csak nagy mennyiségű, empirikus adatból lehet szilárd, megbízható tudományos következtetéseket levonni, és megbízható modelleket megalapozni. A Google Earth Engine felhő alapú számítási platform alkalmazásával szeretném demonstrálni az objektum-orientált programozás szükségét a GIS-tudományban.

## A Google Earth Engine bemutatása

A felhő alapú szolgáltatások (cloud computing) közös jellemzője, hogy a szolgáltatásokat nem egy dedikált hardvereszközön üzemeltetik, hanem a szolgáltató eszközein elosztva, a szolgáltatás üzemeltetési részleteit a felhasználótól elrejtve. Ezeket a szolgáltatásokat a felhasználók a hálózaton keresztül érhetik el.

A Google Earth Engine is egy ilyen felhő alapú szolgáltatás. Ez egy olyan szoftverszolgáltatási módszer, amelynél a szoftver és a kapcsolódó adatok központilag vannak tárolva (tipikusan egy internet felhőben, esetünkben a Google szerverein), ugyanakkor a felhasználói hozzáférések egy vékony kliensen keresztül zajlanak, amely leggyakrabban egy valamilyen webböngésző alkalmazás. Esetünkben ez a Google Earth Engine alkalmazásprogramozási felülete vagy interfésze (application programming interface, API).

A Google Earth Engine API a JavaScript és a Python programozási nyelveket használja. A Python használatához telepítésre is szükség van. Funkcionalitásban mindkettő egy és ugyanaz. A böngészőben természetesen csak a JavaScript futtatható, hiszen a böngésző része a JS fordítómotor, Míg a Python esetén a saját gépeden dolgozol. Miven a Python-úl nem tudok, így csak a JS-sel foglalkozom.

A Google Earth Engine (a későbbiekben: GEE) felhő alapú platformját műholdképek és egyéb földi megfigyelési adatok feldolgozására hozták létre. Hozzáférést nyújt a Google képi adattáraihoz (több, mint 2 petabájt (10^15^ bájt) adat) és biztosítja azt az elképesztő számítási teljesítményt, ami a képek feldolgozásához szükséges.

A tudomány tekintélyes adat- és technológiai erőforrásokkal való párosítása több előnnyel jár:

1. Példa nélküli sebesség: még a legerősebb felhasználói számítógépekkel is napokba vagy hetekbe telik egy elemzés lefuttatása a földfelszín bármely nagyobb szegletére. A felhő alapú számítással nagyságrendileg lecsökken a számítási idő.

2. Könnyen használható és alacsony költségű: egy internetes felület, amely könnyű hozzáférést nyújtva az adatokhoz (Landsat, MODIS, Sentinel stb.), a tudományos algoritmusokhoz és a számítási teljesítményhez. Drámaian lecsökkenti a földrajzi adatok elemzésének költségeit és összetettségét. Ez lehetővé teszi a magas befolyású, adat-vezérelte tudományt.

A GEE számítási módszere figyelemreméltóan hatékony: automatikusan párhuzamosítja az elemzéseket, így aztán számos számítógép CPU-ján egy időben futnak a Google adatközpontokban. A számításokat „lustán” hajtja végre, csak a kijelző megtöltéséhez vagy a kért értékek számításához szükséges bemenő adatokat kéri be. Ez az éppen időben (just-in-time) megosztott számítási modell lehetővé teszi az eredmények valós idejű felfedezését. A számítás után, az eredményeket gyorsítótárazza a memóriában azért, hogy az ugyanarra a műholdképre vagy értékre vonatkozó többszörös HTTP lekérések ne vezessenek fölösleges újraszámításhoz.

A GEE Code Editor fejlesztői környezet felületét a lenti kép mutatja: fent középen a JavaScript kódszerkesztő, alul a térképnézet, a bal felső ablakban a fülekkel a szkriptkezelő (Scripts), az API dokumentáció (Docs) és a saját feltöltött adataink (Assets) érhetők el. A jobb felső ablakban a felügyelő (Inspector) – pl. a térképre kattintva egy pont földrajzi koordinátáit írja ki –, a konzol (Console) – a print() függvény ide ír –, és a feladatok (Tasks) – pl. egy műholdkép GeoTIFF-be exportálása – jeleníthető meg a fülekre kattintva. A kódszerkesztő ablak fejlécében a Get Link gombra kattintva megkapjuk a szkriptünkre mutató egyedi html címet.

