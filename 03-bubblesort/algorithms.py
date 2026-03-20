"""
Stu file tene 'o bubble sort e 'o binary search.
Scrivimm' 'o codice comm' se deve, p' 'o Napulitano!
"""

def bubble_sort(arr):
    """
    Uè, stu bubble sort serve p' 'a rrivà 'e nummere 'o post' lloro.
    'O cchiù gruosso va ô funno.
    """
    n = len(arr)
    # Girammo n vote
    for i in range(n):
        # L'urdeme i nummere stanno già a post'
        for j in range(0, n - i - 1):
            # Se chillo 'e primma è cchiù gruosso 'e chillo 'e doppo...
            if arr[j] > arr[j + 1]:
                # ...facimme 'o scammio!
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def binary_search(arr, target):
    """
    Stu binary search serve p' truvà nu nummero dint' a na lista già accunciata.
    Si nun 'o truov', turnamm' -1.
    """
    low = 0
    high = len(arr) - 1
    
    # Finché nun se ncontrano...
    while low <= high:
        mid = (high + low) // 2
        
        # Se ammo truvato 'o nummero...
        if arr[mid] == target:
            return mid
        # Se 'o nummero è cchiù piccerillo, guardammo a sinistra
        elif arr[mid] > target:
            high = mid - 1
        # Se 'o nummero è cchiù gruosso, guardammo a destra
        else:
            low = mid + 1
            
    # Nun ammo truvato nient', uè!
    return -1
