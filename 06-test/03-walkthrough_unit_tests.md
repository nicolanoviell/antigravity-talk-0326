# Walkthrough: Unit Tests for Order Module

I have implemented and verified a suite of unit tests for the [Order](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py#32-123) class in [02-da_testare.py](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py).

## Changes Made

### [test_order.py](file:///Users/nico/Documents/Progetti/ag-talk/06-test/test_order.py)
Created a comprehensive test suite using `unittest` and `unittest.mock`. The following scenarios were covered:
- **Valid Item Addition**: Verified that items are correctly added to the cart.
- **Invalid Data Validation**: Ensured that negative prices or zero quantities raise a `ValueError`.
- **VIP Discounts**: Confirmed that VIP customers receive a 20% discount.
- **Checkout Success**: Verified the orchestration of stock check, payment, and stock decrement when everything is valid.
- **Inventory Shortage**: Confirmed that [InventoryShortageError](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py#4-7) is raised when stock is insufficient.
- **Payment Failure**: Ensured that [PaymentFailedError](file:///Users/nico/Documents/Progetti/ag-talk/06-test/inventory.py#8-11) is raised when the payment gateway declines the transaction, and that stock is NOT decremented in this case.

### [main.py](file:///Users/nico/Documents/Progetti/ag-talk/06-test/main.py)
Created an entry point that runs the tests and displays the results with a user-friendly output.

## Verification Results

All tests passed successfully. Here is the output of the test runner:

```text
--- Accumminciammo 'e test unitari ---
test_add_item_invalid_price (test_order.TestOrder.test_add_item_invalid_price)
Nun se pò mettere nu prezzo sotto zero, jamme mo! ... ok
test_add_item_valid (test_order.TestOrder.test_add_item_valid)
Prova pe' ffa' bbedé se s'aggiunge bbuono nu prodott. ... ok
test_apply_discount_vip (test_order.TestOrder.test_apply_discount_vip)
'O discount pe' ll'uommene 'mpurtante (VIP). ... ok
test_checkout_inventory_shortage (test_order.TestOrder.test_checkout_inventory_shortage)
Mannaggia, nun nc'è stockabbastanza! ... ok
test_checkout_payment_failed (test_order.TestOrder.test_checkout_payment_failed)
'A carta nun funzione, 'aggia miseria! ... ok
test_checkout_success (test_order.TestOrder.test_checkout_success)
Jamm'a vedé si 'o checkout funzione quann tutto va liscia. ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.004s

OK

--- Tutto bbuono! 'E test hanno passat' titti quann ---
```

The tests were performed with Neapolitan comments and follow PEP 8 styling as requested.
