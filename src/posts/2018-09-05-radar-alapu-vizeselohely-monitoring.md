---
title: Radar-alapú vizesélőhely-monitoring
date: '2018-09-05'
excerpt: >-
  A tanulmányban a Felső-Kiskunsági tavak területén vizsgáltuk a felszíni
  vízborítás változásait 2014. szept. és 2018 aug. között. A Hidrológiai
  Közlönybe szánt kézirat.
topic: 'Google Earth Engine, wetlands, radar, Sentinel-1'
coverImage: /assets/images/articles/aszaly.jpg
---
*(A cikk teljes címe: "Vizes élőhelyek Sentinel-1 radar alapú monitoringja a Duna-Tisza-közén"; szerzők: Gulácsi András és Dr. Kovács Ferenc)*

### Kivonat
A Duna-Tisza közi szikes tavak, vizes élőhelyek rendkívül szélsőséges vízellátottságú területek, melyek érzékenyek az éghajlatváltozás indukálta szárazodással szemben, ugyanis ezek nagyrészt a lehulló csapadékból kapnak vízutánpótlást. A legtöbb passzív műholdas szenzor a felhőborítás és az alacsonyabb időfelbontás miatt nem alkalmas vizesélőhely-monitoringra. Viszont most már hozzáférünk a Sentinel-1 műholdak C-sávú szintetikus apertúra radarjának (C-SAR) felvételeihez, amelyek ingyenes, közepes térbeli felbontású (10 m), nagy időbeli felbontású (6 nap) és a felhőborítástól független adatokat szolgáltatnak. A tanulmányban a Felső-Kiskunsági tavak területén vizsgáltuk a felszíni vízborítás változásait 2014 szeptemberétől 2018 augusztusáig. Kidolgoztunk egy módszert a vízborítás detektálására, ami a radarképek automatikus osztályozásán alapszik. Az adatok feldolgozására a webböngészőn keresztül a Google Earth Engine felhőplatformot használtuk, amit a műholdképek és egyéb földi megfigyelési adatok feldolgozására hoztak létre. Az osztályozáshoz a wekaKmeans-nek nevezett eljárást használtuk. Verifikációképpen összevetettük az eredményül kapott vízborításokat a Landsat 8 és a Sentinel-2 műholdak adataiból számolt normalizált differenciált vízindex (NDWI, Normalized Difference Water Index) alapján meghatározott vízborításokkal. Az NDWI alapján történő lehatárolás egy küszöbértékes osztályozással történt. A küszöbértékeket vevő működési karakterisztika (angolul Receiver Operator Characteristics, ROC) eljárás segítségével kaptuk meg. Két teljesen különböző módszerrel és hullámhossz-tartományokon (radar/wekaKmeans, NDWI/ROC) közel azonos eredményeket kaptunk, magas Spearman-féle korreláció-értékekkel (ρ = 0,77-0,88).

### Kulcsszavak
*Sentinel-1 C-SAR, radar, Google Earth Engine, vizes élőhelyek, belvíz, Homokhátság, klaszterelemzés*

## BEVEZETÉS

Az éghajlatváltozás indukálta szárazodás a Duna-Tisza közén nagy hatással lehet az élővilág számára nagy értékkel bíró szikes tavainak, vizes élőhelyeinek szélsőséges vízellátottságára a térségben. A klímamodellek az aszályok növekvő gyakoriságát és erősségét prognosztizálják a Kárpát-medencében (***Mezősi*** és társai, 2016). A hazai folyószabályozások és lecsapolások után a megmaradt vizes élőhelyek nem vagy csak alig kapnak vízutánpótlást a folyókból, így a lehulló csapadékból táplálkozhatnak csupán. A csapadék éves eloszlásának változása, illetve különösképpen a tavaszi csapadékmennyiség csökkenése negatív hatással van a vízmérlegre (***Dawson*** és társai, 2003, ***Erwin*** 2009).

A tanulmány célja egy módszer kidolgozása a felszíni vízborítás térképezésére *a Sentinel-1 műholdak C-SAR* (C sávú szintetikus apertúra radarjának felvételei segítségével. Ezzel egy részletesebb betekintést kaphatunk a vizes élőhelyek vízborításában bekövetkező változásokba, mint azelőtt. Az így nyert vízborítási adatok segítségével képesek leszünk nyomon követni az időjárás által kiváltott, illetőleg az éghajlatváltozáshoz kötődő változásokat a vizes élőhelyeken, ami a vizes élőhelyek kezeléséhez és védelméhez fontos információkat szolgáltat. Ezelőtt sajnos nem voltak elérhetők ingyenes, nagy időbeli (6 nap) és közepes (10-30 m) térbeli felbontású radarfelvételek, csupán a passzív műholdak multispektrális felvételei álltak rendelkezésünkre. A passzív műholdak kevésbé alkalmasak monitoringra – főként a légköri zavaró hatások (aeroszol, felhőborítás, felhőárnyék) miatt –, így csupán hiányos idősorok nyerhetők a felvételekből. A radarok esetén azonban a mikrohullámok akadály nélkül áthatolnak még a vastag felhőzeten is.

A radarfelvételek feldolgozása a magas számításigény és a sok feldolgozási lépés miatt nagyon hosszadalmas lenne. A 2010-es évektől színre lépett a felhő alapú számítástechnika, amelyet az egyre növekvő mennyiségű digitális adat (angolul „big data”-nak nevezik) feldolgozásának a szüksége hívta életre. A felhő alapú szolgáltatások (cloud computing) közös jellemzője, hogy a szolgáltatásokat nem egy dedikált hardvereszközön üzemeltetik, hanem a szolgáltató eszközein elosztva, a szolgáltatás üzemeltetési részleteit a felhasználótól elrejtve. Ezeket a szolgáltatásokat a felhasználók a hálózaton keresztül érhetik el. Ez egy olyan szoftverszolgáltatási módszer, amelynél a szoftver és a kapcsolódó adatok központilag vannak tárolva (tipikusan egy internet felhőben, esetünkben a Google szerverein), ugyanakkor a felhasználói hozzáférések egy vékony kliensen keresztül zajlanak.

A *Google Earth Engine* egy ilyen felhő alapú platform, amit a műholdképek és egyéb földi megfigyelési adatok feldolgozására hoztak létre (***Gorelick*** és társai, 2017). Hozzáférést nyújt a Google képi adattáraihoz és biztosítja számítási teljesítményt és azokat a funkciókat, amik a képek feldolgozásához szükségesek. A JavaScript és a Python programozási nyelveken érhető el a Google Earth Engine API-ja (application programming interface, alkalmazásprogramozási felület – ezen keresztül férünk hozzá az internet felhőhöz szkriptek futtatásával). Mi a webböngészőből elérhető JavaScript API-t használjuk.

Visszatérve a radarokra, bár igaz, hogy a felhők nem befolyásolják, de nem állja meg a helyét teljesen az állítás, hogy teljes egészében időjárástól függetlenek lennének. A legsúlyosabb problémát a szél jelenti, ugyanis a szélsebesség és a felszín érdessége között kapcsolat áll fenn. Például az erős szélben a vízfelszínen hullámok alakulnak ki, amelyek növelik a vízfelszín érdességét, nagyobb visszaverődést eredményezve a szenzor felé (***Alsdorf*** és társai, 2007). Így a vízfelszín detektálásához ezt a problémát kezelni kell, ugyanis a szél a radarképen „elmoshat” bizonyos vízfelszíni elemeket (a vízfelszínre nagyon alacsony visszaverődés jellemző a mikrohullámú tartományban és ezt növeli meg a szél).

Más felszínek (pl. aszfalt, beton) is hasonló érdességgel bírnak, mint a vízfelszínek, ezért ezek is összetéveszthetők a nagyon hasonló vagy teljesen azonos visszaszórási értékek miatt. Bár e felületek kizárása (kimaszkolása) könnyedén megoldható.

A C-sávú radarok (5 GHz frekvencia vagy 5 cm hullámhossz körül) a lágyszárú növényzettel borított vizes élőhelyeknél, míg az alacsonyabb frekvenciák (P-sáv, L-sáv) az erdőborítás alatti elárasztás detektálására használhatók (Hess 1990). Ennek az oka, hogy – az L és a P sávval ellentétben – a C-sávban a radar által kibocsátott mikrohullámú sugarak nem hatolnak át a lombkoronaszinten, hanem a lombozatról verődnek vissza, mivel a hullámhossz összemérhető a levelek méretével (***Engman*** 1996, ***Lang és Kasischke*** 2008). 

A radarhullámok visszaverődése a felszín fizikai tulajdonságaitól függ. A felszíni vízborítás elkülönítésében a felszín érdessége játszik szerepet. Minél érdesebb a felszín, annál nagyobb a visszaszóródás a radarantenna felé, és annál fényesebb objektum látszódik majd a felvételen. A vízfelszín a többi felszíntípushoz képest nagyon alacsony érdességgel bír, más szóval nagyon sima. Az ilyen sima felületekről kevés energia szóródik vissza, a radarhullámok a szenzortól elfele irányba verődnek tovább, így nagyon sötét objektumokként tűnnek fel a képeken. A lényeg, hogy erős kontraszttal különül el a vízborítás. A vízborítást a tapasztalatok szerint `-17- -18` dB (decibel) vagy kisebb visszaszóródási értékek jellemzik.

A vízborítás érzékelésére az azonos polarizáltságú (HH, VV) adatok alkalmasabbak. Legalkalmasabb a HH-polarizáció, de a VV szintén megfelelő választás (***Kasischke*** et al. 1997, ***Bourgeau-Chavez*** és társai, 2010). Bár azt is érdemes itt hozzátenni, hogy a kereszt-polarizált sávok is fontos információkat hordoznak, különösen, ha a felszínborítást akarjuk térképezni (***Baghdadi*** 2010). A különböző felszíntípusokat más visszaverődés jellemez a VV és a VH polarizáltságú sávokban.

A Homokhátság szárazodásának egy lehetséges hatása a mintaterületre
A Homokhátságban a talajvízszintek 1956-60-as kiinduló állapothoz képest az 1990-es évek közepéig átlagosan 2,5-3 métert süllyedtek (***VITUKI*** 2006). A vízszintsüllyedés okainak keresésére és modellezésére számtalan tudományos kutatás folyt és folyik jelenleg is hazánkban.

***Szilágyi és Vörösmarty*** (1993) szerint az 1960. évi állapotból kiindulva az 1961-1987 között tapasztalható talajvízszint-süllyedést *70%-ban a rétegvíz-kitermelés*, 15%-ban a kedvezőtlen időjárás és 15%-ban az erdőterületek növekedése okozta. ***Pálfai*** (1994) szerint: *időjárás (csapadék és párolgás) – 50%*; rétegvíz-kitermelés – 25%; talajvíz-kitermelés – 6%; területhasználatban bekövetkezett változások – 10%; vízrendezésben bekövetkezett változások – 7%; és egyéb tényezők (pl. szénhidrogén-bányászat, stb.) – 2%. ***Kohán*** (2014) szerint az 1970-es évek végéig elsősorban a klíma határozta meg a talajvízszintet, de 1980 után már a nem időjárási okok is jelentősen közrejátszottak a süllyedésben: a természetes tényezőkön felül az erdőtelepítések 53 cm-rel, a vízkitermelés pedig 70 cm-rel járulhatott hozzá az átlagos talajvízszint csökkenéséhez 1981-2010 között.

Duna–Tisza közén tapasztalható talajvízszint-süllyedés hátterében *fő tényezőként a csapadékhiány áll* (***Völgyesi*** 2006, ***Szanyi és Kovács B.*** 2009, ***Rakonczai*** 2013). ***Völgyesi*** (2006) a MODFLOW áramlásmodellező szoftver segítségével modellezte a Homokhátság vízháztartását és arra az eredményre jutott, hogy a talajvízszintek csökkenésében *a legerősebb tényező az időjárás. A magas térszínű területeken körülbelül 80 %-os súlyú*. Körülbelül 13 %-os súllyal befolyásolják a magas térszínű területek talajvízszintjét az erdők. 5 % alatti szerepük van a belvízcsatornáknak. A víztermelés utolsó 10 évben történt változása pedig 2 %-nál is kisebb hatású.

A mintaterületünk (*1. ábra*), *a Felső-Kiskunsági tavak* a Duna negyedkori árterületén helyezkedik el, amit egyrészt *a Hátság területén beszivárgó vizek feláramlási területeként*, másrészt pedig a Kárpát-medence regionális áramlási rendszerébe illesztve a mélységi vizek feláramlási zónái egyikének ismerünk (***Erdélyi*** 1975, ***Tóth és Almási*** 2001, ***Mádlné*** és társai 2005, ***Szalai*** és társai 2010). Tehát a magasabb hátsági területeken a csapadékból beszivárgó víz a gravitációnak engedelmeskedve a nyugati perem felé, a tavak irányába áramlik a felszín alatt, hozzájárulva ezzel a tavak vízpótlásához. A kérdés csak az, hogy ennek a hozzáfolyásnak mekkora hatása lehet a felszíni vízborításokra? A Felső-Kiskunsági tavak területén lehulló helyi csapadéké és párolgásé, vagy a hozzáfolyásé a meghatározó szerep? Ha feltételezzük, hogy tovább csökken a Homokhátság vízutánpótlódása, akkor a fentiek szerint a tavak vízborításának is csökkennie kell. Bár az is elképzelhető, hogy nincs valós kapcsolat a kettő között.

![1. ábra. A Felső-Kiskunsági tavak.](/assets/images/mintaterulet.jpg)

## ADAT ÉS MÓDSZER

### A Sentinel-1 C-sávú szintetikus apertúrájú radar jellemzői röviden

Két poláris pályán keringő műholdon (a 2014 áprilisa óta üzemelő Sentinel 1A, és a 2016 áprilisa óta operáló Sentinel 1B) található oldalra pásztázó C-SAR berendezés szolgáltatja az adatokat. A radar mind horizontálisan (H), mind pedig vertikálisan (V) polarizált mikrohullámokat tud kibocsátani, illetve fogadni. A fő felvételezési mód az ún. Interferometrikus Szélessáv mód (Interferometric Wide Swath), ami egy 250 km-es sávban történő felvételezést jelent. Geometriai felbontás: 20*22 méter, amit 10 méterre mintáznak át. A szárazföld felett VH és VV polarizáltságú sávokban készül a műholdkép. A vetületi rendszer WGS84. Az időfelbontás 6 nap (Torres és társai, 2012). A Level-1 Ground Range Detected (GRD) adatokat használom.

### Az adatok feldolgozása a Google Earth Engine-nel

Az Earth Engine adatbázisa már előfeldolgozott radarképeket tartalmaz. Az alábbi előfeldolgozási lépéseket végezték el a Sentinel-1 Toolbox szoftver implementációja alapján (***Google Earth Engine Team*** 2015):

1. Pályaadatokkal való korrekció;
2. Háttérzaj eltávolítása (a kép szélein látható sötét sávok érvénytelen adatokkal);
3. Radiometrikus kalibráció: visszaszóródás intenzitásértékeinek számítása a szenzoros kalibrációs paraméterek alapján;
4. Domborzati korrekció: az adatok felszíni tartományba konvertálása az SRTM DEM alapján;
5. A mértékegység nélküli visszszóródási együttható (σ°) dB-be konvertálása (`10*log10*σ°`);
6. Az értékek leszorítása az 1. és a 99. percentilis értékére, 16 bitbe kvantálás.

A további feldolgozási lépéseket nekünk kellett végezni.

Először is normalizálni kellett a visszaszóródási értékeket a mikrohullámok beesési szögével, az ún. *koszinusz korrekció* segítségével (Ulaby és társai 1982). Ez nélkülözhetetlen lépés, ugyanis a kicsi beesési szögek nagyobb visszaverődést, míg a nagyobb szögek kisebb visszaverődést eredményeznek. A beesési szögekből származó eltérések nem csak egy képen belül jelentkeznek, hanem különböző szenzorok esetén, valamint eltérő felvételezési geometriák, más műholdpályák esetén is (emelkedő és süllyedő pályák). Ez nagy beesési szög varianciát okoz a különböző időben készült felvételekben. A normalizáció nélkül ezek nem hasonlíthatók össze (***Weiß*** 2018).

Másodszor: A szeles időben készült radarfelvételeket ki kellett zárnunk a vizsgálatból, hogy kiküszöböljük a szél általi felszíni érdesség hatásokat (***Elyouncha*** és társai, 2015). Az 1 m/s feletti szélsebességű területeket kizártuk. Erre a célra rendelkezésre álltak a `CFSV2: NCEP Climate Forecast System Version 2, 6-Hourly Products` 20 km felbontású klimatológiai adatok (***Saha*** és társai, 2011), melyekből kinyerhetjük a szélsebességet (a `v` és az `u` komponensek felhasználásával). A szélsebesség-adatok a felszín felett 10 méterre vonatkoznak.

A következő lépés volt a tüskeszűrés (angolul speckle filtering), amire az általánosan használt Finomított Lee szűrőt (Lee 1980, 1981) alkalmaztuk, amihez rendelkezésre állt egy kész szkript a Google Earth Engine-ben (***Yommy*** és társai, 2015). Ezzel a radarképeken megfigyelhető, a sugárforrás által kibocsátott és a visszaverődő radarhullámok között fellépő interferencia okozta szemcsés zajt jelentősen lecsökkenthetjük.

Az utolsó lépés a vizsgált időszakra vonatkozó átlagképek számítása volt. Havi léptékben vizsgálódunk, de tetszés szerint lehet más időszakra is átlagolni. Ez a lépés tovább javítja a kép minőségét. Külön készítettünk átlagképet az emelkedő pályán (tehát amikor a műhold az Egyenlítő felől halad a sarkok felé) és a süllyedő pályán (északról délre) készült felvételekből.

A korrigált adatok automatikus osztályozása és a statisztikák számítása
Az úgynevezett `wekaKMeans` klaszterezési algoritmust használtam, ami egy továbbfejlesztett kmeans típusú kemény osztályozás (***Arthur és Vassilvitskii*** 2007). Az osztályközepektől való eltéréseken alapul, csakúgy, mint az `ISODATA` algoritmus. A `wekaKMeans` a kezdeti osztályközepeket véletlenszerű mintákból számítja. Távolság függvénynek az euklideszi távolságot használtunk. A kimenő klaszterek számát 15-re állítottuk és a VV és a VH sávot is felhasználtam az osztályozásnál.

A tapasztalatok szerint a `-17- -18` dB körüli vagy alacsonyabb klaszterközéppel rendelkező osztályok vízborítást jeleznek. Az eredményeket a felhasználónak kell értelmeznie. Ez az egyetlen lépés, amely nem automatizálható.
Miután meghatározásra kerültek a vízborításos osztályok, újraosztályoztuk az osztályozott képet az alábbiak szerint:

* vízborítás: 1
* nincs vízborítás: 0
.

Az utolsó lépésként pedig az újraosztályozott kép alapján kiszámítottuk a vízzel borított terület nagyságát.

A statisztikai elemzéseket (lineáris regresszió, korreláció) és a diagramokat az R for Windows szoftver segítségével készítettük el. A statisztikai kapcsolatok kiértékelésekor Pearson-féle (`R`-érték) és Spearman-féle (`ρ`-érték) korrelációkat számoltunk, valamint szignifikancia tesztet is végeztünk.

A verifikációhoz a Landsat 8 Operational Land Imager (OLI) és a Sentinel-2 MultiSpectral Instrument (MSI) légkör teteji reflektancia értékekből számolt vízindexet használtunk. A Landsat adatok geometriai felbontása 30, míg a Sentinel-2 adatoké 20 méter. A normalizált differenciált vízindexek (NDWI, Normalized Difference Water Index) gyakran használatosak a felszíni vízborítás detektálására (***McFeeters*** 1996, ***Xu*** 2006, ***Li*** és társai, 2013, ***van Leeuwen*** és társai, 2017). ***Xu*** (2006) vízindexét használtuk, ugyanis ezzel lehet a legpontosabban meghatározni a vízborítást: `NDWI = (G − MIR) / (G + MIR)`, ahol `G` a látható zöld hullámhossz-tartomány műholdkép sávja, `MIR` (middle infrared): ez a középső infravörös sáv (központi hullámhossz: `2,1` μm). Sajnos bővebb magyarázatot a tartalmi korlátok miatt nem adhatunk, de a megadott hivatkozásokban minden információ elérhető.

A vízindex értékeket az úgynevezett „vevő működési karakterisztika” (angolul Receiver Operator Characteristics, ROC) módszer segítségével osztályoztam (***Gulácsi*** 2017). Ez egy küszöbértékes eljárás, melynek lényege a következő: különböző küszöbértékek esetén megvizsgáljuk, hogy egy bináris osztályozónak mekkora az igaz pozitív aránya (tehát amikor helyesen vízborítást jelez az osztályozó) és a hamis pozitív aránya (téves vízborítás detektálás). Mi azt az osztályozót (és a hozzá tartozó küszöbértéket) keressük, aminél az igaz pozitív arány a lehető legmagasabb, míg a hamis pozitív arány a legkisebb. Ehhez referenciaként felhasználtam két időpontban egy-egy elérhető Pléiades és WorldView-3 nagy felbontású műholdképet (a Google Earth adatbázisából). A Landsat 8 esetén a `0,625` vagy nagyobb, míg a Sentinel-2 esetén `0,57` vagy nagyobb indexértékek jeleznek vízborítást. Ez alapján osztályoztuk a képeket és megkaptuk a vízborításokat.

## EREDMÉNYEK, KÖVETKEZTETÉSEK ÉS JAVASLATOK

### A számolt havi vízborítások

A nagy természetes változékonyság miatt nagy kihívást jelent a felszíni vízborítás gyakoriságában és tartósságában bekövetkező változások kimutatása. Néhány az átlagosnál nedvesebb évben felélednek az egykori medermaradványok és feltöltődnek a tavak. Azonban a legtöbb évben ezek nagy része, a nagy tavakat leszámítva, teljesen szárazon marad.

A *2. ábra* a havi vízborítások eloszlását mutatja: felül a sűrűségfüggvény, alul pedig a dobozdiagram van feltüntetve. Külön ábrázoltam a csak emelkedő és a csak süllyedő pályán készült felvételek alapján számolt borítási értékeket hektárban. Az ábráról leolvasható, hogy a havi vízborítás-értékek, az adatpontok 50%-a az 500-1000 ha közötti tartományban mozog. Ha 1000 ha-ig tekintjük az értékeket, tehát nem vesszük figyelembe a kiugró értékeket, akkor ránézésre viszonylag normál eloszlású a minta, tehát haranggörbét ír le. A kiugró értékek miatt nagy a különbség a medián és az átlag érték között. A kiugró vízborítások a tél végi vagy tavaszi vízborítási csúcsok. Az éves minimum borítások az augusztus-október közötti időszakban jelentkeznek. A tavaszi maximum és a nyár végi minimum borításértékek között többszörös a különbség.

![2. ábra. A havi vízborítások sűrűségfüggvénye (fent) és az adatok ábrázolása dobozdiagramon (lent). A rövidítések magyarázata: wekaKMeans_DESC – a süllyedő pályán készült képekre végzett wekaKMeans osztályozás alapján nyert vízborítások; wekaKMeans_ASC – ugyanaz, mint az előző, csak emelkedő pályán. A kék célkeresztek a számtani átlagokat jelölik.](/assets/images/distribution.png)

Például 2015 februárjában volt a vizsgált időszakban (2014 novembere óta) a legnagyobb a víz kiterjedése: 2996 ha (a süllyedő pálya esetén) (3. ábra). Ez augusztusra 1/7-ed részére, 414 ha-ra zsugorodott össze (*3-4. ábra*). 2016-ban a csúcs 1911 ha, 2017-ben 1166 ha, míg az idén 2239 ha volt. Mindegyik márciusban. A minimum értékek voltak: 564 ha (2016. szeptember) és 351 ha (2017. augusztus). 2018-ra még nem lehet eldönteni. *Tehát a 2015-2017 közötti éveket tekintve rendre 7,2-szeres, 3,4-szeres, illetve 6,4-szeres különbség adódik.* Ez a szélsőséges változékonyság egybevág a mintaterületen végzett korábbi, Landsat műhold alapú kutatásokkal (***Kovács*** 2009).

Nincsen statisztikailag kimutatható különbség az emelkedő és süllyedő pályán készült felvételek alapján számolt vízborítások között. Mivel havi átlagokat képezek, ezért nem mindegy, hogy a hónap mely részéről vannak felvételeink és mennyi kép állt rendelkezésre, a hónapban mely napokon fújt a szél. A vízborítás még egy hónapon belül is változhat, így az eltérő időben történő felvételezések okozzák az eltéréseket.

A vizsgált időszakban nem mutatható ki csökkenő trend a havi vízborításokban. 2016 és 2017 esetén a tavaszi csúcs kevésbé volt markáns a többi évhez képest. Ami még érdekesség lehet, hogy a nedvesebb években is az 500-1000 ha közötti tartományba esik vissza a felszíni vízborítás, hiába magasabb a tavaszi csúcs.

![3. ábra. A havi vízborítások időbeli alakulása 2014 szeptembere és 2018 augusztusa között az emelkedő és süllyedő pálya esetén.](/assets/images/vizboritas.png)

![4. ábra. Vízborítás-térképek: a 2015. februári csúcs- és a 2017. augusztusi minimális vízborítások. DESC – süllyedő pálya; ASC – emelkedő pálya. Piros vonalakkal a legnagyobb vízfelszínek/tavak a teljes vizsgált időszakra vonatkozó átlagos határvonalát jelöltem.](/assets/images/swc_radar_maps.png)

### Verifikáció az NDWI vízindex adatokkal

A verifikációhoz az összes elérhető felhőmentes Landsat 8 és Sentinel-2 műholdképet felhasználtuk. Rendre 21, illetve 23 adatpontunk van, amire lineáris regressziót számoltunk (*5-6. ábra*). Statisztikailag szignifikáns kapcsolatokat (p << 0,001) tárt fel az elemzés. Lényegi különbség nincsen az emelkedő vagy süllyedő pályán vételezett adatok között, az eltérések fő oka az eltérő napokon való felvételezés. A Sentinel-2 adatokkal való kapcsolat kicsit gyengébb volt a Landsat 8-hoz képest. A Pearson-féle korrelációk `0,86-0,96` közöttiek, míg a Spearman-féle rangsor alapú korrelációk enyhén alulmaradnak: `0,77-0,88` (*1. táblázat*). A nagy befolyású adatpontok a csúcsvízborítás-értékek miatt a minta nem normál eloszlású, ezért a nem-parametrikus Spearman-féle korreláció a mérvadó, ugyanis az nem igényli a normál eloszlást és robusztus.

Statisztikai kapcsolatok | Pearson-féle R-érték | Spearman-féle ρ-érték
--- | --- | ---
wekaKMeans_DESC ~ L8_MNDWI | 0,96*** | 0,88***
wekaKMeans_DESC ~ S2_MNDWI | 0,83*** | 0,77***
wekaKMeans_ASC ~ L8_MNDWI | 0,96*** | 0,79***
wekaKMeans_ASC ~ S2_MNDWI | 0,85*** | 0,80***
[1. táblázat: Statisztikai kapcsolatok a lineáris regresszió alapján.]

![5. ábra. Lineáris regressziók (kék vonal) a radar és a vízindex alapján számolt havi vízborítások (ha) között. A piros vonal egy exponenciális illesztés, de csak tájékoztató jellegű. L8_MNDWI a Landsat 8 alapján, míg az S2_MNDWI a Sentinel-2 műholdak alapján számolt vízborítást rövidíti.](/assets/images/regresszio.png)

![6. ábra. A havi vízborítások összevetése az eltérő adatok alapján a vizsgált időszakban.](/assets/images/verifikacio.png)

## ÖSSZEFOGLALÁS

A tanulmányban a Sentinel-1 C-SAR radarfelvételek alapján kidolgoztunk egy módszert a felszíni vízborítás időjárástól független érzékelésére, havi léptékben, közepes térbeli felbontással, amit verifikációképpen összevetettünk a Landsat 8 OLI és a Sentinel-2 MSI műholdképekből számolt vízborítási eredményekkel (MNDWI alapján, küszöbértékes osztályozással). *Két teljesen különböző módszerrel és, különböző hullámhossz-tartományokon közel azonos eredményeket kaptunk, magas korreláció-értékekkel, így kicsi a véletlen egybeesés valószínűsége.
*

A módszer további érvényesítésre szorul terepi felméréseken keresztül. A Vízügyi Igazgatóságoknak meg vannak az erőforrásai ahhoz, hogy összevethessék a radarképek alapján nyert vízborítási/belvízborítási térképeket a saját terepi felméréseikkel, így elválna, hogy mennyire bizonyul alkalmazhatónak a tanulmányunkban kidolgozott módszer. Egy pixel a radarképen 0,1 ha területnek felel meg a valóságban, tehát csak az ennél nagyobb belvízfoltok érzékelhetők. Az összes szkript kódját odaadjuk kérésre, hogy bárki reprodukálhassa az eredményeket, és más (belvizes) területeken is végezhessen kutatást.

A Homokhátság szárazodása kapcsán mindig felmerül *a belvizek visszatartásának az összetett kérdése*. Bár ez a vízmennyiség elenyésző töredék ahhoz képest, ami hiányzik a vízháztartás kiegyenlítéséhez, de mégis fontos lehet a hasznosításuk a gazdák számára. A felhő alapú számítástechnika segítségével tömérdek mennyiségű és ingyenes műholdas távérzékelési adatot tudunk már gyorsan és magas fokon automatizáltan feldolgozni. A Google Earth Engine felhőplatform számítási teljesítménye rendelkezésünkre áll, hogy *egy vizes élőhely vagy belvíz monitoring rendszert működtessünk, talán a jövőben előremozdíthatná a belvizekkel való gazdálkodás ügyét is.*

## IRODALOM

* Alsdorf D. E., Rodríguez E., Lettenmaier D. P. (2007). Measuring surface water from space. Reviews of Geophysics 45(2), 24 p.

* Arthur D., Vassilvitskii S. (2007). k-means++: the advantages of carefull seeding. In: Proceedings of the eighteenth annual ACM-SIAM symposium on Discrete algorithms, 1027-1035.

* Baghdadi N., Bernier, M., Gauthier R., Neeson I. (2010). Evaluation of C-band SAR data for wetlands mapping. International Journal of Remote Sensing 22(1), 71-88.

* Bourgeau-Chavez L. L., Kasischke E. S., Brunzell S. M., Mudd J. P., Smith K. B., Frick A. L. (2010). Analysis of space-borne SAR data for wetland mapping in Virginia riparian ecosystems. International Journal of Remote Sensing 22(18), 3665-3687.

* Dawson T. P., Berry P. M., Kampa E. (2003). Climate change impacts on freshwater wetland habitats. Journal for Nature Conservation 11(1), 25-30.

* Elyouncha A., Neyt X., Stoffelen A., Verspeek J. (2015). Assessment of the corrected CMOD6 GMF using scatterometer data. In: Proceedings of SPIE 9638, Remote Sensing of the Ocean, Sea Ice, Coastal Waters, and Large Water Regions, 11 p.

* Engman E. T. (1996). Remote sensing applications to hydrology: future impact. Hydrological Sciences Journal 41(4), 637-647.

* Erdélyi M. 1975. A magyar medence hidrodinamikája. Hidrológiai Közlöny 4, 147-155.

* Erwin K. L. (2009). Wetlands and global climate change: the role of wetland restoration in a changing world. Wetlands Ecology and Management 17, 71-84.

* Google Earth Engine Team (2015). [Google Earth Engine: A planetary-scale geospatial analysis platform](https://earthengine.google.com/).

* Gorelick N., Hancher M., Dixon M., Ilyushchenko S., Thau D., Moore R. (2017). Google Earth Engine: Planetary-scale geospatial analysis for everyone. Remote Sensing of Environment 202, 18-27.

* Gulácsi A. (2017). A vizes élőhelyek vízborítottságában bekövetkező változások vizsgálata radarfelvételekkel, a Google Earth Engine használatával. In: Interdiszciplináris tájkutatás a XXI. században, V. Blanka, Zs. Ladányi (eds.), Szegedi Tudományegyetem Földrajzi és Földtudományi Intézet, Szeged. pp. 188-199.

* Hess L. L., Melack J. M., Simonett D. S. (1990). Radar detection of flooding beneath the forest canopy: a review. International Journal of Remote Sensing 11(7), 1313-1325.

* Kasischke, E. S., Melack J. M., Dobson M. C. (1997). The use of imaging radars for ecological applications—A review. Remote Sensing of Environment 59(2), 141-156.

* Kohán B. (2014). GIS-alapú vizsgálat a Duna–Tisza közi homokhátság szárazodásának témakörében. Doktori (Phd) értekezés. ELTE Környezet- és Tájföldrajzi Tanszék, Budapest. 138 p.

* Kovács F. (2009). Változékonyság értékelése vizes élőhelyeken – műholdképek alapján. Hidrológiai Közlöny 89(2), 57-61.

* Ladányi Zs. (2010). Tájváltozások értékelése a Duna–Tisza közi homokhátság egy környezetés klímaérzékeny kistáján, az Illancson. Doktori (PhD) értekezés, SZTE Környezettudományi Doktori Iskola, Szeged. 155 p.

* Lang M. W., Kasischke E. S. (2008). Using C-Band Synthetic Aperture Radar Data to Monitor Forested Wetland Hydrology in Maryland's Coastal Plain, USA. IEEE Transactions on Geoscience and Remote Sensing 46(2), 535-546.

* Lee J. S. (1980). Digital image enhancement and noise filtering by use of local statistics. IEEE Trans. on Pattern Analysis and Machine Intelligence 2(2), 165-168.

* Lee J. S. (1981). Refined filtering of image noise using local statistics. Computer Vision, Graphics, and Image Processing 15, 380-389.

* Li W., Du Z., Ling F., Zhou D., Wang H., Gui Y., Sun B., Zhang X. (2013). A Comparison of Land Surface Water Mapping Using the Normalized Difference Water Index from TM, ETM+ and ALI. Remote Sensing 5(11), 5530-5549.

* Mádlné Szőnyi J., Simon Sz., Tóth J., Pogácsás Gy. (2005). Felszíni és felszín alatti vizek kapcsolata a Duna–Tisza közi Kelemen-szék és Kolon-tó esetében. Általános Földtani Szemle 30, 93-110.

* McFeeters S. K. (1996). The use of the Normalized Difference Water Index (NDWI) in the delineation of open water features. International Journal of Remote Sensing 17(7), 1425–1432.

* Mezősi G., Blanka V., Ladányi Zs., Bata T., Urdea P., Frank A., Meyer B. (2016). Expected mid- and long-term changes in drought hazard for the South-Eastern Carpathian Basin. Carpathian Journal of Earth and Environmental Sciences 11(2), 355-366.

* Pálfai I. (1994). Összefoglaló tanulmány a Duna-Tisza közi talajvízszint süllyedés okairól és a vízhiányos helyzet javításának lehetőségeiről. A Nagyalföld Alapítvány kötetei 3, Békéscsaba. pp. 111-125.

* Rakonczai J. (2013). A klímaváltozás következményei a dél-alföldi tájon. (A természeti földrajz változó szerepe és lehetőségei). Akadémiai doktori értekezés, Budapest. 167 p.

* Saha S. et al. 2011. The NCEP Climate Forecast System Reanalysis. Bulletin of American Meteorological Society, 91, 1015-1057.

* Szalai J., Kovács J., Kovácsné Székely I. (2011). A Duna – Tisza köze csapadék és talajvízszint-adatainak vizsgálata klaszteranalízissel. In: Környezeti változások és az Alföld, J. Rakonczai (ed.), Nagyalföld Alapítvány, Békéscsaba. pp. 111-118.

* Szanyi J., Kovács B. (2009). Egyesített 3D hidrodinamikai modell a felszín alatti vizek használatának fenntartható fejlesztéséhez a magyar-szerb országhatár menti régióban. INTERREG III/A HUSER0602/131.

* Szilágyi J., Vörösmarty Ch. (1993). A Duna–Tisza közi talajvízszint-süllyedések okainak vizsgálata. Vízügyi Közlemények, 75(3), 280-294.

* Torres R., Snoeij R., Geudtner D., Bibby D., Davidson M., Attema E., Potin P., Rommen B., Floury N., Brown M., Traver I. N., Deghaye P., Duesmann B., Rosich B., Miranda N., Bruno C., L'Abbate M., Croci R., Pietropaolo A., Huchler M., Rostan F. (2012). GMES Sentinel-1 mission. Remote Sensing of Environment 120, 9-24.

* Tóth J., Almási I. (2001). Interpretation of observed fluid potential patterns in a deep sedimentary basin under tectonic compression: Hungarian Great Plain, Pannonian basin. Geofluids 1,11-36.

* Ulaby F. T., Moore R. K., Fung A. K. (1982). Microwave remote sensing: active and passive. Vol. 2, Radar remote sensing and surface scattering and emission theory. Addison-Wesley Reading, MA, USA.

* van Leeuwen B., Tobak Z., Kovács F., Sipos Gy. 2017. Towards a continuous inland excess water flood monitoring system based on remote sensing data. Journal of Environmental Geography 10(3-4), 9-15.

* VITUKI (2006). A Duna–Tisza közi hátság hidrometeorológiai, felszíni és felszín alatti vizeinek mennyiségére vonatkozó mérő- és megfigyelőrendszer működtetése és értékelése. Zárójelentés. VITUKI Kht., Hidrológiai Intézet, Budapest.

* Völgyesi I. (2006). A Homokhátság felszín alatti vízháztartása – vízpótlási és vízvisszatartási lehetőségek. http://volgyesi.uw.hu/dokuk/homokhatsag.pdf

* Weiß T. (2018). [sar-pre-processing Documentation](https://media.readthedocs.org/pdf/multiply-sar-pre-processing/get_to_version_0.4/multiply-sar-pre-processing.pdf
).

* Xu H. (2006). Modification of normalised difference water index (NDWI) to enhance open water features in remotely sensed imagery. International Journal of Remote Sensing 27(14), 3025-3033.

* Yommy A. S., Liu R., Wu S. (2015). SAR Image Despeckling Using Refined Lee Filter. In: Conference: 2015 7th International Conference on Intelligent Human-Machine Systems and Cybernetics (IHMSC) 2, 260-265.



