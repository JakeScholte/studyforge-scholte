# StudyForge Scholte

Een zelfstandige **lokale proefversie** van de leeromgeving voor gezin Scholte, gebaseerd op de structuur en het ontwerp van [de oorspronkelijke StudyForge](https://github.com/fathom-web/studyforge). De bronrepository en oorspronkelijke database zijn niet gewijzigd.

## Wat werkt zonder database?

- Eén vast leerlingprofiel: **Jake — vmbo-t, leerjaar 4**. Geen profielaanmaak of andere leerlingen.
- Het dashboard is bereikbaar via een **viercijferige toegangscode** (eenvoudig UI-slot).
- De bestaande leerinterface met oefentoetsen, multiplechoice- en open vragen, hints, flashcards, voortgang, cijfers, leerdoelen en ouderoverzicht.
- Toetsdata handmatig toevoegen per leerling.
- Nieuwe oefeninhoud via GitHub publiceren in `content/library.json`.

**Belangrijke beperking:** de viercijferige code is zichtbaar of te achterhalen uit de publieke websitecode en kan worden omzeild. Er is geen beveiligde login, ouderautorisatie, back-up of synchronisatie tussen apparaten. Cijfers en planning worden alleen in `localStorage` van de browser bewaard en kunnen verloren gaan als browsergegevens worden gewist. Gebruik voorlopig geen gevoelige persoonsgegevens.

## Gepubliceerde leerstof

De bibliotheek start bewust leeg: er zijn **geen oude leerlingprofielen, lespakketten of cijfers** overgenomen. Publiceer hier alleen nieuwe, geschikte oefeninhoud:

```json
{
  "schema": "studyforge-library/v1",
  "packs": [
    {
      "id": "engels-h1-v1",
      "profile": "Jake",
      "collections": [
        {
          "type": "quiz",
          "subject": "Engels",
          "title": "Hoofdstuk 1",
          "questions": [
            {"type":"mc","question":"Voorbeeldvraag?","options":["Onjuist","Juist"],"correct":1,"explanation":"Uitleg bij het antwoord."}
          ]
        },
        {
          "type": "flashcards",
          "subject": "Engels",
          "title": "Begrippen",
          "cards": [{"front":"Vraag","back":"Antwoord"}]
        }
      ]
    }
  ],
  "exams": []
}
```

`profile` moet exact overeenkomen met de lokale voornaam van de leerling. Houd pack-ID's stabiel om historische resultaten te behouden. Het platform leest deze bibliotheek bij het openen van de site opnieuw in.

## Website

De beoogde URL is https://jakescholte.github.io/studyforge-scholte/ nadat de eigenaar GitHub Pages heeft ingeschakeld via **Settings → Pages → Deploy from a branch → main → / (root)**.

## Vervolg

Na een praktijktest: René's Supabase-project, veilige authenticatie en ouderrollen, RLS, gescheiden leerlinggegevens, back-up en synchronisatie. Het geplande 3D-professorlogo kan worden toegevoegd zodra het is aangeleverd.

