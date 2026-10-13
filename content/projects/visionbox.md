---
type: project
title: A physical test lab → a synthetic dataset
subtitle: Vision-Box · fraud detection for eGates
description: >-
  Border-control eGates were validated against ICAO norms by physically
  simulating every passage type (babies carried, U-turns, doors jumped) for
  each product variant. During the middleware refactoring, replaced the
  passage-fraud state machine with a neural network and built a synthetic
  training framework from side-camera silhouettes, so thousands of scenarios
  became generated data instead of hardware time. Vision-Box was later acquired
  by Amadeus for €320M. That is the company's outcome; the middleware and the fraud
  model were mine.
tags:
  - .NET
  - C++
  - gRPC
  - ML
  - Biometrics
proofLinks:
  - label: Acquired by Amadeus for €320M · public record
    url: >-
      https://amadeus.com/en/newsroom/press-releases/vision-box-biometrics-acquisition-complete
  - label: Project one-pager
    url: /projects/visionbox/one-pager.pptx
compression:
  before: Physical passage simulations
  after: Synthetic training data
videos:
  - src: /projects/visionbox/actuator.mp4
    poster: /projects/visionbox/actuator-poster.jpg
featured: true
order: 4
---
During a major middleware refactoring for automated border control eGates, replaced a state machine with a neural network for passage fraud detection. Built a synthetic training framework using side-facing camera silhouettes to trigger sensors virtually, eliminating the need to physically simulate every passage type the ICAO norms require (passengers carrying babies, U-turns, jumping doors) for each product variant.

This approach drastically reduced testing time and hardware costs while improving fraud detection accuracy. The synthetic data pipeline generated thousands of training scenarios programmatically, covering edge cases that were previously impractical to test physically.

Vision-Box was acquired by Amadeus for €320M. That is the company's outcome; my work was the middleware refactoring and the fraud-detection model inside it.
