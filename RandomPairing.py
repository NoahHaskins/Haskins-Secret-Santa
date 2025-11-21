import random

all_names = [
    "Noah", "Raya", "Nathan", "Gwen", "Elizabeth", "Kirk", "Andrea", 
    "Grandma", "Grandpa", "Janell",
    "LaDona", "Nick", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Krya", "Landon" 
]

display_names = [
    "Grandma", "Grandpa", "Janell",
    "LaDona", "Nick", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Krya", "Landon",
    "Kirk", "Andrea", "Noah", "Raya", "Nathan", "Elizabeth", "Gwen"
]

LAST_YEAR_PAIRS = {
    # "Giver": "LastYearGiftee"
    "Noah": "Janell",
    "Raya": "Trinidad",
    "Nathan" : "Grandpa",
    "Gwen" : "Grandma",
    "Elizabeth" : "Mackenzie",
    "Kirk" : "LaDona",
    "Andrea" : "Ezra",
    "LaDona": "Raya",
    "Nick": "Kirk",
    "Ezra" : "",
    "Shayla" : "Gwen",
    "Trinidad" : "Andrea",
    "Mackenzie" : "Noah",
    "Kyra": "Elizabeth",
    "Landon": "",
    "Grandma" : "Nick",
    "Grandpa" : "Nathan",
    "Janell" : "Shayla",

}

def generate_pairs(names, last_year_pairs, extra_forbidden):

    if extra_forbidden is None:
        extra_forbidden = {}

    while True:  # keep trying until we find a valid assignment
        remaining = names[:]          # recipients still available
        random.shuffle(remaining)     # randomize recipient order
        pairs = {}
        success = True

        # You can also sort 'names' by number of constraints if things ever get tight
        for giver in names:
            forbidden = set()
            forbidden.add(giver)  # can't get yourself

            # can't get last year's person
            if giver in last_year_pairs:
                forbidden.add(last_year_pairs[giver])

            # any extra forbidden people (e.g., same household)
            forbidden |= set(extra_forbidden.get(giver, []))

            # valid choices from what's left
            candidates = [r for r in remaining if r not in forbidden]

            if not candidates:
                # dead end → restart whole assignment
                success = False
                break

            recipient = random.choice(candidates)
            pairs[giver] = recipient
            remaining.remove(recipient)

        if success and len(pairs) == len(names):
            return pairs

def main():
    extra_forbidden = {
        # Ashworth Family
        "Noah": {"Raya", "Nathan", "Gwen", "Elizabeth", "Kirk", "Andrea"},
        "Raya": {"Noah", "Nathan", "Gwen", "Elizabeth", "Kirk", "Andrea"},
        "Nathan": {"Noah", "Raya", "Gwen", "Elizabeth", "Kirk", "Andrea"},
        "Gwen": {"Noah", "Raya", "Nathan", "Elizabeth", "Kirk", "Andrea"},
        "Elizabeth": {"Noah", "Raya", "Nathan", "Gwen",  "Kirk", "Andrea"},
        "Kirk": {"Noah", "Raya", "Nathan", "Gwen", "Elizabeth", "Andrea"},
        "Andrea": {"Noah", "Raya", "Nathan", "Gwen", "Elizabeth", "Kirk"},

        #Garcia Family
        "LaDona" : {"Nick", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Krya", "Landon"},
        "Nick" : {"LaDona", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Krya", "Landon"},
        "Ezra" : {"LaDona", "Nick", "Shayla", "Trinidad", "Mackenzie", "Krya", "Landon"},
        "Shayla" : {"LaDona", "Nick", "Ezra", "Trinidad", "Mackenzie", "Krya", "Landon"},
        "Trinidad" : {"LaDona", "Nick", "Ezra", "Shayla", "Mackenzie", "Krya", "Landon"},
        "Mackenzie" : {"LaDona", "Nick", "Ezra", "Shayla", "Trinidad", "Krya", "Landon"},
        "Kyra" : {"LaDona", "Nick", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Landon"},
        "Landon" : {"LaDona", "Nick", "Ezra", "Shayla", "Trinidad", "Mackenzie", "Krya"},

        #GrandParents
        "Grandma" : {"Grandpa"},
        "Grandpa" : {"Grandma"}

    }

    pairs = generate_pairs(all_names, LAST_YEAR_PAIRS, extra_forbidden)

    # Write out in your desired display order
    with open("names.txt", "w") as f:
        for giver in display_names:
            giftee = pairs[giver]
            f.write(f"{giver} --> {giftee}\n")

    print("Secret Santa pairs have been written to 'names.txt'.")


if __name__ == "__main__":
    main()
    