Vue.mixin({
  methods: {
    // code
    arrayFromString: function (string) {
      return new TextEncoder().encode(string);
    },
    arrayToString: function (array) {
      return new TextDecoder().decode(array);
    },
    hexFromString: function (string) {
      return new Uint8Array(string.match(/[\da-fA-F]{1,2}/g).map(x => parseInt(x, 16)));
    },
    hexToString: function (array) {
      return Array.from(array).map(x => x.toString(16).padStart(2, '0')).join('');
    },
    base64FromString: function (string) {
      return Uint8Array.from(atob(string), c => c.charCodeAt(0));
    },
    base64ToString: function (array) {
      return btoa(String.fromCharCode(...new Uint8Array(array)));
    },
    base64urlFromString: function (string) {
      return this.base64FromString(string.replace(/-/g, "+").replace(/_/g, "/"));
    },
    base64urlToString: function (array) {
      return this.base64ToString(array).replace(/\+/g, "-").replace(/\//g, "_").replace("=", "");
    },
    base64Encode: function (string) {
      return this.base64ToString(this.arrayFromString(string));
    },
    base64Decode: function (string) {
      return this.arrayToString(this.base64FromString(string));
    },

    // digest
    digest: async function (message, algorithm) {
      return new Uint8Array(await crypto.subtle.digest(algorithm, this.arrayFromString(message)));
    },
    sha1: async function (message) {
      return await this.digest(message, "SHA-1");
    },
    sha256: async function (message) {
      return await this.digest(message, "SHA-256");
    },
    sha384: async function (message) {
      return await this.digest(message, "SHA-384");
    },
    sha512: async function (message) {
      return await this.digest(message, "SHA-512");
    },

    // crypt
    aesGcmKey: async function (password) {
      const hashArray = (await this.sha512(password)).slice(0, 32);
      const jwk = {
        k: this.base64urlToString(hashArray),
        kty: ""
      };
      return await crypto.subtle.importKey("jwk", jwk, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
    },
    aesGcmEncrypt: async function (message, password) {
      const ivArray = crypto.getRandomValues(new Uint8Array(12));
      const algorithm = { name: "AES-GCM", iv: ivArray };
      const key = await this.aesGcmKey(password);
      const decryptArray = this.arrayFromString(message);
      const encryptArray = await crypto.subtle.encrypt(algorithm, key, decryptArray);
      return {
        data: this.base64ToString(encryptArray),
        iv: this.hexToString(ivArray)
      };
    },
    aesGcmDecrypt: async function ({ data: data, iv: iv }, password) {
      const ivArray = this.hexFromString(iv);
      const algorithm = { name: "AES-GCM", iv: ivArray };
      const key = await this.aesGcmKey(password);
      const encryptArray = this.base64FromString(data);
      const decryptArray = await crypto.subtle.decrypt(algorithm, key, encryptArray);
      return this.arrayToString(decryptArray);
    },

  }
});