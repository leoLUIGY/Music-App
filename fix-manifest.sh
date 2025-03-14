#!/bin/bash
# Script para remover a duplicação de <manifest> no AndroidManifest.xml

# O comando sed vai procurar pela tag <manifest> e remover o conteúdo entre <manifest> e </manifest>
sed -i '/<manifest>/,/<\/manifest>/d' platforms/android/app/src/main/AndroidManifest.xml
