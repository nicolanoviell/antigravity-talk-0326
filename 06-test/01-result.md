Viewed 02-da_testare.py:1-122

Il file [06-test/02-da_testare.py](cci:7://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:0:0-0:0) definisce un sistema di gestione degli ordini per un'applicazione e-commerce. È strutturato per essere facilmente testabile tramite l'uso di "mock" per i servizi esterni.

Ecco una scomposizione delle sue parti principali:

### 1. Eccezioni Personalizzate
Vengono definiti tre tipi di errori specifici per gestire i fallimenti del processo di acquisto:
- [InventoryShortageError](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:3:0-5:8): Lanciata quando non c'è abbastanza fegato (stock) in magazzino.
- [PaymentFailedError](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:7:0-9:8): Lanciata quando il pagamento viene rifiutato o c'è un errore di rete.
- [InvalidOrderError](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:11:0-13:8): Lanciata se si prova a fare il checkout con un carrello vuoto.

### 2. Interfacce per Servizi Esterni
Le classi [InventoryService](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:16:0-23:61) e [PaymentGateway](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:25:0-28:61) sono astrazioni che rappresentano servizi reali (come un database o Stripe). Al momento sollevano un `NotImplementedError`, indicando che nel codice di produzione verrebbero sostituite da implementazioni reali, mentre nei test verranno simulate.

### 3. La Classe [Order](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:31:0-121:68) (Il cuore della logica)
Questa classe gestisce il ciclo di vita di un ordine:
- **Gestione Carrello**: Permette di aggiungere ([add_item](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:46:4-56:70)) e rimuovere ([remove_item](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:58:4-61:38)) prodotti, validando prezzi e quantità.
- **Calcolo Prezzi**:
    - [total_price](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:63:4-66:79): Calcola il totale lordo.
    - [apply_discount](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:68:4-82:30): Applica la logica commerciale dei sconti (20% per i VIP, 10% per ordini superiori a 100$ per gli utenti normali).
- **Processo di Checkout ([checkout](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:84:4-121:68))**: È il metodo più importante e segue un flusso rigoroso:
    1. Verifica che il carrello non sia vuoto.
    2. Controlla la disponibilità in magazzino tramite l'interfaccia [InventoryService](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:16:0-23:61).
    3. Calcola il prezzo finale scontato.
    4. Tenta di addebitare il costo tramite [PaymentGateway](cci:2://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:25:0-28:61).
    5. Solo se il pagamento va a buon fine, scarica le quantità dal magazzino ([decrement_stock](cci:1://file:///Users/nico/Documents/Progetti/ag-talk/06-test/02-da_testare.py:21:4-23:61)).
    6. Aggiorna lo stato dell'ordine a `COMPLETED`.

In sintesi, il file è un ottimo esempio di **Business Logic** che delega le operazioni pesanti (IO/Rete) a componenti esterni, rendendo il codice pulito e pronto per essere testato con degli unit test.