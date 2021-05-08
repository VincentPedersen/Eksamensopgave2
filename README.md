#Dating-App



TABLE OF CONTENT
-----------------

* Installering af App

* Anvendelse af App

* Arkitektur

* Funktionelle krav



INSTALLERING:
-----------------

Download vores github repository --> https://github.com/VincentPedersen/Eksamensopgave2?fbclid=IwAR2KmwL7hzkkUzs7Oc3XZQH5f8zaNLcCprCJWkZulirFKrpZwySRdXGtaSg




ANVENDELSE:
-----------------
Serveren startes ved at køre 
node app.js 

Azure functions startes ved at "run without debugging" 

Kører på LocalHost:3000





Arkitektur:
-----------------
Vores system er bygget på en 3-tier model hvor:
1. Frontend består af JavaScript, HTML og CSS
2. Server/API består af Node.JS og Azure Functions
3. Storage bliver lageret i databasen på en SQL server. 


De tre dele er forbundet og trækker data fra hinanden, hvilket giver brugeren mulighed for at interagere med klienter, som sender forspørgsel til servern, 
der afslutningsvis henter eller opdatere data i databasen. Dataudvekslingsformatet er valgt til at være JSON.


Der vil være begrænset kode i vores frontend, da fokus vil være på de andre dele. Med andre ord, er der meget lidt visualisering af vores app. 


Severen er udarbejdet i Azure Functions med Node.js og består af flere API'er (Login, Sign up, DeleteUser osv.), hvis funktion er at forbinde klienten og databasen. 
Vores udgangspunkt har været at skabe et "bindeled" alle de steder hvor brugeren kan "interagere" med hjemmesiden, forstået som de steder hvor brugeren, gennem klienten, kan opdatere data. 
 

Storage af data sker i en T-SQL database, som er forsøgt at normaliseres efter de første 3 normalformer. 



Funktionelle krav:
-----------------
Herunder er de funktionlle krav listede op, men henblik på at give en indsigt i hvad der arbejdes henimod. 


1. App’en skal tillade en bruger at oprette en profil
2. App’en skal tillade en bruger at slette sin egen profil
3. App’en skal tillade en bruger at opdatere sin egen profil
4. App’en skal tillade brugeren at logge ind
5. App’en skal tillade at hvis en bruger er logget ind kan de forblive logget ind.
6. App’en skal gøre det muligt for en bruger at vælge like eller dislike for en foreslået profil
7. App’en skal give brugeren en notifikation, såfremt begge profiler har liket hinanden
8. App’en skal gøre det muligt for en bruger at logge ud
9. App’en skal kunne vise en liste over en aktuels brugers matches
10. App’en skal kunne vise en fuld profil for et potentielt match
11. App’en skal give brugeren mulighed for at fjerne et match igen


Udvidede krav:
12. App’en skal give admin mulighed for at opdatere en brugerprofil
13. App’en skal give admin mulighed for at slette en bruger
14. En admin skal have mulighed for at se brugsstatistikker af appen - Hvor mange brugere systemet har samt hvor mange matches systemet har
15. App’en skal indeholde en matching algoritme, som præsenterer brugeren for eventuelt interessante profiler. Hvordan I laver denne algoritme er op til jer.  
(Vi giver point for implementering og performance af algoritmen (begrundet med O-notation). Argumenter også gerne for hvorfor det er en god måde at matche folk på.)
16. En bruger skal kunne sætte et køn samt aldersramme han/hun leder efter. Dertil skal en bruger kun blive vist profiler som opfylder dette filter.
