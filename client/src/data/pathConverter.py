import json
import os

with open('data.json', 'r+') as f:
    data = json.load(f)
    
    for d in data:
        curr_audio = data[4]
        curr_image = d[3]
        d[4] = '../' + curr_audio
        d[3] = '../' + curr_image

with open('data.js', 'w') as of:
    json.dump(data, of)