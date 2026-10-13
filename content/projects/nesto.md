---
type: project
title: The gas bottle → a sensor network
subtitle: 'NESTO · IoT platform, founder'
description: >-
  Bottled-gas logistics ran on drivers eyeballing racks. Built the whole stack:
  an NB-IoT scale for weight and temperature, a vibro-acoustic rack sensor for
  removal and replenishment (patent filed), Prophet demand forecasting, route
  optimization. Twenty prototypes in the field. Hackaday wrote up the
  polyurethane-printed enclosure.
tags:
  - IoT
  - Startup
  - NB-IoT
  - ML
  - Prophet
proofLinks:
  - label: Hackaday article
    url: 'https://hackaday.com/2017/09/03/polyurethane-meet-3d-printing/'
  - label: hackaday.io
    url: 'https://hackaday.io/project/26941-nesto-prototyping'
  - label: 1 patent filed · vibro-acoustic detection
    url: ''
compression:
  before: Drivers eyeballing racks
  after: '20 prototypes, 1 patent'
images:
  - src: /projects/nesto/nesto-functional-overview.png
    alt: NESTO functional overview - install the sensor, weigh bottles, propose and route deliveries
  - src: /projects/nesto/nesto-pitch-deck-brinc.png
    alt: NESTO pitch deck cover, Brinc IoT accelerator 2018
featured: true
order: 6
---
Bottled-gas distributors ran their delivery rounds on what the driver could see: eyeball the
racks, guess the demand, drive the route. We replaced the guesswork with instruments.

**What it took:**
- An NB-IoT connected scale reporting bottle weight and temperature in real time (designed on SIGFOX first, migrated for coverage and two-way communication)
- A vibro-acoustic rack sensor that hears a bottle being removed or replaced (the patent)
- Prophet for demand forecasting, feeding route optimization, on a cloud dashboard for distributors

**Where it got:**
- Twenty prototypes running with pilot customers
- One patent filed on the vibro-acoustic detection
- Hackaday wrote up the polyurethane-printed enclosure
- Brinc IoT accelerator; wins at ENGIE and the ALTICE IoT Challenge
