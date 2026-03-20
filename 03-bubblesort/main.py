from algorithms import bubble_sort, binary_search

def example_bubble_sort():
    """
    Vedimm' si 'o bubble sort fatica comm' se deve!
    """
    lista = [64, 34, 25, 12, 22, 11, 90]
    print(f"Lista primma d'ô sort: {lista}")
    bubble_sort(lista)
    print(f"Lista doppo 'o sort: {lista}")

def example_binary_search():
    """
    Uè, guardammo si 'o binary search ne truva 'e cose.
    """
    lista_accunciata = [11, 12, 22, 25, 34, 64, 90]
    target = 25
    print(f"Cerchiammo 'o {target} dint' a {lista_accunciata}")
    index = binary_search(lista_accunciata, target)
    if index != -1:
        print(f"'O nummero {target} sta 'o post' {index}")
    else:
        print(f"'O nummero {target} nun se trova nient', mannaggia!")

def main():
    # Facimm' vedé 'e sort e 'e search
    example_bubble_sort()
    print("-" * 30)
    example_binary_search()

if __name__ == "__main__":
    main()