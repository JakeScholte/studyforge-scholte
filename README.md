# StudyForge Scholte

Onafhankelijke, lokale proefversie voor het gezin Scholte. Gebaseerd op de architectuur van [StudyForge](https://github.com/fathom-web/studyforge), zonder wijzigingen in de oorspronkelijke applicatie of database.

## Wat werkt in deze proefversie?
- Leerlingprofielen instellen en aanpassen: voornaam, schoolniveau, leerjaar en vakken. Profielen staan alleen op het gebruikte apparaat.
- De bestaande StudyForge-interface met dashboard, multiplechoicevragen, open vragen en zelfbeoordeling, hints, flashcards en voortgang.
- Leerdoelen, toetsklaar-indicatie, handmatige toetsplanning en ouderoverzicht voor de lokaal ingestelde leerlingen.
- Lesmateriaal publiceren via de JSON-bibliotheek in deze repository. De bibliotheek start bewust leeg.
- Er is geen betaalde AI-integratie ingebouwd.

## Belangrijk — opslag en beveiliging

Deze versie gebruikt uitsluitend browseropslag (localStorage). Er is nog GEEN beveiligde login, geen ouderautoristatie, geen cloud-back-up en geen synchronisatie tussen apparaten. Wie deze browser gebruikt, kan alle plaatselijke leerlinggegevens bekijken. Wissen van browsergegevens kan de resultaten verwijderen. Gebruik voorlopig geen gevoelige persoonsgegevens.

De oude viercijferige code, oorspronkelijke Supabase-configuratie, oude lesgegevens en bestaande leerlingprofielen zijn niet overgenomen.

## Publiceren via GitHub Pages

De repository-eigenaar schakelt GitHub Pages in via Settings → Pages → Build and deployment → Deploy from a branch → main / (root).

Het beoogde adres is: https://jakescholte.github.io/studyforge-scholte/

## Nieuwe oefentoetsen en flashcards

Bestand: content/library.json. De structuur is:

    {
      "schema": "studyforge-library/v1",
      "packs": [{
        "id": "engels-voorbeeld-v1",
        "profile": "VOORNAAM",
        "collections": [{
          "type": "quiz", "subject": "Engels", "title": "Oefentoets",
          "questions": [{
            "type": "mc", "question": "Voorbeeldvraag?",
            "options": ["A", "B"], "correct": 1, "explanation": "Waarom B klopt."
          }]
        }, {
          "type": "flashcards", "subject": "Engels", "title": "Begrippen",
          "cards": [{"front": "Begrip", "back": "Betekenis"}]
        }]
      }],
      "exams": []
    }

Vervang VOORNAAM door de exacte naam van een lokaal ingericht leerlingprofiel. Gebruik unieke, stabiele pack-ID's. Publiceer geen privébestanden, schooldocumenten of persoonlijke scores in deze openbare repository.

## Later

Eigen Supabase-project, Supabase Auth en Row Level Security, gescheiden leerling- en ouderrechten, synchronisatie en back-up. Het door de familie gemaakte 3D-professorlogo kan worden toegevoegd zodra het is aangeleverd; er is bewust geen vervangend logo gemaakt.
