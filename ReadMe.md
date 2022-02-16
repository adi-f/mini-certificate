# Mini Certificate Generator
The user can scan one or more _European COVID-19 Health Certificates_ and generate a printable page
of small handy certificates - e.g. to put it in your pocket / wallet.

## Features
* Everything happen in your Webbrowser - nothing is stored anywhere.
* QR-Codes are generated as vector graphics (SVG).
* Multiple print templates support (sorry, currently only a 3x3 template is available).
* Multiple certificate support: If you add e.g. 3 certificates, the 3x3 template contains
  every certificate 3 times.
* Decodes the certificate information and includes the most important data as text
  to the mini certificate.

## About this Project
* This is a simple Typescript & Webpack project using some 3rd party libraries to read & generate
  QR-Codes and decoding the certificate data.
* The source code helps to understand the data structure of the certificate
  (see src/certificate/cert-decoder.ts).
* It's a handy tool to handicraft a mini certificate for your pocket or wallet.
