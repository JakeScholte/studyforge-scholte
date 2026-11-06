# StudyForge Scholte — Jake's Study Lab

Een zelfstandige leeromgeving voor **Jake, 4 vmbo-t**, gebouwd op basis van de bestaande StudyForge-techniek, maar met een compleet nieuwe vormgeving, navigatie en vier leerwijzen.

## Vier manieren om te leren

1. **Oefentoetsen** — toetsen met meerkeuze- en open vragen, uitleg, hints en een cijfer.
2. **Flashcards** — begrippen leren, kaartjes omdraaien, bekende en moeilijke begrippen bijhouden.
3. **Leer in stappen** — eerst een korte uitleg en voorbeeld, dan een oefening en directe feedback. Ondersteunt `learn`, `lessonTitle` en `example` bij vragen.
4. **Leg het uit** — actief ophalen uit het geheugen: een antwoord zelf formuleren zonder meerkeuzeopties, modelantwoord bekijken, jezelf beoordelen. Moeilijke vragen komen aan het eind nog een keer terug.

De nieuwe interface gebruikt een warme, heldere stijl en vier herkenbare gekleurde kaarten. Mobiel en desktop hebben een eigen aangepaste navigatie.

## Persoonlijk profiel

- **Jake**, leerjaar **4**, niveau **vmbo-t** — er zijn geen andere leerlingprofielen.
- De viercijferige schermcode is ingesteld op de met de familie afgesproken code.
- Dit is géén echte authenticatie: de code kan worden achterhaald uit de openbare websitecode en beschermt browsergegevens niet tegen andere gebruikers van het apparaat.

## Opslag zonder database

Deze pilot gebruikt `localStorage` van de browser. Profiel, toetsresultaten, flashcardstatus, leerdoelen en leerroutevoortgang worden **niet** tussen apparaten gesynchroniseerd. Browsergegevens wissen kan resultaten definitief verwijderen. Bewaar hier voorlopig geen gevoelige persoonsgegevens.

Er is geen Supabase-configuratie of data uit de oorspronkelijke StudyForge overgenomen. De originele repository en database zijn niet gewijzigd.

## Demo-oefenmateriaal

Het bestand `content/library.json` bevat een **nieuw, zelfgeschreven voorbeeldpakket**:

- Nederlands — standpunt en argumenten
- 10 vragen met uitleg, hints en een leerstap
- 10 flashcards

Dit pakket is bedoeld om de vier methoden te testen. Het is geen officieel examenmateriaal en bevat geen persoonlijke schooldocumenten. Later kan het worden vervangen of aangevuld met Jake's eigen lesstof.

### Lesstof publiceren

Het formaat is `studyforge-library/v1`. Een voorbeeld:

```json
{
  "schema": "studyforge-library/v1",
  "packs": [{
    "id": "jake-economie-h1-v1",
    "profile": "Jake",
    "collections": [{
      "type": "quiz",
      "subject": "Economie",
      "title": "Hoofdstuk 1",
      "questions": [{
        "type": "mc",
        "question": "Voorbeeldvraag?",
        "options": ["A", "B"],
        "correct": 1,
        "hint": "Denk aan de kern van de vraag.",
        "learn": "Korte lesuitleg vooraf",
        "lessonTitle": "De basis",
        "example": "Uitgewerkt voorbeeld",
        "explanation": "Waarom het juiste antwoord klopt."
      }]
    }]
  }],
  "exams": []
}
```

Oefenpakketten kunnen ook `flashcards` met `cards` bevatten. Maak voor nieuwe versies stabiele unieke pack-ID's, zodat eerder behaalde resultaten gekoppeld blijven. Publiceer in deze openbare repository geen privébestanden of originele schooldocumenten.

## Live zetten

De repository-eigenaar publiceert via GitHub Pages vanuit de `main` branch, rootmap. De site staat op:

https://jakescholte.github.io/studyforge-scholte/

## Later

Veilige authenticatie, een eigen Supabase-database met RLS, ouderrechten, back-up en synchronisatie. Het afzonderlijk aangeleverde 3D-professorlogo kan later worden toegevoegd.
