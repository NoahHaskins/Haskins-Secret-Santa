import random

def randomGarcia(names, gifter, used, i):
    exclusion = [11, 12, 13, 14, 15, 16, 17] + used  # Combine fixed exclusions and used list
    count = 0  # Reset count for each call

    while count != 1:
        randomGifter = random.randint(0, len(names) - 1)  # 0-based index
        if randomGifter not in exclusion:
            gifter[i - 1] = f"{gifter[i - 1]} --> {names[randomGifter]}"
            used.append(randomGifter)
            count = 1

    return gifter, used


def randomAshworth(names,gifter,used,i):
    exclusion = [0,1,2,3,4,5,6,7] + used  
    count = 0

    while count != 1:
        randomGifter = random.randint(0, len(names) - 1)  
        if randomGifter not in exclusion:
            gifter[i - 1] = f"{gifter[i - 1]} --> {names[randomGifter]}"
            used.append(randomGifter)
            count = 1

    return gifter, used


def randomHaskins(names,gifter,used,i):
    exclusion = [8,9] + used
    count = 0
    
    while count != 1:
        randomGifter = random.randint(0, len(names) - 1)  
        if randomGifter not in exclusion:
            gifter[i - 1] = f"{gifter[i - 1]} --> {names[randomGifter]}"
            used.append(randomGifter)
            count = 1

    return gifter, used
            

def main():
    # Names
    one = "Noah"
    two = "Raya"
    three = "Nathan"
    four = "Lauryn"
    five = "Gwen"
    six = "Elizabeth"
    seven = "Kirk"
    eight = "Andrea"
    nine = "Grandma"
    ten = "Grandpa"
    eleven = "Janell"
    twelve = "LaDona"
    thirteen = "Nick"
    fourteen = "Ezra"
    fifteen = "Shayla"
    sixteen = "Trinidad"
    seventeen = "Mackenzie"
    eighteen = "Krya"

    # Family groups
    garcias = [twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen]
    ashworth = [one, two, three, four, five, six, seven, eight]

    # Couples
    couples = [[one, two],[three, four],[seven, eight],[nine, ten],[twelve, thirteen],[sixteen, seventeen]]

    # Combine all participants
    all_names = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen]
    all_gifter = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen]
    
    # count of used numbers
    used= []

    #pairing the Haskins
    
    for i in range(1,9):
        all_gifter,used = randomAshworth(all_names,all_gifter,used,i)

    for i in range(12,19):
        all_gifter,used = randomGarcia(all_names,all_gifter,used,i)

    for i in range(9,12):
        all_gifter,used = randomHaskins(all_names,all_gifter,used,i)


    # Write pairs to a text file
    with open("names.txt", "w") as file:
        for i in range(0,len(all_gifter)):
            file.write(all_gifter[i]+ "\n")

    print("Secret Santa pairs have been written to 'names.txt'.")

main()