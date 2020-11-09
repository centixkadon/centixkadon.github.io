#!/usr/bin/env python3

import os
import sys

import base64
import hashlib

import requests

def main():
  for filepath in sys.argv[1:]:
    if os.path.exists(filepath):
      hash = hashlib.sha384()
      with open(filepath, mode="rb") as f:
        hash.update(f.read())
      encode = base64.b64encode(hash.digest()).decode()
      url = os.path.basename(filepath)

    else:
      url = filepath
      r = requests.get(url)
      hash = hashlib.sha384()
      hash.update(r.content)
      encode = base64.b64encode(hash.digest()).decode()

    _, fileext = os.path.splitext(filepath)
    if fileext == ".js":
      print(f'<script src="{url}" integrity="sha384-{encode}" crossorigin="anonymous"></script>')
    elif fileext == ".css":
      print(f'<link rel="stylesheet" href="{url}" integrity="sha384-{encode}" crossorigin="anonymous">')
    else:
      print(f'{fileext} {url} integrity="sha384-{encode}"')

if __name__ == "__main__":
  main()
