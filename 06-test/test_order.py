# Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
# All rights reserved.
# This code is proprietary and confidential.

"""'Stu modulo tene 'e test pe' 'a classe Order."""

import unittest
from unittest.mock import MagicMock
from inventory import (
    Order, InventoryService, PaymentGateway,
    InventoryShortageError, PaymentFailedError, InvalidOrderError
)


class TestOrder(unittest.TestCase):
    """Classe 'e test pe' l'ordine."""

    def setUp(self):
        """Preparammo tutto cose primma 'e gni test."""
        # Facimmo 'e mock d''e servizie estern
        self.mock_inventory = MagicMock(spec=InventoryService)
        self.mock_payment = MagicMock(spec=PaymentGateway)
        # Criammo n'ordine nuovo fiammante
        self.order = Order(
            inventory_service=self.mock_inventory,
            payment_gateway=self.mock_payment,
            customer_email="napule@example.com"
        )

    def test_add_item_valid(self):
        """Prova pe' ffa' bbedé se s'aggiunge bbuono nu prodott."""
        # Aggiungimmo 'a pizza margherita
        self.order.add_item("pizza_margherita", 5.0, 2)
        self.assertIn("pizza_margherita", self.order.items)
        self.assertEqual(self.order.items["pizza_margherita"]["qty"], 2)

    def test_add_item_invalid_price(self):
        """Nun se pò mettere nu prezzo sotto zero, jamme mo!"""
        with self.assertRaises(ValueError):
            self.order.add_item("aria_fritta", -1.0, 1)

    def test_apply_discount_vip(self):
        """'O discount pe' ll'uommene 'mpurtante (VIP)."""
        self.order.is_vip = True
        self.order.add_item("babà_rande", 10.0, 1)
        # 10 * 0.8 = 8.0
        self.assertEqual(self.order.apply_discount(), 8.0)

    def test_checkout_success(self):
        """Jamm'a vedé si 'o checkout funzione quann tutto va liscia."""
        self.order.add_item("pastiera", 20.0, 1)
        
        # Configurammo 'e mock pe' ffa' succedere 'o miracolo
        self.mock_inventory.get_stock.return_value = 10
        self.mock_payment.charge.return_value = True
        
        res = self.order.checkout()
        
        self.assertEqual(res["status"], "success")
        self.assertTrue(self.order.is_paid)
        self.assertEqual(self.order.status, "COMPLETED")
        # Vedimmo si 'o stock è calato tasse tasse
        self.mock_inventory.decrement_stock.assert_called_once_with("pastiera", 1)

    def test_checkout_inventory_shortage(self):
        """Mannaggia, nun nc'è stockabbastanza!"""
        self.order.add_item("sfogliatella", 2.0, 100)
        self.mock_inventory.get_stock.return_value = 10
        
        with self.assertRaises(InventoryShortageError):
            self.order.checkout()

    def test_checkout_payment_failed(self):
        """'A carta nun funzione, 'aggia miseria!"""
        self.order.add_item("limoncello", 15.0, 1)
        self.mock_inventory.get_stock.return_value = 5
        self.mock_payment.charge.return_value = False
        
        with self.assertRaises(PaymentFailedError):
            self.order.checkout()
        
        # 'O stock nun s'ha da tuccà si nun s'ha pavato
        self.mock_inventory.decrement_stock.assert_not_called()
