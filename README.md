# Tester(ka)
## Stručné scénáře, co by šlo dále otestovat
  1. Kontrola stavu faktury v přehledu transakcí:
  2. Kontrola přidání položek na fakturu
  3. Kontrola odebrání položek z faktury
  4. Kontrola validace faktury při vytváření nebo editaci
  5. Kontrola správnosti údajů na faktuře
  6. Ověření funkčnosti filtrování faktur
  7. Kontrola odeslání faktury e-mailem
  8. Ověření správnosti výpočtu daně 
## Intro
Tvým úkolem je připravit E2E testy pro sekci kontakty na těchto doménách:

  * dev.fakturaonline.cz
  * dev.invoiceonline.com
  * dev.fakturaonline.sk

## Zadání
- Forkni si tento projekt a začni pracovat. Jako výsledek tvé práce pošli odkaz na repozitář, kam pushneš svůj kód.
- Připrav testy pro sekci kontakty, které pokryjí jejich funkcionalitu. Prozkoumej, co všechno tato sekce aplikace umí, a napiš testy.
- Jelikož naše aplikace funguje na více doménách, potřebujeme testovat cross-domain, promysli, jaká struktura testu je nejvhodnější. (Někdy je funkcionalita stejná, někdy je různá)

## Proč zadání vypadá jak vypadá?
Potřebujeme si ověřit, že:

- zvládneš otestovat naší aplikaci
- dokážeš psát čistý, znovupoužitelný kód, ve kterém se brzy neztratíš
- dokážeš identifikovat featury a správně je otestovat
- dokážeš pracovat i bez test IDs - zvládáš práci se selektory (na dev/test env používáme test IDs)


## Co má být výsledkem?

- Dobře otestovaná sekce kontaktů

  - tvorba, editace, řazení, vyhledávání
  - vytvoření faktury přes detail kontaktu
  - kontrola faktur přiřazených u kontaktu
  - suma a počet faktur v přehledu transakcí
  - další asserty nechám na tobě...

- Strukturované testy, které otestují funkcionalitu na všech doménách
- Použití fixtures a configu pro práci s doménami
- V současné době používáme page objekty pro testování aplikace, uvítal bych stejný přístup, případně nějaký lepší ;)
- Stručné scénáře, co by šlo dále otestovat

## Co bys měl znát a umět?
- Pracovat s
  - Gitem
  - Cypressem
  - selektory
  - JavaScriptem
- Mít povědomí o CI, umět řešit flaky testy a používat intercepty
- Dodržovat DRY princip
- Psát udržitelný a čistý kód

## Shrnutí
- Na vypracování úkolu máš maximálně 4 hodiny, více času úkolu prosím nevěnuj, potřebujeme vidět, co zvládneš za daný čas vytvořit.
- Tento repozitář obsahuje pár commandů z naší aplikace, které by ti měly pomoci s psaním cross-domain testů.
