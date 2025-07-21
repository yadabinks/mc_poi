#!/usr/bin/env python3

# Read 'data.csv' and write it to 'data.js' with some additions
with open('data.csv', mode='r', encoding='utf-8') as in_file, \
     open('build/data.js', mode='w', encoding='utf-8') as out_file:

    out_file.write("const precsvData = `\n")

    for line in in_file:
        out_file.write(line)
    
    out_file.write("`")