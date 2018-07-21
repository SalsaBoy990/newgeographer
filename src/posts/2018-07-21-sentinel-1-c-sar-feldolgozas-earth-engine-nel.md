---
title: Sentinel-1 C-SAR feldolgozás Earth Engine-nel
date: '2018-07-21'
excerpt: >-
  A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi
  vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom.
topic: radar
---
A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom. A fő kérdés, hogy milyen állapotban vannak ezek a XIX. századi folyószabályozás és lecsapolások után visszamaradt vizes élőhelyek. Hol válik szárazabb, illetve hol nedvesedik a terület? Ennek megfelelően lehetne kialakítani a vízügyi tervezést, hogy a számunkra illetve az ökoszisztémák számára kedvező viszonyokat tartsunk fenn vagy alakítsunk ki.

## Néhány fontos tudnivaló

Térjünk máris a szakmai dolgokra! Teljesen világos, hogy az optikai műholdak nem alkalmasak monitoringra a légköri zavaró hatások (aeroszol, felhőborítás, felhőárnyék) és egyéb okok miatt. A radarok esetén azonban a mikrohullámok szinte akadály nélkül áthatolnak még a vastag felhőzeten is. Viszont nem állja meg a helyét az állítás, hogy teljesen időjárás-függetlenek lennének. Mert nem azok! A legsúlyosabb problémát a szél jelenti, ugyanis a szélsebesség és a felszín érdessége között kapcsolat áll fenn. Például az erős szélben a vízfelszínen hullámok alakulnak ki, amelyek növelik a vízfelszín érdességét, nagyobb visszaverődést eredményezve a szenzor felé (***Alsdorf*** et al. 2007). Így a vízfelszín detektálásához ezt a problémát kezelni kell, ugyanis a szél a radarképen "elmoshat" bizonyos vízfelszíni elemeket (a vízfelszínre nagyon alacsony visszaverődés jellemző és ezt növeli meg a szél).

Más felszínek (pl. aszfalt, beton) is hasonló érdességgel bírnak, mint a vízfelszínek, ezért ezek is összetéveszthetők a nagyon hasonló vagy teljesen azonos visszaszórási értékek miatt. Bár ezen felületek kimaszkolása könnyedén megoldható.

A C-sávú radarok (5 GHz frekvencia vagy 5 cm hullámhossz körül) alapvetően a lágyszárú növényzettel borított vizes élőhelyeknél, míg az alacsonyabb frekvenciák (P-sáv, L-sáv) az erdőborítás alatti elárasztás detektálására használhatók (***Hess*** 1990), ugyanis az L és a P sávval ellentétben a C-sávban a radarhullámok nem hatolnak át a lombkoronaszinten, hanem a lombozatról verődnek vissza - a hullámhossz összemérhető a levelek méretével (***Engman*** 1996, ***Lang és Kasischke*** 2008).

A vízborítás érzékelésére az azonos polarizáltságú (HH, VV) adatok alkalmasabbak. Legalkalmasabb a HH-polarizáció, de a VV szintén megfelelő választás (***Kasischke*** et al. 1997, ***Bourgeau*** et al. 2010). Bár azt is érdemes itt hozzátenni, hogy a kereszt-polarizált sávok is fontos információkat hordoznak, különösen, ha a felszínborítást akarjuk térképezni (***Baghdadi*** 2010). A különböző felszíntípusokat más visszaverődés jellemez a VV és a VH sávokban.

## A Sentinel-1 jellemzői röviden

Két poláris pályán keringő műholdon (a 2014 áprilisa óta üzemelő Sentinel 1A és a 2016 áprilisa óta operáló Sentinel 1B) található C-SAR berendezés szolgáltatja az adatokat. A radar mind horizontálisan, mind pedig vertikálisan polarizált mikrohullámokat tud kibocsátani, illetve fogadni. A fő felvételezési mód az ún. Interferometrikus Szélessáv mód (Interferometric Wide Swath), ami egy 250 km-es sávban történő felvételezést jelent. Geometriai felbontás: 20*22 méter, amit 10 méterre mintáznak át. A szárazföld felett VH és VV polarizáltságú sávokban készül a műholdkép. A vetületi rendszer WGS84. Az időfelbontás 6 nap (***Torres*** et al. 2012). A Level-1 Ground Range Detected (GRD) adatokat használtam.

## Az adatok feldolgozása a Google Earth Engine-nel

Az Erath Engine adatbázisa már elő-feldolgozott radarképeket tartalmaz. Az alábbi elő-feldolgozási lépéseket végezték el a Sentinel-1 Toolbox szoftver implementációja alapján (***Google Earth Engine Team*** 2015):

1. Pályaadatokkal való korrekció
2. Háttérzaj eltávolítása zajvektorok segítségével (a kép szélein látható sötét sávok érvénytelen adatokkal)
3. Radiometrikus kalibráció: visszaszóródás intenzitásértékeinek számítása a szenzoros kalibrációs paraméterek alapján)
4. Domborzati korrekció: az adatok felszíni tartományba konvertálása az SRTM DEM alapján.
5. A mértékegység nélküli visszszóródási együttható dB-be konvertálása (`10*log10*σ°`)
6. Az értékek leszorítása az 1. és a 99. percentilis értékére, 16 bitbe kvantálás.

A további feldolgozási lépéseket nekem kellett végezni.

Normalizálnom kellett a visszaszóródási értékeket a mikrohullámok beesési szögével, az ún. **koszinusz korrekció** segítségével. Ez rendkívül fontos! A kis beesési szögek nagyobb visszaverődést, míg a nagyobb szögek kisebb visszaverődést eredményeznek. A beesési szögekből származó eltérések nem csak egy képen belül jelentkeznek, hanem különböző szenzorok esetén, valamint eltérő felvételezési geometriák, más műholdpályák esetén is (emelkedő és süllyedő pályák). Ez nagy beesési szög varianciát okoz a különböző időben készült felvételekben. A normalizáció nélkül ezek nem hasonlíthatók össze (***Weiß*** 2018).

A szeles időben készült radarfelvételeket ki kellett zárnom a vizsgálatból, így a szél általi felszíni érdesség hatásokat kiküszöböltem. Az **1 m/s feletti** szélsebességű területeket ki kellett maszkolni. Erre a célra rendelkezésre álltak a `CFSV2: NCEP Climate Forecast System Version 2, 6-Hourly Products` klimatológiai adatok, melyekből kinyerhetjük a szélsebességet (a `v` és az `u` komponensek felhasználásával).

A következő lépés volt a tüskeszűrés (speckle filtering), amire az általánosan használt Refined Lee filtert alkalmaztam ***Yommy, Liu, és Wu*** (2015) JavaScript kódja alapján (SNAP 3.0 S1TBX szoftver implemetációjával egyenértékű változat). Ezzel a radarképen látható szemcsés zajt redukálhatjuk le.

Az utolsó lépés a vizsgált időszakra vonatkozó átlagképek számítása volt. Most havi léptékben vizsgálódom, de tetszés szerint lehet más időszakra is átlagolni. Ez a lépés tovább javítja a kép minőségét. Külön csináltam átlagképet az emelkedő pályán (tehát amikor a műhold az Egyenlítő felől halad a sarkok felé) és a süllyedő pályán (északról délre) készült felvételekből. Soha ne keverd a különböző pályán készült felvételeket!

## A korrigált adatok automatikus osztályozása, az eredmények exportálása

A wekaKMeans klasztarezési algoritmust használtam, ami egy továbbfejlesztett kmeans típusú kemény osztályozás (Arthur és Vassilvitskii. Az osztályközepektől való eltéréseken alapul, csakúgy, mint az ISODATA eljárás. A wekaKmeans a kezdeti osztályközepeket random mintákból számítja. Távolság függvénynek az euklideszi távolságot használtam. A kimenő klaszterek számát 15-re állítottam.

A tapasztalatok szerint a -17--18 decibel körüli klaszterközéppel rendelkező osztályok vízborítást reprezentálnak. Az eredményeket a felhasználónak kell értelmeznie. Ez a lépés nem automatizálható.

Miután meghatározásra kerültek a vízborításos osztályok, újraosztályozom a az osztályozott képet az alábbiak szerint:
* vízborítás: 1
* nem vízborítás: 0

Az utolsó lépésként pedig az újraosztályozott kép alapján kiszámítom a vízborította terület nagyságát (`reducer`-t alkalmazva). Az osztályozott képet GeoTIFF formátumban a Google Drive-ra mentem.



