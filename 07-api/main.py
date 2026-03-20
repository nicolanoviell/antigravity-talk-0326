# -*- coding: utf-8 -*-
"""
main.py - Entry point pe' vedé 'o pruggetto Van Gogh Pop Art.
Oramaje 'o sapite, ccà se corre 'o codice!
"""

import os
import sys

def example_feature_vangogh():
    """
    Mostra comm' s'arape 'o pruggetto e comm' se fa 'o test.
    (Esempio 'e funzionalità comm' richiesto d''o disciplinare).
    """
    print("--- 🎨 VAN GOGH POP ART GALLERY ---")
    print("Uè! Stu pruggetto t'ammostra 10 opere 'e Van Gogh co' 'o stile 'e Warhol.")
    print("\n1. Pe' cuntrullà l'API d''o Met Museum:")
    print("   Esegui: node apiValidator.js")
    
    print("\n2. Pe' vedé 'a galleria nel browser:")
    print(f"   Arape 'o file: {os.path.abspath('index.html')}")
    print("\n--- TUTTO A POSTO! ---")

def main():
    """
    Metodo principale ca chiamma l'esempio.
    """
    example_feature_vangogh()

if __name__ == "__main__":
    main()
