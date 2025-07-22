#!/usr/bin/env python3

import csv

# Read 'data.csv' and write it to 'data.js' with some additions
with open('data.csv', mode='r', encoding='utf-8') as in_file, \
     open('build/data.js', mode='w', encoding='utf-8') as out_file:
    
    rows = list(csv.DictReader(in_file))

    id_lookup = {row['id']: row for row in rows}


    out_file.write("const precsvData = `\n")
    out_file.write("name1,art1,x1,z1,name2,art2,x2,z2\n")

    for row in rows:
        next_id = row.get('next_node')
        if next_id and next_id != 'NA':
            target = id_lookup.get(next_id)
            if target:
                content1 = "{name},{art},{x},{z}".format(name=row['Kurzname'], art=row['Art'], x=row['x-Koordinate'], z=row['z-Koordinate'])
                content2 = "{name},{art},{x},{z}".format(name=target['Kurzname'], art=target['Art'], x=target['x-Koordinate'], z=target['z-Koordinate'])
            else:
                content1 = "{name},{art},{x},{z}".format(name=row['Kurzname'], art=row['Art'], x=row['x-Koordinate'], z=row['z-Koordinate'])
                content2 = ",,,"
        out_file.write(content1+","+content2+"\n")

    # for line in in_file:
    #     out_file.write(line)
    
    out_file.write("`")