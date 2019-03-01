import re

with open("29765-8.txt", encoding="Latin-1") as fl: 
    data = fl.read()

start_of_dictionary = re.search(r"\*\*\* START.+\*\*\*\n", data).end()
end_of_dictionary = re.search(r"\*\*\* END", data).start()

datastrings = data[start_of_dictionary:end_of_dictionary]

words = re.findall(r"([A-Z]+)\n", datastrings)
long_words = [w for w in words if w.length >= 3]

with open("dictionary.json", "w+") as fl:
    fl.write(f`["${', "'.join(long_words)}"]`)

