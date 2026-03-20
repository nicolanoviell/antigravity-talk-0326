# Visual Analysis of [Order](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py#32-123) Class

This document provides a visual representation of the class structure and the checkout logic defined in [02-da_testare.py](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py).

## Class Diagram

The following diagram shows the relationships between the [Order](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py#32-123) class, its dependencies, and the custom exceptions.

```mermaid
classDiagram
    class InventoryService {
        <<interface>>
        +get_stock(product_id: str) int
        +decrement_stock(product_id: str, quantity: int)
    }

    class PaymentGateway {
        <<interface>>
        +charge(amount: float, currency: str) bool
    }

    class Order {
        -inventory: InventoryService
        -payment: PaymentGateway
        +customer_email: str
        +is_vip: bool
        +items: dict
        +is_paid: bool
        +status: str
        +add_item(product_id: str, price: float, quantity: int)
        +remove_item(product_id: str)
        +total_price() float
        +apply_discount() float
        +checkout() dict
    }

    class InventoryShortageError {
        <<exception>>
    }

    class PaymentFailedError {
        <<exception>>
    }

    class InvalidOrderError {
        <<exception>>
    }

    Order ..> InventoryService : uses
    Order ..> PaymentGateway : uses
    Order ..> InventoryShortageError : raises
    Order ..> PaymentFailedError : raises
    Order ..> InvalidOrderError : raises
```

## Checkout Sequence Diagram

The [checkout](file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py#85-123) method orchestrates several steps. This diagram illustrates the flow of control and data.

```mermaid
sequenceDiagram
    participant User
    participant Order
    participant Inventory as InventoryService
    participant Payment as PaymentGateway

    User->>Order: checkout()
    
    alt Cart is empty
        Order-->>User: raise InvalidOrderError
    end

    loop For each item in cart
        Order->>Inventory: get_stock(product_id)
        Inventory-->>Order: available_qty
        alt Stock < required
            Order-->>User: raise InventoryShortageError
        end
    end

    Order->>Order: apply_discount()
    
    Order->>Payment: charge(final_amount, "USD")
    Payment-->>Order: success/failure
    
    alt Payment fails
        Order-->>User: raise PaymentFailedError
    end

    loop For each item in cart
        Order->>Inventory: decrement_stock(product_id, qty)
    end

    Note over Order: status = "COMPLETED"
    Order-->>User: {"status": "success", ...}
```
