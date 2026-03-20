# Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
# All rights reserved.
# This code is proprietary and confidential.

"""'Stu modulo serve a ffa' partì 'e test e ffa' vedè comm' funzione."""

import unittest
import sys
import os

# Agghiungimmo 'a cartella current a 'o path pe' truvà 'e module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from test_order import TestOrder


def example_unit_tests():
    """Metodo d'esempio pe' ffa' vedé comme funziunano 'e unit test."""
    # Facimmo partì 'a suite 'e test
    print("--- Accumminciammo 'e test unitari ---")
    suite = unittest.TestLoader().loadTestsFromTestCase(TestOrder)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    if result.wasSuccessful():
        print("\n--- Tutto bbuono! 'E test hanno passat' titti quann ---")
    else:
        print("\n--- Guaje! Qualche test è fallut' ---")


def main():
    """'O punto 'e partenz d''o pprogramma."""
    # Facimmo vedè 'e test
    example_unit_tests()


if __name__ == '__main__':
    # Azzeccammo 'o pprogramma
    main()
