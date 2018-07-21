---
title: Sentinel-1 C-SAR feldolgozás Earth Engine-nel
date: '2018-07-21'
excerpt: >-
  A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi
  vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom.
topic: radar
---
A Sentinel-1 C-sávú szintetikus apertúrájú radaradatokat a Duna-Tisza közi vizes élőhelyek és szikes tavak vízellátottságának a vizsgálatára használom. A fő kérdés, hogy milyen állapotban vannak ezek a XIX. századi folyószabályozás és lecsapolások után visszamaradt vizes élőhelyek. Hol válik szárazabb, illetve hol nedvesedik a terület? Ennek megfelelően lehetne kialakítani a vízügyi tervezést, hogy a számunkra illetve az ökoszisztémák számára kedvező viszonyokat tartsunk fenn vagy alakítsunk ki.

Térjünk máris a szakmai dolgokra! Teljesen világos, hogy az optikai műholdak nem alkalmasak monitoringra a légköri zavaró hatások (aeroszol, felhőborítás, felhőárnyék) és egyéb okok miatt. A radarok esetén azonban a mikrohullámok szinte akadály nélkül áthatolnak még a vastag felhőzeten is. Viszont nem állja meg a helyét az állítás, hogy teljesen időjárás-függetlenek lennének. Mert nem azok! A legsúlyosabb problémát a szél jelenti, ugyanis a szélsebesség és a felszín érdessége között kapcsolat áll fenn. Például az erős szélben a vízfelszínen hullámok alakulnak ki, amelyek növelik a vízfelszín érdességét, nagyobb visszaverődést eredményezve a szenzor felé (Alsdorf et al. 2007). Így a vízfelszín detektálásához ezt a problémát kezelni kell, ugyanis a szél a radarképen "elmoshat" bizonyos vízfelszíni elemeket (a vízfelszínre nagyon alacsony visszaverődés jellemző és ezt növeli meg a szél).

Más felszínek (pl. aszfalt, beton) is hasonló érdességgel bírnak, mint a vízfelszínek, ezért ezek is összetéveszthetők a nagyon hasonló vagy teljesen azonos visszaszórási értékek miatt. Bár ezen felületek kimaszkolása könnyedén megoldható.

A C-sávú radarok (5,3 GHz frekvencia vagy 5-6 cm hullámhossz körül) alapvetően a lágyszárú növényzettel borított vizes élőhelyeknél, míg az alacsonyabb frekvenciák (P-sáv, L-sáv) az erdőborítás alatti elárasztás detektálására használhatók (Hess 1990), ugyanis az L és a P sávval ellentétben a C-sávban a radarhullámok nem hatolnak át a lombkoronaszinten, hanem a lombozatról verődnek vissza - a hullámhossz összemérhető a levelek méretével (Engman 1996, Lang és Kasischke 2008).

A vízborítás érzékelésére az azonos polarizáltságú (HH, VV) adatok alkalmasabbak. Legalkalmasabb a HH-polarizáció, de a VV szintén megfelelő választás (Kasischke et al. 1997, Bourgeau et al. 2010). Bár azt is érdemes itt hozzátenni, hogy a kereszt-polarizált sávok is fontos információkat hordoznak, különösen, ha a felszínborítást akarjuk térképezni ű(Baghdadi (2010). A különböző felszíntípusokat más visszaverődés jellemez a VV és a VH sávokban.
