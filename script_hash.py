#!/usr/bin/env python3

import os
import sys

import base64
import hashlib

import requests

def readb(filename):
  try:
    with open(filename, "rb") as f:
      return f.read()
  except FileNotFoundError:
    pass
  return None

def encode(s, encoding = "utf-8", newline = "\n"):
  if isinstance(s, bytes):
    return s

  if newline is not None and newline != "":
    s = s.replace("\n", newline)
  return s.encode() if encoding is None else s.encode(encoding=encoding)

def write(lines, filename, encoding = "utf-8", newline = "\n"):
  if isinstance(lines, bytes):
    lines = [lines]
  elif isinstance(lines, str):
    lines = [lines]

  lines = [line if isinstance(line, bytes) else encode(line, encoding=encoding, newline=newline) for line in lines]
  b = (b"" if newline is None else encode(newline, encoding=encoding)).join(lines)

  os.makedirs(os.path.dirname(filename), exist_ok=True)

  while True:
    try:
      with open(filename, "wb") as f:
        f.write(b)
        break
    except KeyboardInterrupt:
      print("writing to file, please wait")

def main():
  bootstrap_version = "4.6.1"
  bootstrap_icons_version = "1.8.3"
  jquery_version = "3.6.0"
  vue_version = "2.6.14"
  urls = [
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.min.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-grid.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-grid.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-grid.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-grid.min.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-reboot.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-reboot.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-reboot.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap-reboot.min.css.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.js.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.min.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.min.js.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.js.map",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.min.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.min.js.map",

    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/bootstrap-icons.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/bootstrap-icons.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/fonts/bootstrap-icons.woff",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/fonts/bootstrap-icons.woff2",

    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.js",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.min.js",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.min.map",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.slim.js",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.slim.min.js",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.slim.min.map",

    f"https://cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.js",
    f"https://cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.min.js",
    f"https://cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.runtime.esm.js",
    f"https://cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.runtime.js",

    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/bootstrap-icons.min.css",
    f"https://cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.min.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.min.js",
    f"https://cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.min.js",

    f"javascript/cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/css/bootstrap.css",
    f"javascript/cdn.jsdelivr.net/npm/bootstrap-icons@{bootstrap_icons_version}/font/bootstrap-icons.css",
    f"javascript/cdn.jsdelivr.net/npm/jquery@{jquery_version}/dist/jquery.js",
    f"javascript/cdn.jsdelivr.net/npm/bootstrap@{bootstrap_version}/dist/js/bootstrap.bundle.js",
    f"javascript/cdn.jsdelivr.net/npm/vue@{vue_version}/dist/vue.js",
  ]
  for url in urls:
    if url.startswith("https://"):
      relative_path = url.split("://")[1]
      relative_path = f"javascript/{relative_path}"

      b = readb(relative_path)
      if b is None:
        r = requests.get(url)
        b = r.content
        write(b, relative_path)

    else:
      relative_path = url
      b = readb(relative_path)

    b = b'' if b is None else b

    h = hashlib.sha384()
    h.update(b)
    sha364_b64_str = base64.b64encode(h.digest()).decode()

    _, fileext = os.path.splitext(relative_path)
    if fileext == ".js":
      print(f'<script src="{url}" integrity="sha384-{sha364_b64_str}" crossorigin></script>')
    elif fileext == ".css":
      print(f'<link rel="stylesheet" href="{url}" integrity="sha384-{sha364_b64_str}" crossorigin>')
    else:
      print(f'{fileext} "{url}" integrity="sha384-{sha364_b64_str}"')

if __name__ == "__main__":
  main()
