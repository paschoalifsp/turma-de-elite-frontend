#!/bin/bash
npm ci
curl -sL https://firebase.tools | bash
npm install -g @angular/cli